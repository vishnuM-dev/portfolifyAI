import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/auth";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory sliding window rate limiter
const rateLimitMap = new Map<string, RateLimitRecord>();

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitOptions {
  windowMs?: number; // e.g. 60,000 ms (1 min)
  maxRequests?: number; // e.g. 25 requests per window
  message?: string;
}

export function createAIRateLimiter(options: RateLimitOptions = {}) {
  const windowMs = options.windowMs || 60 * 1000;
  const maxRequests = options.maxRequests || 30;
  const message =
    options.message ||
    "You have reached the AI generation rate limit. Please wait a minute before making more AI requests.";

  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const identifier = req.user?.id || req.ip || "anonymous";
    const key = `ai_rate_limit:${identifier}`;
    const now = Date.now();

    const record = rateLimitMap.get(key);

    if (!record || now > record.resetTime) {
      rateLimitMap.set(key, {
        count: 1,
        resetTime: now + windowMs,
      });
      res.setHeader("X-RateLimit-Limit", maxRequests);
      res.setHeader("X-RateLimit-Remaining", maxRequests - 1);
      return next();
    }

    if (record.count >= maxRequests) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader("Retry-After", retryAfterSeconds);
      res.setHeader("X-RateLimit-Limit", maxRequests);
      res.setHeader("X-RateLimit-Remaining", 0);
      res.status(429).json({
        success: false,
        message,
        retryAfter: retryAfterSeconds,
      });
      return;
    }

    record.count += 1;
    res.setHeader("X-RateLimit-Limit", maxRequests);
    res.setHeader("X-RateLimit-Remaining", maxRequests - record.count);
    next();
  };
}

export const aiRateLimiter = createAIRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 30,
});

export default aiRateLimiter;
