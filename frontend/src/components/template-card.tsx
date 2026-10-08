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
    <div className="relative rounded-2xl bg-[#FFFDF9] border border-[#E6DACB] hover:border-[#D5C3AE] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#2B1D15]/8 flex flex-col justify-between overflow-hidden group">
      {/* Top subtle highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D47A41]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Visual Preview Box */}
      <div className="p-4 bg-[#F8F3EC] border-b border-[#E6DACB] relative overflow-hidden">
        <div className="relative rounded-xl overflow-hidden border border-[#E6DACB] bg-[#FFFDF9] shadow-xs transition-transform duration-300 group-hover:scale-[1.01]">
          {template.visualPreview}
        </div>

        {/* Hover overlay quick action */}
        <div className="absolute inset-0 bg-[#2B1D15]/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <button
            type="button"
            onClick={() => onPreview(template)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D47A41] hover:bg-[#BF6A34] text-white font-semibold text-xs shadow-lg shadow-[#D47A41]/30 transition-transform active:scale-95 cursor-pointer"
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
            <span className="text-xs font-bold text-[#D47A41] font-mono">
              {template.category}
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FDF1E8] text-[#D47A41] border border-[#F6D5C2]">
              {template.badge}
            </span>
          </div>

          <h3 className="text-lg font-bold text-[#2B1D15] tracking-tight mb-2 group-hover:text-[#D47A41] transition-colors">
            {template.name}
          </h3>

          <p className="text-xs sm:text-sm text-[#6D594D] leading-relaxed mb-4">
            {template.description}
          </p>
        </div>

        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#F8F3EC] text-[#2B1D15] border border-[#E6DACB]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Preview Button */}
          <button
            type="button"
            onClick={() => onPreview(template)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F8F3EC] hover:bg-[#D47A41] hover:text-white text-[#2B1D15] text-xs font-bold border border-[#E6DACB] hover:border-[#D47A41] transition-all cursor-pointer active:scale-[0.99]"
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
