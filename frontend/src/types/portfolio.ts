export type PortfolioStatus = "draft" | "published";
export type PortfolioTemplate =
  | "minimal-portfolio"
  | "modern-developer"
  | "dark-premium"
  | "fullstack-developer"
  | "frontend-developer"
  | "backend-developer"
  | "professional-resume"
  | "creative-designer"
  | "uiux-designer"
  | "student-fresher"
  | "software-engineer"
  | "freelancer-portfolio"
  | "executive-portfolio"
  | "academic-portfolio"
  | "startup-founder"
  | "monochrome-portfolio"
  | "grid-based"
  | "case-study"
  | "elegant-classic"
  | "premium-professional"
  // Backwards compatibility aliases
  | "minimal"
  | "minimal-professional"
  | "developer-sidebar"
  | "bento"
  | "bento-portfolio"
  | "dark-developer"
  | "corporate-executive"
  | "creative-motion"
  | "project-first"
  | "resume-timeline"
  | "modern-glass"
  | "premium-brand"
  | "premium-personal-brand"
  | "professional"
  | "modern";

export interface IProfile {
  name: string;
  headline: string;
  professionalSummary: string;
  email: string;
  phone: string;
  location: string;
  profileImage?: string;
  website?: string;
}

export interface IExperience {
  _id?: string;
  id?: string;
  company: string;
  position: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  currentlyWorking?: boolean;
  description?: string;
  responsibilities?: string[];
  achievements?: string[];
  technologies?: string[];
}

export interface IEducation {
  _id?: string;
  id?: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  grade?: string;
  description?: string;
}

export interface IProject {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  category?: string;
  role?: string;
  features?: string[];
  startDate?: string;
  endDate?: string;
}

export interface ICertification {
  _id?: string;
  id?: string;
  name: string;
  issuer: string;
  issueDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface IAdditionalItem {
  _id?: string;
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  url?: string;
  category: "languages" | "volunteer" | "publications" | "awards" | "services" | "testimonials" | "general" | string;
}

export interface ISectionVisibility {
  profile?: boolean;
  skills?: boolean;
  experience?: boolean;
  education?: boolean;
  projects?: boolean;
  certifications?: boolean;
  customSections?: boolean;
  contact?: boolean;
}

export interface ISocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
}

export interface IResumeMeta {
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  uploadedAt?: string;
}

export interface IPortfolioSettings {
  theme?: "light" | "dark" | "auto";
  accentColor?: string;
  primaryColor?: string;
  font?: string;
  density?: "compact" | "comfortable" | "spacious";
  animation?: "none" | "subtle" | "standard";
  customDomain?: string;
}

export interface IPortfolio {
  _id: string;
  userId: string;
  slug: string;
  status: PortfolioStatus;
  template: PortfolioTemplate;
  profile: IProfile;
  skills: string[];
  experience: IExperience[];
  education: IEducation[];
  projects: IProject[];
  certifications: ICertification[];
  customSections?: IAdditionalItem[];
  sectionVisibility?: ISectionVisibility;
  socialLinks: ISocialLinks;
  resume?: IResumeMeta;
  settings?: IPortfolioSettings;
  createdAt: string;
  updatedAt: string;
}

export interface StructuredResumeData {
  profile: Partial<IProfile>;
  skills: string[];
  experience: IExperience[];
  education: IEducation[];
  projects: IProject[];
  certifications: ICertification[];
  socialLinks: ISocialLinks;
}
