import { Response } from "express";
import { AuthenticatedRequest } from "../types/auth";
import PortfolioService from "../services/portfolioService";
import ResumeParserService from "../services/resumeParserService";

export class PortfolioController {
  /**
   * Create a new draft portfolio
   * POST /api/portfolios
   */
  static async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      const portfolio = await PortfolioService.createPortfolio(userId, req.body);
      res.status(201).json({
        success: true,
        message: "Portfolio created successfully",
        portfolio,
        data: { portfolio },
      });
    } catch (error: any) {
      console.error("[PortfolioController.create] Error:", error);
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Failed to create portfolio.",
      });
    }
  }

  /**
   * Get all portfolios owned by the authenticated user
   * GET /api/portfolios
   */
  static async getAll(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      const portfolios = await PortfolioService.getPortfoliosByUser(userId);
      res.status(200).json({
        success: true,
        portfolios,
        data: { portfolios },
      });
    } catch (error: any) {
      console.error("[PortfolioController.getAll] Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve portfolios.",
      });
    }
  }

  /**
   * Get single portfolio by ID with ownership verification
   * GET /api/portfolios/:id
   */
  static async getById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const portfolioId = req.params.id;

      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      const portfolio = await PortfolioService.getPortfolioById(portfolioId, userId);
      res.status(200).json({
        success: true,
        portfolio,
        data: { portfolio },
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Failed to retrieve portfolio.",
      });
    }
  }

  /**
   * Update portfolio
   * PUT /api/portfolios/:id
   */
  static async update(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const portfolioId = req.params.id;

      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      const updated = await PortfolioService.updatePortfolio(portfolioId, userId, req.body);
      res.status(200).json({
        success: true,
        message: "Portfolio saved successfully",
        portfolio: updated,
        data: { portfolio: updated },
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Failed to update portfolio.",
      });
    }
  }

  /**
   * Delete portfolio
   * DELETE /api/portfolios/:id
   */
  static async delete(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const portfolioId = req.params.id;

      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      await PortfolioService.deletePortfolio(portfolioId, userId);
      res.status(200).json({
        success: true,
        message: "Portfolio deleted successfully",
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Failed to delete portfolio.",
      });
    }
  }

  /**
   * Publish portfolio
   * POST /api/portfolios/:id/publish
   */
  static async publish(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const portfolioId = req.params.id;

      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      const published = await PortfolioService.publishPortfolio(portfolioId, userId);
      res.status(200).json({
        success: true,
        message: "Portfolio published live!",
        portfolio: published,
        data: { portfolio: published },
        publicUrl: `/p/${published.slug}`,
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Failed to publish portfolio.",
      });
    }
  }

  /**
   * Unpublish portfolio
   * POST /api/portfolios/:id/unpublish
   */
  static async unpublish(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const portfolioId = req.params.id;

      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      const draft = await PortfolioService.unpublishPortfolio(portfolioId, userId);
      res.status(200).json({
        success: true,
        message: "Portfolio unpublished (saved as draft)",
        portfolio: draft,
        data: { portfolio: draft },
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Failed to unpublish portfolio.",
      });
    }
  }

  /**
   * Upload resume and extract structured portfolio data
   * POST /api/portfolios/parse-resume
   */
  static async parseResumeDirect(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const file = (req as any).file;
      if (!file || file.size === 0) {
        res.status(400).json({
          success: false,
          message: "Please upload a valid resume file (PDF or DOCX, max 15MB).",
        });
        return;
      }

      const rawText = await ResumeParserService.extractRawText(
        file.buffer,
        file.mimetype,
        file.originalname
      );

      const structuredData = ResumeParserService.parseText(rawText);

      res.status(200).json({
        success: true,
        message: "Resume imported and parsed successfully",
        structuredData,
        resumeMeta: {
          fileName: file.originalname,
          fileType: file.mimetype,
          fileSize: file.size,
          uploadedAt: new Date(),
        },
      });
    } catch (error: any) {
      console.error("[PortfolioController.parseResumeDirect] Error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to parse resume document.",
      });
    }
  }

  /**
   * Upload and attach resume to an existing portfolio
   * POST /api/portfolios/:id/resume
   */
  static async uploadResume(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const portfolioId = req.params.id;
      const file = (req as any).file;

      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      if (!file || file.size === 0) {
        res.status(400).json({ success: false, message: "No resume file provided or file is empty." });
        return;
      }

      const rawText = await ResumeParserService.extractRawText(
        file.buffer,
        file.mimetype,
        file.originalname
      );

      const structured = ResumeParserService.parseText(rawText);

      // Merge into portfolio
      const updated = await PortfolioService.updatePortfolio(portfolioId, userId, {
        profile: structured.profile as any,
        skills: structured.skills,
        experience: structured.experience,
        education: structured.education,
        projects: structured.projects,
        certifications: structured.certifications,
        socialLinks: structured.socialLinks,
        resume: {
          fileName: file.originalname,
          fileType: file.mimetype,
          fileSize: file.size,
          uploadedAt: new Date(),
          rawText,
        },
      });

      res.status(200).json({
        success: true,
        message: "Resume attached and portfolio populated with extracted experience",
        portfolio: updated,
        structuredData: structured,
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Failed to process resume upload.",
      });
    }
  }

  /**
   * STEP 9: Analyze quality of uploaded resume
   * POST /api/portfolios/:id/resume/quality or POST /api/portfolios/resume/quality
   */
  static async analyzeResumeQuality(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const file = (req as any).file;
      let rawText = "";

      if (file && file.size > 0) {
        rawText = await ResumeParserService.extractRawText(file.buffer, file.mimetype, file.originalname);
      } else if (req.body.rawText) {
        rawText = req.body.rawText;
      } else if (req.params.id) {
        const userId = req.user?.id;
        if (!userId) {
          res.status(401).json({ success: false, message: "Authentication required" });
          return;
        }
        const portfolio = await PortfolioService.getPortfolioById(req.params.id, userId);
        rawText = portfolio.resume?.rawText || "";
      }

      if (!rawText) {
        res.status(400).json({
          success: false,
          message: "No resume content available for quality analysis. Please upload a resume file.",
        });
        return;
      }

      const structured = ResumeParserService.parseText(rawText);
      const qualityReport = ResumeParserService.analyzeResumeQuality(rawText, structured);

      res.status(200).json({
        success: true,
        message: "Resume quality analysis completed",
        data: qualityReport,
        report: qualityReport,
      });
    } catch (error: any) {
      console.error("[PortfolioController.analyzeResumeQuality] Error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to analyze resume quality.",
      });
    }
  }

  /**
   * STEP 9: Compare uploaded resume against existing portfolio data
   * POST /api/portfolios/:id/resume/compare
   */
  static async compareResume(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const portfolioId = req.params.id;
      const file = (req as any).file;

      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      const portfolio = await PortfolioService.getPortfolioById(portfolioId, userId);

      let rawText = "";
      if (file && file.size > 0) {
        rawText = await ResumeParserService.extractRawText(file.buffer, file.mimetype, file.originalname);
      } else if (req.body.rawText) {
        rawText = req.body.rawText;
      } else {
        rawText = portfolio.resume?.rawText || "";
      }

      if (!rawText) {
        res.status(400).json({
          success: false,
          message: "Please upload a resume file to compare.",
        });
        return;
      }

      const structured = ResumeParserService.parseText(rawText);
      const comparison = ResumeParserService.compareResumeWithPortfolio(structured, portfolio);
      const quality = ResumeParserService.analyzeResumeQuality(rawText, structured);

      res.status(200).json({
        success: true,
        message: "Resume comparison completed",
        structuredData: structured,
        comparison,
        quality,
        data: {
          structuredData: structured,
          comparison,
          quality,
        },
      });
    } catch (error: any) {
      console.error("[PortfolioController.compareResume] Error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to compare resume with portfolio.",
      });
    }
  }

  /**
   * STEP 9: Selective Merge of Resume Data into Portfolio
   * POST /api/portfolios/:id/resume/merge
   */
  static async mergeResumeData(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const portfolioId = req.params.id;
      const { selectedSkills, selectedExperience, selectedProjects, selectedHeadline, selectedSummary } = req.body;

      if (!userId) {
        res.status(401).json({ success: false, message: "Authentication required" });
        return;
      }

      const portfolio = await PortfolioService.getPortfolioById(portfolioId, userId);

      const updates: any = {};

      if (selectedSkills && Array.isArray(selectedSkills)) {
        updates.skills = Array.from(new Set([...(portfolio.skills || []), ...selectedSkills]));
      }

      if (selectedExperience && Array.isArray(selectedExperience)) {
        updates.experience = [...(portfolio.experience || []), ...selectedExperience];
      }

      if (selectedProjects && Array.isArray(selectedProjects)) {
        updates.projects = [...(portfolio.projects || []), ...selectedProjects];
      }

      if (selectedHeadline && typeof selectedHeadline === "string") {
        updates.profile = { ...(portfolio.profile as any), headline: selectedHeadline };
      }

      if (selectedSummary && typeof selectedSummary === "string") {
        updates.profile = { ...(updates.profile || (portfolio.profile as any)), professionalSummary: selectedSummary };
      }

      const updated = await PortfolioService.updatePortfolio(portfolioId, userId, updates);

      res.status(200).json({
        success: true,
        message: "Selected resume data successfully merged into portfolio.",
        portfolio: updated,
        data: { portfolio: updated },
      });
    } catch (error: any) {
      console.error("[PortfolioController.mergeResumeData] Error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to merge resume data.",
      });
    }
  }

  /**
   * Public retrieval of a published portfolio by slug
   * GET /api/portfolios/public/:slug
   */
  static async getPublicBySlug(req: any, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      if (!slug) {
        res.status(400).json({ success: false, message: "Portfolio slug is required." });
        return;
      }

      const portfolio = await PortfolioService.getPublishedBySlug(slug);
      if (!portfolio) {
        res.status(404).json({
          success: false,
          message: "Portfolio not found or not published.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        portfolio,
        data: { portfolio },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch public portfolio.",
      });
    }
  }
}

export default PortfolioController;

