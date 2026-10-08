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
    <div className="min-h-screen bg-[#F8F3EC] text-[#2B1D15] flex flex-col justify-between relative overflow-x-hidden selection:bg-[#D47A41]/20 selection:text-[#D47A41]">
      {/* Background ambient pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D47A41]/6 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header Row with Brand & Back Link */}
      <header className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 group cursor-pointer"
          id="auth-brand-link"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D47A41] to-[#E8955F] flex items-center justify-center shadow-md shadow-[#D47A41]/20 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-base sm:text-lg tracking-tight text-[#2B1D15] group-hover:text-[#D47A41] transition-colors">
              Portfolify
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FDF1E8] text-[#D47A41] border border-[#F6D5C2]">
              AI
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#6D594D] hover:text-[#2B1D15] px-3 py-1.5 rounded-lg hover:bg-[#F3EBE0] transition-colors"
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
            <div className="w-full max-w-md rounded-2xl bg-[#FFFDF9] border border-[#E6DACB] p-6 sm:p-8 shadow-2xl shadow-[#2B1D15]/8 relative">
              {/* Subtle top edge border glow */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#D47A41]/40 to-transparent" />

              <div className="text-center sm:text-left mb-6 space-y-1.5">
                <h1 className="text-2xl font-bold tracking-tight text-[#2B1D15]">
                  {heading}
                </h1>
                <p className="text-xs sm:text-sm text-[#6D594D] leading-relaxed">
                  {subheading}
                </p>
              </div>

              {children}
            </div>
          </div>

          {/* Right Visual Panel (Desktop only, hidden on mobile/tablet) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center space-y-6 pl-2">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D47A41] font-mono">
                Career Infrastructure
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2B1D15] tracking-tight leading-snug">
                Your resume is the beginning. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D47A41] via-[#E8955F] to-[#2B1D15]">
                  Your portfolio is the proof.
                </span>
              </h2>
              <p className="text-xs text-[#6D594D] leading-relaxed">
                Join thousands of software engineers, product designers, and technology executives presenting their achievements in a clean, published online portfolio.
              </p>
            </div>

            {/* Small Portfolio Preview Widget */}
            <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E6DACB] shadow-md space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#E6DACB] text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FDF1E8] text-[#D47A41] font-bold flex items-center justify-center text-xs">
                    AC
                  </div>
                  <div>
                    <div className="font-bold text-[#2B1D15] text-xs">Alex Chen</div>
                    <div className="text-[10px] text-[#6D594D]">Staff Systems Engineer</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#447250] bg-[#ECF5EF] px-2 py-0.5 rounded border border-[#BDE0CB]">
                  Live
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {["TypeScript", "Distributed Systems", "Go", "PostgreSQL"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#F8F3EC] text-[#2B1D15] border border-[#E6DACB]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-[#6D594D] font-mono">
                <span className="flex items-center gap-1 text-[#6D594D]">
                  <Globe className="w-3 h-3 text-[#D47A41]" />
                  <span>portfolify.ai/alex-chen</span>
                </span>
                <span className="text-[#447250] font-semibold">Ready in 2m</span>
              </div>
            </div>

            {/* Reassurance points */}
            <div className="space-y-2 pt-2 text-xs text-[#6D594D]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#447250]" />
                <span>Zero design skills required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#447250]" />
                <span>Instant custom domain support</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-[#9E8C7E] border-t border-[#E6DACB]">
        © 2026 Portfolify AI. All rights reserved.
      </footer>
    </div>
  );
}
