import { IPortfolio, PortfolioTemplate } from "@/types/portfolio";
import { ITemplateRecommendation, TemplateCategory } from "./types";
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
  const educationCount = portfolio.education?.length || 0;

  // 1. Executive / Manager / Lead / Director -> Executive Portfolio
  const hasExecTerms = ["director", "lead", "manager", "vp", "head of", "principal", "chief", "executive", "architect", "founder", "ceo", "cto"].some(
    (t) => headline.includes(t) || summary.includes(t)
  );

  // 2. Creative / UI / UX / Product Design -> UI/UX Designer or Creative Designer
  const hasDesignTerms = ["designer", "ui/ux", "product design", "creative", "motion", "art director", "figma", "brand"].some(
    (t) => headline.includes(t) || summary.includes(t) || skills.some((s) => s.includes(t))
  );

  // 3. Full-Stack / Systems -> Full-Stack Developer
  const hasFullStackTerms = ["fullstack", "full stack", "full-stack", "mern", "mean"].some(
    (t) => headline.includes(t) || summary.includes(t) || skills.some((s) => s.includes(t))
  );

  // 4. Backend / DevOps / Cloud -> Backend Developer or Dark Premium
  const hasBackendTerms = ["backend", "database", "devops", "cloud", "aws", "docker", "kubernetes", "microservices", "golang", "rust", "distributed"].some(
    (t) => headline.includes(t) || summary.includes(t) || skills.some((s) => s.includes(t))
  );

  // 5. Frontend / Web UI -> Frontend Developer
  const hasFrontendTerms = ["frontend", "front-end", "front end", "react", "next.js", "vue", "tailwind", "css", "web developer"].some(
    (t) => headline.includes(t) || summary.includes(t) || skills.some((s) => s.includes(t))
  );

  // 6. Student / Fresher -> Student & Fresher
  const hasStudentTerms = ["student", "fresher", "intern", "graduate", "junior", "aspiring", "university", "college"].some(
    (t) => headline.includes(t) || summary.includes(t)
  );

  // 7. Academic / Researcher -> Academic Portfolio
  const hasAcademicTerms = ["phd", "researcher", "professor", "postdoc", "scientist", "fellow", "academic", "scholar"].some(
    (t) => headline.includes(t) || summary.includes(t)
  );

  // 8. Freelancer / Consultant -> Freelancer Portfolio
  const hasFreelanceTerms = ["freelance", "freelancer", "consultant", "contractor", "independent"].some(
    (t) => headline.includes(t) || summary.includes(t)
  );

  // Evaluation
  if (hasAcademicTerms) {
    return {
      templateId: "academic-portfolio",
      reason: "Your scholarly and research focus aligns with the distinguished Academic Portfolio monograph layout.",
      confidenceScore: 0.95,
    };
  }

  if (hasStudentTerms && experienceCount <= 1) {
    return {
      templateId: "student-fresher",
      reason: "Your academic coursework, university achievements, and early projects are highlighted best by the Student & Fresher layout.",
      confidenceScore: 0.94,
    };
  }

  if (hasExecTerms && experienceCount >= 3) {
    return {
      templateId: "executive-portfolio",
      reason: "Your high level of seniority and extensive leadership history are highlighted best by the distinguished Executive Portfolio layout.",
      confidenceScore: 0.93,
    };
  }

  if (hasFreelanceTerms) {
    return {
      templateId: "freelancer-portfolio",
      reason: "Conversion-optimized with an 'Open to Projects' availability badge, service packages, and direct client call-to-action.",
      confidenceScore: 0.92,
    };
  }

  if (hasDesignTerms) {
    return {
      templateId: "uiux-designer",
      reason: "Your creative and design-forward background matches the in-depth UI/UX Designer case studies layout.",
      confidenceScore: 0.91,
    };
  }

  if (hasFullStackTerms) {
    return {
      templateId: "fullstack-developer",
      reason: "Your end-to-end expertise is showcased with the Full-Stack Developer frontend, backend, and infrastructure architecture matrix.",
      confidenceScore: 0.91,
    };
  }

  if (hasBackendTerms) {
    return {
      templateId: "backend-developer",
      reason: "Terminal-inspired CLI layout highlighting API endpoints, system throughput, and database architecture.",
      confidenceScore: 0.90,
    };
  }

  if (hasFrontendTerms) {
    return {
      templateId: "frontend-developer",
      reason: "Interactive component showcase with fluid gradient accents and live responsive previews.",
      confidenceScore: 0.90,
    };
  }

  if (projectCount >= 3) {
    return {
      templateId: "case-study",
      reason: `You have ${projectCount} showcased projects. Case Study Portfolio puts your engineering builds front and center.`,
      confidenceScore: 0.88,
    };
  }

  if (experienceCount >= 2) {
    return {
      templateId: "professional-resume",
      reason: "Your progressive roles and achievements flow cleanly through the Professional Resume vertical connected timeline.",
      confidenceScore: 0.86,
    };
  }

  // Default fallback
  return {
    templateId: "minimal-portfolio",
    reason: "Minimal Portfolio offers a clean, elegant foundation with high readability contrast across all career fields.",
    confidenceScore: 0.85,
  };
}

/**
 * Filter templates by category
 */
export function filterTemplatesByCategory(category: string) {
  if (!category || category === "all") return TEMPLATE_REGISTRY;
  return TEMPLATE_REGISTRY.filter((t) => t.category === category);
}
