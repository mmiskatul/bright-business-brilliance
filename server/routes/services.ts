import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import mongoose from "mongoose";
import { Service } from "../models/Service";
import { defaultServices } from "../data/defaultData";

export async function serviceRoutes(fastify: FastifyInstance) {
  // GET all services
  fastify.get("/services", async () => {
    if (mongoose.connection.readyState === 1) {
      try {
        const services = await Service.find().sort({ createdAt: 1 });
        if (services.length > 0) {
          return { success: true, count: services.length, data: services, source: "mongodb" };
        }
      } catch (err) {
        console.error("Error fetching services from DB:", err);
      }
    }
    return {
      success: true,
      count: defaultServices.length,
      data: defaultServices,
      source: "fallback",
    };
  });

  // GET service by slug
  fastify.get(
    "/services/:slug",
    async (request: FastifyRequest<{ Params: { slug: string } }>, reply: FastifyReply) => {
      const { slug } = request.params;
      if (mongoose.connection.readyState === 1) {
        try {
          const service = await Service.findOne({ slug });
          if (service) {
            return { success: true, data: service, source: "mongodb" };
          }
        } catch (err) {
          console.error(`Error fetching service ${slug}:`, err);
        }
      }

      const fallback = defaultServices.find((s) => s.slug === slug);
      if (fallback) {
        return { success: true, data: fallback, source: "fallback" };
      }

      return reply
        .status(404)
        .send({ success: false, message: `Service with slug '${slug}' not found` });
    },
  );

  // POST create service
  fastify.post(
    "/services",
    async (request: FastifyRequest<{ Body: Record<string, any> }>, reply: FastifyReply) => {
      const body = request.body || {};
      if (!body.name || !body.slug) {
        return reply
          .status(400)
          .send({ success: false, message: "Missing required fields: name, slug" });
      }

      if (mongoose.connection.readyState === 1) {
        try {
          const created = await Service.create(body);
          return reply.status(201).send({ success: true, data: created });
        } catch (err: any) {
          return reply.status(400).send({ success: false, message: err.message });
        }
      }

      return reply
        .status(503)
        .send({ success: false, message: "MongoDB is not connected to save new items" });
    },
  );

  // PUT update service
  fastify.put(
    "/services/:id",
    async (
      request: FastifyRequest<{ Params: { id: string }; Body: Record<string, any> }>,
      reply: FastifyReply,
    ) => {
      const { id } = request.params;
      if (mongoose.connection.readyState === 1) {
        try {
          const updated = await Service.findByIdAndUpdate(id, request.body, { new: true });
          if (!updated) {
            return reply.status(404).send({ success: false, message: "Service not found" });
          }
          return { success: true, data: updated };
        } catch (err: any) {
          return reply.status(400).send({ success: false, message: err.message });
        }
      }
      return reply.status(503).send({ success: false, message: "MongoDB is not connected" });
    },
  );

  // DELETE service
  fastify.delete(
    "/services/:id",
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const { id } = request.params;
      if (mongoose.connection.readyState === 1) {
        try {
          const deleted = await Service.findByIdAndDelete(id);
          if (!deleted) {
            return reply.status(404).send({ success: false, message: "Service not found" });
          }
          return { success: true, message: "Service deleted successfully" };
        } catch (err: any) {
          return reply.status(400).send({ success: false, message: err.message });
        }
      }
      return reply.status(503).send({ success: false, message: "MongoDB is not connected" });
    },
  );
}
