"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function MonochromePortfolioTemplate({ portfolio }: Props) {
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
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-16">
        {/* Header Hero */}
        <header className="border-b border-neutral-800 pb-12 space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
              [INDEX // PORTFOLIO]
            </span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
              {profile?.name || "ANONYMOUS"}
            </h1>
            <p className="text-base sm:text-xl font-medium text-neutral-300">
              {profile?.headline || "ENGINEER / DESIGNER"}
            </p>
          </div>

          {profile?.professionalSummary && (
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl">
              {profile.professionalSummary}
            </p>
          )}

          {/* Contact Bar */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-neutral-400 pt-2">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="hover:text-white underline underline-offset-4">
                {profile.email}
              </a>
            )}
            {profile?.location && (
              <span>LOC: {profile.location}</span>
            )}
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-white underline underline-offset-4">
                GITHUB
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-white underline underline-offset-4">
                LINKEDIN
              </a>
            )}
          </div>
        </header>

        {/* Skills List */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              // 01. CAPABILITIES
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-mono uppercase border border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-white transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              // 02. SELECTED WORKS
            </h2>

            <div className="border-t border-neutral-800 divide-y divide-neutral-800">
              {projects.map((proj, idx) => (
                <div key={idx} className="py-6 space-y-3 group">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <h3 className="text-lg font-bold uppercase tracking-tight text-white group-hover:text-neutral-300 transition-colors">
                      {proj.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white">
                          <span>VIEW LIVE</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white">
                          <span>SOURCE</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-3xl">
                    {proj.description}
                  </p>

                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[11px] font-mono text-neutral-500">
                      STACK: {proj.technologies.join(" / ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              // 03. CHRONOLOGY
            </h2>

            <div className="border-t border-neutral-800 divide-y divide-neutral-800">
              {experience.map((exp, idx) => (
                <div key={idx} className="py-6 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs font-mono gap-1">
                    <span className="text-sm font-bold text-white uppercase">{exp.position} // {exp.company}</span>
                    <span className="text-neutral-500">{exp.startDate} — {exp.currentlyWorking ? "NOW" : exp.endDate}</span>
                  </div>
                  {exp.description && <p className="text-xs text-neutral-400 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="space-y-4 border-t border-neutral-800 pt-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              // 04. EDUCATION
            </h2>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx} className="text-xs font-mono">
                  <p className="text-white font-bold uppercase">{edu.degree}</p>
                  <p className="text-neutral-500">{edu.institution} ({edu.startDate} - {edu.endDate})</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
