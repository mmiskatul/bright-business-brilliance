import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import dotenv from "dotenv";
import { connectDB } from "./db";
import { seedDatabase } from "./seed";
import { productRoutes } from "./routes/products";
import { reviewRoutes } from "./routes/reviews";
import { offerRoutes } from "./routes/offers";
import { galleryRoutes } from "./routes/gallery";
import { inquiryRoutes } from "./routes/inquiries";
import { settingsRoutes } from "./routes/settings";
import { healthRoutes } from "./routes/health";

dotenv.config();

const PORT = parseInt(process.env.PORT || "5000", 10);
const HOST = process.env.HOST || "0.0.0.0";

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

async function buildServer() {
  // CORS
  await fastify.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  });

  // Swagger Documentation
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: "ASFA Design Sportswear & Jersey API",
        description: "Fastify + MongoDB Backend API for ASFA Design Dhaka",
        version: "2.0.0",
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
          description: "Local Fastify Server",
        },
      ],
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
  });

  // Register API Routes under /api prefix
  fastify.register(
    async (api) => {
      api.register(healthRoutes);
      api.register(productRoutes);
      api.register(reviewRoutes);
      api.register(offerRoutes);
      api.register(galleryRoutes);
      api.register(inquiryRoutes);
      api.register(settingsRoutes);
    },
    { prefix: "/api" },
  );

  // Root route info
  fastify.get("/", async () => {
    return {
      message: "ASFA Design Sportswear & Jersey Fastify API Server",
      documentation: `http://localhost:${PORT}/documentation`,
      health: `http://localhost:${PORT}/api/health`,
      endpoints: [
        "/api/products",
        "/api/reviews",
        "/api/offers",
        "/api/gallery",
        "/api/inquiries",
        "/api/settings",
        "/api/health",
      ],
    };
  });

  return fastify;
}

async function start() {
  try {
    const server = await buildServer();

    // Connect to MongoDB & seed if needed
    await connectDB();
    await seedDatabase();

    await server.listen({ port: PORT, host: HOST });
    console.log(`\n🚀 [Fastify Server] Running at http://localhost:${PORT}`);
    console.log(`📚 [Swagger Docs] Available at http://localhost:${PORT}/documentation\n`);
  } catch (err: any) {
    if (err.code === "EADDRINUSE") {
      console.warn(`[Fastify] Port ${PORT} already in use. Retrying in 1s...`);
      setTimeout(() => process.exit(1), 1000);
    } else {
      fastify.log.error(err);
      process.exit(1);
    }
  }
}

process.on("SIGTERM", async () => {
  await fastify.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  await fastify.close();
  process.exit(0);
});

start();
