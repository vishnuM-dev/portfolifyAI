"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  Sparkles,
  Palette,
  Laptop,
  Code2,
  Calendar,
  Compass,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function FrontendDeveloperTemplate({ portfolio }: Props) {
  const {
    profile,
    skills = [],
    experience = [],
    education = [],
    projects = [],
    certifications = [],
    socialLinks = {},
  } = portfolio;

  return (
    <div className="min-h-screen bg-[#0F0D15] text-[#F3F4F6] font-sans selection:bg-[#EC4899]/30 selection:text-white">
      {/* Dynamic Aura Gradient header */}
      <div className="fixed top-0 inset-x-0 h-96 bg-gradient-to-b from-[#EC4899]/15 via-[#8B5CF6]/10 to-transparent pointer-events-none blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-20">
        {/* Hero Section */}
        <header className="space-y-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#EC4899]/20 to-[#8B5CF6]/20 text-[#F472B6] border border-[#EC4899]/30">
                <Palette className="w-3.5 h-3.5" />
                <span>Frontend Engineer & UI Architect</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
                {profile?.name || "Frontend Developer"}
              </h1>
              <p className="text-lg sm:text-2xl font-semibold bg-gradient-to-r from-[#F472B6] via-[#C084FC] to-[#38BDF8] bg-clip-text text-transparent">
                {profile?.headline || "Crafting fluid, high-performance web experiences"}
              </p>
            </div>

            {profile?.profileImage && (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#EC4899]/40 shadow-lg shadow-[#EC4899]/20 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {profile?.professionalSummary && (
            <p className="text-sm sm:text-base text-[#9CA3AF] max-w-2xl leading-relaxed">
              {profile.professionalSummary}
            </p>
          )}

          {/* Social and Contact row */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-medium text-[#9CA3AF]">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="px-3.5 py-2 rounded-xl bg-[#1A1625] hover:bg-[#261E38] text-white border border-[#2D2445] inline-flex items-center gap-1.5 transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#EC4899]" />
                <span>{profile.email}</span>
              </a>
            )}
            {profile?.location && (
              <span className="px-3.5 py-2 rounded-xl bg-[#1A1625] border border-[#2D2445] inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#EC4899]" />
                <span>{profile.location}</span>
              </span>
            )}
            {profile?.website && (
              <a href={profile.website} target="_blank" rel="noreferrer" className="px-3.5 py-2 rounded-xl bg-[#1A1625] hover:bg-[#261E38] text-white border border-[#2D2445] inline-flex items-center gap-1.5 transition-colors">
                <Globe className="w-3.5 h-3.5 text-[#EC4899]" />
                <span>Website</span>
              </a>
            )}
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#1A1625] hover:bg-[#261E38] text-[#D1D5DB] hover:text-white border border-[#2D2445] transition-colors" title="GitHub">
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#1A1625] hover:bg-[#261E38] text-[#D1D5DB] hover:text-white border border-[#2D2445] transition-colors" title="LinkedIn">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#1A1625] hover:bg-[#261E38] text-[#D1D5DB] hover:text-white border border-[#2D2445] transition-colors" title="Twitter">
                <TwitterIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </header>

        {/* Frontend Design Stack */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-[#EC4899]">
              <Code2 className="w-4 h-4" />
              <h2 className="text-xs uppercase font-mono tracking-widest text-[#F472B6]">
                Design Systems & UI Engineering Stack
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#1A1625] hover:bg-[#251D36] text-[#F3F4F6] border border-[#2D2445] hover:border-[#EC4899]/50 transition-all shadow-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Interactive Component & Project Showcase */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-[#EC4899]">
              <Laptop className="w-4 h-4" />
              <h2 className="text-xs uppercase font-mono tracking-widest text-[#F472B6]">
                Interactive Builds & Web Applications
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-[#161222] border border-[#2D2445] p-6 flex flex-col justify-between space-y-6 hover:border-[#EC4899]/50 transition-all hover:shadow-xl hover:shadow-[#EC4899]/10 group"
                >
                  <div className="space-y-4">
                    {/* Simulated Browser Bar */}
                    <div className="flex items-center gap-1.5 pb-2 border-b border-[#2D2445]">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
                      <span className="text-[10px] font-mono text-[#6B7280] ml-2 truncate">
                        {proj.liveUrl || proj.title.toLowerCase().replace(/\s+/g, "-") + ".dev"}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-[#F472B6] transition-colors">
                      {proj.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                      {proj.description}
                    </p>

                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {proj.technologies.map((t, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-[#211B33] text-[#D1D5DB] border border-[#2D2445]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-[#2D2445]">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] hover:opacity-95 px-4 py-2 rounded-xl transition-all shadow-md shadow-[#EC4899]/20"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Launch App</span>
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D1D5DB] hover:text-white bg-[#1A1625] hover:bg-[#261E38] px-3.5 py-2 rounded-xl transition-colors border border-[#2D2445]"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Track */}
        {experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs uppercase font-mono tracking-widest text-[#F472B6]">
              Frontend Journey & Product Experience
            </h2>

            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-[#161222] border border-[#2D2445] p-6 sm:p-8 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">{exp.position}</h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#EC4899]">
                        {exp.company} {exp.location && `· ${exp.location}`}
                      </p>
                    </div>
                    <div className="text-xs font-mono text-[#9CA3AF]">
                      {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                    </div>
                  </div>

                  {exp.description && (
                    <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="space-y-1.5 text-xs text-[#D1D5DB]">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#EC4899] mt-0.5">✦</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certs */}
        {(education.length > 0 || certifications.length > 0) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#2D2445] pt-12">
            {education.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xs uppercase font-mono tracking-widest text-[#F472B6]">Education</h2>
                <div className="space-y-3">
                  {education.map((edu, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#161222] border border-[#2D2445]">
                      <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                      <p className="text-xs text-[#EC4899]">{edu.institution}</p>
                      <p className="text-[11px] font-mono text-[#9CA3AF] mt-1">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xs uppercase font-mono tracking-widest text-[#F472B6]">Certifications</h2>
                <div className="space-y-3">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#161222] border border-[#2D2445]">
                      <h3 className="text-sm font-bold text-white">{cert.name}</h3>
                      <p className="text-xs text-[#EC4899]">{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
