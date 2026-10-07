import mongoose, { Schema, Model, Document } from "mongoose";
import { IPortfolio } from "../types/portfolio";

export interface IPortfolioDocument extends Omit<IPortfolio, "_id" | "userId">, Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
}

const ExperienceSchema = new Schema(
  {
    company: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    location: { type: String, default: "", trim: true },
    startDate: { type: String, default: "", trim: true },
    endDate: { type: String, default: "", trim: true },
    currentlyWorking: { type: Boolean, default: false },
    description: { type: String, default: "", trim: true },
    responsibilities: { type: [String], default: [] },
    achievements: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
  },
  { _id: true }
);

const EducationSchema = new Schema(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    fieldOfStudy: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    startDate: { type: String, default: "", trim: true },
    endDate: { type: String, default: "", trim: true },
    grade: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
  },
  { _id: true }
);

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    technologies: { type: [String], default: [] },
    githubUrl: { type: String, default: "", trim: true },
    liveUrl: { type: String, default: "", trim: true },
    image: { type: String, default: "", trim: true },
    category: { type: String, default: "", trim: true },
    role: { type: String, default: "", trim: true },
    features: { type: [String], default: [] },
    startDate: { type: String, default: "", trim: true },
    endDate: { type: String, default: "", trim: true },
  },
  { _id: true }
);

const CertificationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    issueDate: { type: String, default: "", trim: true },
    credentialId: { type: String, default: "", trim: true },
    credentialUrl: { type: String, default: "", trim: true },
  },
  { _id: true }
);

const AdditionalItemSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    date: { type: String, default: "", trim: true },
    url: { type: String, default: "", trim: true },
    category: { type: String, default: "general", trim: true }, // languages, volunteer, publications, awards, services, testimonials
  },
  { _id: true }
);

const PortfolioSchema = new Schema<IPortfolioDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Portfolio must belong to a user"],
      index: true,
    },
    slug: {
      type: String,
      required: [true, "Portfolio slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    template: {
      type: String,
      enum: [
        "minimal-professional",
        "developer-sidebar",
        "bento-portfolio",
        "dark-developer",
        "corporate-executive",
        "creative-motion",
        "project-first",
        "resume-timeline",
        "modern-glass",
        "premium-personal-brand",
        // Aliases for backwards compatibility
        "professional",
        "modern",
        "minimal",
        "bento",
        "premium-brand",
      ],
      default: "minimal-professional",
    },
    profile: {
      name: { type: String, default: "", trim: true },
      headline: { type: String, default: "", trim: true },
      professionalSummary: { type: String, default: "", trim: true },
      email: { type: String, default: "", trim: true },
      phone: { type: String, default: "", trim: true },
      location: { type: String, default: "", trim: true },
      profileImage: { type: String, default: "", trim: true },
      website: { type: String, default: "", trim: true },
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: {
      type: [ExperienceSchema],
      default: [],
    },
    education: {
      type: [EducationSchema],
      default: [],
    },
    projects: {
      type: [ProjectSchema],
      default: [],
    },
    certifications: {
      type: [CertificationSchema],
      default: [],
    },
    customSections: {
      type: [AdditionalItemSchema],
      default: [],
    },
    sectionVisibility: {
      profile: { type: Boolean, default: true },
      skills: { type: Boolean, default: true },
      experience: { type: Boolean, default: true },
      education: { type: Boolean, default: true },
      projects: { type: Boolean, default: true },
      certifications: { type: Boolean, default: true },
      customSections: { type: Boolean, default: true },
      contact: { type: Boolean, default: true },
    },
    socialLinks: {
      github: { type: String, default: "", trim: true },
      linkedin: { type: String, default: "", trim: true },
      twitter: { type: String, default: "", trim: true },
      instagram: { type: String, default: "", trim: true },
      website: { type: String, default: "", trim: true },
    },
    resume: {
      fileName: { type: String, default: "" },
      fileType: { type: String, default: "" },
      fileSize: { type: Number, default: 0 },
      uploadedAt: { type: Date },
      rawText: { type: String, default: "" },
    },
    settings: {
      theme: { type: String, enum: ["light", "dark", "auto"], default: "auto" },
      accentColor: { type: String, default: "teal" },
      primaryColor: { type: String, default: "#2D5D60" },
      font: { type: String, default: "inter" },
      density: { type: String, enum: ["compact", "comfortable", "spacious"], default: "comfortable" },
      animation: { type: String, enum: ["none", "subtle", "standard"], default: "standard" },
      customDomain: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio: Model<IPortfolioDocument> =
  mongoose.models.Portfolio ||
  mongoose.model<IPortfolioDocument>("Portfolio", PortfolioSchema);

export default Portfolio;
