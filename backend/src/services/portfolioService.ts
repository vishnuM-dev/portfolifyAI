import mongoose from "mongoose";
import Portfolio, { IPortfolioDocument } from "../models/Portfolio";
import { IPortfolio, StructuredResumeData } from "../types/portfolio";

export class PortfolioService {
  /**
   * Generates a URL-friendly, unique slug based on user's name
   */
  static async generateUniqueSlug(baseName: string, excludeId?: string): Promise<string> {
    const raw = (baseName || "portfolio")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const slugBase = raw || "portfolio";
    let candidate = slugBase;
    let counter = 1;

    while (true) {
      const query: { slug: string; _id?: { $ne: mongoose.Types.ObjectId } } = { slug: candidate };
      if (excludeId && mongoose.Types.ObjectId.isValid(excludeId)) {
        query._id = { $ne: new mongoose.Types.ObjectId(excludeId) };
      }

      const existing = await Portfolio.findOne(query);
      if (!existing) {
        return candidate;
      }

      counter++;
      candidate = `${slugBase}-${counter}`;
    }
  }

  /**
   * Create a new draft portfolio for an authenticated user
   */
  static async createPortfolio(
    userId: string,
    initialData?: Partial<IPortfolio> & { structuredResume?: StructuredResumeData }
  ): Promise<IPortfolioDocument> {
    const name = initialData?.profile?.name || initialData?.structuredResume?.profile.name || "My Portfolio";
    const slug = await this.generateUniqueSlug(name);

    const portfolioData: Partial<IPortfolio> = {
      userId: new mongoose.Types.ObjectId(userId) as unknown as string,
      slug,
      status: "draft",
      template: initialData?.template || "professional",
      profile: {
        name: initialData?.profile?.name || initialData?.structuredResume?.profile?.name || "",
        headline: initialData?.profile?.headline || initialData?.structuredResume?.profile?.headline || "",
        professionalSummary: initialData?.profile?.professionalSummary || initialData?.structuredResume?.profile?.professionalSummary || "",
        email: initialData?.profile?.email || initialData?.structuredResume?.profile?.email || "",
        phone: initialData?.profile?.phone || initialData?.structuredResume?.profile?.phone || "",
        location: initialData?.profile?.location || initialData?.structuredResume?.profile?.location || "",
        profileImage: initialData?.profile?.profileImage || "",
        website: initialData?.profile?.website || "",
      },
      skills: initialData?.skills || initialData?.structuredResume?.skills || [],
      experience: initialData?.experience || initialData?.structuredResume?.experience || [],
      education: initialData?.education || initialData?.structuredResume?.education || [],
      projects: initialData?.projects || initialData?.structuredResume?.projects || [],
      certifications: initialData?.certifications || initialData?.structuredResume?.certifications || [],
      customSections: (initialData?.customSections as any) || [],
      sectionVisibility: initialData?.sectionVisibility || {
        profile: true,
        skills: true,
        experience: true,
        education: true,
        projects: true,
        certifications: true,
        customSections: true,
        contact: true,
      },
      socialLinks: initialData?.socialLinks || initialData?.structuredResume?.socialLinks || {},
      resume: initialData?.resume || {},
      settings: initialData?.settings || { primaryColor: "#2D5D60", font: "inter", density: "comfortable", animation: "standard", theme: "auto" },
    };

    const portfolio = await Portfolio.create(portfolioData);
    return portfolio;
  }

