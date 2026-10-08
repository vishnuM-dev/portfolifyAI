import { Request, Response } from "express";
import PortfolioService from "../services/portfolioService";

export class PublicController {
  /**
   * Public retrieval of a published portfolio by URL slug
   * GET /api/public/portfolios/:slug
   */
  static async getPublicPortfolio(req: Request, res: Response): Promise<void> {
    try {
      const slug = req.params.slug;

      if (!slug || typeof slug !== "string") {
        res.status(400).json({
          success: false,
          message: "Invalid portfolio identifier.",
        });
        return;
      }

      const portfolio = await PortfolioService.getPublishedBySlug(slug);

      if (!portfolio) {
        res.status(404).json({
          success: false,
          message: "Portfolio not found or not currently published.",
        });
        return;
      }

      const safePortfolio = {
        _id: portfolio._id.toString(),
        id: portfolio._id.toString(),
        slug: portfolio.slug,
        status: portfolio.status,
        template: portfolio.template,
        profile: portfolio.profile,
        skills: portfolio.skills,
        experience: portfolio.experience,
        education: portfolio.education,
        projects: portfolio.projects,
        certifications: portfolio.certifications,
        customSections: portfolio.customSections || [],
        sectionVisibility: portfolio.sectionVisibility || {},
        socialLinks: portfolio.socialLinks,
        settings: portfolio.settings,
        createdAt: portfolio.createdAt,
        updatedAt: portfolio.updatedAt,
      };

      res.status(200).json({
        success: true,
        portfolio: safePortfolio,
        data: { portfolio: safePortfolio },
      });
    } catch (error: any) {
      console.error("[PublicController.getPublicPortfolio] Error:", error);
      res.status(500).json({
        success: false,
        message: "An unexpected error occurred while loading this portfolio.",
      });
    }
  }
}

export default PublicController;
