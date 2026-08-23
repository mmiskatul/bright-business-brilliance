import { FastifyInstance } from "fastify";
import { getDBStatus } from "../db";

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get("/health", async () => {
    const dbStatus = getDBStatus();
    return {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: dbStatus,
      framework: "Fastify",
    };
  });
}
