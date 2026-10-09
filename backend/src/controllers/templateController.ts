import { Request, Response } from "express";

export interface ITemplateInfo {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: "developer" | "designer" | "executive" | "academic" | "minimal" | "all";
  tags: string[];
  recommendedFor: string[];
  features: string[];
  accentColor: string;
  previewThumbnail?: string;
}

export const TEMPLATES_CATALOG: ITemplateInfo[] = [
  {
    id: "minimal-portfolio",
    name: "Minimal Portfolio",
    subtitle: "Understated elegance and clean typography",
    description: "A refined, distraction-free aesthetic with generous whitespace and clear hierarchy. Perfect for writers, consultants, and senior engineers.",
    category: "minimal",
    tags: ["Clean", "Typography", "Editorial", "Fast"],
    recommendedFor: ["Software Engineers", "Consultants", "Writers", "Product Managers"],
    features: ["Distraction-free layout", "High readability contrast", "Compact skills overview", "Fast rendering"],
    accentColor: "#D47A41",
  },
  {
    id: "modern-developer",
    name: "Modern Developer",
    subtitle: "Two-column technical portfolio with fixed navigation",
    description: "Sticky developer bio on the left with scrolling interactive project logs and experience timeline on the right. Built for builders.",
    category: "developer",
    tags: ["Sidebar", "Technical", "Terminal", "Modern"],
    recommendedFor: ["Full Stack Developers", "Backend Engineers", "DevOps", "Open Source Authors"],
    features: ["Sticky desktop sidebar", "Monospace accents", "Direct repository links", "Status badge indicator"],
    accentColor: "#38BDF8",
  },
  {
    id: "dark-premium",
    name: "Dark Premium",
    subtitle: "High-contrast terminal aesthetic with cyber accents",
    description: "Sleek slate-dark theme with code prompt headers, git repository tags, and neon status badges for modern software developers.",
    category: "developer",
    tags: ["Dark Mode", "Terminal", "CLI Style", "Cyber"],
    recommendedFor: ["Systems Engineers", "Security Engineers", "Web3 Developers", "Full Stack Pros"],
    features: ["Terminal window header", "Neon badge highlights", "Code snippet look", "High-contrast dark mode"],
    accentColor: "#10B981",
  },
  {
    id: "fullstack-developer",
    name: "Full-Stack Developer",
    subtitle: "Systems architecture with frontend, backend & cloud breakdown",
    description: "Multi-layered technical portfolio showing end-to-end architecture diagrams, API schemas, and deployment infrastructure.",
    category: "developer",
    tags: ["Full-Stack", "Architecture", "Microservices", "Cloud"],
    recommendedFor: ["Full-Stack Engineers", "Lead Engineers", "Solutions Architects"],
    features: ["Frontend & Backend stack breakdown", "System architecture badges", "Live demo metrics"],
    accentColor: "#6366F1",
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
  },
  {
    id: "professional-resume",
    name: "Professional Resume",
    subtitle: "Structured chronological vertical career & education timeline",
    description: "An elegant connected vertical timeline highlighting progressive promotions, education degrees, and career milestones.",
    category: "minimal",
    tags: ["Timeline", "Chronological", "ATS Friendly", "Career Track"],
    recommendedFor: ["Career Changers", "Senior Engineers", "Data Scientists", "Researchers"],
    features: ["Connected vertical node line", "Chronological history", "Promotion indicators"],
    accentColor: "#D47A41",
  },
  {
    id: "creative-designer",
    name: "Creative Designer",
    subtitle: "Vibrant expressive design with modern aura gradients",
    description: "Playful modern aesthetic with vibrant gradient badges, floating cards, and micro-hover interactions for creative technologists.",
    category: "designer",
    tags: ["Creative", "Vibrant", "Gradient", "Expressive"],
    recommendedFor: ["UI/UX Designers", "Creative Developers", "Motion Designers", "Art Directors"],
    features: ["Aura gradient accents", "Pill tag clouds", "Card hover states"],
    accentColor: "#F43F5E",
  },
  {
    id: "uiux-designer",
    name: "UI/UX Designer",
    subtitle: "In-depth design case studies with user research & wireframes",
    description: "Structured design process portfolio highlighting user personas, wireframing decisions, prototype links, and Figma artifacts.",
    category: "designer",
    tags: ["UI/UX", "Case Studies", "Figma", "Research"],
    recommendedFor: ["UI/UX Designers", "Product Designers", "User Researchers"],
    features: ["Problem-Solution-Impact breakdown", "User flow badges", "Figma project links"],
    accentColor: "#8B5CF6",
  },
  {
    id: "student-fresher",
    name: "Student & Fresher",
    subtitle: "Growth-focused showcase for graduates and early-career talent",
    description: "Highlights academic degree, coursework highlights, hackathons, university clubs, and early open-source builds.",
    category: "academic",
    tags: ["Fresher", "Graduate", "Student", "Hackathon"],
    recommendedFor: ["College Students", "New Grads", "Bootcamp Graduates", "Interns"],
    features: ["GPA & Academic highlights", "Coursework badge cloud", "Hackathon achievement cards"],
    accentColor: "#0EA5E9",
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
  },
  {
    id: "freelancer-portfolio",
    name: "Freelancer Portfolio",
    subtitle: "Client-converting portfolio with availability status and service packages",
    description: "Conversion-optimized layout with 'Open to Projects' indicator, service offerings, client reviews, and direct hire CTA.",
    category: "minimal",
    tags: ["Freelance", "Contract", "Services", "Hire Me"],
    recommendedFor: ["Independent Contractors", "Freelancers", "Consultants", "Agencies"],
    features: ["Availability status badge", "Service offering cards", "Direct contact CTA"],
    accentColor: "#F59E0B",
  },
  {
    id: "executive-portfolio",
    name: "Executive Portfolio",
    subtitle: "Distinguished leadership layout for directors and managers",
    description: "Navy blue executive banner with career milestones, board certifications, and strategic initiatives designed for senior management.",
    category: "executive",
    tags: ["Executive", "Corporate", "Leadership", "Trustworthy"],
    recommendedFor: ["VP of Engineering", "Engineering Managers", "CTOs", "Product Directors"],
    features: ["Executive hero banner", "Strategic case studies", "Leadership timeline"],
    accentColor: "#1E3A8A",
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
  },
  {
    id: "grid-based",
    name: "Grid-Based Portfolio",
    subtitle: "Modern asymmetric grid inspired by Apple & Linear design",
    description: "Interactive visual blocks showcasing your skills, career history, social channels, and top projects in a dynamic bento matrix.",
    category: "designer",
    tags: ["Bento Grid", "Modern", "Interactive", "Trendy"],
    recommendedFor: ["Product Designers", "Frontend Developers", "Design Engineers", "Founders"],
    features: ["Asymmetric bento cards", "Highlight stat boxes", "Interactive project tiles"],
    accentColor: "#DE8638",
  },
  {
    id: "case-study",
    name: "Case Study Portfolio",
    subtitle: "Product-centric portfolio leading with featured case studies",
    description: "Showcases in-depth builds and architecture right beneath the hero header. Ideal for engineers with rich portfolios.",
    category: "developer",
    tags: ["Case Studies", "Projects", "Engineering", "In-depth"],
    recommendedFor: ["Full Stack Engineers", "Mobile Developers", "Freelancers", "Solutions Architects"],
    features: ["Dominant project cards", "Direct demo buttons", "Detailed tech breakdowns"],
    accentColor: "#D97706",
  },
  {
    id: "elegant-classic",
    name: "Elegant Classic",
    subtitle: "Warm parchment editorial with serif typography and golden accents",
    description: "Timeless warmth inspired by classic design monographs with refined typography, golden bronze highlights, and quiet prestige.",
    category: "executive",
    tags: ["Classic", "Serif", "Editorial", "Timeless"],
    recommendedFor: ["Design Leaders", "Thought Leaders", "Architects", "Executive Consultants"],
    features: ["Editorial serif typography", "Gold bronze highlights", "Narrative pillars"],
    accentColor: "#C5A880",
  },
  {
    id: "premium-professional",
    name: "Premium Professional",
    subtitle: "Ethereal glassmorphism with backdrop blur and glowing accents",
    description: "Translucent frosted glass cards over rich dark gradient backdrop with luminous aura highlights and executive polish.",
    category: "designer",
    tags: ["Glassmorphism", "Blur", "Gradients", "Luxury"],
    recommendedFor: ["Frontend Masters", "AI Researchers", "Design Technologists", "Startups"],
    features: ["Frosted glass cards", "Backdrop blur filters", "Glow aura gradients"],
    accentColor: "#C084FC",
  },
];

export class TemplateController {
  static getAll(_req: Request, res: Response): void {
    res.status(200).json({
      success: true,
      count: TEMPLATES_CATALOG.length,
      templates: TEMPLATES_CATALOG,
    });
  }

  static getById(req: Request, res: Response): void {
    const { id } = req.params;
    const template = TEMPLATES_CATALOG.find(
      (t) => t.id === id || t.id === id.toLowerCase()
    );

    if (!template) {
      res.status(404).json({
        success: false,
        message: `Template with ID '${id}' not found.`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      template,
    });
  }
}

export default TemplateController;
