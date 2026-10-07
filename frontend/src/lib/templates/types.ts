import React from "react";
import { IPortfolio, PortfolioTemplate } from "@/types/portfolio";

export type { PortfolioTemplate };
export type TemplateCategory = "developer" | "executive" | "creative" | "minimal" | "all";

export interface ITemplateMetadata {
  id: PortfolioTemplate;
  name: string;
  subtitle: string;
  description: string;
  category: TemplateCategory;
  tags: string[];
  recommendedFor: string[];
  features: string[];
  accentColor: string;
  previewThumbnail?: string;
  component: React.ComponentType<{ portfolio: IPortfolio; isPreview?: boolean }>;
}

export interface ITemplateRecommendation {
  templateId: PortfolioTemplate;
  reason: string;
  confidenceScore: number;
}
