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
  iconColor = "text-[#D47A41]",
  iconBg = "bg-[#FDF1E8]",
}: FeatureCardProps) {
  return (
    <div className="relative p-6 rounded-2xl bg-[#FFFDF9] border border-[#E6DACB] hover:border-[#D5C3AE] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2B1D15]/6 group flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className={`w-11 h-11 rounded-xl ${iconBg} border border-[#E6DACB] flex items-center justify-center group-hover:scale-105 transition-all duration-200 shadow-xs`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          {badge && (
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FDF1E8] text-[#D47A41] border border-[#F6D5C2]">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-[#2B1D15] tracking-tight mb-2 group-hover:text-[#D47A41] transition-colors">
          {title}
        </h3>

        <p className="text-sm text-[#6D594D] leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-[#E6DACB] flex items-center gap-2 text-xs font-semibold text-[#9E8C7E]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#447250]" />
        <span>Production Ready</span>
      </div>
    </div>
  );
}
