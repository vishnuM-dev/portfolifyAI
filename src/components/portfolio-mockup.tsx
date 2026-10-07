"use client";

import { useState } from "react";
import {
  Sparkles,
  Globe,
  Briefcase,
  Code2,
  FolderGit2,
  Copy,
  Monitor,
  Smartphone,
  ArrowUpRight,
  Eye,
  Check,
} from "lucide-react";

export function PortfolioMockup() {
  const [activeTab, setActiveTab] = useState<"preview" | "extracted">("preview");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full rounded-2xl border border-[#E8DFD3] bg-[#FFFFFF] shadow-2xl shadow-[#2B1D1C]/10 overflow-hidden transition-all duration-300 group">
      {/* Top ambient highlight */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#2D5D60]/40 to-transparent" />

      {/* Browser / App Window Header */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-[#E8DFD3] bg-[#F7F2EA] gap-2">
        {/* Window controls & live badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E58F8B]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#E88661]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#447858]" />
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAF4EE] border border-[#BDE0CB] text-[11px] font-medium text-[#2F6141]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#366B4A] animate-pulse" />
            <span>AI Parsed & Generated</span>
          </div>
        </div>

        {/* URL Bar */}
        <div className="flex-1 max-w-xs mx-auto hidden lg:flex items-center justify-between px-3 py-1 rounded-md bg-[#FFFFFF] border border-[#E8DFD3] text-xs text-[#6B5755] font-mono shadow-xs">
          <div className="flex items-center gap-1.5 truncate">
            <Globe className="w-3 h-3 text-[#2D5D60] shrink-0" />
            <span className="text-[#6B5755]">portfolify.ai/</span>
            <span className="text-[#2D5D60] font-semibold">alex-chen</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="hover:text-[#2B1D1C] p-0.5 rounded transition-colors ml-1 cursor-pointer"
            title="Copy URL"
          >
            {copied ? <Check className="w-3 h-3 text-[#366B4A]" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>

        {/* View mode toggle & Tab switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#EDE4D6] p-0.5 rounded-lg border border-[#E0D5C4] text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer ${
                activeTab === "preview"
                  ? "bg-[#2D5D60] text-white shadow-sm"
                  : "text-[#6B5755] hover:text-[#2B1D1C]"
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("extracted")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer ${
                activeTab === "extracted"
                  ? "bg-[#2D5D60] text-white shadow-sm"
                  : "text-[#6B5755] hover:text-[#2B1D1C]"
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#E88661]" />
              <span>AI Data</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center bg-[#EDE4D6] p-0.5 rounded-lg border border-[#E0D5C4]">
            <button
              type="button"
              onClick={() => setViewMode("desktop")}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === "desktop" ? "bg-[#FFFFFF] text-[#2B1D1C] shadow-xs" : "text-[#6B5755] hover:text-[#2B1D1C]"
              }`}
              title="Desktop view"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("mobile")}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === "mobile" ? "bg-[#FFFFFF] text-[#2B1D1C] shadow-xs" : "text-[#6B5755] hover:text-[#2B1D1C]"
              }`}
              title="Mobile view"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`p-4 sm:p-6 transition-all duration-300 ${viewMode === "mobile" ? "max-w-sm mx-auto" : "w-full"}`}>
        {activeTab === "preview" ? (
          <div className="space-y-6">
            {/* Profile Header Preview */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#E8DFD3]">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2D5D60] via-[#3C6E71] to-[#9B4D60] p-0.5 shadow-md">
                    <div className="w-full h-full rounded-[14px] bg-[#FAF7F2] flex items-center justify-center font-bold text-lg text-[#2B1D1C]">
                      AC
                    </div>
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#366B4A] border-2 border-[#FFFFFF]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#2B1D1C] tracking-tight">
                      Alex Chen
                    </h3>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#FAF0F2] text-[#9B4D60] border border-[#EAD2D8]">
                      Modern Dev Template
                    </span>
                  </div>
                  <p className="text-xs text-[#5A4947] font-medium">
                    Senior Full-Stack & Distributed Systems Engineer
                  </p>
                  <p className="text-[11px] text-[#7B6866]">San Francisco, CA • Open to High-Impact Roles</p>
                </div>
              </div>

              {/* Social / Action badges */}
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-[#FAF7F2] hover:bg-[#F3ECE0] text-[#4A3B39] border border-[#E8DFD3] flex items-center gap-1.5 transition-colors cursor-pointer font-medium">
                  <svg className="w-3.5 h-3.5 fill-current text-[#2B1D1C]" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>alexchen</span>
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#FAF7F2] hover:bg-[#F3ECE0] text-[#2D5D60] border border-[#E8DFD3] flex items-center gap-1.5 transition-colors cursor-pointer font-medium">
                  <svg className="w-3.5 h-3.5 fill-current text-[#2D5D60]" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span>Connect</span>
                </span>
              </div>
            </div>

            {/* Skills Pills */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B5755] flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#2D5D60]" />
                  Core Skills & Technologies
                </span>
                <span className="text-[11px] text-[#366B4A] font-semibold font-mono">14 Extracted</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "TypeScript",
                  "Next.js / React 19",
                  "Node.js & Go",
                  "PostgreSQL",
                  "GraphQL",
                  "Redis",
                  "AWS & Kubernetes",
                  "Distributed Systems",
                  "LLM Pipelines",
                ].map((skill, index) => (
                  <span
                    key={skill}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${
                      index < 4
                        ? "bg-[#E8F1F2] text-[#2D5D60] border-[#C3DCDE]"
                        : "bg-[#F7F2EA] text-[#4A3B39] border-[#E8DFD3]"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Projects Grid */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B5755] flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-[#9B4D60]" />
                  Featured Projects
                </span>
                <span className="text-[11px] text-[#7B6866]">Live Preview</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] hover:border-[#2D5D60]/50 transition-colors shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-xs font-bold text-[#2B1D1C] flex items-center gap-1.5">
                      <span>StreamFlow AI</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#6B5755]" />
                    </h4>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#E8F1F2] text-[#2D5D60] border border-[#C3DCDE] font-semibold">
                      v2.4
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5A4947] line-clamp-2 leading-relaxed mb-2.5">
                    Real-time distributed data pipeline with LLM-assisted anomaly detection handling 100k+ events/sec.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-[#7B6866] font-mono font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#2D5D60]" />
                    <span>Go • TypeScript • Kafka</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] hover:border-[#2D5D60]/50 transition-colors shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-xs font-bold text-[#2B1D1C] flex items-center gap-1.5">
                      <span>VectorCache DB</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#6B5755]" />
                    </h4>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#EAF4EE] text-[#366B4A] border border-[#BDE0CB] font-semibold">
                      1.8k stars
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5A4947] line-clamp-2 leading-relaxed mb-2.5">
                    High-throughput semantic similarity cache for enterprise LLM endpoints, slashing latency by 72%.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-[#7B6866] font-mono font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#E88661]" />
                    <span>Rust • Redis • Python</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Highlight */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B5755] flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#366B4A]" />
                  Work Experience
                </span>
                <span className="text-[11px] text-[#7B6866]">Chronological</span>
              </div>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] flex items-start justify-between gap-3 shadow-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#2B1D1C]">Staff Software Engineer</span>
                      <span className="text-[#A49492]">•</span>
                      <span className="text-xs text-[#2D5D60] font-semibold">Stripe</span>
                    </div>
                    <p className="text-[11px] text-[#5A4947]">
                      Architected global payout settlement subsystem processing $14B+ annually with 99.999% reliability.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[#5A4947] shrink-0 bg-[#EFE7DC] px-2 py-1 rounded font-semibold">
                    2022 — Present
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* AI Extracted Data Inspector Tab */
          <div className="space-y-4 font-mono text-xs">
            <div className="p-3 rounded-lg bg-[#EAF4EE] border border-[#BDE0CB] flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#366B4A]">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold text-xs">Resume Parsing Complete</span>
              </div>
              <span className="text-[11px] text-[#366B4A] font-semibold">Confidence: 99.4%</span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3] space-y-1">
                <span className="text-[10px] text-[#7B6866] uppercase tracking-wide font-bold">Extracted Candidate</span>
                <div className="text-[#2B1D1C] font-sans font-bold text-sm">Alex Chen (alex.chen@dev.io)</div>
                <div className="text-[11px] text-[#5A4947] font-sans">Role Match: Senior / Staff Full-Stack Engineer</div>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3] space-y-1">
                <span className="text-[10px] text-[#7B6866] uppercase tracking-wide font-bold">Structured Milestones</span>
                <ul className="list-disc list-inside text-[#4A3B39] text-[11px] space-y-1 font-sans">
                  <li>3 Roles indexed (Stripe, Scale AI, Datadog)</li>
                  <li>4 Key Projects parsed with github links & metrics</li>
                  <li>14 Technical skills organized into 3 domains</li>
                  <li>B.S. in Computer Science — UC Berkeley (2018)</li>
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-[#E8F1F2] border border-[#C3DCDE] text-[#2D5D60] text-[11px] flex items-center justify-between font-semibold">
                <span>Selected Theme: Modern Developer (Dark Mocha)</span>
                <span className="text-[#2D5D60] underline cursor-pointer">Change Theme</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Bottom Bar */}
      <div className="px-4 py-3 bg-[#F7F2EA] border-t border-[#E8DFD3] flex items-center justify-between text-xs text-[#6B5755]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#366B4A]" />
          <span className="text-[11px] font-medium text-[#4A3B39]">Ready to publish with 1 click</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#6B5755]">portfolify.ai</span>
        </div>
      </div>
    </div>
  );
}
