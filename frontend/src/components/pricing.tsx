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
    <section id="pricing" className="py-24 sm:py-32 bg-[#EFE6D8]/50 border-t border-[#E6DACB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECF5EF] border border-[#BDE0CB] text-xs font-bold text-[#447250]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple, Transparent Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2B1D15]">
            Invest in Your Professional Career
          </h2>

          <p className="text-base sm:text-lg text-[#6D594D] leading-relaxed">
            Choose any plan below. Click to select Free Starter, Pro Developer, or Executive Lifetime.
          </p>

          {selectedNotice && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D47A41] text-white text-xs font-semibold shadow-md animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#FDF1E8]" />
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
                    ? "bg-[#FFFDF9] border-2 border-[#D47A41] shadow-2xl shadow-[#D47A41]/20 -translate-y-2 ring-2 ring-[#D47A41]/20"
                    : "bg-[#FFFDF9] border border-[#E6DACB] hover:border-[#D47A41]/60 hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                {/* Top Badge */}
                {isSelected ? (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#D47A41] text-white text-[10px] font-bold tracking-wider uppercase shadow-md z-10 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                    <span>SELECTED PLAN</span>
                  </div>
                ) : (
                  plan.badge === "Most Popular" && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#6D594D] text-white text-[10px] font-bold tracking-wider uppercase shadow-sm z-10">
                      RECOMMENDED
                    </div>
                  )
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#2B1D15] tracking-tight group-hover:text-[#D47A41] transition-colors">
                      {plan.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#F8F3EC] text-[#6D594D] border border-[#E6DACB]">
                        {plan.badge}
                      </span>
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-[#D47A41]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#D5C3AE] group-hover:text-[#D47A41] transition-colors" />
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#6D594D] leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Price Display */}
                  <div className="flex items-baseline gap-1.5 pb-6 mb-6 border-b border-[#E6DACB]">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#2B1D15] tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs text-[#9E8C7E] font-medium">/{plan.period}</span>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6D594D]">
                      What&apos;s Included
                    </span>
                    <ul className="space-y-2.5 text-xs text-[#2B1D15]">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#447250] shrink-0 mt-0.5 font-bold" />
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
                      ? "bg-[#D47A41] hover:bg-[#BF6A34] text-white shadow-lg shadow-[#D47A41]/25 hover:shadow-xl"
                      : "bg-[#F8F3EC] hover:bg-[#D47A41] hover:text-white text-[#2B1D15] border-2 border-[#E6DACB] hover:border-[#D47A41]"
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
