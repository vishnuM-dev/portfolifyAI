"use client";

import { useState } from "react";
import {
  X,
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Info,
} from "lucide-react";

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeUploadModal({ isOpen, onClose }: ResumeUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>("Alex_Chen_Staff_Engineer_Resume.pdf");
  const [isParsing, setIsParsing] = useState(false);
  const [parseSuccess, setParseSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulateParse = () => {
    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
      setParseSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setParseSuccess(false);
    setIsParsing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#241812]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#FFFDF9] border border-[#E6DACB] shadow-2xl shadow-[#241812]/20 p-5 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200 text-[#2B1D15] max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E6DACB]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FDF1E8] border border-[#F3CDB7] flex items-center justify-center text-[#D47A41]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2B1D15] tracking-tight">
                Upload Your Resume
              </h3>
              <p className="text-xs text-[#6D594D]">
                Step 1 of 4: Document Ingestion
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6D594D] hover:text-[#2B1D15] hover:bg-[#EFE6D8] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Dropzone UI */}
        {!parseSuccess ? (
          <div className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-all ${
                selectedFile
                  ? "border-[#D47A41]/50 bg-[#FDF1E8]/50"
                  : "border-[#E6DACB] hover:border-[#D47A41] bg-[#F8F3EC]"
              }`}
            >
              <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 text-[#D47A41] mx-auto mb-2 sm:mb-3" />
              <p className="text-xs sm:text-sm font-bold text-[#2B1D15] mb-1">
                Drag and drop your resume file here
              </p>
              <p className="text-[11px] sm:text-xs text-[#6D594D] mb-3 sm:mb-4">
                Supports PDF or DOCX up to 15MB
              </p>

              {/* Sample file pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFFDF9] border border-[#E6DACB] text-xs text-[#2B1D15] shadow-2xs max-w-full">
                <FileText className="w-3.5 h-3.5 text-[#D47A41] shrink-0" />
                <span className="font-mono text-[11px] font-semibold truncate max-w-[180px] sm:max-w-[240px]">
                  {selectedFile || "No file selected"}
                </span>
              </div>
            </div>

            {/* Quick Demo Pre-fills */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-[#6D594D] font-bold">
                Or test with sample profile:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedFile("Alex_Chen_Staff_Engineer_Resume.pdf")}
                  className="p-2.5 rounded-lg bg-[#FFFDF9] hover:bg-[#EFE6D8] border border-[#E6DACB] text-left text-xs text-[#2B1D15] transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-[#D47A41] shrink-0" />
                  <span className="truncate font-medium">Staff Engineer (PDF)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFile("Elena_Rostova_VP_Engineering.docx")}
                  className="p-2.5 rounded-lg bg-[#FFFDF9] hover:bg-[#EFE6D8] border border-[#E6DACB] text-left text-xs text-[#2B1D15] transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-[#DE8638] shrink-0" />
                  <span className="truncate font-medium">VP Engineering (DOCX)</span>
                </button>
              </div>
            </div>

            {/* Disclaimer pill */}
            <div className="p-3 rounded-lg bg-[#FDF5EC] border border-[#F3CDB7] flex items-start gap-2.5 text-xs text-[#6D594D]">
              <Info className="w-4 h-4 text-[#D47A41] shrink-0 mt-0.5" />
              <span className="text-[11px] sm:text-xs leading-relaxed">
                Resume parsing and AI extraction engine will be activated in upcoming steps.
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#6D594D] hover:text-[#2B1D15] transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSimulateParse}
                disabled={isParsing}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white font-semibold text-xs shadow-md shadow-[#D47A41]/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isParsing ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Extracting Profile...</span>
                  </>
                ) : (
                  <>
                    <span>Extract with AI</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Simulated extracted details feedback */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#ECF5EF] border border-[#BFDFCA] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#447250] mx-auto" />
              <h4 className="text-sm font-bold text-[#2B1D15]">Extraction Ready!</h4>
              <p className="text-xs text-[#6D594D]">
                Parsed 3 work experiences, 14 technical skills, and 4 project artifacts from {selectedFile}.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#FFFDF9] border border-[#E6DACB] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6D594D]">
                <span>Selected Theme:</span>
                <span className="text-[#2B1D15] font-bold">Modern Developer</span>
              </div>
              <div className="flex justify-between text-[#6D594D]">
                <span>Assigned URL:</span>
                <span className="text-[#D47A41] font-mono font-bold">portfolify.ai/preview-session</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[#6D594D] hover:text-[#2B1D15] underline cursor-pointer"
              >
                Upload another resume
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white font-semibold text-xs shadow-md shadow-[#D47A41]/20 transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
