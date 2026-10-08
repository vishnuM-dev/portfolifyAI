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
      iconColor: "text-[#D47A41]",
      iconBg: "bg-[#FDF1E8]",
    },
    {
      icon: LayoutGrid,
      title: "Professional Templates",
      description:
        "Choose from modern portfolio designs created for professionals, software engineers, and creative leaders.",
      badge: "Curated Designs",
      iconColor: "text-[#DE8638]",
      iconBg: "bg-[#FDF5EC]",
    },
    {
      icon: SlidersHorizontal,
      title: "Live Portfolio Editor",
      description:
        "Edit your information and instantly see the changes in real-time before going live.",
      badge: "Real-time Preview",
      iconColor: "text-[#507D9E]",
      iconBg: "bg-[#EFF5F9]",
    },
    {
      icon: Link2,
      title: "Custom Portfolio URL",
      description:
        "Share your portfolio with a clean public URL that looks sharp on your LinkedIn, GitHub, or email signature.",
      badge: "Vanity Link",
      iconColor: "text-[#E8955F]",
      iconBg: "bg-[#FEF4EC]",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description:
        "Your portfolio looks professional on desktop, tablet, and mobile with zero extra layout configuration.",
      badge: "Adaptive Layout",
      iconColor: "text-[#9C6E52]",
      iconBg: "bg-[#F7F0EB]",
    },
    {
      icon: Send,
      title: "One-Click Publishing",
      description:
        "Publish your portfolio when you're ready with instant global edge CDN hosting and SEO optimization.",
      badge: "Edge Deployed",
      iconColor: "text-[#447250]",
      iconBg: "bg-[#ECF5EF]",
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF1E8] border border-[#F6D5C2] text-xs font-bold text-[#D47A41]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built for Modern Professionals</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2B1D15]">
            Everything You Need to Build Your Professional Presence
          </h2>

          <p className="text-base sm:text-lg text-[#6D594D] leading-relaxed">
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
