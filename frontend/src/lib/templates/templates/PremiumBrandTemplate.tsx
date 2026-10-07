"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import { Crown, Mail, Phone, MapPin, Globe, ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function PremiumBrandTemplate({ portfolio }: Props) {
  const { profile, skills = [], experience = [], education = [], projects = [], certifications = [], socialLinks = {} } = portfolio;

  return (
    <div className="min-h-screen bg-[#141211] text-[#EDE8E4] font-serif selection:bg-[#C5A880]/30 selection:text-[#C5A880]">
      {/* Luxury Editorial Header */}
      <header className="border-b border-[#2D2825] py-20 px-6 sm:px-12 bg-gradient-to-b from-[#1E1B19] to-[#141211]">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-widest bg-[#C5A880]/10 text-[#C5A880] border border-[#C5A880]/20 font-sans">
            <Crown className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Personal Monograph</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-white italic">
              {profile?.name || "Distinguished Creator"}
            </h1>
            <p className="text-base sm:text-xl text-[#C5A880] font-sans tracking-wide uppercase">
              {profile?.headline || "Design Executive & Engineer"}
            </p>
          </div>

          {profile?.professionalSummary && (
            <p className="text-sm sm:text-base text-[#B3AAA2] leading-relaxed max-w-2xl mx-auto font-sans font-light">
              {profile.professionalSummary}
            </p>
          )}

          {/* Socials & Contact */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#8C827A] font-sans pt-4">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[#C5A880]" />
                <span>{profile.email}</span>
              </a>
            )}
            {profile?.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C5A880]" />
                <span>{profile.location}</span>
              </span>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#C5A880] flex items-center gap-1.5">
                <LinkedinIcon className="w-4 h-4 text-[#C5A880]" />
                <span>LinkedIn</span>
              </a>
            )}
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-[#C5A880] flex items-center gap-1.5">
                <GithubIcon className="w-4 h-4 text-[#C5A880]" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-12 py-16 sm:py-24 space-y-20 font-sans">
        {/* Core Pillars / Skills */}
        {skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-[#C5A880] font-bold text-center font-sans">
              Domain Expertise & Pillars
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-[#1E1B19] border border-[#2D2825] text-[#EDE8E4] hover:border-[#C5A880] transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Selected Works / Projects */}
        {projects.length > 0 && (
          <section className="space-y-8">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-serif text-white italic">Selected Works & Case Studies</h2>
              <p className="text-xs text-[#8C827A]">Handcrafted technical and architectural solutions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#1A1715] border border-[#2D2825] hover:border-[#C5A880]/60 transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-serif text-white">{proj.title}</h3>
                      <div className="flex items-center gap-2 text-[#8C827A]">
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:text-[#C5A880]">
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-[#B3AAA2] leading-relaxed font-light">{proj.description}</p>
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#2D2825]">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="text-[11px] text-[#C5A880] font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Career & Experience */}
        {experience.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-xs uppercase tracking-widest text-[#C5A880] font-bold text-center">
              Curriculum & Career Milestones
            </h2>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-[#1A1715] border border-[#2D2825] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-base font-serif text-white">{exp.position}</h3>
                    <span className="text-xs text-[#8C827A] font-mono">
                      {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#C5A880]">{exp.company} {exp.location ? `· ${exp.location}` : ""}</p>
                  {exp.description && <p className="text-xs text-[#B3AAA2] leading-relaxed pt-1 font-light">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
