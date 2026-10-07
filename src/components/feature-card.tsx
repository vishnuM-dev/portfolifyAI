"use client";

import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  iconColor?: string;
  iconBg?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  iconColor = "text-[#2D5D60]",
  iconBg = "bg-[#E8F1F2]",
}: FeatureCardProps) {
  return (
    <div className="relative p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFD3] hover:border-[#D1C4B4] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2B1D1C]/6 group flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className={`w-11 h-11 rounded-xl ${iconBg} border border-[#E8DFD3] flex items-center justify-center group-hover:scale-105 transition-all duration-200 shadow-xs`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          {badge && (
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FAF0F2] text-[#9B4D60] border border-[#EAD2D8]">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-[#2B1D1C] tracking-tight mb-2 group-hover:text-[#2D5D60] transition-colors">
          {title}
        </h3>

        <p className="text-sm text-[#6B5755] leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-[#E8DFD3] flex items-center gap-2 text-xs font-semibold text-[#7B6866]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#366B4A]" />
        <span>Production Ready</span>
      </div>
    </div>
  );
}
