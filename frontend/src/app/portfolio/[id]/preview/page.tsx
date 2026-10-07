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
      if (res.success && res.data?.portfolio) {
        setPortfolio(res.data.portfolio);
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
        if (res.success && res.data?.portfolio) {
          setPortfolio(res.data.portfolio);
          setSuccess("Portfolio reverted to draft.");
          setTimeout(() => setSuccess(null), 3000);
        } else {
          setError(res.message || "Failed to unpublish.");
        }
      } else {
        const res = await portfolioApi.publishPortfolio(portfolio._id);
        if (res.success && res.data?.portfolio) {
          setPortfolio(res.data.portfolio);
          setSuccess("🎉 Portfolio published! Live at /p/" + res.data.portfolio.slug);
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
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#2D5D60]" />
          <p className="text-xs text-[#6B5755] font-medium">Loading live preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B1D1C] flex flex-col">
      {/* Floating Preview Control Bar */}
      <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD3] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/portfolio/${portfolio._id}/edit`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E8DFD3] text-xs font-semibold text-[#2B1D1C] hover:bg-[#F3ECE0] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#2D5D60]" />
              <span>Back to Editor</span>
            </Link>

            <span className="hidden sm:inline-block text-xs font-semibold text-[#6B5755]">
              Live Preview: <strong className="text-[#2B1D1C]">{portfolio.profile?.name || "Untitled"}</strong>
            </span>
          </div>

          {/* Center Template Selector */}
          <div className="flex items-center gap-1.5 bg-[#FFFFFF] p-1 rounded-xl border border-[#E8DFD3]">
            {(["professional", "modern", "minimal"] as PortfolioTemplate[]).map((tmpl) => (
              <button
                key={tmpl}
                type="button"
                onClick={() => handleTemplateChange(tmpl)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  portfolio.template === tmpl
                    ? "bg-[#2D5D60] text-white shadow-2xs"
                    : "text-[#6B5755] hover:text-[#2B1D1C] hover:bg-[#FAF7F2]"
                }`}
              >
                {tmpl}
              </button>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTogglePublish}
              disabled={isPublishing}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                portfolio.status === "published"
                  ? "bg-[#FAF0F2] text-[#9B4D60] hover:bg-[#F5CCD4] border border-[#EAD2D8]"
                  : "bg-[#2D5D60] hover:bg-[#22484A] text-white shadow-2xs"
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
                  className="p-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F3ECE0] border border-[#E8DFD3] text-[#2D5D60] transition-colors"
                  title="Copy Live Public URL"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-[#366B4A]" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={`/p/${portfolio.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F3ECE0] border border-[#E8DFD3] text-[#2D5D60] transition-colors"
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
          <div className="bg-[#FDF2F4] border-t border-[#F5CCD4] px-4 py-2 text-center text-xs text-[#9B4D60] flex items-center justify-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="bg-[#EAF4EE] border-t border-[#BDE0CB] px-4 py-2 text-center text-xs text-[#2F6141] flex items-center justify-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#366B4A]" />
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
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#2D5D60]" />
            <p className="text-xs text-[#6B5755] font-medium">Loading live preview...</p>
          </div>
        </div>
      }
    >
      <PortfolioPreviewContent />
    </Suspense>
  );
}
