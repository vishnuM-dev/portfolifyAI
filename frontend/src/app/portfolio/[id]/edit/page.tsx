"use client";

import React, { Suspense, useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { portfolioApi } from "@/lib/portfolioApi";
import {
  IPortfolio,
  IExperience,
  IEducation,
  IProject,
  ICertification,
  IAdditionalItem,
  ISectionVisibility,
} from "@/types/portfolio";
import {
  ArrowLeft,
  Save,
  Eye,
  Globe,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  User,
  Code2,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Award,
  Sparkles,
  Share2,
  Layout,
  Settings,
  Loader2,
  Copy,
  Check,
  ArrowUp,
  ArrowDown,
  Copy as DuplicateIcon,
  EyeOff,
  Layers,
  Languages,
  BookOpen,
  HeartHandshake,
  Tag,
  Palette,
  ExternalLink,
} from "lucide-react";
import AIAssistantPanel from "@/components/ai/AIAssistantPanel";
import { TEMPLATE_REGISTRY } from "@/lib/templates/registry";

type TabType =
  | "profile"
  | "skills"
  | "experience"
  | "education"
  | "projects"
  | "certifications"
  | "additional"
  | "visibility"
  | "social"
  | "ai"
  | "template"
  | "resume"
  | "settings";

function PortfolioEditorContent() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const portfolioId = params.id as string;

  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error" | "unsaved">("saved");
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [additionalCategory, setAdditionalCategory] = useState<string>("awards");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Authentication check
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  // Load portfolio from API
  const loadPortfolio = useCallback(async () => {
    if (!portfolioId) return;
    try {
      setLoading(true);
      const res = await portfolioApi.getPortfolio(portfolioId);
      const loadedPf = res.data?.portfolio || (res as any).portfolio;
      if (res.success && loadedPf) {
        // Clean legacy dummy default text from fields so only clean placeholders show
        const cleaned: IPortfolio = { ...loadedPf };
        if (cleaned.profile) {
          cleaned.profile = { ...cleaned.profile };
          if (cleaned.profile.name === "My Portfolio" || cleaned.profile.name === "Untitled Portfolio") {
            cleaned.profile.name = "";
          }
          if (cleaned.profile.headline === "Software Professional") {
            cleaned.profile.headline = "";
          }
          if (cleaned.profile.professionalSummary === "Welcome to my interactive professional portfolio.") {
            cleaned.profile.professionalSummary = "";
          }
        }
        if (Array.isArray(cleaned.experience)) {
          cleaned.experience = cleaned.experience.map((exp) => ({
            ...exp,
            company: exp.company === "Company Name" ? "" : exp.company,
            position: exp.position === "Position Title" ? "" : exp.position,
            location: exp.location === "Location / Remote" ? "" : exp.location,
            description: exp.description === "Brief summary of responsibilities and technical accomplishments." ? "" : exp.description,
          }));
        }
        if (Array.isArray(cleaned.education)) {
          cleaned.education = cleaned.education.map((edu) => ({
            ...edu,
            institution: edu.institution === "Institution / University" ? "" : edu.institution,
            degree: edu.degree === "Bachelor of Science" && edu.description?.includes("Human-Computer Interaction") ? "" : edu.degree,
            fieldOfStudy: edu.fieldOfStudy === "Computer Science" && edu.description?.includes("Human-Computer Interaction") ? "" : edu.fieldOfStudy,
            description: edu.description === "Focus on Algorithms, Distributed Systems, and Human-Computer Interaction." ? "" : edu.description,
          }));
        }
        if (Array.isArray(cleaned.projects)) {
          cleaned.projects = cleaned.projects.map((proj) => ({
            ...proj,
            title: proj.title === "Project Title" ? "" : proj.title,
            description: proj.description === "Summary of what the project solves and key technical feats achieved." ? "" : proj.description,
          }));
        }
        if (Array.isArray(cleaned.certifications)) {
          cleaned.certifications = cleaned.certifications.map((cert) => ({
            ...cert,
            name: cert.name === "Certification Name" ? "" : cert.name,
            issuer: cert.issuer === "Issuing Organization (e.g. AWS, Google Cloud)" ? "" : cert.issuer,
          }));
        }
        if (Array.isArray(cleaned.customSections)) {
          cleaned.customSections = cleaned.customSections.map((item) => ({
            ...item,
            title: item.title === "Title / Name" ? "" : item.title,
            subtitle: item.subtitle === "Role or Issuer" ? "" : item.subtitle,
            description: item.description === "Details regarding this achievement, award, or contribution." ? "" : item.description,
          }));
        }
        setPortfolio(cleaned);
      } else {
        setActionError(res.message || "Failed to load portfolio.");
      }
    } catch {
      setActionError("Failed to connect to backend server.");
    } finally {
      setLoading(false);
    }
  }, [portfolioId]);

  useEffect(() => {
    if (user && portfolioId) {
      loadPortfolio();
    }
  }, [user, portfolioId, loadPortfolio]);

  // Manual Save
  const handleSave = async (dataToSave?: Partial<IPortfolio>) => {
    if (!portfolio) return;
    setSaveStatus("saving");
    setActionError(null);

    const payload = dataToSave || portfolio;

    try {
      const res = await portfolioApi.updatePortfolio(portfolio._id, payload);
      const savedPf = res.data?.portfolio || (res as any).portfolio;
      if (res.success && savedPf) {
        setPortfolio(savedPf);
        setSaveStatus("saved");
      } else {
        setSaveStatus("error");
        setActionError(res.message || "Failed to save changes.");
      }
    } catch {
      setSaveStatus("error");
      setActionError("Failed to save changes. Please verify backend connection.");
    }
  };

  // Debounced Autosave on unsaved state
  useEffect(() => {
    if (saveStatus !== "unsaved" || !portfolio) return;

    if (autosaveTimeoutRef.current) {
      clearTimeout(autosaveTimeoutRef.current);
    }

    autosaveTimeoutRef.current = setTimeout(() => {
      handleSave();
    }, 2000);

    return () => {
      if (autosaveTimeoutRef.current) {
        clearTimeout(autosaveTimeoutRef.current);
      }
    };
  }, [portfolio, saveStatus]);

  // Calculate Completeness Score
  const calculateCompleteness = (pf: IPortfolio | null): number => {
    if (!pf) return 0;
    let score = 0;
    if (pf.profile?.name?.trim()) score += 15;
    if (pf.profile?.headline?.trim()) score += 15;
    if (pf.profile?.professionalSummary?.trim()) score += 15;
    if (pf.skills && pf.skills.length >= 3) score += 15;
    if (pf.experience && pf.experience.length >= 1) score += 15;
    if (pf.projects && pf.projects.length >= 1) score += 15;
    if (pf.education && pf.education.length >= 1) score += 5;
    if (pf.socialLinks?.github || pf.socialLinks?.linkedin) score += 5;
    return Math.min(score, 100);
  };

  const completeness = calculateCompleteness(portfolio);

  // Profile Field Change
  const handleProfileChange = (field: string, value: string) => {
    if (!portfolio) return;
    setPortfolio((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        profile: {
          ...prev.profile,
          [field]: value,
        },
      };
    });
    setSaveStatus("unsaved");
  };

  // Social Links Change
  const handleSocialChange = (field: string, value: string) => {
    if (!portfolio) return;
    setPortfolio((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [field]: value,
        },
      };
    });
    setSaveStatus("unsaved");
  };

  // Settings Change
  const handleSettingChange = (field: string, value: any) => {
    if (!portfolio) return;
    setPortfolio((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        settings: {
          ...prev.settings,
          [field]: value,
        },
      };
    });
    setSaveStatus("unsaved");
  };

  // Section Visibility Toggle
  const handleToggleVisibility = (sectionKey: keyof ISectionVisibility) => {
    if (!portfolio) return;
    setPortfolio((prev) => {
      if (!prev) return prev;
      const current = prev.sectionVisibility || {};
      const currentVal = current[sectionKey] !== false; // default true
      return {
        ...prev,
        sectionVisibility: {
          ...current,
          [sectionKey]: !currentVal,
        },
      };
    });
    setSaveStatus("unsaved");
  };

  // Skills Management
  const handleAddSkill = () => {
    if (!newSkill.trim() || !portfolio) return;
    if (portfolio.skills.includes(newSkill.trim())) {
      setNewSkill("");
      return;
    }
    const updatedSkills = [...portfolio.skills, newSkill.trim()];
    setPortfolio((prev) => (prev ? { ...prev, skills: updatedSkills } : prev));
    setNewSkill("");
    setSaveStatus("unsaved");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (!portfolio) return;
    const updatedSkills = portfolio.skills.filter((s) => s !== skillToRemove);
    setPortfolio((prev) => (prev ? { ...prev, skills: updatedSkills } : prev));
    setSaveStatus("unsaved");
  };

  // Generic Reorder & Duplicate Helpers
  const moveItem = <T,>(list: T[], index: number, direction: "up" | "down"): T[] => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return list;
    const next = [...list];
    const [moved] = next.splice(index, 1);
    next.splice(targetIndex, 0, moved);
    return next;
  };

  // Experience Handlers
  const handleAddExperience = () => {
    if (!portfolio) return;
    const newExp: IExperience = {
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      currentlyWorking: true,
      description: "",
      responsibilities: [],
      achievements: [],
      technologies: [],
    };
    setPortfolio((prev) => (prev ? { ...prev, experience: [newExp, ...prev.experience] } : prev));
    setSaveStatus("unsaved");
  };

  const handleUpdateExperience = (index: number, field: keyof IExperience, value: any) => {
    if (!portfolio) return;
    const updated = [...portfolio.experience];
    updated[index] = { ...updated[index], [field]: value };
    setPortfolio((prev) => (prev ? { ...prev, experience: updated } : prev));
    setSaveStatus("unsaved");
  };

  const handleMoveExperience = (index: number, direction: "up" | "down") => {
    if (!portfolio) return;
    const updated = moveItem(portfolio.experience, index, direction);
    setPortfolio((prev) => (prev ? { ...prev, experience: updated } : prev));
    setSaveStatus("unsaved");
  };

  const handleDuplicateExperience = (index: number) => {
    if (!portfolio) return;
    const itemToClone = { ...portfolio.experience[index], company: `${portfolio.experience[index].company} (Copy)` };
    const next = [...portfolio.experience];
    next.splice(index + 1, 0, itemToClone);
    setPortfolio((prev) => (prev ? { ...prev, experience: next } : prev));
    setSaveStatus("unsaved");
  };

  const handleDeleteExperience = (index: number) => {
    if (!portfolio) return;
    const updated = portfolio.experience.filter((_, i) => i !== index);
    setPortfolio((prev) => (prev ? { ...prev, experience: updated } : prev));
    setSaveStatus("unsaved");
  };

  // Education Handlers
  const handleAddEducation = () => {
    if (!portfolio) return;
    const newEdu: IEducation = {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      startDate: "",
      endDate: "",
      grade: "",
      description: "",
    };
    setPortfolio((prev) => (prev ? { ...prev, education: [newEdu, ...prev.education] } : prev));
    setSaveStatus("unsaved");
  };

  const handleUpdateEducation = (index: number, field: keyof IEducation, value: any) => {
    if (!portfolio) return;
    const updated = [...portfolio.education];
    updated[index] = { ...updated[index], [field]: value };
    setPortfolio((prev) => (prev ? { ...prev, education: updated } : prev));
    setSaveStatus("unsaved");
  };

  const handleMoveEducation = (index: number, direction: "up" | "down") => {
    if (!portfolio) return;
    const updated = moveItem(portfolio.education, index, direction);
    setPortfolio((prev) => (prev ? { ...prev, education: updated } : prev));
    setSaveStatus("unsaved");
  };

  const handleDuplicateEducation = (index: number) => {
    if (!portfolio) return;
    const itemToClone = { ...portfolio.education[index], institution: `${portfolio.education[index].institution} (Copy)` };
    const next = [...portfolio.education];
    next.splice(index + 1, 0, itemToClone);
    setPortfolio((prev) => (prev ? { ...prev, education: next } : prev));
    setSaveStatus("unsaved");
  };

  const handleDeleteEducation = (index: number) => {
    if (!portfolio) return;
    const updated = portfolio.education.filter((_, i) => i !== index);
    setPortfolio((prev) => (prev ? { ...prev, education: updated } : prev));
    setSaveStatus("unsaved");
  };

  // Project Handlers
  const handleAddProject = () => {
    if (!portfolio) return;
    const newProj: IProject = {
      title: "",
      description: "",
      technologies: [],
      githubUrl: "",
      liveUrl: "",
      category: "",
      role: "",
      features: [],
      startDate: "",
      endDate: "",
    };
    setPortfolio((prev) => (prev ? { ...prev, projects: [newProj, ...prev.projects] } : prev));
    setSaveStatus("unsaved");
  };

  const handleUpdateProject = (index: number, field: keyof IProject, value: any) => {
    if (!portfolio) return;
    const updated = [...portfolio.projects];
    updated[index] = { ...updated[index], [field]: value };
    setPortfolio((prev) => (prev ? { ...prev, projects: updated } : prev));
    setSaveStatus("unsaved");
  };

  const handleMoveProject = (index: number, direction: "up" | "down") => {
    if (!portfolio) return;
    const updated = moveItem(portfolio.projects, index, direction);
    setPortfolio((prev) => (prev ? { ...prev, projects: updated } : prev));
    setSaveStatus("unsaved");
  };

  const handleDuplicateProject = (index: number) => {
    if (!portfolio) return;
    const itemToClone = { ...portfolio.projects[index], title: `${portfolio.projects[index].title} (Copy)` };
    const next = [...portfolio.projects];
    next.splice(index + 1, 0, itemToClone);
    setPortfolio((prev) => (prev ? { ...prev, projects: next } : prev));
    setSaveStatus("unsaved");
  };

  const handleDeleteProject = (index: number) => {
    if (!portfolio) return;
    const updated = portfolio.projects.filter((_, i) => i !== index);
    setPortfolio((prev) => (prev ? { ...prev, projects: updated } : prev));
    setSaveStatus("unsaved");
  };

  // Certification Handlers
  const handleAddCertification = () => {
    if (!portfolio) return;
    const newCert: ICertification = {
      name: "",
      issuer: "",
      issueDate: "",
      credentialId: "",
      credentialUrl: "",
    };
    setPortfolio((prev) => (prev ? { ...prev, certifications: [newCert, ...prev.certifications] } : prev));
    setSaveStatus("unsaved");
  };

  const handleUpdateCertification = (index: number, field: keyof ICertification, value: any) => {
    if (!portfolio) return;
    const updated = [...portfolio.certifications];
    updated[index] = { ...updated[index], [field]: value };
    setPortfolio((prev) => (prev ? { ...prev, certifications: updated } : prev));
    setSaveStatus("unsaved");
  };

  const handleMoveCertification = (index: number, direction: "up" | "down") => {
    if (!portfolio) return;
    const updated = moveItem(portfolio.certifications, index, direction);
    setPortfolio((prev) => (prev ? { ...prev, certifications: updated } : prev));
    setSaveStatus("unsaved");
  };

  const handleDeleteCertification = (index: number) => {
    if (!portfolio) return;
    const updated = portfolio.certifications.filter((_, i) => i !== index);
    setPortfolio((prev) => (prev ? { ...prev, certifications: updated } : prev));
    setSaveStatus("unsaved");
  };

  // Additional Items Handlers (Languages, Awards, Publications, Volunteer, Services, Testimonials)
  const handleAddAdditionalItem = () => {
    if (!portfolio) return;
    const newItem: IAdditionalItem = {
      title: "",
      subtitle: "",
      description: "",
      date: "",
      url: "",
      category: additionalCategory,
    };
    const current = portfolio.customSections || [];
    setPortfolio((prev) => (prev ? { ...prev, customSections: [newItem, ...current] } : prev));
    setSaveStatus("unsaved");
  };

  const handleUpdateAdditionalItem = (index: number, field: keyof IAdditionalItem, value: any) => {
    if (!portfolio) return;
    const current = [...(portfolio.customSections || [])];
    current[index] = { ...current[index], [field]: value };
    setPortfolio((prev) => (prev ? { ...prev, customSections: current } : prev));
    setSaveStatus("unsaved");
  };

  const handleMoveAdditionalItem = (index: number, direction: "up" | "down") => {
    if (!portfolio) return;
    const current = [...(portfolio.customSections || [])];
    const updated = moveItem(current, index, direction);
    setPortfolio((prev) => (prev ? { ...prev, customSections: updated } : prev));
    setSaveStatus("unsaved");
  };

  const handleDeleteAdditionalItem = (index: number) => {
    if (!portfolio) return;
    const current = portfolio.customSections || [];
    const updated = current.filter((_, i) => i !== index);
    setPortfolio((prev) => (prev ? { ...prev, customSections: updated } : prev));
    setSaveStatus("unsaved");
  };

  // Handle Resume Re-upload in Editor
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !portfolio) return;
    const file = e.target.files[0];
    setIsUploadingResume(true);
    setActionError(null);
    try {
      const res = await portfolioApi.uploadResumeToPortfolio(portfolio._id, file);
      if (res.success && res.portfolio) {
        setPortfolio(res.portfolio);
        setActionSuccess("Resume uploaded and structured data merged successfully!");
        setTimeout(() => setActionSuccess(null), 3500);
      } else {
        setActionError(res.message || "Failed to process resume.");
      }
    } catch {
      setActionError("Failed to upload resume.");
    } finally {
      setIsUploadingResume(false);
    }
  };

  // Handle Publish / Unpublish
  const handleTogglePublish = async () => {
    if (!portfolio) return;
    setIsPublishing(true);
    setActionError(null);

    // First ensure current edits are saved
    await handleSave();

    try {
      if (portfolio.status === "published") {
        const res = await portfolioApi.unpublishPortfolio(portfolio._id);
        const unpubPf = res.data?.portfolio || (res as any).portfolio;
        if (res.success && unpubPf) {
          setPortfolio(unpubPf);
          setActionSuccess("Portfolio unpublished (saved as draft)");
          setTimeout(() => setActionSuccess(null), 3000);
        } else {
          setActionError(res.message || "Failed to unpublish.");
        }
      } else {
        const res = await portfolioApi.publishPortfolio(portfolio._id);
        const pubPf = res.data?.portfolio || (res as any).portfolio;
        if (res.success && pubPf) {
          setPortfolio(pubPf);
          setActionSuccess("🎉 Portfolio published live to the web!");
          setTimeout(() => setActionSuccess(null), 4000);
        } else {
          setActionError(res.message || "Please complete required profile and skills before publishing.");
        }
      }
    } catch {
      setActionError("An unexpected error occurred during publish.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCopyLink = () => {
    if (!portfolio) return;
    const url = `${window.location.origin}/p/${portfolio.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // AI Application Handlers
  const handleApplyHeadline = (headline: string) => {
    if (!portfolio) return;
    setPortfolio((prev) =>
      prev
        ? {
            ...prev,
            profile: {
              ...prev.profile,
              headline,
            },
          }
        : prev
    );
    setSaveStatus("unsaved");
    setActionSuccess("AI Headline applied to profile! Click 'Save' to persist.");
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const handleApplySummary = (summary: string) => {
    if (!portfolio) return;
    setPortfolio((prev) =>
      prev
        ? {
            ...prev,
            profile: {
              ...prev.profile,
              professionalSummary: summary,
            },
          }
        : prev
    );
    setSaveStatus("unsaved");
    setActionSuccess("AI Professional Summary applied! Click 'Save' to persist.");
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const handleApplySkills = (skillsToAdd: string[]) => {
    if (!portfolio) return;
    const merged = Array.from(new Set([...portfolio.skills, ...skillsToAdd]));
    setPortfolio((prev) => (prev ? { ...prev, skills: merged } : prev));
    setSaveStatus("unsaved");
    setActionSuccess("AI Skills taxonomy merged! Click 'Save' to persist.");
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const handleApplyExperience = (experienceIndex: number, description: string, achievements: string[]) => {
    if (!portfolio || !portfolio.experience[experienceIndex]) return;
    const updatedExp = [...portfolio.experience];
    updatedExp[experienceIndex] = {
      ...updatedExp[experienceIndex],
      description: description || updatedExp[experienceIndex].description,
      achievements: achievements && achievements.length > 0 ? achievements : updatedExp[experienceIndex].achievements,
    };
    setPortfolio((prev) => (prev ? { ...prev, experience: updatedExp } : prev));
    setSaveStatus("unsaved");
    setActionSuccess(`Enhanced achievements applied to Experience #${experienceIndex + 1}! Click 'Save' to persist.`);
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const handleApplyProject = (projectIndex: number, description: string, technologies?: string[]) => {
    if (!portfolio || !portfolio.projects[projectIndex]) return;
    const updatedProj = [...portfolio.projects];
    const tech =
      technologies && technologies.length > 0
        ? Array.from(new Set([...updatedProj[projectIndex].technologies, ...technologies]))
        : updatedProj[projectIndex].technologies;
    updatedProj[projectIndex] = {
      ...updatedProj[projectIndex],
      description: description || updatedProj[projectIndex].description,
      technologies: tech,
    };
    setPortfolio((prev) => (prev ? { ...prev, projects: updatedProj } : prev));
    setSaveStatus("unsaved");
    setActionSuccess(`Polished description applied to Project #${projectIndex + 1}! Click 'Save' to persist.`);
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const handleApplySeo = (seo: { metaTitle?: string; metaDescription?: string; keywords?: string[]; slug?: string }) => {
    if (seo.slug && portfolio) {
      setPortfolio((prev) => (prev ? { ...prev, slug: seo.slug || prev.slug } : prev));
      setSaveStatus("unsaved");
    }
    setActionSuccess("SEO recommendations reviewed! Custom slug updated. Click 'Save' to persist.");
    setTimeout(() => setActionSuccess(null), 3500);
  };

  if (loading || !portfolio) {
    return (
      <div className="min-h-screen bg-[#F8F3EC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#D47A41]" />
          <p className="text-xs text-[#6D594D] font-medium">Loading portfolio editor...</p>
        </div>
      </div>
    );
  }

  const tabs: { id: TabType; label: string; icon: any; count?: number }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "ai", label: "✨ AI Assistant", icon: Sparkles },
    { id: "skills", label: "Skills", icon: Code2, count: portfolio.skills.length },
    { id: "experience", label: "Experience", icon: Briefcase, count: portfolio.experience.length },
    { id: "education", label: "Education", icon: GraduationCap, count: portfolio.education.length },
    { id: "projects", label: "Projects", icon: FolderGit2, count: portfolio.projects.length },
    { id: "certifications", label: "Certifications", icon: Award, count: portfolio.certifications.length },
    { id: "additional", label: "Additional Sections", icon: BookOpen, count: portfolio.customSections?.length || 0 },
    { id: "visibility", label: "Section Visibility", icon: EyeOff },
    { id: "social", label: "Social Links", icon: Share2 },
    { id: "template", label: "Template", icon: Layout },
    { id: "resume", label: "Resume Re-parse", icon: UploadCloud },
    { id: "settings", label: "Settings & Style", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8F3EC] text-[#2B1D15] flex flex-col">
      {/* Editor Top Toolbar */}
      <header className="sticky top-0 z-40 bg-[#F8F3EC]/95 backdrop-blur-md border-b border-[#E6DACB] shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl text-[#6D594D] hover:text-[#2B1D15] hover:bg-[#EFE6D8] transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-[#2B1D15] truncate max-w-[180px] sm:max-w-xs">
                  {portfolio.profile?.name || "Untitled Portfolio"}
                </h1>
                <span
                  className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                    portfolio.status === "published"
                      ? "bg-[#ECF5EF] text-[#447250] border border-[#BFDFCA]"
                      : "bg-[#FDF1E8] text-[#DE8638] border border-[#F3CDB7]"
                  }`}
                >
                  {portfolio.status}
                </span>
              </div>
              <p className="text-[11px] text-[#6D594D] font-mono truncate">
                /p/{portfolio.slug}
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Auto-save status indicator */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#6D594D] font-medium pr-2">
              {saveStatus === "saving" && (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D47A41]" />
                  <span>Saving...</span>
                </>
              )}
              {saveStatus === "saved" && (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#447250]" />
                  <span>All saved</span>
                </>
              )}
              {saveStatus === "unsaved" && (
                <div className="flex items-center gap-1 text-[#DE8638]">
                  <span className="w-2 h-2 rounded-full bg-[#DE8638] animate-pulse" />
                  <span>Unsaved changes</span>
                </div>
              )}
              {saveStatus === "error" && <span className="text-[#DE8638]">Save error</span>}
            </div>

            {/* Template Gallery Link */}
            <Link
              href={`/portfolio/${portfolio._id}/templates`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F8F3EC] hover:bg-[#EFE6D8] text-[#2B1D15] text-xs font-semibold border border-[#E6DACB] transition-colors"
              title="10 Interactive Templates"
            >
              <Palette className="w-4 h-4 text-[#D47A41]" />
              <span className="hidden md:inline">Templates</span>
            </Link>

            {/* Save Button */}
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saveStatus === "saving"}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F8F3EC] hover:bg-[#EFE6D8] text-[#2B1D15] text-xs font-semibold border border-[#E6DACB] transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#D47A41]" />
              <span className="hidden sm:inline">Save</span>
            </button>

            {/* Live Preview Button */}
            <Link
              href={`/portfolio/${portfolio._id}/preview`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F8F3EC] hover:bg-[#EFE6D8] text-[#2B1D15] text-xs font-semibold border border-[#E6DACB] transition-colors"
            >
              <Eye className="w-4 h-4 text-[#DE8638]" />
              <span className="hidden sm:inline">Preview</span>
            </Link>

            {/* Publish / Unpublish Toggle */}
            <button
              type="button"
              onClick={handleTogglePublish}
              disabled={isPublishing}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer ${
                portfolio.status === "published"
                  ? "bg-[#FDF1E8] text-[#D47A41] hover:bg-[#EFE6D8] border border-[#F3CDB7]"
                  : "bg-[#D47A41] hover:bg-[#BF6A34] text-white"
              }`}
            >
              {isPublishing ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Globe className="w-3.5 h-3.5" />
              )}
              <span>{portfolio.status === "published" ? "Unpublish" : "Publish"}</span>
            </button>

            {/* Public Link button if published */}
            {portfolio.status === "published" && (
              <button
                type="button"
                onClick={handleCopyLink}
                className="p-2 rounded-xl bg-[#F8F3EC] hover:bg-[#EFE6D8] border border-[#E6DACB] text-[#D47A41] transition-colors"
                title="Copy Live Public URL"
              >
                {copiedLink ? <Check className="w-4 h-4 text-[#447250]" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Editor Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        {/* Navigation Tabs & Completeness Progress */}
        <aside className="w-full md:w-64 shrink-0 space-y-4">
          {/* Completeness Card */}
          <div className="bg-[#FFFDF9] border border-[#E6DACB] rounded-3xl p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#2B1D15]">
              <span>Profile Readiness</span>
              <span className="text-[#D47A41] font-mono">{completeness}%</span>
            </div>
            <div className="w-full bg-[#F8F3EC] h-2 rounded-full overflow-hidden border border-[#E6DACB]">
              <div
                className="h-full bg-[#D47A41] rounded-full transition-all duration-500"
                style={{ width: `${completeness}%` }}
              />
            </div>
            <p className="text-[11px] text-[#6D594D]">
              {completeness >= 80 ? "✨ Recruiter Ready!" : "Add experience and skills to maximize impact."}
            </p>
          </div>

          {/* Tab Navigation Menu */}
          <div className="sticky top-20 md:top-24 bg-[#FFFDF9] border border-[#E6DACB] rounded-3xl p-2.5 sm:p-3 shadow-sm space-y-1 overflow-x-auto md:overflow-visible flex md:flex-col gap-1.5 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-auto md:w-full flex items-center justify-between gap-2.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl text-xs font-semibold transition-all shrink-0 cursor-pointer text-left ${
                    isActive
                      ? "bg-[#D47A41] text-white shadow-sm"
                      : "text-[#6D594D] hover:text-[#2B1D15] hover:bg-[#F8F3EC]"
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-[#6D594D]"}`} />
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono shrink-0 ${
                        isActive ? "bg-white/20 text-white" : "bg-[#F8F3EC] text-[#6D594D]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Form Work Area */}
        <main className="flex-1 space-y-6 min-w-0">
          {/* Action Notices */}
          {actionError && (
            <div className="p-4 rounded-2xl bg-[#FDF0EE] border border-[#F7CBC7] text-[#C03E31] text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{actionError}</span>
            </div>
          )}

          {actionSuccess && (
            <div className="p-4 rounded-2xl bg-[#ECF5EF] border border-[#BFDFCA] text-[#447250] text-xs flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#447250]" />
              <span>{actionSuccess}</span>
            </div>
          )}

          {/* TAB: AI ASSISTANT */}
          {activeTab === "ai" && (
            <AIAssistantPanel
              portfolio={portfolio}
              onApplyHeadline={handleApplyHeadline}
              onApplySummary={handleApplySummary}
              onApplySkills={handleApplySkills}
              onApplyExperience={handleApplyExperience}
              onApplyProject={handleApplyProject}
              onApplySeo={handleApplySeo}
            />
          )}

          {/* TAB 1: PROFILE */}
          {activeTab === "profile" && (
            <div className="bg-[#FFFDF9] border border-[#E6DACB] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="pb-3 border-b border-[#E6DACB] flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#2B1D15]">Personal & Profile Information</h2>
                  <p className="text-xs text-[#6D594D]">Basic contact and summary details visible on your portfolio header.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("ai")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FDF1E8] text-[#DE8638] border border-[#F3CDB7] hover:bg-[#F5CCD4] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Polish</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2B1D15]">Full Name *</label>
                  <input
                    type="text"
                    value={portfolio.profile?.name || ""}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E6DACB] bg-[#F8F3EC] focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#2B1D15]">Professional Headline *</label>
                    <button
                      type="button"
                      onClick={() => setActiveTab("ai")}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D47A41] hover:text-[#C03E31] transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      Generate with AI
                    </button>
                  </div>
                  <input
                    type="text"
                    value={portfolio.profile?.headline || ""}
                    onChange={(e) => handleProfileChange("headline", e.target.value)}
                    placeholder="Senior Full Stack Architect"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E6DACB] bg-[#F8F3EC] focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2B1D15]">Email Address</label>
                  <input
                    type="email"
                    value={portfolio.profile?.email || ""}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E6DACB] bg-[#F8F3EC] focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2B1D15]">Phone Number</label>
                  <input
                    type="tel"
                    value={portfolio.profile?.phone || ""}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E6DACB] bg-[#F8F3EC] focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2B1D15]">Location</label>
                  <input
                    type="text"
                    value={portfolio.profile?.location || ""}
                    onChange={(e) => handleProfileChange("location", e.target.value)}
                    placeholder="San Francisco, CA"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E6DACB] bg-[#F8F3EC] focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2B1D15]">Personal Website / Blog</label>
                  <input
                    type="url"
                    value={portfolio.profile?.website || ""}
                    onChange={(e) => handleProfileChange("website", e.target.value)}
                    placeholder="https://alexrivera.dev"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E6DACB] bg-[#F8F3EC] focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#2B1D15]">Professional Summary *</label>
                    <button
                      type="button"
                      onClick={() => setActiveTab("ai")}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D47A41] hover:text-[#C03E31] transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      Improve with AI
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={portfolio.profile?.professionalSummary || ""}
                    onChange={(e) => handleProfileChange("professionalSummary", e.target.value)}
                    placeholder="Passionate engineer with 6+ years of experience building scalable cloud applications..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E6DACB] bg-[#F8F3EC] focus:outline-none focus:ring-2 focus:ring-[#D47A41] resize-y leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SKILLS */}
          {activeTab === "skills" && (
            <div className="bg-[#FFFDF9] border border-[#E6DACB] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="pb-3 border-b border-[#E6DACB] flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#2B1D15]">Technical & Professional Skills</h2>
                  <p className="text-xs text-[#6D594D]">Add languages, frameworks, databases, tools, and methodologies.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("ai")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FDF1E8] text-[#DE8638] border border-[#F3CDB7] hover:bg-[#F5CCD4] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Suggestions</span>
                </button>
              </div>

              {/* Add Skill Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  placeholder="e.g. Next.js, Docker, MongoDB, TypeScript..."
                  className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E6DACB] bg-[#F8F3EC] focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2.5 rounded-xl bg-[#D47A41] text-white text-xs font-bold hover:bg-[#BF6A34] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>

              {/* Skills Tags List */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#2B1D15] uppercase tracking-wider">
                  Active Skills ({portfolio.skills.length})
                </label>
                {portfolio.skills.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-[#F8F3EC] border border-dashed border-[#E6DACB] text-center text-xs text-[#6D594D]">
                    No skills added yet. Type a skill above or use AI taxonomy to suggest skills.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {portfolio.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F3EC] border border-[#E6DACB] text-xs font-medium text-[#2B1D15] hover:border-[#D47A41] transition-colors"
                      >
                        <Tag className="w-3 h-3 text-[#D47A41]" />
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-[#C03E31] ml-1 cursor-pointer"
                          title="Remove skill"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: EXPERIENCE */}
          {activeTab === "experience" && (
            <div className="bg-[#FFFDF9] border border-[#E6DACB] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="pb-3 border-b border-[#E6DACB] flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#2B1D15]">Work Experience</h2>
                  <p className="text-xs text-[#6D594D]">List your career milestones, responsibilities, and achievements.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D47A41] text-white text-xs font-bold hover:bg-[#BF6A34] transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Role</span>
                </button>
              </div>

              {portfolio.experience.length === 0 ? (
                <div className="p-12 rounded-2xl bg-[#F8F3EC] border border-dashed border-[#E6DACB] text-center space-y-3">
                  <Briefcase className="w-8 h-8 mx-auto text-[#6D594D]" />
                  <p className="text-xs text-[#6D594D]">No work experience listed yet.</p>
                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className="px-4 py-2 rounded-xl bg-[#D47A41] text-white text-xs font-bold hover:bg-[#BF6A34]"
                  >
                    Add Experience
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {portfolio.experience.map((exp, idx) => (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 rounded-2xl bg-[#F8F3EC] border border-[#E6DACB] space-y-4 relative group"
                    >
                      {/* Top Action Bar */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#E6DACB]">
                        <span className="text-xs font-mono font-bold text-[#D47A41]">
                          #{idx + 1} {exp.position || "Position"} at {exp.company || "Company"}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveExperience(idx, "up")}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg bg-white border border-[#E6DACB] hover:bg-[#EFE6D8] text-[#2B1D15] disabled:opacity-40 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveExperience(idx, "down")}
                            disabled={idx === portfolio.experience.length - 1}
                            className="p-1.5 rounded-lg bg-white border border-[#E6DACB] hover:bg-[#EFE6D8] text-[#2B1D15] disabled:opacity-40 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicateExperience(idx)}
                            className="p-1.5 rounded-lg bg-white border border-[#E6DACB] hover:bg-[#EFE6D8] text-[#2B1D15] cursor-pointer"
                            title="Duplicate Entry"
                          >
                            <DuplicateIcon className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteExperience(idx)}
                            className="p-1.5 rounded-lg bg-[#FDF0EE] border border-[#F7CBC7] hover:bg-[#FBE4E2] text-[#C03E31] cursor-pointer"
                            title="Delete Entry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Job Title *</label>
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => handleUpdateExperience(idx, "position", e.target.value)}
                            placeholder="Lead Software Engineer"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Company Name *</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleUpdateExperience(idx, "company", e.target.value)}
                            placeholder="TechCorp Inc."
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Location</label>
                          <input
                            type="text"
                            value={exp.location || ""}
                            onChange={(e) => handleUpdateExperience(idx, "location", e.target.value)}
                            placeholder="San Francisco, CA (or Remote)"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-[#2B1D15]">Start Date</label>
                            <input
                              type="text"
                              value={exp.startDate || ""}
                              onChange={(e) => handleUpdateExperience(idx, "startDate", e.target.value)}
                              placeholder="2021"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-[#2B1D15]">End Date</label>
                            <input
                              type="text"
                              value={exp.endDate || ""}
                              onChange={(e) => handleUpdateExperience(idx, "endDate", e.target.value)}
                              placeholder="Present"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Role Summary & Scope</label>
                          <textarea
                            rows={2}
                            value={exp.description || ""}
                            onChange={(e) => handleUpdateExperience(idx, "description", e.target.value)}
                            placeholder="Overview of leadership, architectural decisions, and responsibilities..."
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: EDUCATION */}
          {activeTab === "education" && (
            <div className="bg-[#FFFDF9] border border-[#E6DACB] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="pb-3 border-b border-[#E6DACB] flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#2B1D15]">Education & Degrees</h2>
                  <p className="text-xs text-[#6D594D]">Academic background, certifications, and university credentials.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D47A41] text-white text-xs font-bold hover:bg-[#BF6A34] transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Degree</span>
                </button>
              </div>

              {portfolio.education.length === 0 ? (
                <div className="p-12 rounded-2xl bg-[#F8F3EC] border border-dashed border-[#E6DACB] text-center space-y-3">
                  <GraduationCap className="w-8 h-8 mx-auto text-[#6D594D]" />
                  <p className="text-xs text-[#6D594D]">No education history added yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {portfolio.education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 rounded-2xl bg-[#F8F3EC] border border-[#E6DACB] space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-[#E6DACB]">
                        <span className="text-xs font-mono font-bold text-[#D47A41]">
                          #{idx + 1} {edu.degree || "Degree"} — {edu.institution || "Institution"}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveEducation(idx, "up")}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg bg-white border border-[#E6DACB] disabled:opacity-40"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveEducation(idx, "down")}
                            disabled={idx === portfolio.education.length - 1}
                            className="p-1.5 rounded-lg bg-white border border-[#E6DACB] disabled:opacity-40"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicateEducation(idx)}
                            className="p-1.5 rounded-lg bg-white border border-[#E6DACB]"
                          >
                            <DuplicateIcon className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteEducation(idx)}
                            className="p-1.5 rounded-lg bg-[#FDF0EE] border border-[#F7CBC7] hover:bg-[#FBE4E2] text-[#C03E31] cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Degree *</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => handleUpdateEducation(idx, "degree", e.target.value)}
                            placeholder="Bachelor of Science in Computer Science"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Institution / University *</label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => handleUpdateEducation(idx, "institution", e.target.value)}
                            placeholder="Stanford University"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Location</label>
                          <input
                            type="text"
                            value={edu.location || ""}
                            onChange={(e) => handleUpdateEducation(idx, "location", e.target.value)}
                            placeholder="Stanford, CA"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-[#2B1D15]">Start Year</label>
                            <input
                              type="text"
                              value={edu.startDate || ""}
                              onChange={(e) => handleUpdateEducation(idx, "startDate", e.target.value)}
                              placeholder="2018"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-[#2B1D15]">End Year</label>
                            <input
                              type="text"
                              value={edu.endDate || ""}
                              onChange={(e) => handleUpdateEducation(idx, "endDate", e.target.value)}
                              placeholder="2022"
                              className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: PROJECTS */}
          {activeTab === "projects" && (
            <div className="bg-[#FFFDF9] border border-[#E6DACB] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="pb-3 border-b border-[#E6DACB] flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#2B1D15]">Featured Projects</h2>
                  <p className="text-xs text-[#6D594D]">Showcase your apps, open source tools, and key engineering systems.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D47A41] text-white text-xs font-bold hover:bg-[#BF6A34] transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {portfolio.projects.length === 0 ? (
                <div className="p-12 rounded-2xl bg-[#F8F3EC] border border-dashed border-[#E6DACB] text-center space-y-3">
                  <FolderGit2 className="w-8 h-8 mx-auto text-[#6D594D]" />
                  <p className="text-xs text-[#6D594D]">No projects added yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {portfolio.projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 rounded-2xl bg-[#F8F3EC] border border-[#E6DACB] space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-[#E6DACB]">
                        <span className="text-xs font-mono font-bold text-[#D47A41]">
                          #{idx + 1} {proj.title || "Untitled Project"}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveProject(idx, "up")}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg bg-white border border-[#E6DACB] disabled:opacity-40"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveProject(idx, "down")}
                            disabled={idx === portfolio.projects.length - 1}
                            className="p-1.5 rounded-lg bg-white border border-[#E6DACB] disabled:opacity-40"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicateProject(idx)}
                            className="p-1.5 rounded-lg bg-white border border-[#E6DACB]"
                          >
                            <DuplicateIcon className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(idx)}
                            className="p-1.5 rounded-lg bg-[#FDF0EE] border border-[#F7CBC7] hover:bg-[#FBE4E2] text-[#C03E31] cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Project Title *</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => handleUpdateProject(idx, "title", e.target.value)}
                            placeholder="AI Portfolio SaaS"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Role / Responsibilities</label>
                          <input
                            type="text"
                            value={proj.role || ""}
                            onChange={(e) => handleUpdateProject(idx, "role", e.target.value)}
                            placeholder="Full Stack Lead"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Live Demo URL</label>
                          <input
                            type="url"
                            value={proj.liveUrl || ""}
                            onChange={(e) => handleUpdateProject(idx, "liveUrl", e.target.value)}
                            placeholder="https://app.example.com"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">GitHub Repository URL</label>
                          <input
                            type="url"
                            value={proj.githubUrl || ""}
                            onChange={(e) => handleUpdateProject(idx, "githubUrl", e.target.value)}
                            placeholder="https://github.com/username/project"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Technologies (Comma Separated)</label>
                          <input
                            type="text"
                            value={(proj.technologies || []).join(", ")}
                            onChange={(e) =>
                              handleUpdateProject(
                                idx,
                                "technologies",
                                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                              )
                            }
                            placeholder="React, Next.js, Node.js, MongoDB, Tailwind CSS"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Project Description</label>
                          <textarea
                            rows={3}
                            value={proj.description}
                            onChange={(e) => handleUpdateProject(idx, "description", e.target.value)}
                            placeholder="Describe key problems solved, architecture, and user impact..."
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: CERTIFICATIONS */}
          {activeTab === "certifications" && (
            <div className="bg-[#FFFDF9] border border-[#E6DACB] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="pb-3 border-b border-[#E6DACB] flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#2B1D15]">Certifications & Licenses</h2>
                  <p className="text-xs text-[#6D594D]">Verified industry credentials, cloud certifications, and licenses.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddCertification}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D47A41] text-white text-xs font-bold hover:bg-[#BF6A34] transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Credential</span>
                </button>
              </div>

              {portfolio.certifications.length === 0 ? (
                <div className="p-12 rounded-2xl bg-[#F8F3EC] border border-dashed border-[#E6DACB] text-center space-y-3">
                  <Award className="w-8 h-8 mx-auto text-[#6D594D]" />
                  <p className="text-xs text-[#6D594D]">No certifications added yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {portfolio.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#F8F3EC] border border-[#E6DACB] space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-[#E6DACB]">
                        <span className="text-xs font-mono font-bold text-[#D47A41]">
                          #{idx + 1} {cert.name || "Certification"}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveCertification(idx, "up")}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg bg-white border border-[#E6DACB] disabled:opacity-40"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveCertification(idx, "down")}
                            disabled={idx === portfolio.certifications.length - 1}
                            className="p-1.5 rounded-lg bg-white border border-[#E6DACB] disabled:opacity-40"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCertification(idx)}
                            className="p-1.5 rounded-lg bg-[#FDF0EE] border border-[#F7CBC7] hover:bg-[#FBE4E2] text-[#C03E31] cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Name *</label>
                          <input
                            type="text"
                            value={cert.name}
                            onChange={(e) => handleUpdateCertification(idx, "name", e.target.value)}
                            placeholder="AWS Certified Solutions Architect"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Issuer *</label>
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => handleUpdateCertification(idx, "issuer", e.target.value)}
                            placeholder="Amazon Web Services"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Issue Date</label>
                          <input
                            type="text"
                            value={cert.issueDate || ""}
                            onChange={(e) => handleUpdateCertification(idx, "issueDate", e.target.value)}
                            placeholder="2023"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Credential URL</label>
                          <input
                            type="url"
                            value={cert.credentialUrl || ""}
                            onChange={(e) => handleUpdateCertification(idx, "credentialUrl", e.target.value)}
                            placeholder="https://credly.com/your-badge"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: ADDITIONAL SECTIONS */}
          {activeTab === "additional" && (
            <div className="bg-[#FFFDF9] border border-[#E6DACB] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="pb-3 border-b border-[#E6DACB] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#2B1D15]">Additional Professional Sections</h2>
                  <p className="text-xs text-[#6D594D]">Add languages, awards, volunteer experience, publications, services, and testimonials.</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={additionalCategory}
                    onChange={(e) => setAdditionalCategory(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-[#F8F3EC] text-[#2B1D15]"
                  >
                    <option value="awards">🏆 Honors & Awards</option>
                    <option value="languages">🌐 Spoken Languages</option>
                    <option value="publications">📚 Publications & Articles</option>
                    <option value="volunteer">🤝 Volunteer & Community</option>
                    <option value="services">💼 Consulting & Services</option>
                    <option value="testimonials">💬 Testimonials</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddAdditionalItem}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D47A41] text-white text-xs font-bold hover:bg-[#BF6A34] transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Item</span>
                  </button>
                </div>
              </div>

              {(!portfolio.customSections || portfolio.customSections.length === 0) ? (
                <div className="p-12 rounded-2xl bg-[#F8F3EC] border border-dashed border-[#E6DACB] text-center space-y-3">
                  <BookOpen className="w-8 h-8 mx-auto text-[#6D594D]" />
                  <p className="text-xs text-[#6D594D]">No additional sections added yet. Select a category above and click &apos;Add Item&apos;.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {portfolio.customSections.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#F8F3EC] border border-[#E6DACB] space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-[#E6DACB]">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#D47A41]/10 text-[#D47A41]">
                            {item.category}
                          </span>
                          <span className="text-xs font-bold text-[#2B1D15]">{item.title || "Untitled Item"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveAdditionalItem(idx, "up")}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg bg-white border border-[#E6DACB] disabled:opacity-40"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveAdditionalItem(idx, "down")}
                            disabled={idx === (portfolio.customSections?.length || 1) - 1}
                            className="p-1.5 rounded-lg bg-white border border-[#E6DACB] disabled:opacity-40"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteAdditionalItem(idx)}
                            className="p-1.5 rounded-lg bg-[#FDF0EE] border border-[#F7CBC7] hover:bg-[#FBE4E2] text-[#C03E31] cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Title / Name *</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleUpdateAdditionalItem(idx, "title", e.target.value)}
                            placeholder="e.g. Best Innovation Award 2024"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Subtitle / Issuer / Level</label>
                          <input
                            type="text"
                            value={item.subtitle || ""}
                            onChange={(e) => handleUpdateAdditionalItem(idx, "subtitle", e.target.value)}
                            placeholder="e.g. Tech Innovators Summit (or Fluent / Native)"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Date / Year</label>
                          <input
                            type="text"
                            value={item.date || ""}
                            onChange={(e) => handleUpdateAdditionalItem(idx, "date", e.target.value)}
                            placeholder="2024"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">External Reference URL</label>
                          <input
                            type="url"
                            value={item.url || ""}
                            onChange={(e) => handleUpdateAdditionalItem(idx, "url", e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-[11px] font-semibold text-[#2B1D15]">Description / Details</label>
                          <textarea
                            rows={2}
                            value={item.description || ""}
                            onChange={(e) => handleUpdateAdditionalItem(idx, "description", e.target.value)}
                            placeholder="Provide brief context or quote..."
                            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: SECTION VISIBILITY */}
          {activeTab === "visibility" && (
            <div className="bg-[#FFFDF9] border border-[#E6DACB] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="pb-3 border-b border-[#E6DACB]">
                <h2 className="text-lg font-bold text-[#2B1D15]">Section Visibility & Layout Controls</h2>
                <p className="text-xs text-[#6D594D]">Toggle which sections appear on your published public portfolio.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "profile", label: "Profile & Bio Header", desc: "Shows your name, headline, avatar, and introduction." },
                  { key: "skills", label: "Technical Skills", desc: "Shows your skills taxonomy tags and categories." },
                  { key: "experience", label: "Work Experience", desc: "Shows your career history and role achievements." },
                  { key: "projects", label: "Featured Projects", desc: "Shows your project showcase and source links." },
                  { key: "education", label: "Education & Degrees", desc: "Shows university degrees and academic credentials." },
                  { key: "certifications", label: "Certifications", desc: "Shows verified licenses and certificates." },
                  { key: "customSections", label: "Additional Sections", desc: "Shows awards, languages, volunteer, publications." },
                  { key: "contact", label: "Contact & Socials", desc: "Shows direct reach out and social links." },
                ].map(({ key, label, desc }) => {
                  const isVisible = (portfolio.sectionVisibility as any)?.[key] !== false;
                  return (
                    <div
                      key={key}
                      className="p-4 rounded-2xl bg-[#F8F3EC] border border-[#E6DACB] flex items-center justify-between gap-4"
                    >
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-[#2B1D15]">{label}</h4>
                        <p className="text-[11px] text-[#6D594D] leading-snug">{desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleVisibility(key as any)}
                        className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                          isVisible ? "bg-[#D47A41]" : "bg-[#D5C8B8]"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                            isVisible ? "translate-x-7" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 9: SOCIAL LINKS */}
          {activeTab === "social" && (
            <div className="bg-[#FFFDF9] border border-[#E6DACB] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="pb-3 border-b border-[#E6DACB]">
                <h2 className="text-lg font-bold text-[#2B1D15]">Social & Developer Links</h2>
                <p className="text-xs text-[#6D594D]">Connect your GitHub, LinkedIn, Twitter/X, and social profiles.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2B1D15]">GitHub Profile URL</label>
                  <input
                    type="url"
                    value={portfolio.socialLinks?.github || ""}
                    onChange={(e) => handleSocialChange("github", e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E6DACB] bg-[#F8F3EC] focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2B1D15]">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={portfolio.socialLinks?.linkedin || ""}
                    onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E6DACB] bg-[#F8F3EC] focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2B1D15]">Twitter / X Profile URL</label>
                  <input
                    type="url"
                    value={portfolio.socialLinks?.twitter || ""}
                    onChange={(e) => handleSocialChange("twitter", e.target.value)}
                    placeholder="https://x.com/username"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E6DACB] bg-[#F8F3EC] focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2B1D15]">Instagram / Dribbble / Other</label>
                  <input
                    type="url"
                    value={portfolio.socialLinks?.instagram || ""}
                    onChange={(e) => handleSocialChange("instagram", e.target.value)}
                    placeholder="https://instagram.com/username"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E6DACB] bg-[#F8F3EC] focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: TEMPLATE SELECTION */}
          {activeTab === "template" && (
            <div className="bg-[#FFFDF9] border border-[#E6DACB] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="pb-3 border-b border-[#E6DACB] flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#2B1D15]">Choose Portfolio Template</h2>
                  <p className="text-xs text-[#6D594D]">Switch between 10 professionally engineered layout engines.</p>
                </div>
                <Link
                  href={`/portfolio/${portfolio._id}/templates`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D47A41] text-white text-xs font-bold hover:bg-[#BF6A34] transition-colors"
                >
                  <Palette className="w-4 h-4" />
                  <span>Open Full Gallery</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.values(TEMPLATE_REGISTRY).map((tmpl) => {
                  const isSelected = portfolio.template === tmpl.id;
                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => {
                        setPortfolio((prev) => (prev ? { ...prev, template: tmpl.id as any } : prev));
                        setSaveStatus("unsaved");
                      }}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? "border-[#D47A41] bg-[#F8F3EC] shadow-sm ring-2 ring-[#D47A41]/20"
                          : "border-[#E6DACB] bg-white hover:border-[#D47A41]/40"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-[#2B1D15]">{tmpl.name}</h4>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#D47A41]" />}
                        </div>
                        <p className="text-[11px] text-[#6D594D] leading-relaxed">{tmpl.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-[#E6DACB]/60 text-[10px] text-[#6D594D]">
                        <span className="capitalize font-mono">{tmpl.category}</span>
                        <span className="font-semibold text-[#D47A41]">{isSelected ? "Active" : "Click to select"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 11: RESUME RE-PARSE */}
          {activeTab === "resume" && (
            <div className="bg-[#FFFDF9] border border-[#E6DACB] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="pb-3 border-b border-[#E6DACB]">
                <h2 className="text-lg font-bold text-[#2B1D15]">Resume Upload & Re-Extraction</h2>
                <p className="text-xs text-[#6D594D]">Upload an updated resume (PDF, DOCX, TXT) to merge into your portfolio.</p>
              </div>

              <div className="p-8 rounded-2xl bg-[#F8F3EC] border border-dashed border-[#E6DACB] text-center space-y-4">
                <UploadCloud className="w-10 h-10 mx-auto text-[#D47A41]" />
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-semibold text-[#2B1D15]">Upload an updated resume</p>
                  <p className="text-[11px] text-[#6D594D]">Supports PDF, DOCX, DOC and TXT (Max 15MB)</p>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleResumeUpload}
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingResume}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {isUploadingResume ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Extracting Resume...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      <span>Select Resume File</span>
                    </>
                  )}
                </button>

                {portfolio.resume?.fileName && (
                  <div className="pt-2 text-xs text-[#6D594D]">
                    Current attached resume: <span className="font-mono font-bold text-[#2B1D15]">{portfolio.resume.fileName}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 12: SETTINGS & STYLE */}
          {activeTab === "settings" && (
            <div className="bg-[#FFFDF9] border border-[#E6DACB] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="pb-3 border-b border-[#E6DACB]">
                <h2 className="text-lg font-bold text-[#2B1D15]">Portfolio Styling & URL Settings</h2>
                <p className="text-xs text-[#6D594D]">Configure custom slug, color accents, typography, density, and animation mode.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#2B1D15]">Public Custom Slug *</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#6D594D] bg-[#F8F3EC] px-3 py-2.5 rounded-xl border border-[#E6DACB]">
                      /p/
                    </span>
                    <input
                      type="text"
                      value={portfolio.slug}
                      onChange={(e) => {
                        const sanitized = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
                        setPortfolio((prev) => (prev ? { ...prev, slug: sanitized } : prev));
                        setSaveStatus("unsaved");
                      }}
                      className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-[#E6DACB] bg-[#F8F3EC] focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2B1D15]">Typography Preset</label>
                  <select
                    value={portfolio.settings?.font || "inter"}
                    onChange={(e) => handleSettingChange("font", e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6DACB] bg-[#F8F3EC] focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                  >
                    <option value="inter">Inter (Modern & Clean)</option>
                    <option value="roboto">Roboto (Technical Standard)</option>
                    <option value="outfit">Outfit (Bold & Elegant)</option>
                    <option value="mono">Fira Code (Developer Centric)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2B1D15]">Theme Mode</label>
                  <select
                    value={portfolio.settings?.theme || "auto"}
                    onChange={(e) => handleSettingChange("theme", e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6DACB] bg-[#F8F3EC] focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                  >
                    <option value="auto">Auto (System match)</option>
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2B1D15]">Content Density</label>
                  <select
                    value={portfolio.settings?.density || "comfortable"}
                    onChange={(e) => handleSettingChange("density", e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6DACB] bg-[#F8F3EC] focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                  >
                    <option value="compact">Compact</option>
                    <option value="comfortable">Comfortable (Recommended)</option>
                    <option value="spacious">Spacious</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2B1D15]">Animation Level</label>
                  <select
                    value={portfolio.settings?.animation || "standard"}
                    onChange={(e) => handleSettingChange("animation", e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6DACB] bg-[#F8F3EC] focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
                  >
                    <option value="none">None (Reduced Motion)</option>
                    <option value="subtle">Subtle</option>
                    <option value="standard">Standard (Delightful)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function PortfolioEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F3EC] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#D47A41]" />
        </div>
      }
    >
      <PortfolioEditorContent />
    </Suspense>
  );
}
