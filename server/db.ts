import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/arman_design";

let isConnected = false;

export async function connectDB(): Promise<typeof mongoose | null> {
  if (isConnected) {
    return mongoose;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(
      `[MongoDB] Connected successfully to: ${conn.connection.host}/${conn.connection.name}`,
    );
    return conn;
  } catch (error) {
    console.warn(`[MongoDB] Warning: Could not connect to MongoDB at ${MONGODB_URI}.`);
    console.warn(`[MongoDB] Reason: ${(error as Error).message}`);
    console.warn(
      `[MongoDB] Running in offline/fallback mode (APIs will serve fallback dataset if DB is unreachable).`,
    );
    return null;
  }
}

export function getDBStatus() {
  return {
    connected: mongoose.connection.readyState === 1,
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host || "none",
    name: mongoose.connection.name || "none",
    uri: MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, "//***:***@"), // Redact credentials if any
  };
}
