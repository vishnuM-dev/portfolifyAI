export type PortfolioStatus = "draft" | "published";
export type PortfolioTemplate =
  | "minimal-professional"
  | "developer-sidebar"
  | "bento-portfolio"
  | "dark-developer"
  | "corporate-executive"
  | "creative-motion"
  | "project-first"
  | "resume-timeline"
  | "modern-glass"
  | "premium-personal-brand"
  | "professional"
  | "modern"
  | "minimal"
  | "bento"
  | "premium-brand";

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
  id?: string;
  _id?: string;
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
  id?: string;
  _id?: string;
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
  id?: string;
  _id?: string;
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
  id?: string;
  _id?: string;
  name: string;
  issuer: string;
  issueDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface IAdditionalItem {
  id?: string;
  _id?: string;
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
  uploadedAt?: Date | string;
  rawText?: string;
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
  _id?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
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
