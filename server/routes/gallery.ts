import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import mongoose from "mongoose";
import { GalleryItem } from "../models/GalleryItem";
import { defaultGallery } from "../data/defaultData";

export async function galleryRoutes(fastify: FastifyInstance) {
  // GET all gallery items
  fastify.get("/gallery", async () => {
    if (mongoose.connection.readyState === 1) {
      try {
        const items = await GalleryItem.find().sort({ createdAt: -1 });
        if (items.length > 0) {
          return { success: true, count: items.length, data: items, source: "mongodb" };
        }
      } catch (err) {
        console.error("Error fetching gallery from DB:", err);
      }
    }
    return {
      success: true,
      count: defaultGallery.length,
      data: defaultGallery,
      source: "fallback",
    };
  });

  // POST create gallery item
  fastify.post(
    "/gallery",
    async (request: FastifyRequest<{ Body: Record<string, any> }>, reply: FastifyReply) => {
      const body = request.body || {};
      if (!body.title || !body.image) {
        return reply
          .status(400)
          .send({ success: false, message: "Missing required fields: title, image" });
      }

      if (mongoose.connection.readyState === 1) {
        try {
          const created = await GalleryItem.create(body);
          return reply.status(201).send({ success: true, data: created });
        } catch (err: any) {
          return reply.status(400).send({ success: false, message: err.message });
        }
      }

      return reply.status(503).send({ success: false, message: "MongoDB is not connected" });
    },
  );

  // DELETE gallery item
  fastify.delete(
    "/gallery/:id",
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      const { id } = request.params;
      if (mongoose.connection.readyState === 1) {
        try {
          const deleted = await GalleryItem.findByIdAndDelete(id);
          if (!deleted) {
            return reply.status(404).send({ success: false, message: "Gallery item not found" });
          }
          return { success: true, message: "Gallery item deleted" };
        } catch (err: any) {
          return reply.status(400).send({ success: false, message: err.message });
        }
      }
      return reply.status(503).send({ success: false, message: "MongoDB is not connected" });
    },
  );
}
