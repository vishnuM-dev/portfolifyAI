export interface IAIHeadlineSuggestion {
  current: string;
  suggested: string;
  reasoning: string;
}

export interface IAISummarySuggestion {
  length: "short" | "medium" | "detailed";
  current: string;
  suggested: string;
  highlights: string[];
}

export interface IAIExperienceSuggestion {
  experienceIndex?: number;
  company: string;
  position: string;
  originalDescription: string;
  suggestedDescription: string;
  suggestedAchievements: string[];
  improvementReason: string;
}

export interface IAIProjectSuggestion {
  projectIndex?: number;
  title: string;
  originalDescription: string;
  suggestedDescription: string;
  suggestedHighlights: string[];
  suggestedTechnologies: string[];
  improvementReason: string;
}

export interface IAISkillAnalysis {
  technical: string[];
  frameworks: string[];
  tools: string[];
  databases: string[];
  cloud: string[];
  softSkills: string[];
  duplicateOrRedundant: string[];
  recommendedOrder: string[];
}

export interface IAISeoSuggestion {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  suggestedSlug?: string;
}

export interface IAIComprehensiveAnalysis {
  headline: IAIHeadlineSuggestion;
  summary: IAISummarySuggestion;
  skills: IAISkillAnalysis;
  experienceSuggestions: IAIExperienceSuggestion[];
  projectSuggestions: IAIProjectSuggestion[];
  seo: IAISeoSuggestion;
  warnings: string[];
  detectedSeniority: string;
}

export interface AIStatusResponse {
  isConfigured: boolean;
  provider: string;
  model: string;
}

export interface IAICareerScore {
  portfolioQualityScore: number;
  profileCompletenessScore: number;
  recruiterReadinessScore: number;
  scoreBreakdown: {
    criterion: string;
    score: number;
    maxScore: number;
    explanation: string;
  }[];
  strengths: string[];
  weaknesses: string[];
}

export interface IAISkillGapAnalysis {
  currentSkills: string[];
  missingSkills: string[];
  recommendedSkills: string[];
  targetRoles: string[];
  learningPriorities: {
    skill: string;
    priority: "high" | "medium" | "low";
    rationale: string;
  }[];
}

export interface IAICareerAdvisor {
  careerProfile: {
    category: string;
    seniority: string;
    strengths: string[];
    targetRoleRecommendations: string[];
  };
  careerScore: IAICareerScore;
  skillGap: IAISkillGapAnalysis;
  portfolioAdvisorAdvice: {
    area: string;
    suggestion: string;
    rationale: string;
    impact: string;
  }[];
  actionPlan: string[];
}

