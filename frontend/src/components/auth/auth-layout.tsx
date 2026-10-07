"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, CheckCircle2, Globe } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  heading: string;
  subheading: string;
}

export function AuthLayout({ children, heading, subheading }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B1D1C] flex flex-col justify-between relative overflow-x-hidden selection:bg-[#2D5D60]/20 selection:text-[#2D5D60]">
      {/* Background ambient pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2D5D60]/6 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header Row with Brand & Back Link */}
      <header className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 group cursor-pointer"
          id="auth-brand-link"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2D5D60] to-[#3C6E71] flex items-center justify-center shadow-md shadow-[#2D5D60]/20 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-base sm:text-lg tracking-tight text-[#2B1D1C] group-hover:text-[#2D5D60] transition-colors">
              Portfolify
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FAF0F2] text-[#9B4D60] border border-[#EAD2D8]">
              AI
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#6B5755] hover:text-[#2B1D1C] px-3 py-1.5 rounded-lg hover:bg-[#F3ECE0] transition-colors"
          id="auth-back-to-home"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Form Card */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-md rounded-2xl bg-[#FFFFFF] border border-[#E8DFD3] p-6 sm:p-8 shadow-2xl shadow-[#2B1D1C]/8 relative">
              {/* Subtle top edge border glow */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#2D5D60]/40 to-transparent" />

              <div className="text-center sm:text-left mb-6 space-y-1.5">
                <h1 className="text-2xl font-bold tracking-tight text-[#2B1D1C]">
                  {heading}
                </h1>
                <p className="text-xs sm:text-sm text-[#6B5755] leading-relaxed">
                  {subheading}
                </p>
              </div>

              {children}
            </div>
          </div>

          {/* Right Visual Panel (Desktop only, hidden on mobile/tablet) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center space-y-6 pl-2">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2D5D60] font-mono">
                Career Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2B1D1C] tracking-tight leading-snug">
                Your resume is the beginning. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D5D60] via-[#3C6E71] to-[#9B4D60]">
                  Your portfolio is the proof.
                </span>
              </h2>
              <p className="text-xs text-[#6B5755] leading-relaxed">
                Join thousands of software engineers, product designers, and technology executives presenting their achievements in a clean, published online portfolio.
              </p>
            </div>

            {/* Small Portfolio Preview Widget */}
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-md space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#E8DFD3] text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#E8F1F2] text-[#2D5D60] font-bold flex items-center justify-center text-xs">
                    AC
                  </div>
                  <div>
                    <div className="font-bold text-[#2B1D1C] text-xs">Alex Chen</div>
                    <div className="text-[10px] text-[#6B5755]">Staff Systems Engineer</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#366B4A] bg-[#EAF4EE] px-2 py-0.5 rounded border border-[#BDE0CB]">
                  Live
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {["TypeScript", "Distributed Systems", "Go", "PostgreSQL"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#FAF7F2] text-[#5A4947] border border-[#E8DFD3]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-[#6B5755] font-mono">
                <span className="flex items-center gap-1 text-[#6B5755]">
                  <Globe className="w-3 h-3 text-[#2D5D60]" />
                  <span>portfolify.ai/alex-chen</span>
                </span>
                <span className="text-[#366B4A] font-semibold">Ready in 2m</span>
              </div>
            </div>

            {/* Reassurance points */}
            <div className="space-y-2 pt-2 text-xs text-[#6B5755]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#366B4A]" />
                <span>Zero design skills required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#366B4A]" />
                <span>Instant custom domain support</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-[#7B6866] border-t border-[#E8DFD3]">
        © 2026 Portfolify AI. All rights reserved.
      </footer>
    </div>
  );
}
