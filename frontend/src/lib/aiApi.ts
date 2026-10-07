import { apiRequest } from "./api";
import {
  IAIComprehensiveAnalysis,
  IAIHeadlineSuggestion,
  IAISummarySuggestion,
  IAIExperienceSuggestion,
  IAIProjectSuggestion,
  IAISkillAnalysis,
  IAISeoSuggestion,
  AIStatusResponse,
} from "@/types/ai";

export const aiApi = {
  /**
   * Check if backend AI provider is configured and available
   */
  async getStatus() {
    return apiRequest<{ status: AIStatusResponse }>("/ai/status");
  },

  /**
   * Trigger full portfolio and resume intelligence analysis
   */
  async analyzePortfolio(portfolioId: string) {
    return apiRequest<{ analysis: IAIComprehensiveAnalysis }>("/ai/analyze-portfolio", {
      method: "POST",
      body: JSON.stringify({ portfolioId }),
    });
  },

  /**
   * Generate / improve headline
   */
  async generateHeadline(portfolioId: string) {
    return apiRequest<{ headline: IAIHeadlineSuggestion }>("/ai/generate-headline", {
      method: "POST",
      body: JSON.stringify({ portfolioId }),
    });
  },

  /**
   * Generate / improve summary
   */
  async generateSummary(portfolioId: string, length: "short" | "medium" | "detailed" = "medium") {
    return apiRequest<{ summary: IAISummarySuggestion }>("/ai/generate-summary", {
      method: "POST",
      body: JSON.stringify({ portfolioId, length }),
    });
  },

  /**
   * Improve specific experience entry
   */
  async improveExperience(portfolioId: string, experienceIndex: number) {
    return apiRequest<{ experience: IAIExperienceSuggestion }>("/ai/improve-experience", {
      method: "POST",
      body: JSON.stringify({ portfolioId, experienceIndex }),
    });
  },

  /**
   * Improve specific project entry
   */
  async improveProject(portfolioId: string, projectIndex: number) {
    return apiRequest<{ project: IAIProjectSuggestion }>("/ai/improve-project", {
      method: "POST",
      body: JSON.stringify({ portfolioId, projectIndex }),
    });
  },

  /**
   * Categorize and deduplicate skills
   */
  async analyzeSkills(portfolioId: string) {
    return apiRequest<{ skills: IAISkillAnalysis }>("/ai/analyze-skills", {
      method: "POST",
      body: JSON.stringify({ portfolioId }),
    });
  },

  /**
   * Generate SEO metadata and search keywords
   */
  async generateSeo(portfolioId: string) {
    return apiRequest<{ seo: IAISeoSuggestion }>("/ai/generate-seo", {
      method: "POST",
      body: JSON.stringify({ portfolioId }),
    });
  },

  /**
   * STEP 10: AI Career Assistant & Strategic Career Scoring
   */
  async generateCareerAdvice(portfolioId: string, targetRole?: string) {
    return apiRequest<{ careerAdvice: any }>("/ai/career-assistant", {
      method: "POST",
      body: JSON.stringify({ portfolioId, targetRole }),
    });
  },
};

export default aiApi;
