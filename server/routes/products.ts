import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import mongoose from "mongoose";
import { Product } from "../models/Product";
import { defaultProducts } from "../data/defaultData";

export async function productRoutes(fastify: FastifyInstance) {
  // GET all products with optional category query
  fastify.get(
    "/products",
    async (request: FastifyRequest<{ Querystring: { category?: string } }>) => {
      const { category } = request.query;
      const filter = category && category !== "All" ? { category } : {};

      if (mongoose.connection.readyState === 1) {
        try {
          const items = await Product.find(filter).sort({ featured: -1, createdAt: 1 });
          if (items.length > 0) {
            return { success: true, count: items.length, data: items, source: "mongodb" };
          }
        } catch (err) {
          console.error("Error fetching products from DB:", err);
        }
      }

      const filtered =
        category && category !== "All"
          ? defaultProducts.filter((p) => p.category === category)
          : defaultProducts;

      return { success: true, count: filtered.length, data: filtered, source: "fallback" };
    },
  );

  // GET product by slug
  fastify.get(
    "/products/:slug",
    async (request: FastifyRequest<{ Params: { slug: string } }>, reply: FastifyReply) => {
      const { slug } = request.params;
      if (mongoose.connection.readyState === 1) {
        try {
          const product = await Product.findOne({ slug });
          if (product) {
            return { success: true, data: product, source: "mongodb" };
          }
        } catch (err) {
          console.error(`Error fetching product ${slug}:`, err);
        }
      }

      const fallback = defaultProducts.find((p) => p.slug === slug);
      if (fallback) {
        return { success: true, data: fallback, source: "fallback" };
      }

      return reply.status(404).send({ success: false, message: `Product '${slug}' not found` });
    },
  );

  // POST create product
  fastify.post(
    "/products",
    async (request: FastifyRequest<{ Body: Record<string, any> }>, reply: FastifyReply) => {
      const body = request.body || {};
      if (!body.name || !body.slug || !body.price) {
        return reply
          .status(400)
          .send({ success: false, message: "Missing required fields: name, slug, price" });
      }

      if (mongoose.connection.readyState === 1) {
        try {
          const created = await Product.create(body);
          return reply.status(201).send({ success: true, data: created });
        } catch (err: any) {
          return reply.status(400).send({ success: false, message: err.message });
        }
      }

      return reply.status(503).send({ success: false, message: "MongoDB is not connected" });
    },
  );
}
