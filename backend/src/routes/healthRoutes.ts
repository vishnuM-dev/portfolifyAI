import { Router, Request, Response } from "express";
import mongoose from "mongoose";

const router = Router();

/**
 * Health check endpoint
 * GET /api/health
 */
router.get("/", (_req: Request, res: Response) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  res.status(isDbConnected ? 200 : 503).json({
    success: isDbConnected,
    message: isDbConnected
      ? "Portfolify AI API is healthy"
      : "Portfolify AI API is running with degraded database connection",
    database: isDbConnected ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

export default router;
