"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { portfolioApi } from "@/lib/portfolioApi";
import { IPortfolio, PortfolioTemplate } from "@/types/portfolio";
import {
  ArrowLeft,
  Check,
  Eye,
  Loader2,
  Sparkles,
  Search,
  CheckCircle2,
  Layout,
  ExternalLink,
  X,
  Compass,
  ArrowRight,
  Layers,
  ChevronDown,
} from "lucide-react";
import { TEMPLATE_REGISTRY, getTemplateMetadata, getTemplateComponent } from "@/lib/templates/registry";
import { recommendTemplate, filterTemplatesByCategory } from "@/lib/templates/utils";
import { TemplateCategory } from "@/lib/templates/types";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Rich realistic preview sample data when visitor is unauthenticated or has no portfolio
const DEMO_PREVIEW_PORTFOLIO: IPortfolio = {
  _id: "demo-sample",
  userId: "demo-user",
  slug: "alex-morgan",
  status: "published",
  template: "minimal-portfolio",
  profile: {
    name: "Alex Morgan",
    headline: "Staff Software Engineer & Distributed Systems Architect",
    professionalSummary:
      "Passionate technical leader with 8+ years building resilient microservices, high-throughput streaming pipelines, and elegant user-facing web applications. Dedicated to clean architecture, developer productivity, and pragmatic engineering.",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "https://alexmorgan.dev",
  },
  skills: [
    "TypeScript",
    "React / Next.js",
    "Node.js",
    "Go",
    "Python",
    "PostgreSQL",
    "Redis",
    "Kubernetes",
    "Kafka",
    "GraphQL",
    "Distributed Systems",
    "System Design",
  ],
  experience: [
    {
      company: "CloudScale Technologies",
      position: "Staff Systems Engineer",
      location: "San Francisco, CA",
      startDate: "2022",
      endDate: "Present",
      currentlyWorking: true,
      description: "Spearheaded low-latency event processing engine handling 450,000 requests/sec with 99.995% uptime.",
      responsibilities: [
        "Architected real-time streaming pipeline reducing p99 latency from 180ms to 18ms",
        "Mentored team of 14 engineers across backend and infrastructure guilds",
      ],
      technologies: ["Go", "Kafka", "PostgreSQL", "Docker", "Kubernetes"],
    },
    {
      company: "Apex Media Labs",
      position: "Senior Full-Stack Engineer",
      location: "New York, NY",
      startDate: "2019",
      endDate: "2022",
      currentlyWorking: false,
      description: "Led migration of legacy monolith to modern Next.js and microservices architecture.",
      responsibilities: [
        "Constructed automated CI/CD deployment pipelines on AWS",
        "Improved Core Web Vitals to 98% across web properties",
      ],
      technologies: ["TypeScript", "React", "Node.js", "Redis"],
    },
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "B.S. in Computer Science",
      location: "Berkeley, CA",
      startDate: "2015",
      endDate: "2019",
      grade: "3.9 GPA",
      description: "Focused on distributed systems, data structures, and computer graphics.",
    },
  ],
  projects: [
    {
      title: "PulseFlow Realtime Analytics",
      description: "High-throughput open source telemetry processor with interactive WebGL visualization dashboard.",
      technologies: ["Go", "React", "Kafka", "WebGL"],
      liveUrl: "https://pulseflow.dev",
      githubUrl: "https://github.com/example/pulseflow",
      category: "Systems & Cloud",
    },
    {
      title: "OmniGraph GraphQL Gateway",
      description: "Federated GraphQL router caching queries across distributed backend microservices.",
      technologies: ["TypeScript", "GraphQL", "Redis", "Docker"],
      liveUrl: "https://omnigraph.dev",
      githubUrl: "https://github.com/example/omnigraph",
      category: "APIs & Infrastructure",
    },
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect – Professional",
      issuer: "Amazon Web Services",
      issueDate: "2024",
    },
  ],
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    website: "https://alexmorgan.dev",
  },
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

