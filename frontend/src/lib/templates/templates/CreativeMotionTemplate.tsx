"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import { Sparkles, Mail, MapPin, Globe, ExternalLink, Flame } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function CreativeMotionTemplate({ portfolio }: Props) {
  const { profile, skills = [], experience = [], education = [], projects = [], certifications = [], socialLinks = {} } = portfolio;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1917] font-sans selection:bg-[#F43F5E]/20 selection:text-[#F43F5E] overflow-x-hidden">
      {/* Dynamic Aura background gradient */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-20 relative">
        {/* Playful Hero */}
        <header className="space-y-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#F43F5E]/10 to-[#8B5CF6]/10 text-[#F43F5E] border border-[#F43F5E]/20">
            <Flame className="w-4 h-4 text-[#F43F5E]" />
            <span>Creative Showcase</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#1C1917] leading-tight">
              {profile?.name || "Creative Maker"}
            </h1>
            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#F43F5E] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
              {profile?.headline || "Product Designer & Frontend Engineer"}
            </p>
          </div>

          {profile?.professionalSummary && (
            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed font-medium">
              {profile.professionalSummary}
            </p>
          )}

          {/* Socials & Contact */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="px-4 py-2 rounded-2xl bg-[#1C1917] text-white text-xs font-bold hover:bg-[#F43F5E] transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Me</span>
              </a>
            )}
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-2xl bg-white border border-[#E7E5E4] hover:border-[#F43F5E] transition-colors">
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-2xl bg-white border border-[#E7E5E4] hover:border-[#8B5CF6] transition-colors">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="p-2.5 rounded-2xl bg-white border border-[#E7E5E4] hover:border-[#06B6D4] transition-colors">
                <TwitterIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </header>

        {/* Skills Pills */}
        {skills.length > 0 && (
          <section className="space-y-4 text-center">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#8B5CF6]">Tools of the Trade</h2>
            <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl mx-auto">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-2xl text-xs font-bold bg-white border border-[#E7E5E4] text-[#1C1917] shadow-2xs hover:scale-105 hover:border-[#F43F5E] transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects in Creative Cards */}
        {projects.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-[#1C1917]">Featured Creations</h2>
                <p className="text-xs text-[#78716C]">Interactive experiments and scalable web builds</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-white border border-[#E7E5E4] hover:border-[#8B5CF6] shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-[#1C1917] group-hover:text-[#8B5CF6] transition-colors">
                        {proj.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[#78716C]">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:text-[#1C1917]">
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:text-[#F43F5E]">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-[#57534E] leading-relaxed font-medium">{proj.description}</p>
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F5F5F4] text-[#78716C]">
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

        {/* Experience & Career Journey */}
        {experience.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-2xl font-black text-[#1C1917]">Career Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-7 rounded-3xl bg-white border border-[#E7E5E4] shadow-sm space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-bold text-[#1C1917]">{exp.position}</h3>
                    <span className="text-[11px] font-bold text-[#8B5CF6] font-mono">
                      {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#F43F5E]">{exp.company} {exp.location ? `· ${exp.location}` : ""}</p>
                  {exp.description && <p className="text-xs text-[#57534E] leading-relaxed font-medium">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications */}
        {(education.length > 0 || certifications.length > 0) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-[#E7E5E4]">
            {education.length > 0 && (
              <div className="p-7 rounded-3xl bg-white border border-[#E7E5E4] space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#8B5CF6]">Education</h3>
                <div className="space-y-3">
                  {education.map((edu, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <h4 className="text-xs font-bold text-[#1C1917]">{edu.degree}</h4>
                      <p className="text-xs text-[#57534E]">{edu.institution} ({edu.startDate} - {edu.endDate})</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div className="p-7 rounded-3xl bg-white border border-[#E7E5E4] space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#06B6D4]">Certifications</h3>
                <div className="space-y-3">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <h4 className="text-xs font-bold text-[#1C1917]">{cert.name}</h4>
                      <p className="text-xs text-[#57534E]">{cert.issuer}</p>
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
