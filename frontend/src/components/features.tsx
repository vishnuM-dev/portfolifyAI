"use client";

import {
  BrainCircuit,
  LayoutGrid,
  SlidersHorizontal,
  Link2,
  Smartphone,
  Send,
  Sparkles,
} from "lucide-react";
import { FeatureCard } from "./feature-card";

export function Features() {
  const features = [
    {
      icon: BrainCircuit,
      title: "AI Resume Parsing",
      description:
        "Automatically extract your experience, skills, education, and projects with high precision from any resume format.",
      badge: "LLM Parser",
      iconColor: "text-[#2D5D60]",
      iconBg: "bg-[#E8F1F2]",
    },
    {
      icon: LayoutGrid,
      title: "Professional Templates",
      description:
        "Choose from modern portfolio designs created for professionals, software engineers, and creative leaders.",
      badge: "Curated Designs",
      iconColor: "text-[#9B4D60]",
      iconBg: "bg-[#FAF0F2]",
    },
    {
      icon: SlidersHorizontal,
      title: "Live Portfolio Editor",
      description:
        "Edit your information and instantly see the changes in real-time before going live.",
      badge: "Real-time Preview",
      iconColor: "text-[#4B749F]",
      iconBg: "bg-[#EEF4F9]",
    },
    {
      icon: Link2,
      title: "Custom Portfolio URL",
      description:
        "Share your portfolio with a clean public URL that looks sharp on your LinkedIn, GitHub, or email signature.",
      badge: "Vanity Link",
      iconColor: "text-[#E88661]",
      iconBg: "bg-[#FDF1EC]",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description:
        "Your portfolio looks professional on desktop, tablet, and mobile with zero extra layout configuration.",
      badge: "Adaptive Layout",
      iconColor: "text-[#85689E]",
      iconBg: "bg-[#F5F0F9]",
    },
    {
      icon: Send,
      title: "One-Click Publishing",
      description:
        "Publish your portfolio when you're ready with instant global edge CDN hosting and SEO optimization.",
      badge: "Edge Deployed",
      iconColor: "text-[#366B4A]",
      iconBg: "bg-[#EAF4EE]",
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0F2] border border-[#EAD2D8] text-xs font-bold text-[#9B4D60]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built for Modern Professionals</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2B1D1C]">
            Everything You Need to Build Your Professional Presence
          </h2>

          <p className="text-base sm:text-lg text-[#6B5755] leading-relaxed">
            Eliminate hours of manual coding and design wrestling. Our platform turns your raw career accomplishments into a high-converting portfolio.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              badge={feature.badge}
              iconColor={feature.iconColor}
              iconBg={feature.iconBg}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
