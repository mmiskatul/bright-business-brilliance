import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import mongoose from "mongoose";
import { Review } from "../models/Review";
import { defaultReviews } from "../data/defaultData";

export async function reviewRoutes(fastify: FastifyInstance) {
  // GET reviews
  fastify.get("/reviews", async () => {
    if (mongoose.connection.readyState === 1) {
      try {
        const list = await Review.find().sort({ createdAt: -1 });
        if (list.length > 0) {
          return { success: true, count: list.length, data: list, source: "mongodb" };
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    }
    return {
      success: true,
      count: defaultReviews.length,
      data: defaultReviews,
      source: "fallback",
    };
  });

  // POST create review
  fastify.post(
    "/reviews",
    async (request: FastifyRequest<{ Body: Record<string, any> }>, reply: FastifyReply) => {
      const body = request.body || {};
      if (!body.name || !body.comment) {
        return reply
          .status(400)
          .send({ success: false, message: "Missing required fields: name, comment" });
      }

      const payload = {
        name: String(body.name).trim(),
        location: body.location || "Dhaka, Bangladesh",
        rating: Number(body.rating) || 5,
        date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        product: body.product || "Custom Matchday Jersey",
        comment: String(body.comment).trim(),
        avatarText: (body.name || "A").slice(0, 2).toUpperCase(),
        verified: true,
      };

      if (mongoose.connection.readyState === 1) {
        try {
          const created = await Review.create(payload);
          return reply.status(201).send({ success: true, data: created });
        } catch (err: any) {
          return reply.status(400).send({ success: false, message: err.message });
        }
      }

      return reply
        .status(201)
        .send({ success: true, data: { _id: "mem_" + Date.now(), ...payload } });
    },
  );
}
