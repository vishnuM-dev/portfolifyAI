import { Response } from "express";
import { AuthenticatedRequest } from "../types/auth";
import AIService from "../services/ai/aiService";

export class AIController {
  /**
   * Check AI service configuration status
   * GET /api/ai/status
   */
  static async getStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
    const status = AIService.getStatus();
    res.status(200).json({
      success: true,
      provider: status.provider,
      isConfigured: status.isConfigured,
      model: status.model,
      status,
      data: { status, ...status },
    });
  }

  /**
   * Comprehensive portfolio analysis
   * POST /api/ai/analyze-portfolio (also aliases /analyze-resume)
   */
  static async analyzePortfolio(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { portfolioId } = req.body;

      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      if (!portfolioId) {
        res.status(400).json({ success: false, message: "portfolioId is required." });
        return;
      }

      const analysis = await AIService.analyzePortfolio(userId, portfolioId);

      res.status(200).json({
        success: true,
        message: "Portfolio analysis generated successfully.",
        analysis,
        data: { analysis },
      });
    } catch (error: any) {
      console.error("[AIController.analyzePortfolio] Error:", error.message);
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Failed to analyze portfolio.",
        code: error.code || "AI_ERROR",
      });
    }
  }

  /**
   * Generate / Improve Headline
   * POST /api/ai/generate-headline
   */
  static async generateHeadline(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { portfolioId } = req.body;

      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      if (!portfolioId) {
        res.status(400).json({ success: false, message: "portfolioId is required." });
        return;
      }

      const headline = await AIService.generateHeadline(userId, portfolioId);

      res.status(200).json({
        success: true,
        message: "Headline suggestion generated.",
        headline,
        data: { headline },
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Failed to generate headline.",
      });
    }
  }

  /**
   * Generate / Improve Summary
   * POST /api/ai/generate-summary
   */
  static async generateSummary(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { portfolioId, length } = req.body;

      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      if (!portfolioId) {
        res.status(400).json({ success: false, message: "portfolioId is required." });
        return;
      }

      const summary = await AIService.generateSummary(userId, portfolioId, length || "medium");

      res.status(200).json({
        success: true,
        message: "Summary suggestion generated.",
        summary,
        data: { summary },
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Failed to generate summary.",
      });
    }
  }

  /**
   * Improve specific experience bullet points
   * POST /api/ai/improve-experience
   */
  static async improveExperience(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { portfolioId, experienceIndex } = req.body;

      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      if (!portfolioId || typeof experienceIndex !== "number") {
        res.status(400).json({ success: false, message: "portfolioId and experienceIndex are required." });
        return;
      }

      const experience = await AIService.improveExperience(userId, portfolioId, experienceIndex);

      res.status(200).json({
        success: true,
        message: "Experience suggestion generated.",
        experience,
        data: { experience },
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Failed to improve experience.",
      });
    }
  }

  /**
   * Improve project details
   * POST /api/ai/improve-project
   */
  static async improveProject(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { portfolioId, projectIndex } = req.body;

      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      if (!portfolioId || typeof projectIndex !== "number") {
        res.status(400).json({ success: false, message: "portfolioId and projectIndex are required." });
        return;
      }

      const project = await AIService.improveProject(userId, portfolioId, projectIndex);

      res.status(200).json({
        success: true,
        message: "Project suggestion generated.",
        project,
        data: { project },
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Failed to improve project.",
      });
    }
  }

  /**
   * Categorize and deduplicate skills
   * POST /api/ai/analyze-skills
   */
  static async analyzeSkills(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { portfolioId } = req.body;

      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      if (!portfolioId) {
        res.status(400).json({ success: false, message: "portfolioId is required." });
        return;
      }

      const skills = await AIService.analyzeSkills(userId, portfolioId);

      res.status(200).json({
        success: true,
        message: "Skill intelligence generated.",
        skills,
        data: { skills },
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Failed to analyze skills.",
      });
    }
  }

  /**
   * Generate SEO keywords and metadata
   * POST /api/ai/generate-seo
   */
  static async generateSeo(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { portfolioId } = req.body;

      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      if (!portfolioId) {
        res.status(400).json({ success: false, message: "portfolioId is required." });
        return;
      }

      const seo = await AIService.generateSeo(userId, portfolioId);

      res.status(200).json({
        success: true,
        message: "SEO recommendations generated.",
        seo,
        data: { seo },
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Failed to generate SEO.",
      });
    }
  }

  /**
   * STEP 10: AI Career Assistant & Talent Strategy
   * POST /api/ai/career-assistant
   */
  static async careerAssistant(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { portfolioId, targetRole } = req.body;

      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      if (!portfolioId) {
        res.status(400).json({ success: false, message: "portfolioId is required." });
        return;
      }

      const careerAdvice = await AIService.generateCareerAdvice(userId, portfolioId, targetRole);

      res.status(200).json({
        success: true,
        message: "Career intelligence & strategic advice generated.",
        careerAdvice,
        data: { careerAdvice },
      });
    } catch (error: any) {
      console.error("[AIController.careerAssistant] Error:", error.message);
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Failed to generate career advice.",
        code: error.code || "AI_ERROR",
      });
    }
  }
}

export default AIController;

