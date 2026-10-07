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
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#2D5D60]" />
          <p className="text-xs text-[#6B5755] font-medium">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-[#2B1D1C] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-[#FFFFFF] border border-[#E8DFD3] rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#FDF2F4] border border-[#F5CCD4] text-[#9B4D60] flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold text-[#2B1D1C]">Portfolio Not Found</h1>
            <p className="text-xs text-[#6B5755] leading-relaxed">
              {error || "This portfolio does not exist, has been unpublished, or is currently in draft mode."}
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2D5D60] hover:bg-[#22484A] text-white text-xs font-semibold shadow-xs transition-colors"
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
    <div className="min-h-screen bg-[#FAF7F2]">
      <PortfolioRenderer portfolio={portfolio} />
    </div>
  );
}

export default function PublicPortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#2D5D60]" />
            <p className="text-xs text-[#6B5755] font-medium">Loading portfolio...</p>
          </div>
        </div>
      }
    >
      <PublicPortfolioContent />
    </Suspense>
  );
}
