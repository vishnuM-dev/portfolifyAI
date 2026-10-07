"use client";

import { Eye } from "lucide-react";
import React from "react";

export interface TemplateData {
  id: string;
  name: string;
  category: string;
  description: string;
  badge: string;
  visualPreview: React.ReactNode;
  tags: string[];
}

interface TemplateCardProps {
  template: TemplateData;
  onPreview: (template: TemplateData) => void;
}

export function TemplateCard({ template, onPreview }: TemplateCardProps) {
  return (
    <div className="relative rounded-2xl bg-[#FFFFFF] border border-[#E8DFD3] hover:border-[#D1C4B4] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#2B1D1C]/8 flex flex-col justify-between overflow-hidden group">
      {/* Top subtle highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2D5D60]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Visual Preview Box */}
      <div className="p-4 bg-[#FAF7F2] border-b border-[#E8DFD3] relative overflow-hidden">
        <div className="relative rounded-xl overflow-hidden border border-[#E8DFD3] bg-[#FFFFFF] shadow-xs transition-transform duration-300 group-hover:scale-[1.01]">
          {template.visualPreview}
        </div>

        {/* Hover overlay quick action */}
        <div className="absolute inset-0 bg-[#2B1D1C]/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <button
            type="button"
            onClick={() => onPreview(template)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2D5D60] hover:bg-[#22484A] text-white font-semibold text-xs shadow-lg shadow-[#2D5D60]/30 transition-transform active:scale-95 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive Preview</span>
          </button>
        </div>
      </div>

      {/* Content details */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#2D5D60] font-mono">
              {template.category}
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FAF0F2] text-[#9B4D60] border border-[#EAD2D8]">
              {template.badge}
            </span>
          </div>

          <h3 className="text-lg font-bold text-[#2B1D1C] tracking-tight mb-2 group-hover:text-[#2D5D60] transition-colors">
            {template.name}
          </h3>

          <p className="text-xs sm:text-sm text-[#6B5755] leading-relaxed mb-4">
            {template.description}
          </p>
        </div>

        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#5A4947] border border-[#E8DFD3]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Preview Button */}
          <button
            type="button"
            onClick={() => onPreview(template)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#2D5D60] hover:text-white text-[#2B1D1C] text-xs font-bold border border-[#E8DFD3] hover:border-[#2D5D60] transition-all cursor-pointer active:scale-[0.99]"
            id={`preview-btn-${template.id}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Template</span>
          </button>
        </div>
      </div>
    </div>
  );
}
