import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import mongoose from "mongoose";
import { Offer } from "../models/Offer";
import { defaultOffers } from "../data/defaultData";

export async function offerRoutes(fastify: FastifyInstance) {
  // GET all active offers
  fastify.get("/offers", async () => {
    if (mongoose.connection.readyState === 1) {
      try {
        const list = await Offer.find({ active: true }).sort({ createdAt: -1 });
        if (list.length > 0) {
          return { success: true, count: list.length, data: list, source: "mongodb" };
        }
      } catch (err) {
        console.error("Error fetching offers:", err);
      }
    }
    return { success: true, count: defaultOffers.length, data: defaultOffers, source: "fallback" };
  });

  // POST create offer
  fastify.post(
    "/offers",
    async (request: FastifyRequest<{ Body: Record<string, any> }>, reply: FastifyReply) => {
      const body = request.body || {};
      if (!body.title || !body.code || !body.discount) {
        return reply
          .status(400)
          .send({ success: false, message: "Missing required fields: title, code, discount" });
      }

      if (mongoose.connection.readyState === 1) {
        try {
          const created = await Offer.create(body);
          return reply.status(201).send({ success: true, data: created });
        } catch (err: any) {
          return reply.status(400).send({ success: false, message: err.message });
        }
      }

      return reply.status(503).send({ success: false, message: "MongoDB is not connected" });
    },
  );
}