  /**
   * Get all portfolios owned by the authenticated user
   */
  static async getPortfoliosByUser(userId: string): Promise<IPortfolioDocument[]> {
    return Portfolio.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ updatedAt: -1 });
  }

  /**
   * Get a single portfolio by ID ensuring strict user ownership
   */
  static async getPortfolioById(portfolioId: string, userId: string): Promise<IPortfolioDocument> {
    if (!mongoose.Types.ObjectId.isValid(portfolioId)) {
      throw { status: 400, message: "Invalid portfolio ID" };
    }

    const portfolio = await Portfolio.findById(portfolioId);

    if (!portfolio) {
      throw { status: 404, message: "Portfolio not found" };
    }

    if (portfolio.userId.toString() !== userId) {
      throw { status: 403, message: "Access denied. You do not own this portfolio." };
    }

    return portfolio;
  }

  /**
   * Update a portfolio with validation and ownership check
   */
  static async updatePortfolio(
    portfolioId: string,
    userId: string,
    updates: Partial<IPortfolio>
  ): Promise<IPortfolioDocument> {
    const portfolio = await this.getPortfolioById(portfolioId, userId);

    // If user changes custom slug, ensure uniqueness
    if (updates.slug && updates.slug !== portfolio.slug) {
      const sanitizedSlug = updates.slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      if (!sanitizedSlug) {
        throw { status: 400, message: "Slug must contain valid lowercase letters, numbers, or hyphens." };
      }

      const isTaken = await Portfolio.findOne({
        slug: sanitizedSlug,
        _id: { $ne: portfolio._id },
      });

      if (isTaken) {
        throw { status: 409, message: `The public URL '/p/${sanitizedSlug}' is already taken. Please choose another.` };
      }

      portfolio.slug = sanitizedSlug;
    }

    if (updates.template) portfolio.template = updates.template;
    if (updates.profile) {
      portfolio.set("profile", {
        ...((portfolio.profile as any) || {}),
        ...updates.profile,
      });
    }
    if (updates.skills) {
      portfolio.skills = updates.skills;
    }
    if (updates.experience) {
      portfolio.experience = updates.experience as unknown as typeof portfolio.experience;
    }
    if (updates.education) {
      portfolio.education = updates.education as unknown as typeof portfolio.education;
    }
    if (updates.projects) {
      portfolio.projects = updates.projects as unknown as typeof portfolio.projects;
    }
    if (updates.certifications) {
      portfolio.certifications = updates.certifications as unknown as typeof portfolio.certifications;
    }
    if (updates.customSections) {
      portfolio.customSections = updates.customSections as unknown as typeof portfolio.customSections;
    }
    if (updates.sectionVisibility) {
      portfolio.set("sectionVisibility", {
        ...((portfolio.sectionVisibility as any) || {}),
        ...updates.sectionVisibility,
      });
    }
    if (updates.socialLinks) {
      portfolio.set("socialLinks", {
        ...((portfolio.socialLinks as any) || {}),
        ...updates.socialLinks,
      });
    }
    if (updates.settings) {
      portfolio.set("settings", {
        ...((portfolio.settings as any) || {}),
        ...updates.settings,
      });
    }
    if (updates.resume) {
      portfolio.set("resume", {
        ...((portfolio.resume as any) || {}),
        ...updates.resume,
      });
    }

    await portfolio.save();
    return portfolio;
  }

  /**
   * Delete a portfolio with strict ownership check
   */
  static async deletePortfolio(portfolioId: string, userId: string): Promise<boolean> {
    const portfolio = await this.getPortfolioById(portfolioId, userId);
    await Portfolio.findByIdAndDelete(portfolio._id);
    return true;
  }

  /**
   * Publish portfolio after checking minimum publish requirements
   */
  static async publishPortfolio(portfolioId: string, userId: string): Promise<IPortfolioDocument> {
    const portfolio = await this.getPortfolioById(portfolioId, userId);

    const missing: string[] = [];
    if (!portfolio.profile?.name?.trim()) missing.push("Full Name");
    if (!portfolio.profile?.headline?.trim()) missing.push("Headline");
    if (!portfolio.profile?.professionalSummary?.trim()) missing.push("Professional Summary");
    if (!portfolio.skills || portfolio.skills.length === 0) missing.push("At least one skill");

    if (missing.length > 0) {
      throw {
        status: 422,
        message: `Please complete the following required fields before publishing: ${missing.join(", ")}.`,
      };
    }

    portfolio.status = "published";
    await portfolio.save();
    return portfolio;
  }

  /**
   * Unpublish a portfolio (returns to draft)
   */
  static async unpublishPortfolio(portfolioId: string, userId: string): Promise<IPortfolioDocument> {
    const portfolio = await this.getPortfolioById(portfolioId, userId);
    portfolio.status = "draft";
    await portfolio.save();
    return portfolio;
  }

  /**
   * Public retrieval of a published portfolio by slug
   */
  static async getPublishedBySlug(slug: string): Promise<IPortfolioDocument | null> {
    const cleanSlug = slug.toLowerCase().trim();
    const portfolio = await Portfolio.findOne({
      slug: cleanSlug,
      status: "published",
    }).select("-resume.rawText");

    return portfolio;
  }
}

export default PortfolioService;
