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
    <div className="relative w-full rounded-2xl border border-[#E6DACB] bg-[#FFFDF9] shadow-2xl shadow-[#2B1D15]/10 overflow-hidden transition-all duration-300 group">
      {/* Top ambient highlight */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#D47A41]/40 to-transparent" />

      {/* Browser / App Window Header */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-[#E6DACB] bg-[#F5EDE3] gap-2">
        {/* Window controls & live badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E8955F]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#DE8638]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#447250]" />
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ECF5EF] border border-[#BDE0CB] text-[11px] font-medium text-[#345D40]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#447250] animate-pulse" />
            <span>AI Parsed & Generated</span>
          </div>
        </div>

        {/* URL Bar */}
        <div className="flex-1 max-w-xs mx-auto hidden lg:flex items-center justify-between px-3 py-1 rounded-md bg-[#FFFDF9] border border-[#E6DACB] text-xs text-[#6D594D] font-mono shadow-xs">
          <div className="flex items-center gap-1.5 truncate">
            <Globe className="w-3 h-3 text-[#D47A41] shrink-0" />
            <span className="text-[#6D594D]">portfolify.ai/</span>
            <span className="text-[#D47A41] font-semibold">alex-chen</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="hover:text-[#2B1D15] p-0.5 rounded transition-colors ml-1 cursor-pointer"
            title="Copy URL"
          >
            {copied ? <Check className="w-3 h-3 text-[#447250]" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>

        {/* View mode toggle & Tab switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#EBE0D2] p-0.5 rounded-lg border border-[#DDD0BE] text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer ${
                activeTab === "preview"
                  ? "bg-[#D47A41] text-white shadow-sm"
                  : "text-[#6D594D] hover:text-[#2B1D15]"
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
                  ? "bg-[#D47A41] text-white shadow-sm"
                  : "text-[#6D594D] hover:text-[#2B1D15]"
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#DE8638]" />
              <span>AI Data</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center bg-[#EBE0D2] p-0.5 rounded-lg border border-[#DDD0BE]">
            <button
              type="button"
              onClick={() => setViewMode("desktop")}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === "desktop" ? "bg-[#FFFDF9] text-[#2B1D15] shadow-xs" : "text-[#6D594D] hover:text-[#2B1D15]"
              }`}
              title="Desktop view"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("mobile")}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === "mobile" ? "bg-[#FFFDF9] text-[#2B1D15] shadow-xs" : "text-[#6D594D] hover:text-[#2B1D15]"
              }`}
              title="Mobile view"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`p-3.5 sm:p-6 transition-all duration-300 ${viewMode === "mobile" ? "max-w-sm mx-auto" : "w-full"}`}>
        {activeTab === "preview" ? (
          <div className="space-y-6">
            {/* Profile Header Preview */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-5 border-b border-[#E6DACB]">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#D47A41] via-[#E8955F] to-[#D5C8B8] p-0.5 shadow-md">
                    <div className="w-full h-full rounded-[14px] bg-[#F8F3EC] flex items-center justify-center font-bold text-base sm:text-lg text-[#2B1D15]">
                      AC
                    </div>
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#447250] border-2 border-[#FFFDF9]" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-[#2B1D15] tracking-tight truncate">
                      Alex Chen
                    </h3>
                    <span className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#FDF1E8] text-[#D47A41] border border-[#F6D5C2] shrink-0">
                      Modern Dev Template
                    </span>
                  </div>
                  <p className="text-xs text-[#6D594D] font-medium line-clamp-1">
                    Senior Full-Stack & Distributed Systems Engineer
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-[#9E8C7E] truncate">San Francisco, CA • Open to High-Impact Roles</p>
                </div>
              </div>

              {/* Social / Action badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs shrink-0">
                <span className="px-2.5 py-1 rounded-md bg-[#F8F3EC] hover:bg-[#EFE6D8] text-[#2B1D15] border border-[#E6DACB] flex items-center gap-1.5 transition-colors cursor-pointer font-medium text-xs">
                  <svg className="w-3.5 h-3.5 fill-current text-[#2B1D15] shrink-0" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>alexchen</span>
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#FDF1E8] hover:bg-[#FBE4D5] text-[#D47A41] border border-[#F6D5C2] flex items-center gap-1.5 transition-colors cursor-pointer font-medium text-xs">
                  <svg className="w-3.5 h-3.5 fill-current text-[#D47A41] shrink-0" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span>Connect</span>
                </span>
              </div>
            </div>

            {/* Skills Pills */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6D594D] flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#D47A41]" />
                  Core Skills & Technologies
                </span>
                <span className="text-[11px] text-[#447250] font-semibold font-mono">14 Extracted</span>
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
                        ? "bg-[#FDF1E8] text-[#D47A41] border-[#F6D5C2]"
                        : "bg-[#F5EDE3] text-[#2B1D15] border-[#E6DACB]"
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
                <span className="text-xs font-bold uppercase tracking-wider text-[#6D594D] flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-[#DE8638]" />
                  Featured Projects
                </span>
                <span className="text-[11px] text-[#9E8C7E]">Live Preview</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#F8F3EC] border border-[#E6DACB] hover:border-[#D47A41]/50 transition-colors shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-xs font-bold text-[#2B1D15] flex items-center gap-1.5">
                      <span>StreamFlow AI</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#6D594D]" />
                    </h4>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FDF1E8] text-[#D47A41] border border-[#F6D5C2] font-semibold">
                      v2.4
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6D594D] line-clamp-2 leading-relaxed mb-2.5">
                    Real-time distributed data pipeline with LLM-assisted anomaly detection handling 100k+ events/sec.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-[#9E8C7E] font-mono font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#D47A41]" />
                    <span>Go • TypeScript • Kafka</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8F3EC] border border-[#E6DACB] hover:border-[#D47A41]/50 transition-colors shadow-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-xs font-bold text-[#2B1D15] flex items-center gap-1.5">
                      <span>VectorCache DB</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#6D594D]" />
                    </h4>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#ECF5EF] text-[#447250] border border-[#BDE0CB] font-semibold">
                      1.8k stars
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6D594D] line-clamp-2 leading-relaxed mb-2.5">
                    High-throughput semantic similarity cache for enterprise LLM endpoints, slashing latency by 72%.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-[#9E8C7E] font-mono font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#DE8638]" />
                    <span>Rust • Redis • Python</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Highlight */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6D594D] flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#447250]" />
                  Work Experience
                </span>
                <span className="text-[11px] text-[#9E8C7E]">Chronological</span>
              </div>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-[#F8F3EC] border border-[#E6DACB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 shadow-xs">
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="text-xs font-bold text-[#2B1D15]">Staff Software Engineer</span>
                      <span className="text-[#CCAFA4]">•</span>
                      <span className="text-xs text-[#D47A41] font-semibold">Stripe</span>
                    </div>
                    <p className="text-[11px] text-[#6D594D] leading-relaxed">
                      Architected global payout settlement subsystem processing $14B+ annually with 99.999% reliability.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[#6D594D] shrink-0 bg-[#EFE6D8] px-2 py-0.5 rounded font-semibold self-start sm:self-auto">
                    2022 — Present
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* AI Extracted Data Inspector Tab */
          <div className="space-y-4 font-mono text-xs">
            <div className="p-3 rounded-lg bg-[#ECF5EF] border border-[#BDE0CB] flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#447250]">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold text-xs">Resume Parsing Complete</span>
              </div>
              <span className="text-[11px] text-[#447250] font-semibold">Confidence: 99.4%</span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-lg bg-[#F8F3EC] border border-[#E6DACB] space-y-1">
                <span className="text-[10px] text-[#9E8C7E] uppercase tracking-wide font-bold">Extracted Candidate</span>
                <div className="text-[#2B1D15] font-sans font-bold text-sm">Alex Chen (alex.chen@dev.io)</div>
                <div className="text-[11px] text-[#6D594D] font-sans">Role Match: Senior / Staff Full-Stack Engineer</div>
              </div>

              <div className="p-3 rounded-lg bg-[#F8F3EC] border border-[#E6DACB] space-y-1">
                <span className="text-[10px] text-[#9E8C7E] uppercase tracking-wide font-bold">Structured Milestones</span>
                <ul className="list-disc list-inside text-[#2B1D15] text-[11px] space-y-1 font-sans">
                  <li>3 Roles indexed (Stripe, Scale AI, Datadog)</li>
                  <li>4 Key Projects parsed with github links & metrics</li>
                  <li>14 Technical skills organized into 3 domains</li>
                  <li>B.S. in Computer Science — UC Berkeley (2018)</li>
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-[#FDF1E8] border border-[#F6D5C2] text-[#D47A41] text-[11px] flex items-center justify-between font-semibold">
                <span>Selected Theme: Modern Developer (Warm Mocha)</span>
                <span className="text-[#D47A41] underline cursor-pointer">Change Theme</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Bottom Bar */}
      <div className="px-4 py-3 bg-[#F5EDE3] border-t border-[#E6DACB] flex items-center justify-between text-xs text-[#6D594D]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#447250]" />
          <span className="text-[11px] font-medium text-[#2B1D15]">Ready to publish with 1 click</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#6D594D]">portfolify.ai</span>
        </div>
      </div>
    </div>
  );
}
