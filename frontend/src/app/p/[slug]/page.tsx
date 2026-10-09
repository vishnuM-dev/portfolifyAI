"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { portfolioApi } from "@/lib/portfolioApi";
import { IPortfolio } from "@/types/portfolio";
import PortfolioRenderer from "@/components/templates/PortfolioRenderer";
import { Loader2, Home, AlertCircle } from "lucide-react";

function PublicPortfolioContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPublic() {
      if (!slug) return;
      try {
        setLoading(true);
        setError(null);
        const res = await portfolioApi.getPublicPortfolio(slug);
        if (res.success && res.portfolio) {
          setPortfolio(res.portfolio);
          if (typeof document !== "undefined" && res.portfolio.profile?.name) {
            document.title = `${res.portfolio.profile.name} — ${res.portfolio.profile.headline || "Portfolio"} | Portfolify AI`;
          }
        } else {
          setError(res.message || "Portfolio not found or is currently private.");
        }
      } catch {
        setError("Unable to connect to the portfolio server.");
      } finally {
        setLoading(false);
      }
    }

    loadPublic();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F3EC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#D47A41]" />
          <p className="text-xs text-[#6D594D] font-medium">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-[#F8F3EC] text-[#2B1D15] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-[#FFFDF9] border border-[#E6DACB] rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#FDF0EE] border border-[#F7CBC7] text-[#C03E31] flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold text-[#2B1D15]">Portfolio Not Found</h1>
            <p className="text-xs text-[#6D594D] leading-relaxed">
              {error || "This portfolio does not exist, has been unpublished, or is currently in draft mode."}
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white text-xs font-semibold shadow-xs shadow-[#D47A41]/20 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Go to Portfolify AI</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <PortfolioRenderer portfolio={portfolio} />

      {/* Subtle Floating Branding Badge */}
      <aside aria-label="Built with Portfolify AI" className="fixed bottom-4 right-4 z-40">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1F1915]/80 hover:bg-[#1F1915] text-[#F5EDE3] text-[11px] font-medium backdrop-blur-md shadow-lg border border-white/10 transition-all hover:scale-105"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D47A41]" />
          <span>Built with <strong>Portfolify AI</strong></span>
        </Link>
      </aside>
    </div>
  );
}

export default function PublicPortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F3EC] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#D47A41]" />
            <p className="text-xs text-[#6D594D] font-medium">Loading portfolio...</p>
          </div>
        </div>
      }
    >
      <PublicPortfolioContent />
    </Suspense>
  );
}
