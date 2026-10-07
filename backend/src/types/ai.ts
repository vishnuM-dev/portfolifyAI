import { z } from "zod";

// ==========================================
// 1. Zod Schemas for Strict Output Validation
// ==========================================

export const AIHeadlineSuggestionSchema = z.object({
  current: z.string().default(""),
  suggested: z.string().min(1, "Suggested headline cannot be empty"),
  reasoning: z.string().default(""),
});

export const AISummarySuggestionSchema = z.object({
  length: z.enum(["short", "medium", "detailed"]).default("medium"),
  current: z.string().default(""),
  suggested: z.string().min(1, "Suggested summary cannot be empty"),
  highlights: z.array(z.string()).default([]),
});

export const AIExperienceBulletSchema = z.object({
  experienceIndex: z.number().int().nonnegative().optional(),
  company: z.string().default(""),
  position: z.string().default(""),
  originalDescription: z.string().default(""),
  suggestedDescription: z.string().default(""),
  suggestedAchievements: z.array(z.string()).default([]),
  improvementReason: z.string().default(""),
});

export const AIProjectSuggestionSchema = z.object({
  projectIndex: z.number().int().nonnegative().optional(),
  title: z.string().default(""),
  originalDescription: z.string().default(""),
  suggestedDescription: z.string().default(""),
  suggestedHighlights: z.array(z.string()).default([]),
  suggestedTechnologies: z.array(z.string()).default([]),
  improvementReason: z.string().default(""),
});

export const AISkillAnalysisSchema = z.object({
  technical: z.array(z.string()).default([]),
  frameworks: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
  databases: z.array(z.string()).default([]),
  cloud: z.array(z.string()).default([]),
  softSkills: z.array(z.string()).default([]),
  duplicateOrRedundant: z.array(z.string()).default([]),
  recommendedOrder: z.array(z.string()).default([]),
});

export const AISeoSuggestionSchema = z.object({
  metaTitle: z.string().default(""),
  metaDescription: z.string().default(""),
  keywords: z.array(z.string()).default([]),
  suggestedSlug: z.string().optional(),
});

export const AIComprehensiveAnalysisSchema = z.object({
  headline: AIHeadlineSuggestionSchema,
  summary: AISummarySuggestionSchema,
  skills: AISkillAnalysisSchema,
  experienceSuggestions: z.array(AIExperienceBulletSchema).default([]),
  projectSuggestions: z.array(AIProjectSuggestionSchema).default([]),
  seo: AISeoSuggestionSchema,
  warnings: z.array(z.string()).default([]),
  detectedSeniority: z.string().default(""),
});

// ==========================================
// 2. TypeScript Interfaces inferred from Zod
// ==========================================

export type IAIHeadlineSuggestion = z.infer<typeof AIHeadlineSuggestionSchema>;
export type IAISummarySuggestion = z.infer<typeof AISummarySuggestionSchema>;
export type IAIExperienceSuggestion = z.infer<typeof AIExperienceBulletSchema>;
export type IAIProjectSuggestion = z.infer<typeof AIProjectSuggestionSchema>;
export type IAISkillAnalysis = z.infer<typeof AISkillAnalysisSchema>;
export type IAISeoSuggestion = z.infer<typeof AISeoSuggestionSchema>;
export type IAIComprehensiveAnalysis = z.infer<typeof AIComprehensiveAnalysisSchema>;

export const AICareerScoreSchema = z.object({
  portfolioQualityScore: z.number().int().min(0).max(100).default(80),
  profileCompletenessScore: z.number().int().min(0).max(100).default(85),
  recruiterReadinessScore: z.number().int().min(0).max(100).default(75),
  scoreBreakdown: z
    .array(
      z.object({
        criterion: z.string(),
        score: z.number(),
        maxScore: z.number(),
        explanation: z.string(),
      })
    )
    .default([]),
  strengths: z.array(z.string()).default([]),
  weaknesses: z.array(z.string()).default([]),
});

export const AISkillGapAnalysisSchema = z.object({
  currentSkills: z.array(z.string()).default([]),
  missingSkills: z.array(z.string()).default([]),
  recommendedSkills: z.array(z.string()).default([]),
  targetRoles: z.array(z.string()).default([]),
  learningPriorities: z
    .array(
      z.object({
        skill: z.string(),
        priority: z.enum(["high", "medium", "low"]).default("medium"),
        rationale: z.string(),
      })
    )
    .default([]),
});

export const AICareerAdvisorSchema = z.object({
  careerProfile: z.object({
    category: z.string().default("Software Engineering"),
    seniority: z.string().default("Mid-Level / Senior"),
    strengths: z.array(z.string()).default([]),
    targetRoleRecommendations: z.array(z.string()).default([]),
  }),
  careerScore: AICareerScoreSchema,
  skillGap: AISkillGapAnalysisSchema,
  portfolioAdvisorAdvice: z
    .array(
      z.object({
        area: z.string(),
        suggestion: z.string(),
        rationale: z.string(),
        impact: z.string(),
      })
    )
    .default([]),
  actionPlan: z.array(z.string()).default([]),
});

export type IAICareerScore = z.infer<typeof AICareerScoreSchema>;
export type IAISkillGapAnalysis = z.infer<typeof AISkillGapAnalysisSchema>;
export type IAICareerAdvisor = z.infer<typeof AICareerAdvisorSchema>;

// Request DTOs
export interface AIAnalyzeRequest {
  portfolioId: string;
}

export interface AIGenerateHeadlineRequest {
  portfolioId: string;
}

export interface AIGenerateSummaryRequest {
  portfolioId: string;
  length?: "short" | "medium" | "detailed";
}

export interface AIImproveExperienceRequest {
  portfolioId: string;
  experienceIndex: number;
}

export interface AIImproveProjectRequest {
  portfolioId: string;
  projectIndex: number;
}

export interface AICareerAssistantRequest {
  portfolioId: string;
  targetRole?: string;
}

export interface AIAnalyzeSkillsRequest {
  portfolioId: string;
}

export interface AIGenerateSeoRequest {
  portfolioId: string;
}
