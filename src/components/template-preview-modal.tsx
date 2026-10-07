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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2B1D1C]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#FAF7F2] border border-[#E8DFD3] shadow-2xl shadow-[#2B1D1C]/20 overflow-hidden animate-in zoom-in-95 duration-200 text-[#2B1D1C]"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DFD3] bg-[#F5EFE6]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E8F1F2] border border-[#C3DCDE] flex items-center justify-center text-[#2D5D60]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#2B1D1C] tracking-tight">
                  {template.name}
                </h3>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FAF0F2] text-[#9B4D60] border border-[#EAD2D8]">
                  {template.category}
                </span>
              </div>
              <p className="text-xs text-[#6B5755]">
                Interactive layout preview & typography specifications
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-[#6B5755] hover:text-[#2B1D1C] hover:bg-[#E8DFD3] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Template Mockup Display */}
          <div className="rounded-xl border border-[#E8DFD3] bg-[#FFFFFF] p-6 shadow-sm">
            <div className="max-w-2xl mx-auto space-y-6">
              {template.id === "modern-developer" && (
                <div className="space-y-6 font-mono">
                  {/* Modern Dev Preview Content */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#E8F1F2] border border-[#2D5D60]/30 flex items-center justify-center text-[#2D5D60] font-bold">
                        dev
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#2B1D1C] font-sans">Sarah Jenkins</div>
                        <div className="text-xs text-[#2D5D60]">@sarah_codes • Senior Backend Architect</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded bg-[#EAF4EE] text-[#366B4A] border border-[#BDE0CB] font-sans font-bold">
                      Open to Contract & Full-time
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3] space-y-2">
                    <div className="text-xs text-[#5A4947] font-sans">
                      &ldquo;Specializing in high-throughput distributed architectures, zero-downtime database migrations, and cloud resilience at scale.&rdquo;
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {["Go", "Rust", "Distributed Consensus", "Kafka", "PostgreSQL", "Docker", "eBPF"].map((s) => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-[#E8F1F2] text-[#2D5D60] border border-[#C3DCDE] font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs text-[#7B6866] uppercase tracking-wider font-sans font-bold">Featured Work</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3]">
                        <div className="text-xs font-bold text-[#2B1D1C] font-sans">Distributed Log Aggregator</div>
                        <div className="text-[11px] text-[#6B5755] mt-1 font-sans">Engineered ingestion pipeline processing 250M events daily.</div>
                      </div>
                      <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3]">
                        <div className="text-xs font-bold text-[#2B1D1C] font-sans">Raft Consensus Core</div>
                        <div className="text-[11px] text-[#6B5755] mt-1 font-sans">Open-source distributed state machine library in Rust.</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {template.id === "minimal-professional" && (
                <div className="space-y-6 font-sans">
                  {/* Minimal Professional Preview Content */}
                  <div className="pb-4 border-b border-[#E8DFD3]">
                    <h4 className="text-2xl font-serif text-[#2B1D1C] font-medium">David Vance</h4>
                    <p className="text-sm text-[#6B5755] mt-1">
                      Product Designer & Creative Technologist based in New York.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-[#4A3B39] leading-relaxed">
                      Leading product design initiatives that fuse minimalist visual aesthetics with rigorous user research and design systems architecture.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      <div className="p-2.5 rounded bg-[#FAF7F2] border border-[#E8DFD3]">
                        <div className="text-[11px] text-[#7B6866]">Design Systems</div>
                        <div className="text-xs font-bold text-[#2B1D1C] mt-0.5">Tokens & UI Kits</div>
                      </div>
                      <div className="p-2.5 rounded bg-[#FAF7F2] border border-[#E8DFD3]">
                        <div className="text-[11px] text-[#7B6866]">Prototyping</div>
                        <div className="text-xs font-bold text-[#2B1D1C] mt-0.5">Figma & React</div>
                      </div>
                      <div className="p-2.5 rounded bg-[#FAF7F2] border border-[#E8DFD3]">
                        <div className="text-[11px] text-[#7B6866]">User Research</div>
                        <div className="text-xs font-bold text-[#2B1D1C] mt-0.5">Quantitative UX</div>
                      </div>
                      <div className="p-2.5 rounded bg-[#FAF7F2] border border-[#E8DFD3]">
                        <div className="text-[11px] text-[#7B6866]">Experience</div>
                        <div className="text-xs font-bold text-[#2B1D1C] mt-0.5">8+ Years</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {template.id === "executive" && (
                <div className="space-y-6 font-sans">
                  {/* Executive Preview Content */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3]">
                    <div>
                      <h4 className="text-xl font-bold text-[#2B1D1C] tracking-tight">Elena Rostova</h4>
                      <p className="text-xs text-[#E88661] font-bold mt-0.5">
                        VP of Engineering & Technology Advisor
                      </p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-[#FAF0F2] text-[#9B4D60] border border-[#EAD2D8] font-bold">
                      Executive Profile
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3] text-center">
                      <div className="text-lg font-bold text-[#2B1D1C]">$180M+</div>
                      <div className="text-[10px] text-[#7B6866] uppercase font-bold tracking-wider">Revenue Impact</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3] text-center">
                      <div className="text-lg font-bold text-[#2B1D1C]">120+ Eng</div>
                      <div className="text-[10px] text-[#7B6866] uppercase font-bold tracking-wider">Org Lead</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3] text-center">
                      <div className="text-lg font-bold text-[#2B1D1C]">3 M&A</div>
                      <div className="text-[10px] text-[#7B6866] uppercase font-bold tracking-wider">Integrations</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3] space-y-2">
                    <div className="text-xs font-bold text-[#2B1D1C] uppercase tracking-wider">Executive Overview</div>
                    <p className="text-xs text-[#5A4947] leading-relaxed">
                      Engineering executive with a 14-year track record scaling multi-region engineering organizations, directing cloud transformation initiatives, and aligning technical roadmaps with enterprise commercial growth.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Template Details Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E8DFD3]">
              <span className="text-[11px] text-[#7B6866] font-semibold">Ideal For</span>
              <p className="text-xs font-bold text-[#2B1D1C] mt-1">{template.category}</p>
            </div>
            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E8DFD3]">
              <span className="text-[11px] text-[#7B6866] font-semibold">Typography</span>
              <p className="text-xs font-bold text-[#2B1D1C] mt-1">Inter & JetBrains Mono</p>
            </div>
            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E8DFD3]">
              <span className="text-[11px] text-[#7B6866] font-semibold">Responsiveness</span>
              <p className="text-xs font-bold text-[#366B4A] mt-1">Mobile, Tablet, Desktop 100%</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E8DFD3] bg-[#F5EFE6]">
          <span className="text-xs text-[#6B5755]">
            Included in all Portfolify AI plans
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5A4947] hover:text-[#2B1D1C] hover:bg-[#E8DFD3] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectTemplate?.(template);
                onClose();
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#2D5D60] hover:bg-[#22484A] text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
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
