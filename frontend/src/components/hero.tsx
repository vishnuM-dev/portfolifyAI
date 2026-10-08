"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, LayoutTemplate } from "lucide-react";
import { PortfolioMockup } from "./portfolio-mockup";

export function Hero() {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28 overflow-hidden">
      {/* Precision ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] lg:w-[900px] h-[320px] sm:h-[400px] bg-gradient-to-tr from-[#D47A41]/10 via-[#E8955F]/8 to-transparent blur-[100px] sm:blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#D47A41]/[0.03] to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#FDF1E8] border border-[#F6D5C2] text-xs font-medium text-[#D47A41] shadow-2xs max-w-full">
              <span className="flex h-2 w-2 rounded-full bg-[#E8955F] animate-pulse shrink-0" />
              <span className="truncate">AI-Powered Resume-to-Website Engine</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2B1D15] leading-[1.12]">
              Turn Your Resume Into a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D47A41] via-[#E8955F] to-[#2B1D15]">
                Professional Portfolio.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base lg:text-lg text-[#6D594D] leading-relaxed max-w-xl">
              Upload your resume, let AI organize your experience, choose a design, and publish a professional portfolio website in minutes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white font-semibold text-xs sm:text-sm shadow-lg shadow-[#D47A41]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer active:translate-y-0"
                id="hero-create-portfolio-btn"
              >
                <Sparkles className="w-4 h-4 text-[#FDF1E8]" />
                <span>Create My Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#templates"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFFDF9] hover:bg-[#F3EBE0] text-[#2B1D15] font-medium text-xs sm:text-sm border border-[#E6DACB] hover:border-[#D5C3AE] shadow-2xs transition-all duration-200 cursor-pointer"
                id="hero-explore-templates-btn"
              >
                <LayoutTemplate className="w-4 h-4 text-[#6D594D]" />
                <span>Explore Templates</span>
              </a>
            </div>

            {/* Trust Points */}
            <div className="pt-4 border-t border-[#E6DACB] flex flex-wrap items-center gap-y-2.5 gap-x-4 sm:gap-x-6 text-xs text-[#6D594D]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#447250] shrink-0" />
                <span>PDF & DOCX supported</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#447250] shrink-0" />
                <span>No coding required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#447250] shrink-0" />
                <span>Instant custom URL</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Product Preview */}
          <div className="lg:col-span-6 lg:pl-4">
            <div className="relative">
              {/* Subtle back decorative glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#D47A41]/20 via-[#E8955F]/15 to-[#D5C8B8]/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
              
              <PortfolioMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

