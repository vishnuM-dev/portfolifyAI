"use client";

import { X, Sparkles, ArrowRight } from "lucide-react";
import { TemplateData } from "./template-card";

interface TemplatePreviewModalProps {
  template: TemplateData | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate?: (template: TemplateData) => void;
}

export function TemplatePreviewModal({
  template,
  isOpen,
  onClose,
  onSelectTemplate,
}: TemplatePreviewModalProps) {
  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2B1D15]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#F8F3EC] border border-[#E6DACB] shadow-2xl shadow-[#2B1D15]/20 overflow-hidden animate-in zoom-in-95 duration-200 text-[#2B1D15]"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#E6DACB] bg-[#EFE6D8]">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#FDF1E8] border border-[#F6D5C2] flex items-center justify-center text-[#D47A41] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h3 className="text-sm sm:text-base font-bold text-[#2B1D15] tracking-tight truncate">
                  {template.name}
                </h3>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FDF1E8] text-[#D47A41] border border-[#F6D5C2]">
                  {template.category}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#6D594D] truncate">
                Interactive layout preview & typography specifications
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg text-[#6D594D] hover:text-[#2B1D15] hover:bg-[#E6DACB] transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Template Mockup Display */}
          <div className="rounded-xl border border-[#E6DACB] bg-[#FFFDF9] p-4 sm:p-6 shadow-sm">
            <div className="max-w-2xl mx-auto space-y-6">
              {template.id === "modern-developer" && (
                <div className="space-y-6 font-mono">
                  {/* Modern Dev Preview Content */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#E6DACB]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#FDF1E8] border border-[#D47A41]/30 flex items-center justify-center text-[#D47A41] font-bold shrink-0">
                        dev
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#2B1D15] font-sans">Sarah Jenkins</div>
                        <div className="text-xs text-[#D47A41]">@sarah_codes • Senior Backend Architect</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded bg-[#ECF5EF] text-[#447250] border border-[#BDE0CB] font-sans font-bold">
                      Open to Contract & Full-time
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-[#F8F3EC] border border-[#E6DACB] space-y-2">
                    <div className="text-xs text-[#6D594D] font-sans">
                      &ldquo;Specializing in high-throughput distributed architectures, zero-downtime database migrations, and cloud resilience at scale.&rdquo;
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {["Go", "Rust", "Distributed Consensus", "Kafka", "PostgreSQL", "Docker", "eBPF"].map((s) => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-[#FDF1E8] text-[#D47A41] border border-[#F6D5C2] font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs text-[#9E8C7E] uppercase tracking-wider font-sans font-bold">Featured Work</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-[#F8F3EC] border border-[#E6DACB]">
                        <div className="text-xs font-bold text-[#2B1D15] font-sans">Distributed Log Aggregator</div>
                        <div className="text-[11px] text-[#6D594D] mt-1 font-sans">Engineered ingestion pipeline processing 250M events daily.</div>
                      </div>
                      <div className="p-3 rounded-lg bg-[#F8F3EC] border border-[#E6DACB]">
                        <div className="text-xs font-bold text-[#2B1D15] font-sans">Raft Consensus Core</div>
                        <div className="text-[11px] text-[#6D594D] mt-1 font-sans">Open-source distributed state machine library in Rust.</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {template.id === "minimal-professional" && (
                <div className="space-y-6 font-sans">
                  {/* Minimal Professional Preview Content */}
                  <div className="pb-4 border-b border-[#E6DACB]">
                    <h4 className="text-xl sm:text-2xl font-serif text-[#2B1D15] font-medium">David Vance</h4>
                    <p className="text-xs sm:text-sm text-[#6D594D] mt-1">
                      Product Designer & Creative Technologist based in New York.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm text-[#2B1D15] leading-relaxed">
                      Leading product design initiatives that fuse minimalist visual aesthetics with rigorous user research and design systems architecture.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      <div className="p-2.5 rounded bg-[#F8F3EC] border border-[#E6DACB]">
                        <div className="text-[11px] text-[#9E8C7E]">Design Systems</div>
                        <div className="text-xs font-bold text-[#2B1D15] mt-0.5">Tokens & UI Kits</div>
                      </div>
                      <div className="p-2.5 rounded bg-[#F8F3EC] border border-[#E6DACB]">
                        <div className="text-[11px] text-[#9E8C7E]">Prototyping</div>
                        <div className="text-xs font-bold text-[#2B1D15] mt-0.5">Figma & React</div>
                      </div>
                      <div className="p-2.5 rounded bg-[#F8F3EC] border border-[#E6DACB]">
                        <div className="text-[11px] text-[#9E8C7E]">User Research</div>
                        <div className="text-xs font-bold text-[#2B1D15] mt-0.5">Quantitative UX</div>
                      </div>
                      <div className="p-2.5 rounded bg-[#F8F3EC] border border-[#E6DACB]">
                        <div className="text-[11px] text-[#9E8C7E]">Experience</div>
                        <div className="text-xs font-bold text-[#2B1D15] mt-0.5">8+ Years</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {template.id === "executive" && (
                <div className="space-y-6 font-sans">
                  {/* Executive Preview Content */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-[#E6DACB]">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-[#2B1D15] tracking-tight">Elena Rostova</h4>
                      <p className="text-xs text-[#D47A41] font-bold mt-0.5">
                        VP of Engineering & Technology Advisor
                      </p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-[#FDF1E8] text-[#D47A41] border border-[#F6D5C2] font-bold">
                      Executive Profile
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="p-2.5 sm:p-3 rounded-lg bg-[#F8F3EC] border border-[#E6DACB] text-center">
                      <div className="text-base sm:text-lg font-bold text-[#2B1D15]">$180M+</div>
                      <div className="text-[9px] sm:text-[10px] text-[#9E8C7E] uppercase font-bold tracking-wider">Revenue</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-lg bg-[#F8F3EC] border border-[#E6DACB] text-center">
                      <div className="text-base sm:text-lg font-bold text-[#2B1D15]">120+ Eng</div>
                      <div className="text-[9px] sm:text-[10px] text-[#9E8C7E] uppercase font-bold tracking-wider">Org Lead</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-lg bg-[#F8F3EC] border border-[#E6DACB] text-center">
                      <div className="text-base sm:text-lg font-bold text-[#2B1D15]">3 M&A</div>
                      <div className="text-[9px] sm:text-[10px] text-[#9E8C7E] uppercase font-bold tracking-wider">Integrations</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-[#F8F3EC] border border-[#E6DACB] space-y-2">
                    <div className="text-xs font-bold text-[#2B1D15] uppercase tracking-wider">Executive Overview</div>
                    <p className="text-xs text-[#6D594D] leading-relaxed">
                      Engineering executive with a 14-year track record scaling multi-region engineering organizations, directing cloud transformation initiatives, and aligning technical roadmaps with enterprise commercial growth.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Template Details Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
            <div className="p-3 rounded-xl bg-[#FFFDF9] border border-[#E6DACB]">
              <span className="text-[11px] text-[#9E8C7E] font-semibold">Ideal For</span>
              <p className="text-xs font-bold text-[#2B1D15] mt-0.5">{template.category}</p>
            </div>
            <div className="p-3 rounded-xl bg-[#FFFDF9] border border-[#E6DACB]">
              <span className="text-[11px] text-[#9E8C7E] font-semibold">Typography</span>
              <p className="text-xs font-bold text-[#2B1D15] mt-0.5">Inter & JetBrains Mono</p>
            </div>
            <div className="p-3 rounded-xl bg-[#FFFDF9] border border-[#E6DACB]">
              <span className="text-[11px] text-[#9E8C7E] font-semibold">Responsiveness</span>
              <p className="text-xs font-bold text-[#447250] mt-0.5">Mobile, Tablet, Desktop 100%</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-t border-[#E6DACB] bg-[#EFE6D8]">
          <span className="text-xs text-[#6D594D] text-center sm:text-left">
            Included in all Portfolify AI plans
          </span>
          <div className="flex items-center justify-end gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold text-[#6D594D] hover:text-[#2B1D15] hover:bg-[#E6DACB] transition-colors cursor-pointer text-center"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectTemplate?.(template);
                onClose();
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
            >
              <span>Select This Template</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
