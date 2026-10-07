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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2B1D1C]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#FAF7F2] border border-[#E8DFD3] shadow-2xl shadow-[#2B1D1C]/20 p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200 text-[#2B1D1C]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD3]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8F1F2] border border-[#C3DCDE] flex items-center justify-center text-[#2D5D60]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2B1D1C] tracking-tight">
                Upload Your Resume
              </h3>
              <p className="text-xs text-[#6B5755]">
                Step 1 of 4: Document Ingestion
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B5755] hover:text-[#2B1D1C] hover:bg-[#E8DFD3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Dropzone UI */}
        {!parseSuccess ? (
          <div className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                selectedFile
                  ? "border-[#2D5D60]/50 bg-[#E8F1F2]/40"
                  : "border-[#E8DFD3] hover:border-[#2D5D60] bg-[#FFFFFF]"
              }`}
            >
              <UploadCloud className="w-10 h-10 text-[#2D5D60] mx-auto mb-3" />
              <p className="text-xs sm:text-sm font-bold text-[#2B1D1C] mb-1">
                Drag and drop your resume file here
              </p>
              <p className="text-xs text-[#6B5755] mb-4">
                Supports PDF or DOCX up to 15MB
              </p>

              {/* Sample file pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#E8DFD3] text-xs text-[#2B1D1C] shadow-2xs">
                <FileText className="w-3.5 h-3.5 text-[#2D5D60]" />
                <span className="font-mono text-[11px] font-semibold truncate max-w-[200px]">
                  {selectedFile || "No file selected"}
                </span>
              </div>
            </div>

            {/* Quick Demo Pre-fills */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-[#6B5755] font-bold">
                Or test with sample profile:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedFile("Alex_Chen_Staff_Engineer_Resume.pdf")}
                  className="p-2 rounded-lg bg-[#FFFFFF] hover:bg-[#F3ECE0] border border-[#E8DFD3] text-left text-xs text-[#2B1D1C] transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2D5D60]" />
                  <span className="truncate font-medium">Staff Engineer (PDF)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFile("Elena_Rostova_VP_Engineering.docx")}
                  className="p-2 rounded-lg bg-[#FFFFFF] hover:bg-[#F3ECE0] border border-[#E8DFD3] text-left text-xs text-[#2B1D1C] transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-[#E88661]" />
                  <span className="truncate font-medium">VP Engineering (DOCX)</span>
                </button>
              </div>
            </div>

            {/* Disclaimer pill */}
            <div className="p-3 rounded-lg bg-[#FAF0F2] border border-[#EAD2D8] flex items-start gap-2.5 text-xs text-[#6B5755]">
              <Info className="w-4 h-4 text-[#9B4D60] shrink-0 mt-0.5" />
              <span>
                Resume parsing and AI extraction engine will be activated in upcoming steps.
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5A4947] hover:text-[#2B1D1C] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSimulateParse}
                disabled={isParsing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2D5D60] hover:bg-[#22484A] text-white font-semibold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
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
            <div className="p-4 rounded-xl bg-[#EAF4EE] border border-[#BDE0CB] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#366B4A] mx-auto" />
              <h4 className="text-sm font-bold text-[#2B1D1C]">Extraction Ready!</h4>
              <p className="text-xs text-[#5A4947]">
                Parsed 3 work experiences, 14 technical skills, and 4 project artifacts from {selectedFile}.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E8DFD3] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6B5755]">
                <span>Selected Theme:</span>
                <span className="text-[#2B1D1C] font-bold">Modern Developer</span>
              </div>
              <div className="flex justify-between text-[#6B5755]">
                <span>Assigned URL:</span>
                <span className="text-[#2D5D60] font-mono font-bold">portfolify.ai/preview-session</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[#6B5755] hover:text-[#2B1D1C] underline cursor-pointer"
              >
                Upload another resume
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#2D5D60] hover:bg-[#22484A] text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
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
