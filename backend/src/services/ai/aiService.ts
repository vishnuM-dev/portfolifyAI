import mongoose from "mongoose";
import AIUsage from "../../models/AIUsage";
import Portfolio from "../../models/Portfolio";
import { IPortfolio } from "../../types/portfolio";
import {
  AIComprehensiveAnalysisSchema,
  AIHeadlineSuggestionSchema,
  AISummarySuggestionSchema,
  AIExperienceBulletSchema,
  AIProjectSuggestionSchema,
  AISkillAnalysisSchema,
  AISeoSuggestionSchema,
  AICareerAdvisorSchema,
  IAIComprehensiveAnalysis,
  IAIHeadlineSuggestion,
  IAISummarySuggestion,
  IAIExperienceSuggestion,
  IAIProjectSuggestion,
  IAISkillAnalysis,
  IAISeoSuggestion,
  IAICareerAdvisor,
} from "../../types/ai";
import { SYSTEM_ANTI_HALLUCINATION_PROMPT } from "./prompts/systemPrompt";
import { buildResumeAnalysisPrompt } from "./prompts/resumeAnalysisPrompt";
import { buildHeadlinePrompt } from "./prompts/headlinePrompt";
import { buildSummaryPrompt } from "./prompts/summaryPrompt";
import { buildExperiencePrompt } from "./prompts/experiencePrompt";
import { buildProjectPrompt } from "./prompts/projectPrompt";
import { buildSkillsPrompt } from "./prompts/skillsPrompt";
import { buildSeoPrompt } from "./prompts/seoPrompt";
import { buildCareerAssistantPrompt } from "./prompts/careerAssistantPrompt";
import { AIProviderFactory } from "./providers/providerFactory";

export class AIService {
  /**
   * Helper to fetch portfolio and verify ownership
   */
  private static async getOwnedPortfolio(portfolioId: string, userId: string): Promise<IPortfolio> {
    if (!mongoose.Types.ObjectId.isValid(portfolioId)) {
      const error: any = new Error("Invalid portfolio ID format.");
      error.status = 400;
      throw error;
    }

    const doc = await Portfolio.findById(portfolioId);
    if (!doc) {
      const error: any = new Error("Portfolio not found.");
      error.status = 404;
      throw error;
    }

    if (doc.userId.toString() !== userId.toString()) {
      const error: any = new Error("Forbidden: You do not have permission to access this portfolio.");
      error.status = 403;
      throw error;
    }

    return doc.toObject() as unknown as IPortfolio;
  }

  /**
   * Helper to record AI usage log
   */
  private static async recordUsage(params: {
    userId: string;
    portfolioId?: string;
    operation: string;
    provider: string;
    model: string;
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
    status: "success" | "error" | "rate_limited" | "not_configured";
    errorMessage?: string;
  }): Promise<void> {
    try {
      await AIUsage.create({
        userId: new mongoose.Types.ObjectId(params.userId),
        portfolioId: params.portfolioId ? new mongoose.Types.ObjectId(params.portfolioId) : undefined,
        operation: params.operation,
        provider: params.provider,
        aiModel: params.model,
        promptTokens: params.promptTokens || 0,
        completionTokens: params.completionTokens || 0,
        totalTokens: params.totalTokens || 0,
        status: params.status,
        errorMessage: params.errorMessage,
      });
    } catch (e) {
      console.error("[AIService.recordUsage] Failed to record usage log:", e);
    }
  }

  /**
   * Return availability and configuration status of AI service
   */
  static getStatus(): { isConfigured: boolean; provider: string; model: string } {
    const provider = AIProviderFactory.getProvider();
    return {
      isConfigured: provider.isAvailable(),
      provider: provider.name,
      model: provider.modelName,
    };
  }

  /**
   * Comprehensive Resume and Portfolio Analysis
   */
  static async analyzePortfolio(userId: string, portfolioId: string): Promise<IAIComprehensiveAnalysis> {
    const portfolio = await this.getOwnedPortfolio(portfolioId, userId);
    const provider = AIProviderFactory.getProvider();

    if (!provider.isAvailable()) {
      await this.recordUsage({
        userId,
        portfolioId,
        operation: "analyze_portfolio",
        provider: provider.name,
        model: provider.modelName,
        status: "not_configured",
        errorMessage: "AI provider not configured",
      });
      const error: any = new Error("AI intelligence is not currently configured. Please configure your API key.");
      error.status = 503;
      error.code = "AI_NOT_CONFIGURED";
      throw error;
    }

    const userPrompt = buildResumeAnalysisPrompt(portfolio);

    try {
      const result = await provider.generateJSON<unknown>(SYSTEM_ANTI_HALLUCINATION_PROMPT, userPrompt);
      const validated = AIComprehensiveAnalysisSchema.parse(result.data);

      await this.recordUsage({
        userId,
        portfolioId,
        operation: "analyze_portfolio",
        provider: result.provider,
        model: result.model,
        promptTokens: result.promptTokens,
        completionTokens: result.completionTokens,
        totalTokens: result.totalTokens,
        status: "success",
      });

      return validated;
    } catch (err: any) {
      await this.recordUsage({
        userId,
        portfolioId,
        operation: "analyze_portfolio",
        provider: provider.name,
        model: provider.modelName,
        status: "error",
        errorMessage: err.message,
      });
      throw err;
    }
  }

