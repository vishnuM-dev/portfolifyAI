"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Zap, FileText } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2D5D60]/[0.03] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#2D5D60]/8 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-b from-[#FFFFFF] to-[#F5EFE6] border border-[#E8DFD3] p-8 sm:p-14 text-center shadow-2xl shadow-[#2B1D1C]/8 relative overflow-hidden">
          {/* Subtle top edge border glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#2D5D60]/50 to-transparent" />

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F1F2] border border-[#C3DCDE] text-xs font-bold text-[#2D5D60] mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Transformation in 2 Minutes</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2B1D1C] leading-tight max-w-2xl mx-auto">
            Your Resume Tells Your Story.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D5D60] via-[#3C6E71] to-[#9B4D60]">
              Your Portfolio Shows It.
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#5A4947] max-w-xl mx-auto mt-4 mb-8 leading-relaxed">
            Create a professional online presence from the information you already have.
          </p>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#2D5D60] hover:bg-[#22484A] text-white font-semibold text-sm shadow-xl shadow-[#2D5D60]/25 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer active:translate-y-0"
              id="cta-build-portfolio-btn"
            >
              <Sparkles className="w-4 h-4 text-[#F3ECE0]" />
              <span>Build My Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Subtle reassurance points */}
          <div className="mt-8 pt-6 border-t border-[#E8DFD3] flex flex-wrap items-center justify-center gap-6 text-xs text-[#6B5755]">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#E88661]" />
              <span>Extracts in &lt; 15 seconds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#2D5D60]" />
              <span>Keep existing resume formatting intact</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#366B4A]" />
              <span>Free to start</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
