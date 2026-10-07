"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import { Sparkles, Mail, MapPin, Globe, ExternalLink, Code2, Briefcase, GraduationCap } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function ModernGlassTemplate({ portfolio }: Props) {
  const { profile, skills = [], experience = [], education = [], projects = [], certifications = [], socialLinks = {} } = portfolio;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A] text-white font-sans selection:bg-[#818CF8]/30 overflow-hidden relative">
      {/* Background glowing orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#818CF8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C084FC]/10 rounded-full blur-3xl pointer-events-none" />

      <main className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-16 relative z-10">
        {/* Glass Hero Card */}
        <header className="p-8 sm:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#C084FC] border border-white/10 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Glassmorphism Collection</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              {profile?.name || "Portfolio"}
            </h1>
            <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#818CF8] via-[#C084FC] to-[#F472B6] bg-clip-text text-transparent">
              {profile?.headline || "Senior Engineer"}
            </p>
          </div>

          {profile?.professionalSummary && (
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl font-light">
              {profile.professionalSummary}
            </p>
          )}

          {/* Contact and Links */}
          <div className="flex flex-wrap gap-4 text-xs text-white/70 pt-2">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-[#818CF8]" />
                <span>{profile.email}</span>
              </a>
            )}
            {profile?.location && (
              <span className="inline-flex items-center gap-1.5 text-white/60">
                <MapPin className="w-4 h-4 text-[#818CF8]" />
                <span>{profile.location}</span>
              </span>
            )}
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
                <GithubIcon className="w-4 h-4 text-[#C084FC]" />
                <span>GitHub</span>
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
                <LinkedinIcon className="w-4 h-4 text-[#C084FC]" />
                <span>LinkedIn</span>
              </a>
            )}
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
                <TwitterIcon className="w-4 h-4 text-[#C084FC]" />
                <span>Twitter</span>
              </a>
            )}
          </div>
        </header>

        {/* Glass Skills */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#C084FC]">Core Expertise</h2>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1.5 rounded-2xl text-xs font-medium bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-[#818CF8]/50 transition-all"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Glass Projects Grid */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#C084FC]">Featured Builds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white group-hover:text-[#818CF8] transition-colors">
                        {proj.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/60">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white">
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:text-[#C084FC]">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">{proj.description}</p>
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-lg text-[10px] bg-white/10 text-white/80 border border-white/5">
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

        {/* Glass Experience */}
        {experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#C084FC]">Work Experience</h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-sm font-bold text-white">{exp.position}</h3>
                    <span className="text-xs text-white/50 font-mono">
                      {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#818CF8]">{exp.company} {exp.location ? `· ${exp.location}` : ""}</p>
                  {exp.description && <p className="text-xs text-white/70 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