  /**
   * Generate / Improve Professional Headline
   */
  static async generateHeadline(userId: string, portfolioId: string): Promise<IAIHeadlineSuggestion> {
    const portfolio = await this.getOwnedPortfolio(portfolioId, userId);
    const provider = AIProviderFactory.getProvider();

    if (!provider.isAvailable()) {
      const error: any = new Error("AI intelligence is not configured.");
      error.status = 503;
      error.code = "AI_NOT_CONFIGURED";
      throw error;
    }

    const userPrompt = buildHeadlinePrompt(portfolio);

    try {
      const result = await provider.generateJSON<unknown>(SYSTEM_ANTI_HALLUCINATION_PROMPT, userPrompt);
      const validated = AIHeadlineSuggestionSchema.parse(result.data);

      await this.recordUsage({
        userId,
        portfolioId,
        operation: "generate_headline",
        provider: result.provider,
        model: result.model,
        promptTokens: result.promptTokens,
        completionTokens: result.completionTokens,
        totalTokens: result.totalTokens,
        status: "success",
      });

      return validated;
    } catch (err: any) {
      await this.recordUsage({
        userId,
        portfolioId,
        operation: "generate_headline",
        provider: provider.name,
        model: provider.modelName,
        status: "error",
        errorMessage: err.message,
      });
      throw err;
    }
  }

  /**
   * Generate / Improve Professional Summary
   */
  static async generateSummary(
    userId: string,
    portfolioId: string,
    length: "short" | "medium" | "detailed" = "medium"
  ): Promise<IAISummarySuggestion> {
    const portfolio = await this.getOwnedPortfolio(portfolioId, userId);
    const provider = AIProviderFactory.getProvider();

    if (!provider.isAvailable()) {
      const error: any = new Error("AI intelligence is not configured.");
      error.status = 503;
      error.code = "AI_NOT_CONFIGURED";
      throw error;
    }

    const userPrompt = buildSummaryPrompt(portfolio, length);

    try {
      const result = await provider.generateJSON<unknown>(SYSTEM_ANTI_HALLUCINATION_PROMPT, userPrompt);
      const validated = AISummarySuggestionSchema.parse(result.data);

      await this.recordUsage({
        userId,
        portfolioId,
        operation: "generate_summary",
        provider: result.provider,
        model: result.model,
        promptTokens: result.promptTokens,
        completionTokens: result.completionTokens,
        totalTokens: result.totalTokens,
        status: "success",
      });

      return validated;
    } catch (err: any) {
      await this.recordUsage({
        userId,
        portfolioId,
        operation: "generate_summary",
        provider: provider.name,
        model: provider.modelName,
        status: "error",
        errorMessage: err.message,
      });
      throw err;
    }
  }

  /**
   * Improve specific work experience bullet points
   */
  static async improveExperience(
    userId: string,
    portfolioId: string,
    experienceIndex: number
  ): Promise<IAIExperienceSuggestion> {
    const portfolio = await this.getOwnedPortfolio(portfolioId, userId);
    const experienceItem = portfolio.experience?.[experienceIndex];

    if (!experienceItem) {
      const error: any = new Error(`Experience at index ${experienceIndex} does not exist.`);
      error.status = 404;
      throw error;
    }

    const provider = AIProviderFactory.getProvider();
    if (!provider.isAvailable()) {
      const error: any = new Error("AI intelligence is not configured.");
      error.status = 503;
      error.code = "AI_NOT_CONFIGURED";
      throw error;
    }

    const userPrompt = buildExperiencePrompt(experienceItem, experienceIndex, portfolio.skills || []);

    try {
      const result = await provider.generateJSON<unknown>(SYSTEM_ANTI_HALLUCINATION_PROMPT, userPrompt);
      const validated = AIExperienceBulletSchema.parse(result.data);

      await this.recordUsage({
        userId,
        portfolioId,
        operation: "improve_experience",
        provider: result.provider,
        model: result.model,
        promptTokens: result.promptTokens,
        completionTokens: result.completionTokens,
        totalTokens: result.totalTokens,
        status: "success",
      });

      return validated;
    } catch (err: any) {
      await this.recordUsage({
        userId,
        portfolioId,
        operation: "improve_experience",
        provider: provider.name,
        model: provider.modelName,
        status: "error",
        errorMessage: err.message,
      });
      throw err;
    }
  }

