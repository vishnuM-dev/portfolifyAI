"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { portfolioApi } from "@/lib/portfolioApi";
import { IPortfolio, PortfolioTemplate } from "@/types/portfolio";
import { ArrowLeft, Check, Eye, Loader2, Sparkles, Filter, CheckCircle2, Layout, ExternalLink, X, Search } from "lucide-react";
import { TEMPLATE_REGISTRY, getTemplateMetadata, getTemplateComponent } from "@/lib/templates/registry";
import { recommendTemplate, filterTemplatesByCategory } from "@/lib/templates/utils";
import { TemplateCategory } from "@/lib/templates/types";

function PortfolioTemplatesContent() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const portfolioId = params.id as string;

  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingTemplate, setSavingTemplate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    async function load() {
      if (!portfolioId) return;
      try {
        setLoading(true);
        const res = await portfolioApi.getPortfolio(portfolioId);
        const loadedPf = res.data?.portfolio || (res as any).portfolio;
        if (res.success && loadedPf) {
          setPortfolio(loadedPf);
        } else {
          setError(res.message || "Failed to load portfolio.");
        }
      } catch {
        setError("Error connecting to server.");
      } finally {
        setLoading(false);
      }
    }
    if (user && portfolioId) {
      load();
    }
  }, [user, portfolioId]);

  const handleSelectTemplate = async (template: PortfolioTemplate) => {
    if (!portfolio) return;
    setSavingTemplate(template);
    setError(null);
    try {
      const res = await portfolioApi.updatePortfolio(portfolio._id, { template });
      const updatedPf = res.data?.portfolio || (res as any).portfolio;
      if (res.success && updatedPf) {
        setPortfolio(updatedPf);
        setSuccess(`Switched to "${getTemplateMetadata(template).name}" template!`);
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(res.message || "Failed to update template.");
      }
    } catch {
      setError("Network error while updating template.");
    } finally {
      setSavingTemplate(null);
    }
  };

  if (loading || !portfolio) {
    return (
      <div className="min-h-screen bg-[#F8F3EC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#D47A41]" />
          <p className="text-xs text-[#6D594D] font-medium">Loading templates gallery...</p>
        </div>
      </div>
    );
  }

  const recommendation = recommendTemplate(portfolio);
  const displayedTemplates = TEMPLATE_REGISTRY.filter((tpl) => {
    const matchesCategory =
      selectedCategory === "all" ||
      tpl.category === selectedCategory ||
      (selectedCategory === "designer" && (tpl.category === "designer" || tpl.category === "creative"));

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      tpl.name.toLowerCase().includes(q) ||
      tpl.subtitle.toLowerCase().includes(q) ||
      tpl.description.toLowerCase().includes(q) ||
      tpl.tags.some((t) => t.toLowerCase().includes(q)) ||
      tpl.recommendedFor.some((r) => r.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const PreviewComponent = previewTemplateId ? getTemplateComponent(previewTemplateId) : null;

  return (
    <div className="min-h-screen bg-[#F8F3EC] text-[#2B1D15]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#F8F3EC]/90 backdrop-blur-md border-b border-[#E6DACB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/portfolio/${portfolio._id}/edit`}
              className="p-2 rounded-xl text-[#6D594D] hover:text-[#2B1D15] hover:bg-[#EFE6D8] transition-colors"
              title="Back to Editor"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-[#2B1D15]">
                Choose a Template
              </h1>
              <p className="text-[11px] text-[#6D594D]">
                Switch layouts dynamically without losing any portfolio data
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/portfolio/${portfolio._id}/preview`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFFDF9] hover:bg-[#EFE6D8] text-[#2B1D15] text-xs font-semibold border border-[#E6DACB] transition-colors"
            >
              <Eye className="w-4 h-4 text-[#DE8638]" />
              <span className="hidden sm:inline">Live Preview</span>
            </Link>
            <Link
              href={`/portfolio/${portfolio._id}/edit`}
              className="px-4 py-2 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white text-xs font-semibold shadow-xs shadow-[#D47A41]/20"
            >
              Done
            </Link>
          </div>
        </div>
      </header>

      {/* Main Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Status Alerts */}
        {error && (
          <div className="p-4 rounded-2xl bg-[#FDF0EE] border border-[#F7CBC7] text-[#C03E31] text-xs">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 rounded-2xl bg-[#ECF5EF] border border-[#BFDFCA] text-[#447250] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{success}</span>
          </div>
        )}

        {/* AI & Profile Intelligence Recommendation Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#D47A41] via-[#BF6A34] to-[#A35525] text-white shadow-sm shadow-[#D47A41]/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Recommended Match ({(recommendation.confidenceScore * 100).toFixed(0)}%)</span>
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
              onClick={() => handleSelectTemplate(recommendation.templateId)}
              disabled={portfolio.template === recommendation.templateId || savingTemplate === recommendation.templateId}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                portfolio.template === recommendation.templateId
                  ? "bg-[#BFDFCA] text-[#1E3F28] cursor-default"
                  : "bg-[#FFFDF9] hover:bg-[#F8F3EC] text-[#D47A41] shadow-sm"
              }`}
            >
              {portfolio.template === recommendation.templateId ? "Current Active" : "Apply Recommendation"}
            </button>
          </div>
        </div>

        {/* Category Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6DACB] pb-4">
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

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTemplates.map((tpl) => {
            const isCurrent = portfolio.template === tpl.id;
            const isSaving = savingTemplate === tpl.id;

            return (
              <div
                key={tpl.id}
                className={`rounded-3xl bg-[#FFFDF9] border-2 transition-all p-6 flex flex-col justify-between space-y-6 shadow-sm ${
                  isCurrent
                    ? "border-[#D47A41] ring-4 ring-[#D47A41]/10"
                    : "border-[#E6DACB] hover:border-[#D47A41]/40 hover:shadow-md"
                }`}
              >
                <div className="space-y-4">
                  {/* Card Header & Badges */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[#2B1D15]">{tpl.name}</h3>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECF5EF] text-[#447250] border border-[#BFDFCA]">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#D47A41] font-medium">{tpl.subtitle}</p>
                    </div>

                    <div
                      className="w-4 h-4 rounded-full shrink-0 border border-white shadow-2xs"
                      style={{ backgroundColor: tpl.accentColor }}
                      title={`Accent Color: ${tpl.accentColor}`}
                    />
                  </div>

                  <p className="text-xs text-[#6D594D] leading-relaxed">
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

                  {/* Recommended Roles */}
                  <div className="space-y-1 pt-2 border-t border-[#EFE6D8]">
                    <span className="text-[10px] uppercase font-bold text-[#9E8C7E] tracking-wider">
                      Recommended For
                    </span>
                    <p className="text-[11px] text-[#52413F]">
                      {tpl.recommendedFor.join(" · ")}
                    </p>
                  </div>
                </div>

                {/* Actions */}
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
                    onClick={() => handleSelectTemplate(tpl.id)}
                    disabled={isCurrent || isSaving}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-[#ECF5EF] text-[#447250] cursor-default"
                        : "bg-[#D47A41] hover:bg-[#BF6A34] text-white shadow-xs shadow-[#D47A41]/20"
                    }`}
                  >
                    {isSaving ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin mx-auto" />
                    ) : isCurrent ? (
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

      {/* Interactive Modal Preview Drawer */}
      {previewTemplateId && PreviewComponent && (
        <div className="fixed inset-0 z-50 bg-[#241812]/70 backdrop-blur-xs flex flex-col animate-in fade-in">
          <div className="bg-[#FFFDF9] border-b border-[#E6DACB] px-6 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-bold text-[#2B1D15]">
                Preview: {getTemplateMetadata(previewTemplateId).name}
              </h3>
              <span className="text-xs text-[#6D594D] hidden sm:inline">
                (Rendering with your active live portfolio data)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  handleSelectTemplate(previewTemplateId as PortfolioTemplate);
                  setPreviewTemplateId(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white text-xs font-bold shadow-xs shadow-[#D47A41]/20 cursor-pointer"
              >
                Apply This Template
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
            <PreviewComponent portfolio={{ ...portfolio, template: previewTemplateId as PortfolioTemplate }} isPreview={true} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function PortfolioTemplatesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F3EC] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#D47A41]" />
        </div>
      }
    >
      <PortfolioTemplatesContent />
    </Suspense>
  );
}
