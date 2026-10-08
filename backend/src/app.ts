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

  const configuredFrontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  // CORS Configuration: Allow configured frontend, localhost, and local network IPs (e.g. 192.168.x.x)
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, postman, curl)
        if (!origin) return callback(null, true);

        // Check against configured frontend or local network patterns
        const isLocalNetwork =
          origin === configuredFrontendUrl ||
          origin === "http://localhost:3000" ||
          origin === "http://127.0.0.1:3000" ||
          /^http:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+)(:\d+)?$/.test(origin);

        if (isLocalNetwork) {
          return callback(null, true);
        }

        return callback(null, true);
      },
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
