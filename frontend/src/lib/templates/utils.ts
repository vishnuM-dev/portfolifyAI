import { IPortfolio, PortfolioTemplate } from "@/types/portfolio";
import { ITemplateRecommendation } from "./types";
import { TEMPLATE_REGISTRY } from "./registry";

/**
 * Deterministic template recommendation engine based on portfolio characteristics
 */
export function recommendTemplate(portfolio: IPortfolio): ITemplateRecommendation {
  const headline = (portfolio.profile?.headline || "").toLowerCase();
  const summary = (portfolio.profile?.professionalSummary || "").toLowerCase();
  const skills = (portfolio.skills || []).map((s) => s.toLowerCase());
  const projectCount = portfolio.projects?.length || 0;
  const experienceCount = portfolio.experience?.length || 0;

  // 1. Developer / Backend / DevOps -> Dark Developer or Developer Sidebar
  const hasDevTerms = ["developer", "software engineer", "backend", "full stack", "devops", "cloud", "docker", "kubernetes", "golang", "rust", "python", "node"].some(
    (t) => headline.includes(t) || summary.includes(t) || skills.some((s) => s.includes(t))
  );

  // 2. Executive / Manager / Lead / Director -> Corporate Executive or Premium Brand
  const hasExecTerms = ["director", "lead", "manager", "vp", "head of", "principal", "chief", "executive", "architect"].some(
    (t) => headline.includes(t) || summary.includes(t)
  );

  // 3. Creative / UI / UX / Product Design -> Bento or Creative Motion or Modern Glass
  const hasDesignTerms = ["designer", "ui/ux", "product design", "creative", "frontend", "motion", "art director", "figma"].some(
    (t) => headline.includes(t) || summary.includes(t) || skills.some((s) => s.includes(t))
  );

  // Recommendation evaluation
  if (hasExecTerms && experienceCount >= 3) {
    return {
      templateId: "corporate-executive",
      reason: "Your high level of seniority and extensive career history are highlighted best by the distinguished Corporate Executive layout.",
      confidenceScore: 0.94,
    };
  }

  if (hasDesignTerms) {
    return {
      templateId: "bento",
      reason: "Your creative and design-forward background matches the interactive Bento Portfolio card layout.",
      confidenceScore: 0.92,
    };
  }

  if (projectCount >= 3) {
    return {
      templateId: "project-first",
      reason: `You have ${projectCount} showcased projects. Project First puts your engineering artifacts front and center.`,
      confidenceScore: 0.90,
    };
  }

  if (hasDevTerms) {
    return {
      templateId: "developer-sidebar",
      reason: "Your technical background pairs naturally with the Developer Sidebar's two-column code orientation.",
      confidenceScore: 0.88,
    };
  }

  if (experienceCount >= 2) {
    return {
      templateId: "resume-timeline",
      reason: "Your progression across roles flows cleanly through the Resume Timeline's connected node history.",
      confidenceScore: 0.85,
    };
  }

  // Default fallback
  return {
    templateId: "minimal",
    reason: "Minimal Professional offers a clean, elegant foundation with high readability across all career fields.",
    confidenceScore: 0.82,
  };
}

/**
 * Filter templates by category
 */
export function filterTemplatesByCategory(category: string) {
  if (!category || category === "all") return TEMPLATE_REGISTRY;
  return TEMPLATE_REGISTRY.filter((t) => t.category === category);
}
