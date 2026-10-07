"use client";

import { UploadCloud, Cpu, Palette, Globe2 } from "lucide-react";

export function ValueSteps() {
  const steps = [
    {
      num: "01",
      title: "Upload Resume",
      description: "Drop your PDF or DOCX file. Our engine parses raw text, layout, and career timelines.",
      icon: UploadCloud,
      color: "text-[#2D5D60]",
      border: "hover:border-[#2D5D60]/50",
      bgSubtle: "bg-[#E8F1F2]",
    },
    {
      num: "02",
      title: "AI Extracts Details",
      description: "Structured extraction of roles, key achievements, metrics, skills, and education.",
      icon: Cpu,
      color: "text-[#9B4D60]",
      border: "hover:border-[#9B4D60]/50",
      bgSubtle: "bg-[#FAF0F2]",
    },
    {
      num: "03",
      title: "Choose Your Design",
      description: "Select from purpose-built portfolio templates designed for developers and leaders.",
      icon: Palette,
      color: "text-[#E88661]",
      border: "hover:border-[#E88661]/50",
      bgSubtle: "bg-[#FDF1EC]",
    },
    {
      num: "04",
      title: "Publish Your Portfolio",
      description: "Instantly launch your portfolio on a high-speed custom URL ready to share anywhere.",
      icon: Globe2,
      color: "text-[#366B4A]",
      border: "hover:border-[#366B4A]/50",
      bgSubtle: "bg-[#EAF4EE]",
    },
  ];

  return (
    <section className="py-16 border-y border-[#E8DFD3] bg-[#F5EFE6]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2D5D60]">
            Simplified Workflow
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#2B1D1C] tracking-tight mt-1.5">
            From Resume → Professional Portfolio
          </h2>
          <p className="text-sm text-[#6B5755] mt-2">
            Four simple steps to transform your document into an interactive, recruiter-ready website.
          </p>
        </div>

        {/* 4 Numbered Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`relative p-5 rounded-xl bg-[#FFFFFF] border border-[#E8DFD3] ${step.border} transition-all duration-200 group hover:-translate-y-1 hover:shadow-lg hover:shadow-[#2B1D1C]/5`}
              >
                {/* Header with Step Number & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#F4EDE2] text-[#4A3B39] border border-[#E8DFD3]">
                    {step.num}
                  </span>
                  <div className={`p-2 rounded-lg ${step.bgSubtle} border border-[#E8DFD3] group-hover:scale-110 transition-transform ${step.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-sm font-bold text-[#2B1D1C] tracking-tight mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-[#6B5755] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
