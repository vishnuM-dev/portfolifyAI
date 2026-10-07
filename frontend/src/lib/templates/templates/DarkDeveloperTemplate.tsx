"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import { Terminal, Code, Cpu, ExternalLink, Mail, MapPin, Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function DarkDeveloperTemplate({ portfolio }: Props) {
  const { profile, skills = [], experience = [], education = [], projects = [], certifications = [], socialLinks = {} } = portfolio;

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#E2E8F0] font-mono selection:bg-[#10B981]/20 selection:text-[#10B981]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 space-y-16">
        {/* Terminal Header */}
        <header className="rounded-2xl bg-[#111622] border border-[#1E293B] shadow-2xl overflow-hidden">
          <div className="bg-[#182030] px-4 py-3 border-b border-[#1E293B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            </div>
            <span className="text-xs text-[#64748B] font-mono">portfolio.ts — 80x24</span>
            <div className="w-10" />
          </div>

          <div className="p-8 sm:p-10 space-y-6">
            <div className="space-y-2">
              <p className="text-xs text-[#10B981] flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>whoami</span>
              </p>
              <h1 className="text-3xl sm:text-5xl font-black text-white font-sans tracking-tight">
                {profile?.name || "Developer"}
              </h1>
              <p className="text-sm sm:text-base text-[#38BDF8] font-mono">
                &gt; {profile?.headline || "Full Stack Software Engineer"}
              </p>
            </div>

            {profile?.professionalSummary && (
              <div className="p-4 rounded-xl bg-[#0A0D14] border border-[#1E293B] text-xs sm:text-sm text-[#94A3B8] font-sans leading-relaxed">
                {profile.professionalSummary}
              </div>
            )}

            {/* Terminal Links */}
            <div className="flex flex-wrap gap-4 text-xs text-[#94A3B8] pt-2">
              {profile?.email && (
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 hover:text-[#10B981] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>{profile.email}</span>
                </a>
              )}
              {profile?.location && (
                <span className="inline-flex items-center gap-1.5 text-[#64748B]">
                  <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>{profile.location}</span>
                </span>
              )}
              {socialLinks?.github && (
                <a href={socialLinks.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#10B981]">
                  <GithubIcon className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>github</span>
                </a>
              )}
              {socialLinks?.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#10B981]">
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>linkedin</span>
                </a>
              )}
              {socialLinks?.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#10B981]">
                  <TwitterIcon className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>twitter</span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Skills */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold text-[#10B981] uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>// Tech Stack & Languages</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#111622] border border-[#1E293B] text-xs font-mono text-[#E2E8F0] hover:border-[#10B981]/50 transition-colors flex items-center justify-between"
                >
                  <span>{skill}</span>
                  <span className="text-[10px] text-[#10B981]">✓</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold text-[#10B981] uppercase tracking-widest flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>// Deployed Builds & Repositories</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#111622] border border-[#1E293B] hover:border-[#38BDF8]/50 transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white font-sans">{proj.title}</h3>
                      <div className="flex items-center gap-2.5 text-[#64748B]">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white">
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:text-[#10B981]">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-[#94A3B8] font-sans leading-relaxed">{proj.description}</p>
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1E293B]/70">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="text-[10px] font-mono text-[#38BDF8]">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Timeline */}
        {experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold text-[#10B981] uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>// Professional History</span>
            </h2>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#111622] border border-[#1E293B] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-sm font-bold text-white font-sans">{exp.position}</h3>
                    <span className="text-xs text-[#64748B] font-mono">
                      {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-xs text-[#10B981] font-mono">{exp.company} {exp.location ? `// ${exp.location}` : ""}</p>
                  {exp.description && <p className="text-xs text-[#94A3B8] font-sans leading-relaxed">{exp.description}</p>}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-xs text-[#94A3B8] font-sans">
                      {exp.achievements.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-[#1E293B]">
            <h2 className="text-xs font-bold text-[#10B981] uppercase tracking-widest">// Education & Academic Background</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {education.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#111622] border border-[#1E293B] space-y-1">
                  <h4 className="text-xs font-bold text-white font-sans">{edu.degree}</h4>
                  <p className="text-xs text-[#38BDF8]">{edu.institution}</p>
                  <p className="text-[11px] text-[#64748B] font-mono">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
