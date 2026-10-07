"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { TemplateCard, TemplateData } from "./template-card";
import { TemplatePreviewModal } from "./template-preview-modal";

export function TemplatesPreview() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPreview = (template: TemplateData) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const templates: TemplateData[] = [
    {
      id: "modern-developer",
      name: "Modern Developer",
      category: "Software Engineers",
      description: "Dark espresso developer portfolio with monospace accents, terminal cards, and tech stack tags.",
      badge: "Most Popular",
      tags: ["Mocha Dark", "Code Highlights", "GitHub Integration", "Tech Badges"],
      visualPreview: (
        <div className="h-44 p-3 bg-[#2B1D1C] flex flex-col justify-between font-mono text-[10px] text-[#FAF7F2]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#4A3B39] pb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#E58F8B]" />
              <div className="w-2 h-2 rounded-full bg-[#E88661]" />
              <div className="w-2 h-2 rounded-full bg-[#366B4A]" />
              <span className="text-[#F4EDE2] ml-1 font-sans text-[11px] font-semibold">dev.io/~alex</span>
            </div>
            <span className="text-[#8EABCE] text-[9px] bg-[#3B2C2B] px-1.5 py-0.5 rounded border border-[#523F3E]">TypeScript</span>
          </div>

          {/* Terminal / Code Card preview */}
          <div className="p-2 rounded bg-[#1F1413] border border-[#423130] space-y-1">
            <div className="text-[#C5B5B3] flex items-center gap-1">
              <span className="text-[#366B4A] font-bold">$</span> git log --author=&quot;Alex Chen&quot; --oneline -n 2
            </div>
            <div className="text-[#B8D8C4]">8f2a1b0 feat: scale distributed cache to 100k rps</div>
            <div className="text-[#9A8785]">4c99e12 perf: reduce memory footprint by 42%</div>
          </div>

          {/* Mini tags */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex gap-1">
              <span className="px-1.5 py-0.5 rounded bg-[#3B2C2B] text-[#E8F1F2] border border-[#523F3E]">Go</span>
              <span className="px-1.5 py-0.5 rounded bg-[#3B2C2B] text-[#E8F1F2] border border-[#523F3E]">Rust</span>
              <span className="px-1.5 py-0.5 rounded bg-[#3B2C2B] text-[#E8F1F2] border border-[#523F3E]">Next.js</span>
            </div>
            <span className="text-[#366B4A] text-[9px] flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#366B4A]" /> Ready
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "minimal-professional",
      name: "Minimal Professional",
      category: "Designers & Generalists",
      description: "Clean typography-focused portfolio with editorial layout, high contrast, and refined white space.",
      badge: "Editorial Style",
      tags: ["Clean Typography", "Editorial Layout", "High Contrast", "High Signal"],
      visualPreview: (
        <div className="h-44 p-3.5 bg-[#FAF7F2] flex flex-col justify-between font-sans text-[10px]">
          {/* Header */}
          <div className="border-b border-[#E8DFD3] pb-2">
            <div className="text-xs font-serif text-[#2B1D1C] font-bold">David Vance</div>
            <div className="text-[10px] text-[#6B5755]">Principal Product Designer</div>
          </div>

          {/* Minimalist layout preview */}
          <div className="space-y-1.5 py-1">
            <p className="text-[#4A3B39] text-[10px] leading-relaxed line-clamp-2">
              Designing refined digital products, design systems, and brand identities for high-growth tech ventures.
            </p>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <div className="p-1.5 rounded bg-[#FFFFFF] border border-[#E8DFD3]">
                <div className="text-[#7B6866] text-[9px]">Case Study</div>
                <div className="text-[#2B1D1C] font-bold text-[10px]">Linear Sync UI</div>
              </div>
              <div className="p-1.5 rounded bg-[#FFFFFF] border border-[#E8DFD3]">
                <div className="text-[#7B6866] text-[9px]">Case Study</div>
                <div className="text-[#2B1D1C] font-bold text-[10px]">Raycast Extensions</div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-between text-[9px] text-[#6B5755] pt-1 border-t border-[#E8DFD3]">
            <span>New York, NY</span>
            <span className="text-[#2B1D1C] font-mono font-medium">vance.design</span>
          </div>
        </div>
      ),
    },
    {
      id: "executive",
      name: "Executive",
      category: "Leaders & Managers",
      description: "Premium corporate portfolio with metric highlights, leadership timeline, and advisory credentials.",
      badge: "Leadership Focused",
      tags: ["Metric Highlights", "Career Milestones", "Corporate Tone", "Advisory Ready"],
      visualPreview: (
        <div className="h-44 p-3.5 bg-[#FFFFFF] flex flex-col justify-between font-sans text-[10px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E8DFD3] pb-2">
            <div>
              <div className="text-xs font-bold text-[#2B1D1C]">Elena Rostova</div>
              <div className="text-[10px] text-[#E88661] font-bold">VP of Engineering</div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-[#FAF0F2] text-[#9B4D60] border border-[#EAD2D8] text-[9px] font-bold">
              Executive
            </span>
          </div>

          {/* Key KPI highlights */}
          <div className="grid grid-cols-3 gap-1 py-1">
            <div className="p-1.5 rounded bg-[#FAF7F2] border border-[#E8DFD3] text-center">
              <div className="text-[#2B1D1C] font-bold text-[11px]">$180M+</div>
              <div className="text-[#7B6866] text-[8px] uppercase font-bold">ARR Scaled</div>
            </div>
            <div className="p-1.5 rounded bg-[#FAF7F2] border border-[#E8DFD3] text-center">
              <div className="text-[#2B1D1C] font-bold text-[11px]">120+ Eng</div>
              <div className="text-[#7B6866] text-[8px] uppercase font-bold">Org Lead</div>
            </div>
            <div className="p-1.5 rounded bg-[#FAF7F2] border border-[#E8DFD3] text-center">
              <div className="text-[#2B1D1C] font-bold text-[11px]">3 M&A</div>
              <div className="text-[#7B6866] text-[8px] uppercase font-bold">Integrations</div>
            </div>
          </div>

          {/* Recent leadership role */}
          <div className="p-1.5 rounded bg-[#FAF7F2] border border-[#E8DFD3] flex items-center justify-between text-[9px]">
            <span className="text-[#4A3B39] font-medium">FinTech Enterprise Cloud</span>
            <span className="text-[#6B5755] font-mono">2020 - Present</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="templates" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0F2] border border-[#EAD2D8] text-xs font-bold text-[#9B4D60]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Portfolio Aesthetics</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2B1D1C]">
            Choose a Portfolio That Looks Like You
          </h2>

          <p className="text-base sm:text-lg text-[#6B5755] leading-relaxed">
            Every template is tailored to highlight your specific strengths — whether you write low-level code, design products, or lead high-performing teams.
          </p>
        </div>

        {/* 3 Template Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={handleOpenPreview}
            />
          ))}
        </div>
      </div>

      {/* Interactive Template Preview Modal */}
      <TemplatePreviewModal
        template={selectedTemplate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
