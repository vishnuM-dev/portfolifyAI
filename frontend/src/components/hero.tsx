"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, LayoutTemplate } from "lucide-react";
import { PortfolioMockup } from "./portfolio-mockup";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Precision ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-[#2D5D60]/10 via-[#E88661]/8 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#2D5D60]/[0.03] to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-7 text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0F2] border border-[#EAD2D8] text-xs font-medium text-[#9B4D60] shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#E88661] animate-pulse" />
              <span>AI-Powered Resume-to-Website Engine</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2B1D1C] leading-[1.12]">
              Turn Your Resume Into a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D5D60] via-[#3C6E71] to-[#9B4D60]">
                Professional Portfolio.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#5A4947] leading-relaxed max-w-xl">
              Upload your resume, let AI organize your experience, choose a design, and publish a professional portfolio website in minutes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#2D5D60] hover:bg-[#22484A] text-white font-semibold text-sm shadow-lg shadow-[#2D5D60]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer active:translate-y-0"
                id="hero-create-portfolio-btn"
              >
                <Sparkles className="w-4 h-4 text-[#F3ECE0]" />
                <span>Create My Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#templates"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F4EDE2] text-[#2B1D1C] font-medium text-sm border border-[#E8DFD3] hover:border-[#D1C4B4] shadow-sm transition-all duration-200 cursor-pointer"
                id="hero-explore-templates-btn"
              >
                <LayoutTemplate className="w-4 h-4 text-[#7B6866]" />
                <span>Explore Templates</span>
              </a>
            </div>

            {/* Trust Points */}
            <div className="pt-4 border-t border-[#E8DFD3] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#6B5755]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#366B4A]" />
                <span>PDF & DOCX supported</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#366B4A]" />
                <span>No coding required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#366B4A]" />
                <span>Instant custom URL</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Product Preview */}
          <div className="lg:col-span-6 lg:pl-4">
            <div className="relative">
              {/* Subtle back decorative glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#2D5D60]/20 via-[#E88661]/15 to-[#9B4D60]/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
              
              <PortfolioMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