function TemplatesGalleryContent() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [portfolios, setPortfolios] = useState<IPortfolio[]>([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);
  const [savingTemplate, setSavingTemplate] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load user's portfolios if authenticated
  useEffect(() => {
    async function loadUserPortfolios() {
      if (!isAuthenticated) return;
      try {
        const res = await portfolioApi.getPortfolios();
        const list = res.data?.portfolios || (res as any).portfolios;
        if (res.success && Array.isArray(list) && list.length > 0) {
          setPortfolios(list);
          setSelectedPortfolioId(list[0]._id);
        }
      } catch {
        // Continue gracefully
      }
    }
    loadUserPortfolios();
  }, [isAuthenticated]);

  const activePortfolio =
    portfolios.find((p) => p._id === selectedPortfolioId) || portfolios[0] || null;

  // Template to use for previewing
  const portfolioForPreview = activePortfolio || DEMO_PREVIEW_PORTFOLIO;

  // Filter templates
  const filteredTemplates = TEMPLATE_REGISTRY.filter((tpl) => {
    const matchesCategory =
      selectedCategory === "all" ||
      tpl.category === selectedCategory ||
      (selectedCategory === "designer" && (tpl.category === "designer" || tpl.category === "creative"));

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      tpl.name.toLowerCase().includes(query) ||
      tpl.subtitle.toLowerCase().includes(query) ||
      tpl.description.toLowerCase().includes(query) ||
      tpl.tags.some((t) => t.toLowerCase().includes(query)) ||
      tpl.recommendedFor.some((r) => r.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const recommendation = activePortfolio ? recommendTemplate(activePortfolio) : null;

  const handleApplyTemplate = async (templateId: PortfolioTemplate) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!activePortfolio) {
      router.push("/dashboard");
      return;
    }

    setSavingTemplate(templateId);
    setStatusMessage(null);

    try {
      const res = await portfolioApi.updatePortfolio(activePortfolio._id, { template: templateId });
      const updated = res.data?.portfolio || (res as any).portfolio;
      if (res.success && updated) {
        setPortfolios((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
        setStatusMessage({
          type: "success",
          text: `Applied "${getTemplateMetadata(templateId).name}" to "${activePortfolio.profile?.name || "your portfolio"}"!`,
        });
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({
          type: "error",
          text: res.message || "Failed to update template.",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Network error while saving template.",
      });
    } finally {
      setSavingTemplate(null);
    }
  };

  const PreviewComponent = previewTemplateId ? getTemplateComponent(previewTemplateId) : null;

  return (
    <div className="min-h-screen bg-[#F8F3EC] text-[#2B1D15] flex flex-col selection:bg-[#D47A41]/20">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-10 w-full">
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E6DACB] pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FDF1E8] text-[#D47A41] border border-[#F6D5C2]">
              <Compass className="w-3.5 h-3.5" />
              <span>Portfolify AI Template Gallery</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2B1D15] tracking-tight">
              20 Professional Portfolio Templates
            </h1>
            <p className="text-xs sm:text-sm text-[#6D594D] leading-relaxed">
              Dynamically switch designs in real-time. Your AI-generated data, projects, work experience, and profile remain completely preserved.
            </p>
          </div>

          {/* User Portfolio Selection (if logged in with portfolios) */}
          {isAuthenticated && portfolios.length > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[#FFFDF9] border border-[#E6DACB] p-3 rounded-2xl shadow-xs shrink-0">
              <span className="text-xs font-medium text-[#6D594D]">Active Portfolio:</span>
              <div className="relative">
                <select
                  value={selectedPortfolioId}
                  onChange={(e) => setSelectedPortfolioId(e.target.value)}
                  className="appearance-none bg-[#F8F3EC] border border-[#E6DACB] rounded-xl px-3 py-1.5 pr-8 text-xs font-bold text-[#2B1D15] focus:outline-none focus:ring-2 focus:ring-[#D47A41] cursor-pointer"
                >
                  {portfolios.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.profile?.name || "Untitled"} ({p.template})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#6D594D] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <Link
                href={`/portfolio/${activePortfolio?._id}/preview`}
                className="px-3 py-1.5 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white text-xs font-semibold transition-colors inline-flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Preview</span>
              </Link>
            </div>
          )}
        </div>

        {/* Status Alerts */}
        {statusMessage && (
          <div
            className={`p-4 rounded-2xl text-xs flex items-center justify-between gap-3 animate-in fade-in ${
              statusMessage.type === "success"
                ? "bg-[#ECF5EF] border border-[#BFDFCA] text-[#447250]"
                : "bg-[#FDF0EE] border border-[#F7CBC7] text-[#C03E31]"
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="font-medium">{statusMessage.text}</span>
            </div>
            {activePortfolio && statusMessage.type === "success" && (
              <Link
                href={`/portfolio/${activePortfolio._id}/preview`}
                className="underline font-bold text-xs hover:opacity-80"
              >
                View Live Preview →
              </Link>
            )}
          </div>
        )}

        {/* AI Recommended Match Banner */}
        {recommendation && activePortfolio && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#D47A41] via-[#BF6A34] to-[#A35525] text-white shadow-md shadow-[#D47A41]/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Recommended Match for {activePortfolio.profile?.name} ({(recommendation.confidenceScore * 100).toFixed(0)}%)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {getTemplateMetadata(recommendation.templateId).name}
              </h2>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                {recommendation.reason}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setPreviewTemplateId(recommendation.templateId)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button
                type="button"
                onClick={() => handleApplyTemplate(recommendation.templateId)}
                disabled={activePortfolio.template === recommendation.templateId || savingTemplate === recommendation.templateId}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePortfolio.template === recommendation.templateId
                    ? "bg-[#BFDFCA] text-[#1E3F28] cursor-default"
                    : "bg-[#FFFDF9] hover:bg-[#F8F3EC] text-[#D47A41] shadow-sm"
                }`}
              >
                {activePortfolio.template === recommendation.templateId ? "Current Active" : "Apply Recommendation"}
              </button>
            </div>
          </div>
        )}

        {/* Filters & Search Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6DACB] pb-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {[
              { id: "all", label: "All 20 Templates" },
              { id: "developer", label: "Developer & Tech" },
              { id: "designer", label: "Designer & Creative" },
              { id: "executive", label: "Executive & Founder" },
              { id: "academic", label: "Academic & Student" },
              { id: "minimal", label: "Minimal & Clean" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#D47A41] text-white shadow-2xs shadow-[#D47A41]/20"
                    : "bg-[#FFFDF9] border border-[#E6DACB] text-[#6D594D] hover:text-[#2B1D15] hover:bg-[#EFE6D8]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 text-[#9E8C7E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, role, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFFDF9] border border-[#E6DACB] rounded-xl pl-9 pr-3 py-2 text-xs text-[#2B1D15] placeholder-[#9E8C7E] focus:outline-none focus:ring-2 focus:ring-[#D47A41]"
            />
          </div>
        </div>

        {/* Templates Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((tpl) => {
            const isCurrentActive = activePortfolio?.template === tpl.id;
            const isSaving = savingTemplate === tpl.id;

            return (
              <div
                key={tpl.id}
                className={`rounded-3xl bg-[#FFFDF9] border-2 transition-all p-6 flex flex-col justify-between space-y-6 shadow-sm ${
                  isCurrentActive
                    ? "border-[#D47A41] ring-4 ring-[#D47A41]/10"
                    : "border-[#E6DACB] hover:border-[#D47A41]/40 hover:shadow-md"
                }`}
              >
                <div className="space-y-4">
                  {/* Top Header & Visual Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[#2B1D15]">{tpl.name}</h3>
                        {isCurrentActive && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECF5EF] text-[#447250] border border-[#BFDFCA]">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#D47A41] font-medium">{tpl.subtitle}</p>
                    </div>

                    <div
                      className="w-5 h-5 rounded-full shrink-0 border-2 border-white shadow-xs"
                      style={{ backgroundColor: tpl.accentColor }}
                      title={`Accent Color: ${tpl.accentColor}`}
                    />
                  </div>

                  <p className="text-xs text-[#6D594D] leading-relaxed line-clamp-3">
                    {tpl.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tpl.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold bg-[#F8F3EC] text-[#6D594D] border border-[#E6DACB]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Recommended For */}
                  <div className="space-y-1 pt-2 border-t border-[#EFE6D8]">
                    <span className="text-[10px] uppercase font-bold text-[#9E8C7E] tracking-wider">
                      Recommended For
                    </span>
                    <p className="text-[11px] text-[#52413F]">
                      {tpl.recommendedFor.join(" · ")}
                    </p>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex items-center gap-2 pt-4 border-t border-[#EFE6D8]">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplateId(tpl.id)}
                    className="flex-1 py-2.5 rounded-xl bg-[#F8F3EC] hover:bg-[#EFE6D8] text-[#2B1D15] text-xs font-semibold border border-[#E6DACB] transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#DE8638]" />
                    <span>Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyTemplate(tpl.id)}
                    disabled={isCurrentActive || isSaving}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isCurrentActive
                        ? "bg-[#ECF5EF] text-[#447250] cursor-default"
                        : "bg-[#D47A41] hover:bg-[#BF6A34] text-white shadow-xs shadow-[#D47A41]/20"
                    }`}
                  >
                    {isSaving ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin mx-auto" />
                    ) : isCurrentActive ? (
                      <span className="inline-flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Selected
                      </span>
                    ) : (
                      "Use Template"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />

      {/* Interactive Modal Preview Drawer */}
      {previewTemplateId && PreviewComponent && (
        <div className="fixed inset-0 z-50 bg-[#241812]/70 backdrop-blur-xs flex flex-col animate-in fade-in">
          <div className="bg-[#FFFDF9] border-b border-[#E6DACB] px-6 py-4 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-bold text-[#2B1D15]">
                Preview: {getTemplateMetadata(previewTemplateId).name}
              </h3>
              <span className="text-xs text-[#6D594D] hidden sm:inline">
                ({activePortfolio ? `Rendering with ${activePortfolio.profile?.name}'s portfolio data` : "Rendering with sample data"})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  handleApplyTemplate(previewTemplateId as PortfolioTemplate);
                  setPreviewTemplateId(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white text-xs font-bold shadow-xs shadow-[#D47A41]/20 cursor-pointer"
              >
                Use This Template
              </button>
              <button
                type="button"
                onClick={() => setPreviewTemplateId(null)}
                className="p-2 rounded-xl text-[#6D594D] hover:text-[#2B1D15] hover:bg-[#EFE6D8] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <PreviewComponent
              portfolio={{ ...portfolioForPreview, template: previewTemplateId as PortfolioTemplate }}
              isPreview={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F3EC] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#D47A41]" />
        </div>
      }
    >
      <TemplatesGalleryContent />
    </Suspense>
  );
}
