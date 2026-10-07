"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ValueSteps } from "@/components/value-steps";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { TemplatesPreview } from "@/components/templates-preview";
import { Pricing } from "@/components/pricing";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2B1D1C] selection:bg-[#2D5D60]/20 selection:text-[#2D5D60] relative overflow-x-hidden">
      {/* Precision grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none -z-10" />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section with Product Preview Mockup */}
      <Hero />

      {/* Trust / Value Section (From Resume → Professional Portfolio) */}
      <ValueSteps />

      {/* Features Section (6 Feature Cards) */}
      <Features />

      {/* How It Works Section (4 Steps with visual connections) */}
      <HowItWorks />

      {/* Portfolio Templates Preview (Modern Dev, Minimal, Executive) */}
      <TemplatesPreview />

      {/* Transparent Pricing Section */}
      <Pricing />

      {/* Final Call to Action Section */}
      <CtaSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
