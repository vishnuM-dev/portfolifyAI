import MinimalProfessionalTemplate from "./templates/MinimalProfessionalTemplate";
import DeveloperSidebarTemplate from "./templates/DeveloperSidebarTemplate";
import BentoTemplate from "./templates/BentoTemplate";
import DarkDeveloperTemplate from "./templates/DarkDeveloperTemplate";
import CorporateExecutiveTemplate from "./templates/CorporateExecutiveTemplate";
import CreativeMotionTemplate from "./templates/CreativeMotionTemplate";
import ProjectFirstTemplate from "./templates/ProjectFirstTemplate";
import ResumeTimelineTemplate from "./templates/ResumeTimelineTemplate";
import ModernGlassTemplate from "./templates/ModernGlassTemplate";
import PremiumBrandTemplate from "./templates/PremiumBrandTemplate";
import ProfessionalTemplate from "@/components/templates/ProfessionalTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import { ITemplateMetadata, PortfolioTemplate } from "./types";

export const TEMPLATE_REGISTRY: ITemplateMetadata[] = [
  {
    id: "minimal",
    name: "Minimal Professional",
    subtitle: "Understated elegance and clean typography",
    description: "A refined, distraction-free aesthetic with generous whitespace and clear hierarchy. Perfect for writers, consultants, and senior engineers.",
    category: "minimal",
    tags: ["Clean", "Typography", "Editorial", "Fast"],
    recommendedFor: ["Software Engineers", "Consultants", "Writers", "Product Managers"],
    features: ["Distraction-free layout", "High readability contrast", "Compact skills overview", "Fast rendering"],
    accentColor: "#D47A41",
    component: MinimalProfessionalTemplate,
  },
  {
    id: "developer-sidebar",
    name: "Developer Sidebar",
    subtitle: "Two-column technical portfolio with fixed navigation",
    description: "Sticky developer bio on the left with scrolling interactive project logs and experience timeline on the right. Built for builders.",
    category: "developer",
    tags: ["Sidebar", "Technical", "Terminal", "Modern"],
    recommendedFor: ["Full Stack Developers", "Backend Engineers", "DevOps", "Open Source Authors"],
    features: ["Sticky desktop sidebar", "Monospace accents", "Direct repository links", "Status badge indicator"],
    accentColor: "#38BDF8",
    component: DeveloperSidebarTemplate,
  },
  {
    id: "bento",
    name: "Bento Portfolio",
    subtitle: "Modern asymmetric grid inspired by Apple & linear design",
    description: "Interactive visual blocks showcasing your skills, career history, social channels, and top projects in a dynamic bento matrix.",
    category: "creative",
    tags: ["Bento Grid", "Modern", "Interactive", "Trendy"],
    recommendedFor: ["Product Designers", "Frontend Developers", "Design Engineers", "Founders"],
    features: ["Asymmetric bento cards", "Highlight stat boxes", "Interactive project tiles", "Social connect hub"],
    accentColor: "#DE8638",
    component: BentoTemplate,
  },
  {
    id: "dark-developer",
    name: "Dark Developer",
    subtitle: "High-contrast terminal aesthetic with cyber accents",
    description: "Sleek slate-dark theme with code prompt headers, git repository tags, and neon status badges for modern software developers.",
    category: "developer",
    tags: ["Dark Mode", "Terminal", "CLI Style", "Cyber"],
    recommendedFor: ["Systems Engineers", "Security Engineers", "Web3 Developers", "Full Stack Pros"],
    features: ["Terminal window header", "Neon badge highlights", "Code snippet look", "High-contrast dark mode"],
    accentColor: "#10B981",
    component: DarkDeveloperTemplate,
  },
  {
    id: "corporate-executive",
    name: "Corporate Executive",
    subtitle: "Distinguished leadership layout for directors and managers",
    description: "Navy blue executive banner with career milestones, board certifications, and strategic initiatives designed for senior management.",
    category: "executive",
    tags: ["Executive", "Corporate", "Leadership", "Trustworthy"],
    recommendedFor: ["VP of Engineering", "Engineering Managers", "CTOs", "Product Directors"],
    features: ["Executive hero banner", "Strategic case studies", "Leadership timeline", "Board certification showcase"],
    accentColor: "#3B82F6",
    component: CorporateExecutiveTemplate,
  },
  {
    id: "creative-motion",
    name: "Creative Motion",
    subtitle: "Vibrant expressive design with modern aura gradients",
    description: "Playful modern aesthetic with vibrant gradient badges, floating cards, and micro-hover interactions for creative technologists.",
    category: "creative",
    tags: ["Creative", "Vibrant", "Gradient", "Expressive"],
    recommendedFor: ["UI/UX Designers", "Creative Developers", "Motion Designers", "Indie Hackers"],
    features: ["Aura gradient accents", "Pill tag clouds", "Card hover states", "Expressive typography"],
    accentColor: "#F43F5E",
    component: CreativeMotionTemplate,
  },
  {
    id: "project-first",
    name: "Project First",
    subtitle: "Product-centric portfolio leading with featured case studies",
    description: "Showcases in-depth builds and architecture right beneath the hero header. Ideal for engineers with rich portfolios.",
    category: "developer",
    tags: ["Case Studies", "Projects", "Engineering", "In-depth"],
    recommendedFor: ["Full Stack Engineers", "Mobile Developers", "Freelancers", "Solutions Architects"],
    features: ["Dominant project cards", "Direct demo buttons", "Detailed tech breakdowns", "Case-study focus"],
    accentColor: "#D97706",
    component: ProjectFirstTemplate,
  },
  {
    id: "resume-timeline",
    name: "Resume Timeline",
    subtitle: "Chronological vertical career & education timeline",
    description: "An elegant connected vertical timeline highlighting progressive promotions, education degrees, and career milestones.",
    category: "minimal",
    tags: ["Timeline", "Chronological", "ATS Friendly", "Career Track"],
    recommendedFor: ["Career Changers", "Senior Engineers", "Data Scientists", "Researchers"],
    features: ["Connected vertical node line", "Chronological history", "Promotion indicators", "Structured summary"],
    accentColor: "#D47A41",
    component: ResumeTimelineTemplate,
  },
  {
    id: "modern-glass",
    name: "Modern Glass",
    subtitle: "Ethereal glassmorphism with backdrop blur and glowing orbs",
    description: "Translucent frosted glass cards over deep purple gradient backdrop with floating blur highlights.",
    category: "creative",
    tags: ["Glassmorphism", "Blur", "Gradients", "Luxury"],
    recommendedFor: ["Frontend Masters", "AI Researchers", "Design Technologists", "Startups"],
    features: ["Frosted glass cards", "Backdrop blur filters", "Glow aura gradients", "Translucent badges"],
    accentColor: "#C084FC",
    component: ModernGlassTemplate,
  },
  {
    id: "premium-brand",
    name: "Premium Personal Brand",
    subtitle: "Luxury monograph editorial for distinguished creators",
    description: "Warm charcoal serif typography with golden bronze accents and editorial layout inspired by high-end design monographs.",
    category: "executive",
    tags: ["Luxury", "Editorial", "Monograph", "Serif"],
    recommendedFor: ["Design Leaders", "Thought Leaders", "Architects", "Executive Consultants"],
    features: ["Editorial serif typography", "Gold bronze highlights", "Narrative pillars", "Executive brand presence"],
    accentColor: "#C5A880",
    component: PremiumBrandTemplate,
  },
];

/**
 * Resolve template component by template ID with fallback
 */
export function getTemplateComponent(templateId: string) {
  // Legacy aliases
  if (templateId === "professional") return ProfessionalTemplate;
  if (templateId === "modern") return ModernTemplate;

  const found = TEMPLATE_REGISTRY.find((t) => t.id === templateId);
  return found?.component || MinimalProfessionalTemplate;
}

/**
 * Get template metadata by ID
 */
export function getTemplateMetadata(templateId: string): ITemplateMetadata {
  const found = TEMPLATE_REGISTRY.find((t) => t.id === templateId);
  if (found) return found;
  return TEMPLATE_REGISTRY[0];
}
