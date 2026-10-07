import dotenv from "dotenv";
import path from "path";

// Load environment variables from backend/.env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { createApp } from "./app";
import { connectDatabase } from "./config/database";

const PORT = parseInt(process.env.PORT || "5000", 10);

async function startServer(): Promise<void> {
  try {
    // 1. Connect to MongoDB Atlas
    await connectDatabase();

    // 2. Initialize Express application
    const app = createApp();

    // 3. Start listening for requests
    app.listen(PORT, () => {
      console.log(`=========================================`);
      console.log(`🚀 Portfolify AI Backend Server Running!`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🌐 Allowed Frontend: ${process.env.FRONTEND_URL || "http://localhost:3000"}`);
      console.log(`=========================================`);
    });
  } catch (error) {
    console.error("❌ Failed to start backend server:", error);
    process.exit(1);
  }
}

startServer();
