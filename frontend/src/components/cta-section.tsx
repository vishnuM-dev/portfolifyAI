"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Zap, FileText } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D47A41]/[0.03] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#D47A41]/8 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-b from-[#FFFDF9] to-[#F8F3EC] border border-[#E6DACB] p-8 sm:p-14 text-center shadow-2xl shadow-[#2B1D15]/8 relative overflow-hidden">
          {/* Subtle top edge border glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#D47A41]/50 to-transparent" />

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF1E8] border border-[#F6D5C2] text-xs font-bold text-[#D47A41] mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Transformation in 2 Minutes</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2B1D15] leading-tight max-w-2xl mx-auto">
            Your Resume Tells Your Story.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D47A41] via-[#E8955F] to-[#2B1D15]">
              Your Portfolio Shows It.
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#6D594D] max-w-xl mx-auto mt-4 mb-8 leading-relaxed">
            Create a professional online presence from the information you already have.
          </p>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white font-semibold text-sm shadow-xl shadow-[#D47A41]/25 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer active:translate-y-0"
              id="cta-build-portfolio-btn"
            >
              <Sparkles className="w-4 h-4 text-[#FDF1E8]" />
              <span>Build My Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Subtle reassurance points */}
          <div className="mt-8 pt-6 border-t border-[#E6DACB] flex flex-wrap items-center justify-center gap-6 text-xs text-[#6D594D]">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#E8955F]" />
              <span>Extracts in &lt; 15 seconds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#D47A41]" />
              <span>Keep existing resume formatting intact</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#447250]" />
              <span>Free to start</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
