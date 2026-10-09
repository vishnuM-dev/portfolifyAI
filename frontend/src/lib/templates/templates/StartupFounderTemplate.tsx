"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  Flame,
  TrendingUp,
  Target,
  Sparkles,
  Award,
} from "lucide-react";
import { LinkedinIcon, TwitterIcon, GithubIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function StartupFounderTemplate({ portfolio }: Props) {
  const {
    profile,
    skills = [],
    experience = [],
    education = [],
    projects = [],
    socialLinks = {},
  } = portfolio;

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FAFAF9] font-sans selection:bg-[#E11D48]/30 selection:text-white">
      {/* Background ambient light */}
      <div className="fixed top-0 inset-x-0 h-96 bg-gradient-to-b from-[#E11D48]/15 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-20">
        {/* Pitch Hero */}
        <header className="space-y-6 border-b border-[#292524] pb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#E11D48]/15 text-[#FB7185] border border-[#E11D48]/30">
            <Flame className="w-3.5 h-3.5" />
            <span>Founder & Venture Builder</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              {profile?.name || "Tech Founder"}
            </h1>
            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#FB7185] to-[#F43F5E] bg-clip-text text-transparent">
              {profile?.headline || "Building zero-to-one category defining products"}
            </p>
          </div>

          {profile?.professionalSummary && (
            <p className="text-sm sm:text-base text-[#A8A29E] max-w-3xl leading-relaxed">
              {profile.professionalSummary}
            </p>
          )}

          {/* Connect Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#A8A29E] pt-2">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-white border border-[#292524] inline-flex items-center gap-1.5 transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>{profile.email}</span>
              </a>
            )}
            {profile?.website && (
              <a href={profile.website} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-white border border-[#292524] inline-flex items-center gap-1.5 transition-colors">
                <Globe className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>Company Website</span>
              </a>
            )}
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-white border border-[#292524] transition-colors" title="Twitter">
                <TwitterIcon className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-white border border-[#292524] transition-colors" title="LinkedIn">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </header>

        {/* Ventures Founded & Portfolio Projects */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-[#FB7185]">
              <TrendingUp className="w-5 h-5" />
              <h2 className="text-xs uppercase font-mono tracking-widest font-bold">
                Ventures & Flagship Products
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-[#141211] border border-[#292524] p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#E11D48]/50 transition-all shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold text-white">{proj.title}</h3>
                      {proj.category && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E11D48]/20 text-[#FB7185]">
                          {proj.category}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed">
                      {proj.description}
                    </p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {proj.technologies.map((t, i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-[#1C1917] text-[#D6D3D1] border border-[#292524]">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#292524]">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#E11D48] hover:bg-[#BE123C] px-4 py-2 rounded-xl transition-colors shadow-md shadow-[#E11D48]/20"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Visit Venture</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Core Domains & Founder Skills */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs uppercase font-mono tracking-widest text-[#FB7185] font-bold">
              Domain Expertise & Strategic Competencies
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1C1917] text-[#FAFAF9] border border-[#292524] hover:border-[#E11D48]/40 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Leadership & Track Record */}
        {experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs uppercase font-mono tracking-widest text-[#FB7185] font-bold">
              Leadership Track Record
            </h2>

            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-[#141211] border border-[#292524] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                    <div>
                      <h3 className="text-base font-bold text-white">{exp.position}</h3>
                      <p className="text-xs font-semibold text-[#FB7185]">{exp.company}</p>
                    </div>
                    <span className="text-[#78716C]">{exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}</span>
                  </div>
                  {exp.description && <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed pt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
