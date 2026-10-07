import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import healthRoutes from "./routes/healthRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import portfolioRoutes from "./routes/portfolioRoutes";
import publicRoutes from "./routes/publicRoutes";
import aiRoutes from "./routes/aiRoutes";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware";

export function createApp(): Express {
  const app = express();

  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  // CORS Configuration: Only allow configured frontend origin with credentials enabled
  app.use(
    cors({
      origin: frontendUrl,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    })
  );

  // Body and cookie parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // API Route Handlers
  app.use("/api/health", healthRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/portfolios", portfolioRoutes);
  app.use("/api/public/portfolios", publicRoutes);
  app.use("/api/public", publicRoutes);
  app.use("/api/ai", aiRoutes);

  // 404 & Global Error Handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export default createApp;
