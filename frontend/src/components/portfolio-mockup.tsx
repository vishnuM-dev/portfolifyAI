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
  Lock,
  CheckCircle2,
  MapPin,
  Flame,
  FileCheck2,
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
    <div className="relative w-full rounded-2xl border border-[#E6DACB] bg-[#FFFDF9] shadow-2xl shadow-[#2B1D15]/10 overflow-hidden transition-all duration-300">
      {/* Subtle top edge specular highlight */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D47A41]/50 to-transparent z-10" />

      {/* Browser Chrome Header */}
      <div className="px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-[#E8DECB] bg-[#FAF5EE] flex items-center justify-between gap-2.5">
        {/* Left: Window Traffic Lights & Live Badge */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E57373]/80 border border-[#D32F2F]/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB74D]/80 border border-[#F57C00]/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#81C784]/80 border border-[#388E3C]/20" />
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ECF5EF] border border-[#BFDFCA] text-[10px] font-semibold text-[#2D5A38]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#388E3C] animate-pulse" />
            <span>AI Generated</span>
          </div>
        </div>

        {/* Center: Sleek URL Bar */}
        <div className="flex-1 max-w-[240px] sm:max-w-xs mx-auto flex items-center justify-between px-2.5 sm:px-3 py-1 rounded-lg bg-[#FFFDF9] border border-[#E6DACB] text-[11px] sm:text-xs text-[#6D594D] font-mono shadow-2xs">
          <div className="flex items-center gap-1.5 truncate">
            <Lock className="w-3 h-3 text-[#447250] shrink-0" />
            <span className="text-[#8C7A6E]">portfolify.ai/</span>
            <span className="text-[#D47A41] font-semibold">alex-chen</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="hover:text-[#2B1D15] p-0.5 rounded transition-colors ml-1 cursor-pointer shrink-0"
            title="Copy URL"
          >
            {copied ? <Check className="w-3 h-3 text-[#447250]" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>

        {/* Right: View Mode & Tabs */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Segmented Tab Switcher */}
          <div className="flex items-center bg-[#EDE4D8] p-0.5 rounded-lg border border-[#DECFC0] text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                activeTab === "preview"
                  ? "bg-[#FFFDF9] text-[#2B1D15] shadow-xs"
                  : "text-[#6D594D] hover:text-[#2B1D15]"
              }`}
            >
              <Eye className="w-3 h-3 text-[#D47A41]" />
              <span className="hidden xs:inline">Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("extracted")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                activeTab === "extracted"
                  ? "bg-[#FFFDF9] text-[#2B1D15] shadow-xs"
                  : "text-[#6D594D] hover:text-[#2B1D15]"
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#DE8638]" />
              <span className="hidden xs:inline">AI Data</span>
            </button>
          </div>

          {/* Viewport Width Toggle */}
          <div className="hidden md:flex items-center bg-[#EDE4D8] p-0.5 rounded-lg border border-[#DECFC0]">
            <button
              type="button"
              onClick={() => setViewMode("desktop")}
              className={`p-1 rounded transition-colors cursor-pointer ${
                viewMode === "desktop" ? "bg-[#FFFDF9] text-[#2B1D15] shadow-2xs" : "text-[#6D594D] hover:text-[#2B1D15]"
              }`}
              title="Desktop viewport"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("mobile")}
              className={`p-1 rounded transition-colors cursor-pointer ${
                viewMode === "mobile" ? "bg-[#FFFDF9] text-[#2B1D15] shadow-2xs" : "text-[#6D594D] hover:text-[#2B1D15]"
              }`}
              title="Mobile viewport"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className={`p-4 sm:p-6 transition-all duration-300 ${viewMode === "mobile" ? "max-w-sm mx-auto" : "w-full"}`}>
        {activeTab === "preview" ? (
          <div className="space-y-6 text-[#2B1D15]">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#EAE0D4]">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#D47A41] to-[#E8955F] p-0.5 shadow-md shadow-[#D47A41]/15">
                    <div className="w-full h-full rounded-[14px] bg-[#FAF5EE] flex items-center justify-center font-bold text-base text-[#2B1D15]">
                      AC
                    </div>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#447250] border-2 border-[#FFFDF9]" />
                </div>

                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-[#2B1D15] tracking-tight">
                      Alex Chen
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FDF1E8] text-[#D47A41] border border-[#F6D5C2]">
                      Modern Dev
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#6D594D]">
                    Staff Systems & Full-Stack Architect
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#8C7A6E]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D47A41]" />
                      San Francisco, CA
                    </span>
                    <span>•</span>
                    <span className="text-[#345D40] font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#447250] animate-pulse" />
                      Open to High-Impact Roles
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Link Badges */}
              <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                <span className="px-3 py-1.5 rounded-xl bg-[#FAF5EE] hover:bg-[#F3EBE0] text-[#2B1D15] border border-[#E6DACB] flex items-center gap-1.5 transition-colors cursor-pointer text-xs font-semibold shadow-2xs">
                  <svg className="w-3.5 h-3.5 fill-current text-[#2B1D15] shrink-0" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>alexchen</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-[#FDF1E8] hover:bg-[#FBE4D5] text-[#D47A41] border border-[#F6D5C2] flex items-center gap-1.5 transition-colors cursor-pointer text-xs font-semibold shadow-2xs">
                  <svg className="w-3.5 h-3.5 fill-current text-[#D47A41] shrink-0" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span>Connect</span>
                </span>
              </div>
            </div>

            {/* Core Skills Section */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6D594D] flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#D47A41]" />
                  Core Stack & Competencies
                </span>
                <span className="text-[11px] text-[#345D40] font-semibold font-mono bg-[#ECF5EF] px-2 py-0.5 rounded-full border border-[#BDE0CB]">
                  14 Parsed
                </span>
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
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                      index < 4
                        ? "bg-[#FDF1E8] text-[#C25E26] border-[#F6D5C2]"
                        : "bg-[#FAF5EE] text-[#4A3B32] border-[#EADCCF]"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Projects Grid */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6D594D] flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-[#DE8638]" />
                  Featured Projects
                </span>
                <span className="text-[11px] text-[#8C7A6E] font-medium">Verified Codebases</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Project 1 */}
                <div className="p-4 rounded-xl bg-[#FAF5EE] border border-[#E6DACB] hover:border-[#D47A41]/60 transition-all shadow-2xs group cursor-pointer space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#2B1D15] flex items-center gap-1.5 group-hover:text-[#D47A41] transition-colors">
                      <span>StreamFlow AI</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#8C7A6E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </h4>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FDF1E8] text-[#D47A41] border border-[#F6D5C2] font-bold">
                      v2.4
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6D594D] leading-relaxed">
                    Real-time distributed streaming pipeline with automated LLM anomaly detection.
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {["Go", "Kafka", "TypeScript"].map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-[#FFFDF9] border border-[#E6DACB] text-[10px] font-mono text-[#6D594D]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project 2 */}
                <div className="p-4 rounded-xl bg-[#FAF5EE] border border-[#E6DACB] hover:border-[#D47A41]/60 transition-all shadow-2xs group cursor-pointer space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#2B1D15] flex items-center gap-1.5 group-hover:text-[#D47A41] transition-colors">
                      <span>VectorCache DB</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#8C7A6E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </h4>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#ECF5EF] text-[#345D40] border border-[#BDE0CB] font-bold">
                      ★ 1.8k
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6D594D] leading-relaxed">
                    High-throughput semantic similarity cache for LLM endpoints slashing latency by 72%.
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {["Rust", "Redis", "Python"].map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-[#FFFDF9] border border-[#E6DACB] text-[10px] font-mono text-[#6D594D]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Highlight */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6D594D] flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#447250]" />
                  Work Experience
                </span>
                <span className="text-[11px] text-[#8C7A6E]">Chronological</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF5EE] border border-[#E6DACB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 shadow-2xs">
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-[#2B1D15]">Staff Software Engineer</span>
                    <span className="text-[#CCAFA4]">•</span>
                    <span className="text-xs text-[#D47A41] font-bold">Stripe</span>
                  </div>
                  <p className="text-[11px] text-[#6D594D] leading-relaxed">
                    Architected global payout settlement subsystem processing $14B+ annually with 99.999% reliability.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#6D594D] shrink-0 bg-[#FFFDF9] border border-[#E6DACB] px-2.5 py-1 rounded-md font-semibold self-start sm:self-auto">
                  2022 — Present
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* AI Extracted Data Inspector Tab */
          <div className="space-y-4 font-mono text-xs">
            {/* Verification Status Card */}
            <div className="p-3.5 rounded-xl bg-[#ECF5EF] border border-[#BDE0CB] flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#345D40]">
                <CheckCircle2 className="w-4 h-4 text-[#388E3C]" />
                <span className="font-bold text-xs">Resume Parsing Complete</span>
              </div>
              <span className="text-[11px] text-[#345D40] font-bold font-mono">Confidence: 99.4%</span>
            </div>

            {/* Structured Insights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#FAF5EE] border border-[#E6DACB] space-y-1">
                <span className="text-[10px] text-[#8C7A6E] uppercase tracking-wide font-bold">ATS Readability</span>
                <div className="text-base font-bold text-[#2B1D15] font-sans">98 / 100</div>
                <p className="text-[11px] text-[#6D594D] font-sans">Optimized for corporate screening systems</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF5EE] border border-[#E6DACB] space-y-1">
                <span className="text-[10px] text-[#8C7A6E] uppercase tracking-wide font-bold">Taxonomy Match</span>
                <div className="text-base font-bold text-[#2B1D15] font-sans">Senior / Staff Architect</div>
                <p className="text-[11px] text-[#6D594D] font-sans">Distributed Systems & Cloud Engineering</p>
              </div>
            </div>

            {/* Extracted Entities List */}
            <div className="p-3.5 rounded-xl bg-[#FAF5EE] border border-[#E6DACB] space-y-2">
              <span className="text-[10px] text-[#8C7A6E] uppercase tracking-wide font-bold">Extracted Entities</span>
              <ul className="list-disc list-inside text-[#2B1D15] text-[11px] space-y-1 font-sans">
                <li><strong className="text-[#2B1D15]">3 Roles indexed:</strong> Stripe, Scale AI, Datadog</li>
                <li><strong className="text-[#2B1D15]">4 Key Projects parsed:</strong> StreamFlow AI, VectorCache DB, TelemetryEdge, ConsensusCore</li>
                <li><strong className="text-[#2B1D15]">14 Technical competencies</strong> grouped across systems and languages</li>
                <li><strong className="text-[#2B1D15]">B.S. in Computer Science</strong> — UC Berkeley (2018)</li>
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-[#FDF1E8] border border-[#F6D5C2] text-[#D47A41] text-[11px] flex items-center justify-between font-semibold">
              <span>Active Design: Modern Developer</span>
              <span className="text-[#D47A41] underline cursor-pointer">Live Preview</span>
            </div>
          </div>
        )}
      </div>

      {/* Window Status Footer Bar */}
      <div className="px-4 py-2.5 bg-[#FAF5EE] border-t border-[#E8DEC8] flex items-center justify-between text-xs text-[#6D594D]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#388E3C]" />
          <span className="text-[11px] font-medium text-[#2B1D15]">1-Click Global Edge Hosting</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#8C7A6E]">portfolify.ai/alex-chen</span>
        </div>
      </div>
    </div>
  );
}

