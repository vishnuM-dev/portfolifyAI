"use client";

import {
  FileUp,
  UserCheck,
  Palette,
  Rocket,
  Check,
  FileCheck,
  Globe,
} from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "Step 01",
      title: "Upload Your Resume",
      description:
        "Upload your current resume in PDF or DOCX format. Our intelligent parser reads text, career progression, skills, and technical stacks in seconds.",
      icon: FileUp,
      preview: (
        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-3">
          <div className="border border-dashed border-[#2D5D60]/40 rounded-lg p-4 text-center bg-[#E8F1F2]/60">
            <FileCheck className="w-8 h-8 text-[#2D5D60] mx-auto mb-2" />
            <p className="text-xs font-bold text-[#2B1D1C]">resume-staff-engineer.pdf</p>
            <p className="text-[10px] text-[#7B6866]">142 KB • PDF Document</p>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#6B5755]">
            <span className="flex items-center gap-1 text-[#366B4A] font-semibold">
              <Check className="w-3 h-3" /> Ready for AI Analysis
            </span>
            <span>100% Secure</span>
          </div>
        </div>
      ),
    },
    {
      step: "Step 02",
      title: "Review Your Information",
      description:
        "Verify your auto-extracted details. Edit roles, add missing achievements, reorder projects, and customize highlight metrics with real-time feedback.",
      icon: UserCheck,
      preview: (
        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-2.5 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD3]">
            <span className="text-[#6B5755] font-bold">Extracted Data</span>
            <span className="text-[#366B4A] text-[11px] font-mono font-bold">Verified</span>
          </div>
          <div className="space-y-1.5">
            <div className="p-2 rounded bg-[#FFFFFF] border border-[#E8DFD3] flex items-center justify-between shadow-2xs">
              <span className="text-[#4A3B39]">Roles & Companies</span>
              <span className="text-[#2D5D60] font-mono text-[11px] font-bold">3 Indexed</span>
            </div>
            <div className="p-2 rounded bg-[#FFFFFF] border border-[#E8DFD3] flex items-center justify-between shadow-2xs">
              <span className="text-[#4A3B39]">Technical Skills</span>
              <span className="text-[#9B4D60] font-mono text-[11px] font-bold">14 Found</span>
            </div>
            <div className="p-2 rounded bg-[#FFFFFF] border border-[#E8DFD3] flex items-center justify-between shadow-2xs">
              <span className="text-[#4A3B39]">Key Projects</span>
              <span className="text-[#E88661] font-mono text-[11px] font-bold">4 Linked</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "Step 03",
      title: "Choose Your Template",
      description:
        "Pick a design tailored to your role. Whether you prefer terminal-style developer portfolios or clean executive layouts, customize colors and fonts instantly.",
      icon: Palette,
      preview: (
        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-2.5">
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg bg-[#E8F1F2] border border-[#2D5D60] text-center shadow-xs">
              <div className="w-full h-8 rounded bg-[#2B1D1C] mb-1 flex items-center justify-center">
                <span className="text-[9px] font-mono text-[#E8F1F2]">Dev</span>
              </div>
              <span className="text-[10px] font-bold text-[#2D5D60]">Developer</span>
            </div>
            <div className="p-2 rounded-lg bg-[#FFFFFF] border border-[#E8DFD3] text-center">
              <div className="w-full h-8 rounded bg-[#FAF7F2] border border-[#E8DFD3] mb-1 flex items-center justify-center">
                <span className="text-[9px] text-[#7B6866]">Min</span>
              </div>
              <span className="text-[10px] text-[#6B5755] font-medium">Minimal</span>
            </div>
            <div className="p-2 rounded-lg bg-[#FFFFFF] border border-[#E8DFD3] text-center">
              <div className="w-full h-8 rounded bg-[#FAF7F2] border border-[#E8DFD3] mb-1 flex items-center justify-center">
                <span className="text-[9px] text-[#7B6866]">Exec</span>
              </div>
              <span className="text-[10px] text-[#6B5755] font-medium">Executive</span>
            </div>
          </div>
          <p className="text-[11px] text-center text-[#6B5755] pt-1">
            Instant live rendering across all themes
          </p>
        </div>
      ),
    },
    {
      step: "Step 04",
      title: "Publish Your Portfolio",
      description:
        "Hit publish to launch your custom portfolio. Get a lightning-fast public link to add to job applications, LinkedIn, email signatures, and resumes.",
      icon: Rocket,
      preview: (
        <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-3">
          <div className="p-2.5 rounded-lg bg-[#EAF4EE] border border-[#BDE0CB] text-center">
            <span className="text-[10px] font-mono uppercase text-[#2F6141] font-bold tracking-wider">
              Live & Deployed
            </span>
            <div className="text-xs font-mono text-[#2B1D1C] font-semibold mt-1 flex items-center justify-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#366B4A]" />
              <span>portfolify.ai/yourname</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#6B5755] px-1">
            <span>Global Edge CDN</span>
            <span className="text-[#366B4A] font-bold">99.99% Uptime</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#F5EFE6]/70 border-t border-[#E8DFD3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2D5D60]">
            Intuitive Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2B1D1C]">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-[#6B5755] leading-relaxed">
            Go from a static PDF document to a high-impact portfolio website in four straightforward steps.
          </p>
        </div>

        {/* 4 Large Steps with Visual Connection */}
        <div className="relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[2px] bg-gradient-to-r from-[#2D5D60]/20 via-[#E88661]/25 to-[#366B4A]/25 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative flex flex-col justify-between p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFD3] hover:border-[#2D5D60]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2B1D1C]/5 group"
                >
                  <div>
                    {/* Step badge & icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#E8F1F2] text-[#2D5D60] border border-[#C3DCDE]">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] flex items-center justify-center text-[#2B1D1C] group-hover:scale-105 group-hover:bg-[#2D5D60] group-hover:text-white transition-all duration-200 shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#2B1D1C] tracking-tight mb-2.5">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#6B5755] leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Step visual widget preview */}
                  <div className="mt-auto">
                    {item.preview}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
