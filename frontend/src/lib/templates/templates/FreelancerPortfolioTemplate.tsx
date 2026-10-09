"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  Briefcase,
  Star,
  Check,
  Send,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function FreelancerPortfolioTemplate({ portfolio }: Props) {
  const {
    profile,
    skills = [],
    experience = [],
    education = [],
    projects = [],
    socialLinks = {},
  } = portfolio;

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#292524] font-sans selection:bg-[#F59E0B]/20">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-20">
        {/* Hero Banner */}
        <header className="rounded-3xl bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7]/40 to-[#FFFDF9] border border-[#FDE68A] p-8 sm:p-14 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                <span>Available for New Projects & Freelance</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-[#292524] tracking-tight">
                {profile?.name || "Independent Consultant"}
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-[#D97706]">
                {profile?.headline || "Freelance Developer & Technical Consultant"}
              </p>
            </div>

            {profile?.email && (
              <a
                href={`mailto:${profile.email}?subject=Project%20Inquiry`}
                className="px-6 py-3.5 rounded-2xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#D97706]/20 inline-flex items-center gap-2 transition-all shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Hire Me</span>
              </a>
            )}
          </div>

          {profile?.professionalSummary && (
            <p className="text-sm sm:text-base text-[#78716C] leading-relaxed max-w-3xl">
              {profile.professionalSummary}
            </p>
          )}

          {/* Contact Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#78716C] pt-2">
            {profile?.email && (
              <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E7E5E4] inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{profile.email}</span>
              </span>
            )}
            {profile?.phone && (
              <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E7E5E4] inline-flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{profile.phone}</span>
              </span>
            )}
            {profile?.location && (
              <span className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E7E5E4] inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{profile.location}</span>
              </span>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white border border-[#E7E5E4] hover:text-[#D97706] transition-colors" title="LinkedIn">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white border border-[#E7E5E4] hover:text-[#D97706] transition-colors" title="GitHub">
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </header>

        {/* Services & Capabilities */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs uppercase font-bold tracking-widest text-[#D97706]">
              Services & Core Capabilities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {skills.map((skill, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E7E5E4] flex items-center justify-between text-xs font-semibold shadow-2xs">
                  <span>{skill}</span>
                  <Check className="w-4 h-4 text-[#D97706]" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Client Deliverables & Work */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs uppercase font-bold tracking-widest text-[#D97706]">
              Client Work & Delivered Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E5E4] flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md hover:border-[#D97706]/40 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-[#292524]">{proj.title}</h3>
                      {proj.category && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#B45309]">
                          {proj.category}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.technologies.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#F5F5F4] text-[#57534E]">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#F5F5F4]">
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#D97706] hover:bg-[#B45309] px-4 py-2 rounded-xl transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Result</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Client Track Record / Experience */}
        {experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs uppercase font-bold tracking-widest text-[#D97706]">
              Consulting History & Engagements
            </h2>

            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E5E4] space-y-3 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                    <div>
                      <h3 className="text-base font-bold text-[#292524]">{exp.position}</h3>
                      <p className="text-xs font-semibold text-[#D97706]">{exp.company} {exp.location && `· ${exp.location}`}</p>
                    </div>
                    <span className="text-[#A8A29E]">{exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}</span>
                  </div>
                  {exp.description && <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
