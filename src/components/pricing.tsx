"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Check, Sparkles, ArrowRight, CheckCircle2, Circle } from "lucide-react";

export function Pricing() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [selectedPlanId, setSelectedPlanId] = useState<string>("starter");
  const [selectedNotice, setSelectedNotice] = useState<string | null>(null);

  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "Ideal for students and professionals building their first portfolio website.",
      price: "Free",
      period: "forever",
      badge: "Free Tier",
      features: [
        "1 AI Resume Parsing (PDF & DOCX)",
        "Standard Portfolio Templates",
        "Public portfolify.ai subdomain",
        "Standard Edge CDN hosting",
        "Basic contact & social links",
      ],
      ctaText: "Get Started Free",
      isFree: true,
    },
    {
      id: "pro",
      name: "Pro Developer",
      description: "For engineers, designers, and managers who need custom domains and analytics.",
      price: "₹12",
      period: "per month",
      badge: "Most Popular",
      features: [
        "Unlimited AI Resume Extractions & Updates",
        "All Premium Templates (Dev, Minimal, Exec)",
        "Custom Domain Support (e.g. yourname.com)",
        "Recruiter Traffic & Click Analytics",
        "SEO Optimization & Social Card Preview",
        "Priority Edge Cloud Global Hosting",
        "No Portfolify AI Branding",
      ],
      ctaText: "Start 14-Day Free Trial",
      isFree: false,
    },
    {
      id: "executive",
      name: "Executive Lifetime",
      description: "One-time purchase for seasoned leaders and ongoing career advisory profiles.",
      price: "₹79",
      period: "one-time",
      badge: "Lifetime Access",
      features: [
        "Everything in Pro Tier forever",
        "Executive Advisory & Board Templates",
        "Multiple Portfolio Versions (Dev & Leader)",
        "Custom CSS & Accent Token Tuning",
        "Export Static HTML/Next.js Source",
        "Priority VIP Support",
      ],
      ctaText: "Get Lifetime Access",
      isFree: false,
    },
  ];

  const handleSelectPlan = (plan: typeof plans[0]) => {
    setSelectedPlanId(plan.id);
    setSelectedNotice(`You selected the ${plan.name} plan!`);

    setTimeout(() => {
      if (isAuthenticated) {
        router.push(`/dashboard?plan=${plan.id}`);
      } else {
        router.push(`/register?plan=${plan.id}`);
      }
    }, 600);
  };

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#F5EFE6]/70 border-t border-[#E8DFD3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF4EE] border border-[#BDE0CB] text-xs font-bold text-[#366B4A]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple, Transparent Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2B1D1C]">
            Invest in Your Professional Career
          </h2>

          <p className="text-base sm:text-lg text-[#6B5755] leading-relaxed">
            Choose any plan below. Click to select Free Starter, Pro Developer, or Executive Lifetime.
          </p>

          {selectedNotice && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2D5D60] text-white text-xs font-semibold shadow-md animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#A8DF8E]" />
              <span>{selectedNotice} Redirecting...</span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {plans.map((plan) => {
            const isSelected = selectedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => handleSelectPlan(plan)}
                id={`pricing-card-${plan.id}`}
                className={`relative rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left group ${
                  isSelected
                    ? "bg-[#FFFFFF] border-2 border-[#2D5D60] shadow-2xl shadow-[#2D5D60]/20 -translate-y-2 ring-2 ring-[#2D5D60]/20"
                    : "bg-[#FFFFFF] border border-[#E8DFD3] hover:border-[#2D5D60]/60 hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                {/* Top Badge */}
                {isSelected ? (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#2D5D60] text-white text-[10px] font-bold tracking-wider uppercase shadow-md z-10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#A8DF8E]" />
                    <span>SELECTED PLAN</span>
                  </div>
                ) : (
                  plan.badge === "Most Popular" && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#6B5755] text-white text-[10px] font-bold tracking-wider uppercase shadow-sm z-10">
                      RECOMMENDED
                    </div>
                  )
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#2B1D1C] tracking-tight group-hover:text-[#2D5D60] transition-colors">
                      {plan.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#6B5755] border border-[#E8DFD3]">
                        {plan.badge}
                      </span>
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-[#2D5D60]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#D1C4B4] group-hover:text-[#2D5D60] transition-colors" />
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#6B5755] leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Price Display */}
                  <div className="flex items-baseline gap-1.5 pb-6 mb-6 border-b border-[#E8DFD3]">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#2B1D1C] tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs text-[#7B6866] font-medium">/{plan.period}</span>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6B5755]">
                      What&apos;s Included
                    </span>
                    <ul className="space-y-2.5 text-xs text-[#4A3B39]">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#366B4A] shrink-0 mt-0.5 font-bold" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan(plan);
                  }}
                  id={`select-plan-btn-${plan.id}`}
                  className={`w-full py-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#2D5D60] hover:bg-[#22484A] text-white shadow-lg shadow-[#2D5D60]/25 hover:shadow-xl"
                      : "bg-[#FAF7F2] hover:bg-[#2D5D60] hover:text-white text-[#2B1D1C] border-2 border-[#D1C4B4] hover:border-[#2D5D60]"
                  }`}
                >
                  <span>{isSelected ? `Selected: ${plan.ctaText}` : plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
