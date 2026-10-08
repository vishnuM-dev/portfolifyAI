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
        <div className="p-4 rounded-xl bg-[#F8F3EC] border border-[#E6DACB] space-y-3">
          <div className="border border-dashed border-[#D47A41]/40 rounded-lg p-4 text-center bg-[#FDF1E8]/60">
            <FileCheck className="w-8 h-8 text-[#D47A41] mx-auto mb-2" />
            <p className="text-xs font-bold text-[#2B1D15]">resume-staff-engineer.pdf</p>
            <p className="text-[10px] text-[#9E8C7E]">142 KB • PDF Document</p>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#6D594D]">
            <span className="flex items-center gap-1 text-[#447250] font-semibold">
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
        <div className="p-4 rounded-xl bg-[#F8F3EC] border border-[#E6DACB] space-y-2.5 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#E6DACB]">
            <span className="text-[#6D594D] font-bold">Extracted Data</span>
            <span className="text-[#447250] text-[11px] font-mono font-bold">Verified</span>
          </div>
          <div className="space-y-1.5">
            <div className="p-2 rounded bg-[#FFFDF9] border border-[#E6DACB] flex items-center justify-between shadow-2xs">
              <span className="text-[#2B1D15]">Roles & Companies</span>
              <span className="text-[#D47A41] font-mono text-[11px] font-bold">3 Indexed</span>
            </div>
            <div className="p-2 rounded bg-[#FFFDF9] border border-[#E6DACB] flex items-center justify-between shadow-2xs">
              <span className="text-[#2B1D15]">Technical Skills</span>
              <span className="text-[#DE8638] font-mono text-[11px] font-bold">14 Found</span>
            </div>
            <div className="p-2 rounded bg-[#FFFDF9] border border-[#E6DACB] flex items-center justify-between shadow-2xs">
              <span className="text-[#2B1D15]">Key Projects</span>
              <span className="text-[#E8955F] font-mono text-[11px] font-bold">4 Linked</span>
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
        <div className="p-4 rounded-xl bg-[#F8F3EC] border border-[#E6DACB] space-y-2.5">
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg bg-[#FDF1E8] border border-[#D47A41] text-center shadow-xs">
              <div className="w-full h-8 rounded bg-[#2B1D15] mb-1 flex items-center justify-center">
                <span className="text-[9px] font-mono text-[#FDF1E8]">Dev</span>
              </div>
              <span className="text-[10px] font-bold text-[#D47A41]">Developer</span>
            </div>
            <div className="p-2 rounded-lg bg-[#FFFDF9] border border-[#E6DACB] text-center">
              <div className="w-full h-8 rounded bg-[#F8F3EC] border border-[#E6DACB] mb-1 flex items-center justify-center">
                <span className="text-[9px] text-[#9E8C7E]">Min</span>
              </div>
              <span className="text-[10px] text-[#6D594D] font-medium">Minimal</span>
            </div>
            <div className="p-2 rounded-lg bg-[#FFFDF9] border border-[#E6DACB] text-center">
              <div className="w-full h-8 rounded bg-[#F8F3EC] border border-[#E6DACB] mb-1 flex items-center justify-center">
                <span className="text-[9px] text-[#9E8C7E]">Exec</span>
              </div>
              <span className="text-[10px] text-[#6D594D] font-medium">Executive</span>
            </div>
          </div>
          <p className="text-[11px] text-center text-[#6D594D] pt-1">
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
        <div className="p-4 rounded-xl bg-[#F8F3EC] border border-[#E6DACB] space-y-3">
          <div className="p-2.5 rounded-lg bg-[#ECF5EF] border border-[#BDE0CB] text-center">
            <span className="text-[10px] font-mono uppercase text-[#345D40] font-bold tracking-wider">
              Live & Deployed
            </span>
            <div className="text-xs font-mono text-[#2B1D15] font-semibold mt-1 flex items-center justify-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#447250]" />
              <span>portfolify.ai/yourname</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#6D594D] px-1">
            <span>Global Edge CDN</span>
            <span className="text-[#447250] font-bold">99.99% Uptime</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#EFE6D8]/50 border-t border-[#E6DACB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D47A41]">
            Intuitive Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2B1D15]">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-[#6D594D] leading-relaxed">
            Go from a static PDF document to a high-impact portfolio website in four straightforward steps.
          </p>
        </div>

        {/* 4 Large Steps with Visual Connection */}
        <div className="relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[2px] bg-gradient-to-r from-[#D47A41]/20 via-[#E8955F]/25 to-[#447250]/25 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative flex flex-col justify-between p-6 rounded-2xl bg-[#FFFDF9] border border-[#E6DACB] hover:border-[#D47A41]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2B1D15]/5 group"
                >
                  <div>
                    {/* Step badge & icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#FDF1E8] text-[#D47A41] border border-[#F6D5C2]">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#F8F3EC] border border-[#E6DACB] flex items-center justify-center text-[#2B1D15] group-hover:scale-105 group-hover:bg-[#D47A41] group-hover:text-white transition-all duration-200 shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#2B1D15] tracking-tight mb-2.5">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#6D594D] leading-relaxed mb-6">
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
