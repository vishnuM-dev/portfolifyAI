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
        <div className="h-44 p-3 bg-[#241812] flex flex-col justify-between font-mono text-[10px] text-[#F8F3EC]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#483429] pb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#C03E31]" />
              <div className="w-2 h-2 rounded-full bg-[#DE8638]" />
              <div className="w-2 h-2 rounded-full bg-[#447250]" />
              <span className="text-[#F8F3EC] ml-1 font-sans text-[11px] font-semibold">dev.io/~alex</span>
            </div>
            <span className="text-[#D5C8B8] text-[9px] bg-[#36241B] px-1.5 py-0.5 rounded border border-[#523A2C]">TypeScript</span>
          </div>

          {/* Terminal / Code Card preview */}
          <div className="p-2 rounded bg-[#1A100B] border border-[#3D291F] space-y-1">
            <div className="text-[#D5C8B8] flex items-center gap-1">
              <span className="text-[#447250] font-bold">$</span> git log --author=&quot;Alex Chen&quot; --oneline -n 2
            </div>
            <div className="text-[#8FB399]">8f2a1b0 feat: scale distributed cache to 100k rps</div>
            <div className="text-[#9E8C7E]">4c99e12 perf: reduce memory footprint by 42%</div>
          </div>

          {/* Mini tags */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex gap-1">
              <span className="px-1.5 py-0.5 rounded bg-[#36241B] text-[#F8F3EC] border border-[#523A2C]">Go</span>
              <span className="px-1.5 py-0.5 rounded bg-[#36241B] text-[#F8F3EC] border border-[#523A2C]">Rust</span>
              <span className="px-1.5 py-0.5 rounded bg-[#36241B] text-[#F8F3EC] border border-[#523A2C]">Next.js</span>
            </div>
            <span className="text-[#447250] text-[9px] flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#447250]" /> Ready
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
        <div className="h-44 p-3.5 bg-[#F8F3EC] flex flex-col justify-between font-sans text-[10px]">
          {/* Header */}
          <div className="border-b border-[#E6DACB] pb-2">
            <div className="text-xs font-serif text-[#2B1D15] font-bold">David Vance</div>
            <div className="text-[10px] text-[#6D594D]">Principal Product Designer</div>
          </div>

          {/* Minimalist layout preview */}
          <div className="space-y-1.5 py-1">
            <p className="text-[#52413F] text-[10px] leading-relaxed line-clamp-2">
              Designing refined digital products, design systems, and brand identities for high-growth tech ventures.
            </p>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <div className="p-1.5 rounded bg-[#FFFDF9] border border-[#E6DACB]">
                <div className="text-[#9E8C7E] text-[9px]">Case Study</div>
                <div className="text-[#2B1D15] font-bold text-[10px]">Linear Sync UI</div>
              </div>
              <div className="p-1.5 rounded bg-[#FFFDF9] border border-[#E6DACB]">
                <div className="text-[#9E8C7E] text-[9px]">Case Study</div>
                <div className="text-[#2B1D15] font-bold text-[10px]">Raycast Extensions</div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-between text-[9px] text-[#6D594D] pt-1 border-t border-[#E6DACB]">
            <span>New York, NY</span>
            <span className="text-[#2B1D15] font-mono font-medium">vance.design</span>
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
        <div className="h-44 p-3.5 bg-[#FFFDF9] flex flex-col justify-between font-sans text-[10px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E6DACB] pb-2">
            <div>
              <div className="text-xs font-bold text-[#2B1D15]">Elena Rostova</div>
              <div className="text-[10px] text-[#D47A41] font-bold">VP of Engineering</div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-[#FDF1E8] text-[#D47A41] border border-[#F3CDB7] text-[9px] font-bold">
              Executive
            </span>
          </div>

          {/* Key KPI highlights */}
          <div className="grid grid-cols-3 gap-1 py-1">
            <div className="p-1.5 rounded bg-[#F8F3EC] border border-[#E6DACB] text-center">
              <div className="text-[#2B1D15] font-bold text-[11px]">$180M+</div>
              <div className="text-[#6D594D] text-[8px] uppercase font-bold">ARR Scaled</div>
            </div>
            <div className="p-1.5 rounded bg-[#F8F3EC] border border-[#E6DACB] text-center">
              <div className="text-[#2B1D15] font-bold text-[11px]">120+ Eng</div>
              <div className="text-[#6D594D] text-[8px] uppercase font-bold">Org Lead</div>
            </div>
            <div className="p-1.5 rounded bg-[#F8F3EC] border border-[#E6DACB] text-center">
              <div className="text-[#2B1D15] font-bold text-[11px]">3 M&A</div>
              <div className="text-[#6D594D] text-[8px] uppercase font-bold">Integrations</div>
            </div>
          </div>

          {/* Recent leadership role */}
          <div className="p-1.5 rounded bg-[#F8F3EC] border border-[#E6DACB] flex items-center justify-between text-[9px]">
            <span className="text-[#52413F] font-medium">FinTech Enterprise Cloud</span>
            <span className="text-[#6D594D] font-mono">2020 - Present</span>
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF1E8] border border-[#F3CDB7] text-xs font-bold text-[#D47A41]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Portfolio Aesthetics</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2B1D15]">
            Choose a Portfolio That Looks Like You
          </h2>

          <p className="text-base sm:text-lg text-[#6D594D] leading-relaxed">
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
