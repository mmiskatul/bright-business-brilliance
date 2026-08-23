import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import mongoose from "mongoose";
import { Inquiry } from "../models/Inquiry";

// In-memory array cache for inquiries if DB is temporarily disconnected
const inMemoryInquiries: any[] = [];

export async function inquiryRoutes(fastify: FastifyInstance) {
  // GET all inquiries (for admin)
  fastify.get(
    "/inquiries",
    async (request: FastifyRequest<{ Querystring: { status?: string } }>) => {
      const { status } = request.query;
      const filter = status ? { status } : {};

      if (mongoose.connection.readyState === 1) {
        try {
          const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
          return { success: true, count: inquiries.length, data: inquiries, source: "mongodb" };
        } catch (err) {
          console.error("Error fetching inquiries from DB:", err);
        }
      }

      const filtered = status
        ? inMemoryInquiries.filter((i) => i.status === status)
        : inMemoryInquiries;
      return { success: true, count: filtered.length, data: filtered, source: "memory" };
    },
  );

  // POST create inquiry (Contact / Quote form)
  fastify.post(
    "/inquiries",
    async (request: FastifyRequest<{ Body: Record<string, any> }>, reply: FastifyReply) => {
      const body = request.body || {};
      if (!body.name || !body.email || !body.message) {
        return reply.status(400).send({
          success: false,
          message: "Missing required fields: name, email, message",
        });
      }

      const inquiryPayload = {
        name: String(body.name).trim(),
        email: String(body.email).trim().toLowerCase(),
        phone: body.phone ? String(body.phone).trim() : "",
        service: body.service || "General Inquiry",
        budget: body.budget || "Not specified",
        timeline: body.timeline || "Flexible",
        message: String(body.message).trim(),
        status: "new",
        createdAt: new Date(),
      };

      if (mongoose.connection.readyState === 1) {
        try {
          const created = await Inquiry.create(inquiryPayload);
          return reply.status(201).send({
            success: true,
            message:
              "Thank you! Your inquiry has been received. Arman will get back to you shortly.",
            data: created,
            source: "mongodb",
          });
        } catch (err: any) {
          console.error("Failed saving inquiry to DB:", err);
        }
      }

      // Fallback store in memory
      const memoryRecord = { _id: "mem_" + Date.now(), ...inquiryPayload };
      inMemoryInquiries.unshift(memoryRecord);

      return reply.status(201).send({
        success: true,
        message: "Thank you! Your inquiry has been received. Arman will get back to you shortly.",
        data: memoryRecord,
        source: "memory",
      });
    },
  );

  // PATCH update status
  fastify.patch(
    "/inquiries/:id/status",
    async (
      request: FastifyRequest<{ Params: { id: string }; Body: { status?: string } }>,
      reply: FastifyReply,
    ) => {
      const { id } = request.params;
      const { status } = request.body || {};

      if (!status) {
        return reply.status(400).send({ success: false, message: "Status is required" });
      }

      if (mongoose.connection.readyState === 1 && !id.startsWith("mem_")) {
        try {
          const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
          if (!updated) {
            return reply.status(404).send({ success: false, message: "Inquiry not found" });
          }
          return { success: true, data: updated };
        } catch (err: any) {
          return reply.status(400).send({ success: false, message: err.message });
        }
      }

      const item = inMemoryInquiries.find((i) => i._id === id);
      if (item) {
        item.status = status;
        return { success: true, data: item };
      }

      return reply.status(404).send({ success: false, message: "Inquiry not found" });
    },
  );
}
