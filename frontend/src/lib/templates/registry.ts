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
import FullstackDeveloperTemplate from "./templates/FullstackDeveloperTemplate";
import FrontendDeveloperTemplate from "./templates/FrontendDeveloperTemplate";
import BackendDeveloperTemplate from "./templates/BackendDeveloperTemplate";
import UiUxDesignerTemplate from "./templates/UiUxDesignerTemplate";
import StudentFresherTemplate from "./templates/StudentFresherTemplate";
import SoftwareEngineerTemplate from "./templates/SoftwareEngineerTemplate";
import FreelancerPortfolioTemplate from "./templates/FreelancerPortfolioTemplate";
import AcademicPortfolioTemplate from "./templates/AcademicPortfolioTemplate";
import StartupFounderTemplate from "./templates/StartupFounderTemplate";
import MonochromePortfolioTemplate from "./templates/MonochromePortfolioTemplate";

import ProfessionalTemplate from "@/components/templates/ProfessionalTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import { ITemplateMetadata, PortfolioTemplate } from "./types";

export const TEMPLATE_REGISTRY: ITemplateMetadata[] = [
  {
    id: "minimal-professional",
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
    id: "fullstack-developer",
    name: "Fullstack Developer",
    subtitle: "Systems architecture with frontend, backend & cloud breakdown",
    description: "Multi-layered technical portfolio showing end-to-end architecture diagrams, API schemas, and deployment infrastructure.",
    category: "developer",
    tags: ["Full-Stack", "Architecture", "Microservices", "Cloud"],
    recommendedFor: ["Full-Stack Engineers", "Lead Engineers", "Solutions Architects"],
    features: ["Frontend & Backend stack breakdown", "System architecture badges", "Live demo metrics"],
    accentColor: "#6366F1",
    component: FullstackDeveloperTemplate,
  },
  {
    id: "frontend-developer",
    name: "Frontend Developer",
    subtitle: "Interactive UI showcase with dynamic design engineering",
    description: "Visual and component-centric portfolio with device frame previews, micro-animations, and CSS design tokens.",
    category: "developer",
    tags: ["Frontend", "UI/UX", "Interactive", "Animations"],
    recommendedFor: ["Frontend Engineers", "Design Technologists", "Web Developers"],
    features: ["Interactive component frames", "Dynamic gradients", "Visual device mockups"],
    accentColor: "#EC4899",
    component: FrontendDeveloperTemplate,
  },
  {
    id: "backend-developer",
    name: "Backend Developer",
    subtitle: "Reliability-first terminal layout with API benchmarks",
    description: "CLI-style console showcasing database structures, microservice throughput, uptime records, and REST/GraphQL specs.",
    category: "developer",
    tags: ["Backend", "APIs", "Database", "Terminal"],
    recommendedFor: ["Backend Engineers", "Database Administrators", "DevOps Engineers"],
    features: ["CLI console prompt", "API endpoint cards", "System latency metrics"],
    accentColor: "#059669",
    component: BackendDeveloperTemplate,
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
    id: "creative-motion",
    name: "Creative Motion",
    subtitle: "Vibrant expressive design with modern aura gradients",
    description: "Playful modern aesthetic with vibrant gradient badges, floating cards, and micro-hover interactions for creative technologists.",
    category: "creative",
    tags: ["Creative", "Vibrant", "Gradient", "Expressive"],
    recommendedFor: ["UI/UX Designers", "Creative Developers", "Motion Designers", "Art Directors"],
    features: ["Aura gradient accents", "Pill tag clouds", "Card hover states", "Expressive typography"],
    accentColor: "#F43F5E",
    component: CreativeMotionTemplate,
  },
  {
    id: "uiux-designer",
    name: "UI/UX Designer",
    subtitle: "Structured case studies with user research & prototype links",
    description: "Design process portfolio highlighting problem statement, design solutions, user personas, and Figma links.",
    category: "designer",
    tags: ["UI/UX", "Case Studies", "Figma", "Research"],
    recommendedFor: ["UI/UX Designers", "Product Designers", "User Researchers"],
    features: ["Problem-Solution-Impact breakdown", "User flow badges", "Figma project links"],
    accentColor: "#8B5CF6",
    component: UiUxDesignerTemplate,
  },
  {
    id: "student-fresher",
    name: "Student Fresher",
    subtitle: "Growth-focused showcase for graduates and early-career talent",
    description: "Highlights academic degree, coursework highlights, hackathons, university clubs, and early open-source builds.",
    category: "academic",
    tags: ["Fresher", "Graduate", "Student", "Hackathon"],
    recommendedFor: ["College Students", "New Grads", "Bootcamp Graduates", "Interns"],
    features: ["GPA & Academic highlights", "Coursework badge cloud", "Hackathon achievement cards"],
    accentColor: "#0EA5E9",
    component: StudentFresherTemplate,
  },
  {
    id: "software-engineer",
    name: "Software Engineer",
    subtitle: "Algorithmic craftsmanship with clean software engineering principles",
    description: "Balanced, high-clarity layout emphasizing systems design, algorithmic efficiency, test coverage, and code quality.",
    category: "developer",
    tags: ["Software Engineering", "Algorithms", "Clean Code", "Systems"],
    recommendedFor: ["Software Engineers", "Backend Specialists", "Systems Programmers"],
    features: ["Code quality metrics", "GitHub repository links", "Tech stack radar"],
    accentColor: "#2563EB",
    component: SoftwareEngineerTemplate,
  },
  {
    id: "freelancer-portfolio",
    name: "Freelancer Portfolio",
    subtitle: "Conversion-optimized with availability status and service packages",
    description: "Client-converting portfolio with 'Open to Projects' indicator, service offerings, client reviews, and direct hire CTA.",
    category: "minimal",
    tags: ["Freelance", "Contract", "Services", "Hire Me"],
    recommendedFor: ["Independent Contractors", "Freelancers", "Consultants", "Agencies"],
    features: ["Availability status badge", "Service offering cards", "Direct contact CTA"],
    accentColor: "#F59E0B",
    component: FreelancerPortfolioTemplate,
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
    accentColor: "#1E3A8A",
    component: CorporateExecutiveTemplate,
  },
  {
    id: "academic-portfolio",
    name: "Academic Portfolio",
    subtitle: "Scholarly research layout for professors, PhDs and fellows",
    description: "Distinguished serif typography tailored for research interests, publication listings, citations, grants, and conference talks.",
    category: "academic",
    tags: ["Academic", "Research", "Publications", "Scholarly"],
    recommendedFor: ["Professors", "PhD Candidates", "Postdoc Fellows", "Scientists"],
    features: ["Research interest pillars", "Publication lists with DOI links", "Grant & award tracking"],
    accentColor: "#475569",
    component: AcademicPortfolioTemplate,
  },
  {
    id: "startup-founder",
    name: "Startup Founder",
    subtitle: "Vision-driven pitch portfolio highlighting ventures and traction",
    description: "Pitch-ready format with mission statement, ventures founded, key growth metrics, press coverage, and investor connect.",
    category: "executive",
    tags: ["Founder", "Startup", "Pitch", "Venture"],
    recommendedFor: ["Startup Founders", "Co-Founders", "Tech Entrepreneurs", "Incubators"],
    features: ["Venture portfolio grid", "Traction & growth stats", "AngelList & Twitter integration"],
    accentColor: "#E11D48",
    component: StartupFounderTemplate,
  },
  {
    id: "monochrome-portfolio",
    name: "Monochrome Portfolio",
    subtitle: "Stark Swiss brutalism with high-contrast black & white layout",
    description: "Minimalist editorial design inspired by Swiss typography, stark monochrome borders, and uncompromising typographic clarity.",
    category: "minimal",
    tags: ["Monochrome", "Swiss Design", "Brutalist", "High Contrast"],
    recommendedFor: ["Architects", "Minimalist Developers", "Designers", "Writers"],
    features: ["High-contrast pure monochrome", "Brutalist grid lines", "Structured typography"],
    accentColor: "#171717",
    component: MonochromePortfolioTemplate,
  },
  {
    id: "bento",
    name: "Bento",
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
    id: "premium-brand",
    name: "Premium Brand",
    subtitle: "Luxury monograph editorial for distinguished creators",
    description: "Warm charcoal serif typography with golden bronze accents and editorial layout inspired by high-end design monographs.",
    category: "executive",
    tags: ["Luxury", "Editorial", "Monograph", "Serif"],
    recommendedFor: ["Design Leaders", "Thought Leaders", "Architects", "Executive Consultants"],
    features: ["Editorial serif typography", "Gold bronze highlights", "Narrative pillars", "Executive brand presence"],
    accentColor: "#C5A880",
    component: PremiumBrandTemplate,
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
];

/**
 * Normalizes any template ID or alias to its primary template ID in TEMPLATE_REGISTRY
 */
export function normalizeTemplateId(templateId: string): string {
  const map: Record<string, string> = {
    // Legacy / alias mappings to template file IDs
    "minimal-portfolio": "minimal-professional",
    minimal: "minimal-professional",
    "minimal-professional": "minimal-professional",

    "modern-developer": "developer-sidebar",
    modern: "developer-sidebar",
    "developer-sidebar": "developer-sidebar",

    "dark-premium": "dark-developer",
    "dark-developer": "dark-developer",

    "grid-based": "bento",
    "bento-portfolio": "bento",
    bento: "bento",

    "executive-portfolio": "corporate-executive",
    "corporate-executive": "corporate-executive",

    "creative-designer": "creative-motion",
    "creative-motion": "creative-motion",

    "case-study": "project-first",
    "project-first": "project-first",

    "professional-resume": "resume-timeline",
    professional: "resume-timeline",
    "resume-timeline": "resume-timeline",

    "premium-professional": "modern-glass",
    "modern-glass": "modern-glass",

    "elegant-classic": "premium-brand",
    "premium-personal-brand": "premium-brand",
    "premium-brand": "premium-brand",
  };

  return map[templateId] || templateId;
}

/**
 * Resolve template component by template ID with alias mapping and fallback
 */
export function getTemplateComponent(templateId: string) {
  // Legacy aliases
  if (templateId === "professional") return ProfessionalTemplate;
  if (templateId === "modern") return ModernTemplate;
  if (templateId === "minimal") return MinimalTemplate;

  const normalized = normalizeTemplateId(templateId);
  const found = TEMPLATE_REGISTRY.find((t) => t.id === normalized || t.id === templateId);
  return found?.component || MinimalProfessionalTemplate;
}

/**
 * Get template metadata by ID
 */
export function getTemplateMetadata(templateId: string): ITemplateMetadata {
  const normalized = normalizeTemplateId(templateId);
  const found = TEMPLATE_REGISTRY.find((t) => t.id === normalized || t.id === templateId);
  if (found) return found;
  return TEMPLATE_REGISTRY[0];
}
