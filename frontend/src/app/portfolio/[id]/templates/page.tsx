"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { portfolioApi } from "@/lib/portfolioApi";
import { IPortfolio, PortfolioTemplate } from "@/types/portfolio";
import { ArrowLeft, Check, Eye, Loader2, Sparkles, Filter, CheckCircle2, Layout, ExternalLink, X } from "lucide-react";
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
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>("all");
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
        if (res.success && res.data?.portfolio) {
          setPortfolio(res.data.portfolio);
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
      if (res.success && res.data?.portfolio) {
        setPortfolio(res.data.portfolio);
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
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#2D5D60]" />
          <p className="text-xs text-[#6B5755] font-medium">Loading templates gallery...</p>
        </div>
      </div>
    );
  }

  const recommendation = recommendTemplate(portfolio);
  const displayedTemplates = filterTemplatesByCategory(selectedCategory);

  const PreviewComponent = previewTemplateId ? getTemplateComponent(previewTemplateId) : null;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B1D1C]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/portfolio/${portfolio._id}/edit`}
              className="p-2 rounded-xl text-[#6B5755] hover:text-[#2B1D1C] hover:bg-[#F3ECE0] transition-colors"
              title="Back to Editor"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-[#2B1D1C]">
                Choose a Template
              </h1>
              <p className="text-[11px] text-[#6B5755]">
                Switch layouts dynamically without losing any portfolio data
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/portfolio/${portfolio._id}/preview`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F3ECE0] text-[#2B1D1C] text-xs font-semibold border border-[#E8DFD3] transition-colors"
            >
              <Eye className="w-4 h-4 text-[#9B4D60]" />
              <span className="hidden sm:inline">Live Preview</span>
            </Link>
            <Link
              href={`/portfolio/${portfolio._id}/edit`}
              className="px-4 py-2 rounded-xl bg-[#2D5D60] hover:bg-[#22484A] text-white text-xs font-semibold shadow-xs"
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
          <div className="p-4 rounded-2xl bg-[#FDF2F4] border border-[#F5CCD4] text-[#9B4D60] text-xs">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 rounded-2xl bg-[#EAF4EE] border border-[#BDE0CB] text-[#2F6141] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{success}</span>
          </div>
        )}

        {/* AI & Profile Intelligence Recommendation Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#2D5D60] to-[#1E3E40] text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#BDE0CB] border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Recommended Match ({(recommendation.confidenceScore * 100).toFixed(0)}%)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {getTemplateMetadata(recommendation.templateId).name}
            </h2>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
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
                  ? "bg-[#BDE0CB] text-[#1E3E40] cursor-default"
                  : "bg-white hover:bg-[#FAF7F2] text-[#2D5D60] shadow-sm"
              }`}
            >
              {portfolio.template === recommendation.templateId ? "Current Active" : "Apply Recommendation"}
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E8DFD3] pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(["all", "developer", "executive", "creative", "minimal"] as TemplateCategory[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#2D5D60] text-white shadow-2xs"
                    : "bg-[#FFFFFF] border border-[#E8DFD3] text-[#6B5755] hover:text-[#2B1D1C] hover:bg-[#F3ECE0]"
                }`}
              >
                {cat === "all" ? "All 10 Templates" : `${cat} Themes`}
              </button>
            ))}
          </div>
          <span className="text-xs text-[#8A7573] font-medium">
            Showing {displayedTemplates.length} layouts
          </span>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTemplates.map((tpl) => {
            const isCurrent = portfolio.template === tpl.id;
            const isSaving = savingTemplate === tpl.id;

            return (
              <div
                key={tpl.id}
                className={`rounded-3xl bg-[#FFFFFF] border-2 transition-all p-6 flex flex-col justify-between space-y-6 shadow-sm ${
                  isCurrent
                    ? "border-[#2D5D60] ring-4 ring-[#2D5D60]/10"
                    : "border-[#E8DFD3] hover:border-[#2D5D60]/40 hover:shadow-md"
                }`}
              >
                <div className="space-y-4">
                  {/* Card Header & Badges */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[#2B1D1C]">{tpl.name}</h3>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF4EE] text-[#2F6141] border border-[#BDE0CB]">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#2D5D60] font-medium">{tpl.subtitle}</p>
                    </div>

                    <div
                      className="w-4 h-4 rounded-full shrink-0 border border-white shadow-2xs"
                      style={{ backgroundColor: tpl.accentColor }}
                      title={`Accent Color: ${tpl.accentColor}`}
                    />
                  </div>

                  <p className="text-xs text-[#6B5755] leading-relaxed">
                    {tpl.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tpl.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold bg-[#FAF7F2] text-[#6B5755] border border-[#E8DFD3]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Recommended Roles */}
                  <div className="space-y-1 pt-2 border-t border-[#F3ECE0]">
                    <span className="text-[10px] uppercase font-bold text-[#8A7573] tracking-wider">
                      Recommended For
                    </span>
                    <p className="text-[11px] text-[#52413F]">
                      {tpl.recommendedFor.join(" · ")}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-[#F3ECE0]">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplateId(tpl.id)}
                    className="flex-1 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3ECE0] text-[#2B1D1C] text-xs font-semibold border border-[#E8DFD3] transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#9B4D60]" />
                    <span>Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectTemplate(tpl.id)}
                    disabled={isCurrent || isSaving}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-[#EAF4EE] text-[#2F6141] cursor-default"
                        : "bg-[#2D5D60] hover:bg-[#22484A] text-white shadow-xs"
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col animate-in fade-in">
          <div className="bg-[#FAF7F2] border-b border-[#E8DFD3] px-6 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-bold text-[#2B1D1C]">
                Preview: {getTemplateMetadata(previewTemplateId).name}
              </h3>
              <span className="text-xs text-[#6B5755] hidden sm:inline">
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
                className="px-4 py-2 rounded-xl bg-[#2D5D60] hover:bg-[#22484A] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Apply This Template
              </button>
              <button
                type="button"
                onClick={() => setPreviewTemplateId(null)}
                className="p-2 rounded-xl text-[#6B5755] hover:text-[#2B1D1C] hover:bg-[#E8DFD3] transition-colors cursor-pointer"
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
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#2D5D60]" />
        </div>
      }
    >
      <PortfolioTemplatesContent />
    </Suspense>
  );
}
