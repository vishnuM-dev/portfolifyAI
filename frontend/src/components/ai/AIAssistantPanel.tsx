"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Check,
  X,
  RotateCw,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Briefcase,
  FolderGit2,
  Type,
  FileText,
  ShieldCheck,
  Info,
  TrendingUp,
  Compass,
  Award,
  Zap,
} from "lucide-react";
import { aiApi } from "@/lib/aiApi";
import { IAIComprehensiveAnalysis, IAICareerAdvisor } from "@/types/ai";
import { IPortfolio } from "@/types/portfolio";

interface AIAssistantPanelProps {
  portfolio: IPortfolio;
  onApplyHeadline: (headline: string) => void;
  onApplySummary: (summary: string) => void;
  onApplySkills: (skills: string[]) => void;
  onApplyExperience: (index: number, description: string, achievements: string[]) => void;
  onApplyProject: (index: number, description: string, technologies?: string[]) => void;
  onApplySeo: (seo: { metaTitle?: string; metaDescription?: string; keywords?: string[]; slug?: string }) => void;
}

export function AIAssistantPanel({
  portfolio,
  onApplyHeadline,
  onApplySummary,
  onApplySkills,
  onApplyExperience,
  onApplyProject,
  onApplySeo,
}: AIAssistantPanelProps) {
  const [panelTab, setPanelTab] = useState<"polish" | "career_advisor">("polish");
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  const [providerInfo, setProviderInfo] = useState<{ provider: string; model: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Analysis Result
  const [analysis, setAnalysis] = useState<IAIComprehensiveAnalysis | null>(null);
  const [careerAdvice, setCareerAdvice] = useState<IAICareerAdvisor | null>(null);
  const [targetRole, setTargetRole] = useState("");

  // Individual active states
  const [summaryLength, setSummaryLength] = useState<"short" | "medium" | "detailed">("medium");
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null);

  // Dismissed items
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await aiApi.getStatus();
        if (res.success && res.data?.status) {
          setIsConfigured(res.data.status.isConfigured);
          setProviderInfo({
            provider: res.data.status.provider,
            model: res.data.status.model,
          });
        }
      } catch {
        setIsConfigured(false);
      }
    }
    checkStatus();
  }, []);

  const handleFullAnalysis = async () => {
    setLoading(true);
    setError(null);
    setSuccessNotice(null);
    setDismissed({});

    const steps = [
      "Analyzing verified career history...",
      "Extracting technical competencies & stack...",
      "Formulating ATS-optimized phrasing...",
      "Applying anti-hallucination verification...",
    ];

    let stepIdx = 0;
    setLoadingStep(steps[0]);
    const timer = setInterval(() => {
      stepIdx = (stepIdx + 1) % steps.length;
      setLoadingStep(steps[stepIdx]);
    }, 1800);

    try {
      const res = await aiApi.analyzePortfolio(portfolio._id);
      clearInterval(timer);

      if (res.success && res.data?.analysis) {
        setAnalysis(res.data.analysis);
        setSuccessNotice("✨ Portfolio intelligence analysis generated!");
        setTimeout(() => setSuccessNotice(null), 4000);
      } else {
        setError(res.message || "Failed to generate AI analysis.");
      }
    } catch {
      clearInterval(timer);
      setError("Unable to connect to AI service. Please verify backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleCareerAdvisor = async () => {
    setLoading(true);
    setError(null);
    setSuccessNotice(null);

    const steps = [
      "Auditing portfolio quality & depth...",
      "Calculating recruiter readiness scores...",
      "Running skill gap taxonomy matrix...",
      "Generating strategic career recommendations...",
    ];

    let stepIdx = 0;
    setLoadingStep(steps[0]);
    const timer = setInterval(() => {
      stepIdx = (stepIdx + 1) % steps.length;
      setLoadingStep(steps[stepIdx]);
    }, 1800);

    try {
      const res = await aiApi.generateCareerAdvice(portfolio._id, targetRole || undefined);
      clearInterval(timer);

      if (res.success && (res.data?.careerAdvice || (res as any).careerAdvice)) {
        setCareerAdvice(res.data?.careerAdvice || (res as any).careerAdvice);
        setSuccessNotice("✨ Career Intelligence audit complete!");
        setTimeout(() => setSuccessNotice(null), 4000);
      } else {
        setError(res.message || "Failed to generate career advice.");
      }
    } catch {
      clearInterval(timer);
      setError("Unable to connect to AI Career service.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateHeadline = async () => {
    setRegeneratingSection("headline");
    setError(null);
    try {
      const res = await aiApi.generateHeadline(portfolio._id);
      if (res.success && res.data?.headline) {
        setAnalysis((prev) => {
          if (!prev) return prev;
          return { ...prev, headline: res.data!.headline };
        });
        setDismissed((prev) => ({ ...prev, headline: false }));
      } else {
        setError(res.message || "Failed to regenerate headline.");
      }
    } catch {
      setError("Error regenerating headline.");
    } finally {
      setRegeneratingSection(null);
    }
  };

  const handleRegenerateSummary = async (len?: "short" | "medium" | "detailed") => {
    const targetLen = len || summaryLength;
    setRegeneratingSection("summary");
    setError(null);
    try {
      const res = await aiApi.generateSummary(portfolio._id, targetLen);
      if (res.success && res.data?.summary) {
        setAnalysis((prev) => {
          if (!prev) return prev;
          return { ...prev, summary: res.data!.summary };
        });
        setDismissed((prev) => ({ ...prev, summary: false }));
      } else {
        setError(res.message || "Failed to regenerate summary.");
      }
    } catch {
      setError("Error regenerating summary.");
    } finally {
      setRegeneratingSection(null);
    }
  };

  const handleRegenerateExperience = async (idx: number) => {
    setRegeneratingSection(`exp_${idx}`);
    setError(null);
    try {
      const res = await aiApi.improveExperience(portfolio._id, idx);
      if (res.success && res.data?.experience) {
        setAnalysis((prev) => {
          if (!prev) return prev;
          const updated = [...prev.experienceSuggestions];
          updated[idx] = res.data!.experience;
          return { ...prev, experienceSuggestions: updated };
        });
        setDismissed((prev) => ({ ...prev, [`exp_${idx}`]: false }));
      } else {
        setError(res.message || "Failed to improve experience.");
      }
    } catch {
      setError("Error improving experience.");
    } finally {
      setRegeneratingSection(null);
    }
  };

  const handleRegenerateProject = async (idx: number) => {
    setRegeneratingSection(`proj_${idx}`);
    setError(null);
    try {
      const res = await aiApi.improveProject(portfolio._id, idx);
      if (res.success && res.data?.project) {
        setAnalysis((prev) => {
          if (!prev) return prev;
          const updated = [...prev.projectSuggestions];
          updated[idx] = res.data!.project;
          return { ...prev, projectSuggestions: updated };
        });
        setDismissed((prev) => ({ ...prev, [`proj_${idx}`]: false }));
      } else {
        setError(res.message || "Failed to improve project.");
      }
    } catch {
      setError("Error improving project.");
    } finally {
      setRegeneratingSection(null);
    }
  };

  const dismissItem = (key: string) => {
    setDismissed((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E8DFD3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E8DFD3]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0F2] text-[#9B4D60] border border-[#EAD2D8] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Career Intelligence Engine</span>
          </div>
          <h2 className="text-xl font-bold text-[#2B1D1C]">AI Career Assistant & Portfolio Intelligence</h2>
          <p className="text-xs text-[#6B5755] mt-1">
            Explainable career scoring, skill gap matrix, ATS phrasing, and strategic talent advice.
          </p>
        </div>

        {/* AI Provider Status Tag */}
        <div className="flex items-center gap-2">
          {isConfigured ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EAF4EE] border border-[#BDE0CB] text-[#2F6141] text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#366B4A]" />
              <span>{providerInfo?.provider.toUpperCase()} ({providerInfo?.model})</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF0F2] border border-[#EAD2D8] text-[#9B4D60] text-xs font-semibold">
              <Info className="w-4 h-4" />
              <span>AI Provider Standby</span>
            </span>
          )}
        </div>
      </div>

      {/* Sub-Tabs: Content Polish vs Career Advisor */}
      <div className="flex items-center gap-2 border-b border-[#E8DFD3] pb-3">
        <button
          type="button"
          onClick={() => setPanelTab("polish")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            panelTab === "polish"
              ? "bg-[#2D5D60] text-white shadow-sm"
              : "bg-[#FAF7F2] text-[#52413F] hover:bg-[#F3ECE0]"
          }`}
        >
          ✨ Content Polish & ATS Optimizer
        </button>
        <button
          type="button"
          onClick={() => setPanelTab("career_advisor")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            panelTab === "career_advisor"
              ? "bg-[#2D5D60] text-white shadow-sm"
              : "bg-[#FAF7F2] text-[#52413F] hover:bg-[#F3ECE0]"
          }`}
        >
          🎯 AI Career Advisor & Readiness Scores
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-2xl bg-[#FDF2F4] border border-[#F5CCD4] text-[#9B4D60] text-xs flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {successNotice && (
        <div className="p-4 rounded-2xl bg-[#EAF4EE] border border-[#BDE0CB] text-[#2F6141] text-xs flex items-start gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#366B4A]" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Loading Animation */}
      {loading && (
        <div className="p-10 rounded-3xl bg-[#FAF7F2] border border-[#E8DFD3] text-center space-y-4 animate-in fade-in">
          <div className="w-12 h-12 rounded-2xl bg-[#2D5D60]/10 text-[#2D5D60] flex items-center justify-center mx-auto">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#2B1D1C]">{loadingStep}</h4>
            <p className="text-xs text-[#6B5755]">
              Evaluating documented background against industry hiring rubrics.
            </p>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* SUB-TAB 1: CONTENT POLISH & ATS OPTIMIZER */}
      {/* ========================================= */}
      {panelTab === "polish" && (
        <div className="space-y-6">
          {!analysis && !loading && (
            <div className="rounded-3xl bg-gradient-to-br from-[#2D5D60] to-[#1E3F41] text-white p-6 sm:p-8 space-y-6 shadow-md">
              <div className="space-y-2 max-w-xl">
                <h3 className="text-lg sm:text-xl font-bold">
                  Analyze your portfolio for recruiter appeal & ATS keywords
                </h3>
                <p className="text-xs sm:text-sm text-[#F5EFE6]/90 leading-relaxed">
                  Our anti-hallucination engine analyzes your existing profile, work history, projects, and skills to craft tailored headlines, bullet points, and clean skill taxonomy.
                </p>
              </div>

              <button
                type="button"
                onClick={handleFullAnalysis}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FAF7F2] hover:bg-[#F3ECE0] text-[#2D5D60] text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#9B4D60]" />
                <span>Run Complete AI Analysis</span>
              </button>
            </div>
          )}

          {analysis && !loading && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFD3]">
                <div className="flex items-center gap-2 text-xs text-[#6B5755]">
                  <Sparkles className="w-4 h-4 text-[#2D5D60]" />
                  <span>
                    Verified Seniority: <strong className="text-[#2B1D1C]">{analysis.detectedSeniority || "Mid-Senior"}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleFullAnalysis}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E8DFD3] text-xs font-semibold text-[#2B1D1C] hover:bg-[#F3ECE0] transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#2D5D60]" />
                  <span>Re-analyze All</span>
                </button>
              </div>

              {/* Headline Suggestion */}
              {!dismissed.headline && analysis.headline && (
                <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#2B1D1C]">
                      <Type className="w-4 h-4 text-[#2D5D60]" />
                      <span>Suggested Professional Headline</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          onApplyHeadline(analysis.headline.suggested);
                          setSuccessNotice("Headline applied to editor!");
                          setTimeout(() => setSuccessNotice(null), 3000);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#2D5D60] hover:bg-[#22484A] text-white text-xs font-semibold"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleRegenerateHeadline}
                        disabled={regeneratingSection === "headline"}
                        className="p-1.5 rounded-xl text-[#6B5755] hover:bg-[#FAF7F2]"
                      >
                        <RotateCw className={`w-4 h-4 ${regeneratingSection === "headline" ? "animate-spin" : ""}`} />
                      </button>
                      <button
                        type="button"
                        onClick={() => dismissItem("headline")}
                        className="p-1.5 rounded-xl text-[#6B5755] hover:text-[#9B4D60]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#6B5755]">Current in Editor</span>
                      <p className="text-[#52413F] font-medium">{portfolio.profile?.headline || "(Empty)"}</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#FAF0F2] border border-[#EAD2D8] space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#9B4D60]">AI Recommended</span>
                      <p className="text-[#2B1D1C] font-semibold">{analysis.headline.suggested}</p>
                      {analysis.headline.reasoning && (
                        <p className="text-[11px] text-[#6B5755] pt-1">{analysis.headline.reasoning}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Suggestion */}
              {!dismissed.summary && analysis.summary && (
                <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] space-y-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#2B1D1C]">
                      <FileText className="w-4 h-4 text-[#2D5D60]" />
                      <span>Professional Summary Generation</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center bg-[#FAF7F2] p-0.5 rounded-xl border border-[#E8DFD3] text-[11px]">
                        {(["short", "medium", "detailed"] as const).map((len) => (
                          <button
                            key={len}
                            type="button"
                            onClick={() => {
                              setSummaryLength(len);
                              handleRegenerateSummary(len);
                            }}
                            className={`px-2.5 py-1 rounded-lg capitalize font-semibold transition-all ${
                              summaryLength === len ? "bg-[#2D5D60] text-white" : "text-[#6B5755]"
                            }`}
                          >
                            {len}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onApplySummary(analysis.summary.suggested);
                          setSuccessNotice("Summary applied to editor!");
                          setTimeout(() => setSuccessNotice(null), 3000);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#2D5D60] hover:bg-[#22484A] text-white text-xs font-semibold"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => dismissItem("summary")}
                        className="p-1.5 rounded-xl text-[#6B5755] hover:text-[#9B4D60]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#6B5755]">Current Summary</span>
                      <p className="text-[#52413F] leading-relaxed whitespace-pre-line">
                        {portfolio.profile?.professionalSummary || "(Empty)"}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#FAF0F2] border border-[#EAD2D8] space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-[#9B4D60]">AI Suggested Summary</span>
                      <p className="text-[#2B1D1C] leading-relaxed whitespace-pre-line font-medium">
                        {analysis.summary.suggested}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============================================ */}
      {/* SUB-TAB 2: AI CAREER ADVISOR & READINESS     */}
      {/* ============================================ */}
      {panelTab === "career_advisor" && (
        <div className="space-y-6">
          {/* Target Role Input & Trigger */}
          <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#2B1D1C]">Target Role & Career Direction</h3>
              <p className="text-xs text-[#6B5755]">
                Optionally specify a dream role or seniority target to generate tailored skill gaps and readiness audits.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Principal Cloud Architect, Staff Backend Engineer, Lead Frontend..."
                className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8DFD3] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5D60]"
              />
              <button
                type="button"
                onClick={handleCareerAdvisor}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-[#2D5D60] hover:bg-[#22484A] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Run Career Intelligence Audit</span>
              </button>
            </div>
          </div>

          {/* Career Advice Output */}
          {careerAdvice && !loading && (
            <div className="space-y-6 animate-in fade-in">
              {/* 3 Explainable Score Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#E8DFD3] shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5755]">Portfolio Quality</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#2D5D60]">
                      {careerAdvice.careerScore.portfolioQualityScore}
                    </span>
                    <span className="text-xs text-[#6B5755]">/ 100</span>
                  </div>
                  <p className="text-[11px] text-[#6B5755]">Presentation rigor and project demonstration depth.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E8DFD3] shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5755]">Profile Completeness</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#9B4D60]">
                      {careerAdvice.careerScore.profileCompletenessScore}
                    </span>
                    <span className="text-xs text-[#6B5755]">/ 100</span>
                  </div>
                  <p className="text-[11px] text-[#6B5755]">Coverage of required role sections, skills, and links.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E8DFD3] shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5755]">Recruiter Readiness</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#366B4A]">
                      {careerAdvice.careerScore.recruiterReadinessScore}
                    </span>
                    <span className="text-xs text-[#6B5755]">/ 100</span>
                  </div>
                  <p className="text-[11px] text-[#6B5755]">ATS keyword alignment and quantifiable metrics score.</p>
                </div>
              </div>

              {/* Explainable Score Breakdown */}
              {careerAdvice.careerScore.scoreBreakdown && careerAdvice.careerScore.scoreBreakdown.length > 0 && (
                <div className="p-6 rounded-3xl bg-white border border-[#E8DFD3] space-y-4">
                  <h4 className="text-xs font-bold text-[#2B1D1C] uppercase tracking-wider flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#2D5D60]" />
                    <span>Explainable Scoring Breakdown</span>
                  </h4>
                  <div className="space-y-3">
                    {careerAdvice.careerScore.scoreBreakdown.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold text-[#2B1D1C]">
                          <span>{item.criterion}</span>
                          <span className="font-mono text-[#2D5D60]">{item.score} / {item.maxScore}</span>
                        </div>
                        <p className="text-xs text-[#6B5755]">{item.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skill Gap Analysis Matrix */}
              <div className="p-6 rounded-3xl bg-white border border-[#E8DFD3] space-y-4">
                <h4 className="text-xs font-bold text-[#2B1D1C] uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#9B4D60]" />
                  <span>Skill Gap Matrix & Recommendations</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-2">
                    <span className="text-[10px] font-bold uppercase text-[#2D5D60]">Verified Current Skills</span>
                    <div className="flex flex-wrap gap-1.5">
                      {careerAdvice.skillGap.currentSkills.map((s, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-[#E8DFD3] text-[#2B1D1C]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF0F2] border border-[#EAD2D8] space-y-2">
                    <span className="text-[10px] font-bold uppercase text-[#9B4D60]">High-Value Missing / Recommended Skills</span>
                    <div className="flex flex-wrap gap-1.5">
                      {careerAdvice.skillGap.recommendedSkills.map((s, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-[#EAD2D8] text-[#9B4D60] font-semibold">
                          +{s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Portfolio Advisor Suggestions */}
              {careerAdvice.portfolioAdvisorAdvice && careerAdvice.portfolioAdvisorAdvice.length > 0 && (
                <div className="p-6 rounded-3xl bg-white border border-[#E8DFD3] space-y-4">
                  <h4 className="text-xs font-bold text-[#2B1D1C] uppercase tracking-wider flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#2D5D60]" />
                    <span>AI Portfolio Advisor Recommendations</span>
                  </h4>
                  <div className="space-y-3">
                    {careerAdvice.portfolioAdvisorAdvice.map((adv, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#2B1D1C]">{adv.area}</span>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#2D5D60]/10 text-[#2D5D60]">
                            {adv.impact}
                          </span>
                        </div>
                        <p className="text-xs text-[#2B1D1C] font-medium">{adv.suggestion}</p>
                        <p className="text-[11px] text-[#6B5755] leading-relaxed">
                          <strong>Why:</strong> {adv.rationale}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AIAssistantPanel;
