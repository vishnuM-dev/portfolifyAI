"use client";

import React, { Suspense, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { portfolioApi } from "@/lib/portfolioApi";
import { IPortfolio, PortfolioTemplate } from "@/types/portfolio";
import PortfolioRenderer from "@/components/templates/PortfolioRenderer";
import {
  ArrowLeft,
  Globe,
  Loader2,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

function PortfolioPreviewContent() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const portfolioId = params.id as string;

  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  const fetchPortfolio = useCallback(async () => {
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
      setError("Failed to fetch portfolio data from backend.");
    } finally {
      setLoading(false);
    }
  }, [portfolioId]);

  useEffect(() => {
    if (user && portfolioId) {
      fetchPortfolio();
    }
  }, [user, portfolioId, fetchPortfolio]);

  const handleTemplateChange = async (template: PortfolioTemplate) => {
    if (!portfolio) return;
    setPortfolio((prev) => (prev ? { ...prev, template } : prev));
    try {
      await portfolioApi.updatePortfolio(portfolio._id, { template });
    } catch {
      setError("Failed to save template selection.");
    }
  };

  const handleTogglePublish = async () => {
    if (!portfolio) return;
    setIsPublishing(true);
    setError(null);
    try {
      if (portfolio.status === "published") {
        const res = await portfolioApi.unpublishPortfolio(portfolio._id);
        const unpubPf = res.data?.portfolio || (res as any).portfolio;
        if (res.success && unpubPf) {
          setPortfolio(unpubPf);
          setSuccess("Portfolio reverted to draft.");
          setTimeout(() => setSuccess(null), 3000);
        } else {
          setError(res.message || "Failed to unpublish.");
        }
      } else {
        const res = await portfolioApi.publishPortfolio(portfolio._id);
        const pubPf = res.data?.portfolio || (res as any).portfolio;
        if (res.success && pubPf) {
          setPortfolio(pubPf);
          setSuccess("🎉 Portfolio published! Live at /p/" + pubPf.slug);
          setTimeout(() => setSuccess(null), 4000);
        } else {
          setError(res.message || "Validation failed: Please ensure Profile Name, Headline, Summary, and at least 1 Skill are provided.");
        }
      }
    } catch {
      setError("Error publishing portfolio.");
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

  if (loading || !portfolio) {
    return (
      <div className="min-h-screen bg-[#F8F3EC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#D47A41]" />
          <p className="text-xs text-[#6D594D] font-medium">Loading live preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EC] text-[#2B1D15] flex flex-col">
      {/* Floating Preview Control Bar */}
      <header className="sticky top-0 z-50 bg-[#F8F3EC]/95 backdrop-blur-md border-b border-[#E6DACB] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-16 py-2.5 sm:py-0 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              href={`/portfolio/${portfolio._id}/edit`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFDF9] border border-[#E6DACB] text-xs font-semibold text-[#2B1D15] hover:bg-[#EFE6D8] transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-[#D47A41]" />
              <span className="hidden xs:inline">Back to Editor</span>
              <span className="xs:hidden">Back</span>
            </Link>

            <span className="hidden sm:inline-block text-xs font-semibold text-[#6D594D] truncate max-w-xs">
              Live Preview: <strong className="text-[#2B1D15]">{portfolio.profile?.name || "Untitled"}</strong>
            </span>
          </div>

          {/* Center Template Selector */}
          <div className="flex items-center gap-1 bg-[#FFFDF9] p-1 rounded-xl border border-[#E6DACB] overflow-x-auto">
            {(["professional", "modern", "minimal"] as PortfolioTemplate[]).map((tmpl) => (
              <button
                key={tmpl}
                type="button"
                onClick={() => handleTemplateChange(tmpl)}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  portfolio.template === tmpl
                    ? "bg-[#D47A41] text-white shadow-2xs shadow-[#D47A41]/20"
                    : "text-[#6D594D] hover:text-[#2B1D15] hover:bg-[#F8F3EC]"
                }`}
              >
                {tmpl}
              </button>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleTogglePublish}
              disabled={isPublishing}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                portfolio.status === "published"
                  ? "bg-[#FDF5EC] text-[#D47A41] hover:bg-[#F3CDB7] border border-[#F3CDB7]"
                  : "bg-[#D47A41] hover:bg-[#BF6A34] text-white shadow-2xs shadow-[#D47A41]/20"
              }`}
            >
              {isPublishing ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Globe className="w-3.5 h-3.5" />
              )}
              <span>{portfolio.status === "published" ? "Unpublish" : "Publish"}</span>
            </button>

            {portfolio.status === "published" && (
              <>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="p-2 rounded-xl bg-[#FFFDF9] hover:bg-[#EFE6D8] border border-[#E6DACB] text-[#D47A41] transition-colors"
                  title="Copy Live Public URL"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-[#447250]" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={`/p/${portfolio.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#FFFDF9] hover:bg-[#EFE6D8] border border-[#E6DACB] text-[#D47A41] transition-colors"
                  title="Open Public Portfolio in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </>
            )}
          </div>
        </div>

        {/* Action feedback banners */}
        {error && (
          <div className="bg-[#FDF0EE] border-t border-[#F7CBC7] px-4 py-2 text-center text-xs text-[#C03E31] flex items-center justify-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="bg-[#ECF5EF] border-t border-[#BFDFCA] px-4 py-2 text-center text-xs text-[#447250] flex items-center justify-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#447250]" />
            <span>{success}</span>
          </div>
        )}
      </header>

      {/* Render selected live template */}
      <main className="flex-1">
        <PortfolioRenderer portfolio={portfolio} />
      </main>
    </div>
  );
}

export default function PortfolioPreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F3EC] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#D47A41]" />
            <p className="text-xs text-[#6D594D] font-medium">Loading live preview...</p>
          </div>
        </div>
      }
    >
      <PortfolioPreviewContent />
    </Suspense>
  );
}
