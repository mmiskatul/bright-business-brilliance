import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import mongoose from "mongoose";
import { SiteSetting } from "../models/SiteSetting";
import { defaultSiteSetting } from "../data/defaultData";

export async function settingsRoutes(fastify: FastifyInstance) {
  // GET site settings
  fastify.get("/settings", async () => {
    if (mongoose.connection.readyState === 1) {
      try {
        const setting = await SiteSetting.findOne();
        if (setting) {
          return { success: true, data: setting, source: "mongodb" };
        }
      } catch (err) {
        console.error("Error fetching settings from DB:", err);
      }
    }
    return { success: true, data: defaultSiteSetting, source: "fallback" };
  });

  // PUT update site settings
  fastify.put(
    "/settings",
    async (request: FastifyRequest<{ Body: Record<string, any> }>, reply: FastifyReply) => {
      const body = request.body || {};
      if (mongoose.connection.readyState === 1) {
        try {
          let setting = await SiteSetting.findOne();
          if (setting) {
            Object.assign(setting, body);
            await setting.save();
          } else {
            setting = await SiteSetting.create(body);
          }
          return { success: true, data: setting };
        } catch (err: any) {
          return reply.status(400).send({ success: false, message: err.message });
        }
      }
      return reply.status(503).send({ success: false, message: "MongoDB is not connected" });
    },
  );
}
