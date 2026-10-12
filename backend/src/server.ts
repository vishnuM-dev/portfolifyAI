import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

// Load environment variables from backend/.env
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config();

import { createApp } from "./app";
import { connectDatabase } from "./config/database";

const PORT = parseInt(process.env.PORT || "5000", 10);

async function startServer(): Promise<void> {
  try {
    // 1. Connect to MongoDB Atlas with resilient options & diagnostics
    await connectDatabase();

    // 2. Initialize Express application
    const app = createApp();

    // 3. Start listening for requests on all interfaces (allows other laptops on LAN/Wi-Fi to connect)
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`=========================================`);
      console.log(`🚀 Portfolify AI Backend Server Running!`);
      console.log(`📡 Local: http://localhost:${PORT}`);
      console.log(`📡 LAN:   http://0.0.0.0:${PORT}`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🌐 Allowed Frontend: ${process.env.FRONTEND_URL || "http://localhost:3000"}`);
      console.log(`=========================================`);
    });

    // Graceful shutdown handling
    const handleShutdown = async (signal: string) => {
      console.log(`\n[Server] Received ${signal}. Initiating graceful shutdown...`);
      server.close(async () => {
        console.log("[Server] HTTP server closed.");
        try {
          if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log("[Database] MongoDB connection closed.");
          }
        } catch (dbErr) {
          console.error("[Database] Error closing MongoDB connection:", dbErr);
        }
        process.exit(0);
      });
    };

    process.on("SIGINT", () => handleShutdown("SIGINT"));
    process.on("SIGTERM", () => handleShutdown("SIGTERM"));
  } catch (error) {
    console.error("❌ Failed to start backend server:", error);
    process.exit(1);
  }
}

startServer();
