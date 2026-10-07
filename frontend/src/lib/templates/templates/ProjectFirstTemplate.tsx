"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import { FolderGit2, Mail, MapPin, Globe, ExternalLink, Sparkles, Layers } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function ProjectFirstTemplate({ portfolio }: Props) {
  const { profile, skills = [], experience = [], education = [], projects = [], certifications = [], socialLinks = {} } = portfolio;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E1B18] font-sans selection:bg-[#D97706]/20">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-20">
        {/* Compact Hero */}
        <header className="space-y-6 pb-12 border-b border-[#E7E0D8]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#D97706] font-bold">Featured Portfolio</span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E1B18] tracking-tight">
                {profile?.name || "Builder & Engineer"}
              </h1>
              <p className="text-base sm:text-xl font-bold text-[#4D7C0F]">
                {profile?.headline || "Software Architect"}
              </p>
            </div>

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="px-5 py-3 rounded-2xl bg-[#1E1B18] text-white text-xs font-bold hover:bg-[#D97706] transition-colors self-start md:self-auto shrink-0 inline-flex items-center gap-2 shadow-xs"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
              </a>
            )}
          </div>

          {profile?.professionalSummary && (
            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed max-w-3xl">
              {profile.professionalSummary}
            </p>
          )}

          {/* Socials */}
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#78716C]">
            {profile?.location && (
              <span className="inline-flex items-center gap-1.5 text-[#1E1B18]">
                <MapPin className="w-4 h-4 text-[#D97706]" />
                <span>{profile.location}</span>
              </span>
            )}
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#D97706]">
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#D97706]">
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            )}
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#D97706]">
                <TwitterIcon className="w-4 h-4" />
                <span>Twitter</span>
              </a>
            )}
          </div>
        </header>

        {/* DOMINANT SECTION: Projects Showcase */}
        {projects.length > 0 && (
          <section className="space-y-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-[#1E1B18] flex items-center gap-2">
                <FolderGit2 className="w-6 h-6 text-[#D97706]" />
                <span>Featured Engineering Projects</span>
              </h2>
              <p className="text-xs text-[#78716C]">In-depth overview of production architectures and active codebases</p>
            </div>

            <div className="space-y-8">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E7E0D8] hover:border-[#D97706] shadow-sm hover:shadow-md transition-all space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F5F0EB]">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706]">Project #{idx + 1}</span>
                      <h3 className="text-xl font-bold text-[#1E1B18]">{proj.title}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-[#FAF6F0] border border-[#E7E0D8] hover:border-[#1E1B18] text-[#1E1B18] inline-flex items-center gap-1.5 transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" /> Source Code
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-[#D97706] text-white hover:bg-[#B45309] inline-flex items-center gap-1.5 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-[#57534E] leading-relaxed">{proj.description}</p>

                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider">Technologies Used</span>
                      <div className="flex flex-wrap gap-2">
                        {proj.technologies.map((t, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#FAF6F0] text-[#1E1B18] border border-[#E7E0D8]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#D97706]">Technical Capabilities</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white border border-[#E7E0D8] text-[#1E1B18]"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#D97706]">Professional Background</h2>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E7E0D8] space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-bold text-[#1E1B18]">{exp.position}</h3>
                    <span className="text-xs text-[#78716C] font-mono">
                      {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#4D7C0F]">{exp.company}</p>
                  {exp.description && <p className="text-xs text-[#57534E] leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
