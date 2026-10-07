import { Router } from "express";
import { AIController } from "../controllers/aiController";
import { authenticate } from "../middleware/authMiddleware";
import { aiRateLimiter } from "../middleware/aiRateLimiter";

const router = Router();

// Check AI status (public status check)
router.get("/status", AIController.getStatus);

// All generative / analysis endpoints require authentication and rate limiting
router.post("/analyze-portfolio", authenticate, aiRateLimiter, AIController.analyzePortfolio);
router.post("/analyze-resume", authenticate, aiRateLimiter, AIController.analyzePortfolio); // alias for backwards compatibility
router.post("/generate-headline", authenticate, aiRateLimiter, AIController.generateHeadline);
router.post("/generate-summary", authenticate, aiRateLimiter, AIController.generateSummary);
router.post("/improve-experience", authenticate, aiRateLimiter, AIController.improveExperience);
router.post("/improve-project", authenticate, aiRateLimiter, AIController.improveProject);
router.post("/analyze-skills", authenticate, aiRateLimiter, AIController.analyzeSkills);
router.post("/generate-seo", authenticate, aiRateLimiter, AIController.generateSeo);
router.post("/career-assistant", authenticate, aiRateLimiter, AIController.careerAssistant);

export default router;