  /**
   * Improve specific project presentation
   */
  static async improveProject(
    userId: string,
    portfolioId: string,
    projectIndex: number
  ): Promise<IAIProjectSuggestion> {
    const portfolio = await this.getOwnedPortfolio(portfolioId, userId);
    const projectItem = portfolio.projects?.[projectIndex];

    if (!projectItem) {
      const error: any = new Error(`Project at index ${projectIndex} does not exist.`);
      error.status = 404;
      throw error;
    }

    const provider = AIProviderFactory.getProvider();
    if (!provider.isAvailable()) {
      const error: any = new Error("AI intelligence is not configured.");
      error.status = 503;
      error.code = "AI_NOT_CONFIGURED";
      throw error;
    }

    const userPrompt = buildProjectPrompt(projectItem, projectIndex, portfolio.skills || []);

    try {
      const result = await provider.generateJSON<unknown>(SYSTEM_ANTI_HALLUCINATION_PROMPT, userPrompt);
      const validated = AIProjectSuggestionSchema.parse(result.data);

      await this.recordUsage({
        userId,
        portfolioId,
        operation: "improve_project",
        provider: result.provider,
        model: result.model,
        promptTokens: result.promptTokens,
        completionTokens: result.completionTokens,
        totalTokens: result.totalTokens,
        status: "success",
      });

      return validated;
    } catch (err: any) {
      await this.recordUsage({
        userId,
        portfolioId,
        operation: "improve_project",
        provider: provider.name,
        model: provider.modelName,
        status: "error",
        errorMessage: err.message,
      });
      throw err;
    }
  }

  /**
   * Analyze, categorize and optimize skills list
   */
  static async analyzeSkills(userId: string, portfolioId: string): Promise<IAISkillAnalysis> {
    const portfolio = await this.getOwnedPortfolio(portfolioId, userId);
    const provider = AIProviderFactory.getProvider();

    if (!provider.isAvailable()) {
      const error: any = new Error("AI intelligence is not configured.");
      error.status = 503;
      error.code = "AI_NOT_CONFIGURED";
      throw error;
    }

    const userPrompt = buildSkillsPrompt(portfolio.skills || [], portfolio.profile?.headline || "");

    try {
      const result = await provider.generateJSON<unknown>(SYSTEM_ANTI_HALLUCINATION_PROMPT, userPrompt);
      const validated = AISkillAnalysisSchema.parse(result.data);

      await this.recordUsage({
        userId,
        portfolioId,
        operation: "analyze_skills",
        provider: result.provider,
        model: result.model,
        promptTokens: result.promptTokens,
        completionTokens: result.completionTokens,
        totalTokens: result.totalTokens,
        status: "success",
      });

      return validated;
    } catch (err: any) {
      await this.recordUsage({
        userId,
        portfolioId,
        operation: "analyze_skills",
        provider: provider.name,
        model: provider.modelName,
        status: "error",
        errorMessage: err.message,
      });
      throw err;
    }
  }

  /**
   * Generate SEO keywords and metadata
   */
  static async generateSeo(userId: string, portfolioId: string): Promise<IAISeoSuggestion> {
    const portfolio = await this.getOwnedPortfolio(portfolioId, userId);
    const provider = AIProviderFactory.getProvider();

    if (!provider.isAvailable()) {
      const error: any = new Error("AI intelligence is not configured.");
      error.status = 503;
      error.code = "AI_NOT_CONFIGURED";
      throw error;
    }

    const userPrompt = buildSeoPrompt(portfolio);

    try {
      const result = await provider.generateJSON<unknown>(SYSTEM_ANTI_HALLUCINATION_PROMPT, userPrompt);
      const validated = AISeoSuggestionSchema.parse(result.data);

      await this.recordUsage({
        userId,
        portfolioId,
        operation: "generate_seo",
        provider: result.provider,
        model: result.model,
        promptTokens: result.promptTokens,
        completionTokens: result.completionTokens,
        totalTokens: result.totalTokens,
        status: "success",
      });

      return validated;
    } catch (err: any) {
      await this.recordUsage({
        userId,
        portfolioId,
        operation: "generate_seo",
        provider: provider.name,
        model: provider.modelName,
        status: "error",
        errorMessage: err.message,
      });
      throw err;
    }
  }

  /**
   * STEP 10: AI Career Assistant & Talent Strategy
   */
  static async generateCareerAdvice(
    userId: string,
    portfolioId: string,
    targetRole?: string
  ): Promise<IAICareerAdvisor> {
    const portfolio = await this.getOwnedPortfolio(portfolioId, userId);
    const provider = AIProviderFactory.getProvider();

    if (!provider.isAvailable()) {
      const error: any = new Error("AI intelligence is not configured.");
      error.status = 503;
      error.code = "AI_NOT_CONFIGURED";
      throw error;
    }

    const userPrompt = buildCareerAssistantPrompt(portfolio, targetRole);

    try {
      const result = await provider.generateJSON<unknown>(SYSTEM_ANTI_HALLUCINATION_PROMPT, userPrompt);
      const validated = AICareerAdvisorSchema.parse(result.data);

      await this.recordUsage({
        userId,
        portfolioId,
        operation: "career_assistant",
        provider: result.provider,
        model: result.model,
        promptTokens: result.promptTokens,
        completionTokens: result.completionTokens,
        totalTokens: result.totalTokens,
        status: "success",
      });

      return validated;
    } catch (err: any) {
      await this.recordUsage({
        userId,
        portfolioId,
        operation: "career_assistant",
        provider: provider.name,
        model: provider.modelName,
        status: "error",
        errorMessage: err.message,
      });
      throw err;
    }
  }
}

export default AIService;

