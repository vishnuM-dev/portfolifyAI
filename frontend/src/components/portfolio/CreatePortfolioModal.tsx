"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { portfolioApi } from "@/lib/portfolioApi";
import { X, Sparkles, FileText, UploadCloud, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface CreatePortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export function CreatePortfolioModal({ isOpen, onClose, onCreated }: CreatePortfolioModalProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<"choice" | "upload">("choice");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsedSummary, setParsedSummary] = useState<{
    name?: string;
    skillsCount: number;
    expCount: number;
    eduCount: number;
    projCount: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleStartScratch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await portfolioApi.createPortfolio({
        profile: {
          name: "",
          headline: "",
          professionalSummary: "",
          email: "",
          phone: "",
          location: "",
          website: "",
        },
        skills: [],
        experience: [],
        education: [],
        projects: [],
        certifications: [],
        template: "professional",
      });

      const createdPf = res.data?.portfolio || (res as any).portfolio;
      if (res.success && createdPf) {
        onCreated?.();
        onClose();
        router.push(`/portfolio/${createdPf._id}/edit`);
      } else {
        setError(res.message || "Failed to create portfolio.");
        setIsLoading(false);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      const ext = selected.name.toLowerCase().split(".").pop();
      if (!["pdf", "docx", "doc", "txt"].includes(ext || "")) {
        setError("Only PDF, DOCX, and TXT files are supported.");
        return;
      }
      setFile(selected);
      setError(null);
    }
  };

  const handleUploadAndParse = async () => {
    if (!file) {
      setError("Please select a resume file.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Upload and parse resume
      const parseRes = await portfolioApi.parseResumeFile(file);

      if (!parseRes.success || !parseRes.structuredData) {
        setError(parseRes.message || "Failed to parse resume.");
        setIsLoading(false);
        return;
      }

      const parsed = parseRes.structuredData;
      setParsedSummary({
        name: parsed.profile.name,
        skillsCount: parsed.skills.length,
        expCount: parsed.experience.length,
        eduCount: parsed.education.length,
        projCount: parsed.projects.length,
      });

      // 2. Create portfolio document in MongoDB
      const createRes = await portfolioApi.createPortfolio({
        profile: parsed.profile as any,
        skills: parsed.skills,
        experience: parsed.experience,
        education: parsed.education,
        projects: parsed.projects,
        certifications: parsed.certifications,
        socialLinks: parsed.socialLinks,
        resume: parseRes.resumeMeta,
        template: "professional",
      });

      const createdPf = createRes.data?.portfolio || (createRes as any).portfolio;
      if (createRes.success && createdPf) {
        setTimeout(() => {
          onCreated?.();
          onClose();
          router.push(`/portfolio/${createdPf._id}/edit`);
        }, 1200);
      } else {
        setError(createRes.message || "Failed to save portfolio.");
        setIsLoading(false);
      }
    } catch {
      setError("An unexpected error occurred while processing the resume.");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2B1D15]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#F8F3EC] border border-[#E6DACB] shadow-2xl p-5 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150 text-[#2B1D15] max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E6DACB]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D47A41] to-[#E8955F] flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#2B1D15] tracking-tight">
                Create New Portfolio
              </h3>
              <p className="text-xs text-[#6D594D]">
                Choose how you want to build your portfolio
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6D594D] hover:text-[#2B1D15] hover:bg-[#E6DACB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-[#FDF0EE] border border-[#F9CBC6] text-[#C03E31] text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Choice Mode */}
        {mode === "choice" && (
          <div className="space-y-4">
            {/* Option 1: AI Resume Import */}
            <div
              onClick={() => setMode("upload")}
              className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border-2 border-[#E6DACB] hover:border-[#D47A41] transition-all cursor-pointer group shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#FDF1E8] text-[#D47A41] flex items-center justify-center border border-[#F6D5C2] group-hover:scale-105 transition-transform shrink-0">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-[#2B1D15]">Upload Resume (PDF / DOCX)</h4>
                    <p className="text-[11px] sm:text-xs text-[#6D594D] truncate">Auto-extract skills, experience & projects</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#6D594D] group-hover:text-[#D47A41] group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            </div>

            {/* Option 2: Start from Scratch */}
            <div
              onClick={handleStartScratch}
              className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] border-2 border-[#E6DACB] hover:border-[#D47A41] transition-all cursor-pointer group shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#F8F3EC] text-[#D47A41] flex items-center justify-center border border-[#E6DACB] group-hover:scale-105 transition-transform shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-[#2B1D15]">Start from Scratch</h4>
                    <p className="text-[11px] sm:text-xs text-[#6D594D] truncate">Build manually with interactive editor</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#6D594D] group-hover:text-[#D47A41] group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            </div>
          </div>
        )}

        {/* Upload Mode */}
        {mode === "upload" && (
          <div className="space-y-4">
            {!parsedSummary ? (
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
                    file
                      ? "border-[#D47A41] bg-[#FDF1E8]/50"
                      : "border-[#E6DACB] hover:border-[#D47A41] bg-[#FFFDF9]"
                  }`}
                >
                  <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 text-[#D47A41] mx-auto mb-2 sm:mb-3" />
                  <p className="text-xs sm:text-sm font-bold text-[#2B1D15] mb-1 truncate max-w-[260px] sm:max-w-none mx-auto">
                    {file ? file.name : "Click to select or drop your resume file"}
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#6D594D]">
                    Supports PDF, DOCX, or TXT up to 15MB
                  </p>
                  {file && (
                    <span className="inline-block mt-3 px-3 py-1 rounded-full bg-[#ECF5EF] text-[#345D40] text-[11px] font-mono font-semibold border border-[#BDE0CB]">
                      {(file.size / 1024).toFixed(1)} KB selected
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => { setMode("choice"); setFile(null); }}
                    className="px-4 py-2 text-xs font-semibold text-[#6D594D] hover:text-[#2B1D15]"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleUploadAndParse}
                    disabled={!file || isLoading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white text-xs sm:text-sm font-semibold shadow-md transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Extracting & Building...</span>
                      </>
                    ) : (
                      <>
                        <span>Extract & Create</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-[#ECF5EF] border border-[#BDE0CB] text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#447250] mx-auto" />
                <h4 className="text-sm font-bold text-[#2B1D15]">Resume Extracted Successfully!</h4>
                <div className="flex flex-wrap justify-center gap-2 text-xs text-[#345D40]">
                  <span>✓ {parsedSummary.skillsCount} Skills</span>
                  <span>✓ {parsedSummary.expCount} Experiences</span>
                  <span>✓ {parsedSummary.eduCount} Degrees</span>
                  <span>✓ {parsedSummary.projCount} Projects</span>
                </div>
                <p className="text-xs text-[#6D594D] animate-pulse">Redirecting to portfolio editor...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePortfolioModal;
