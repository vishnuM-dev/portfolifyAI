"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  Layers,
  Server,
  Layout,
  Database,
  Terminal,
  Calendar,
  Sparkles,
  GitBranch,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function FullstackDeveloperTemplate({ portfolio }: Props) {
  const {
    profile,
    skills = [],
    experience = [],
    education = [],
    projects = [],
    certifications = [],
    socialLinks = {},
  } = portfolio;

  // Categorize skills into frontend, backend, and tools/infra heuristically
  const feKeywords = ["react", "vue", "next", "tailwind", "html", "css", "javascript", "typescript", "ui", "redux", "angular"];
  const beKeywords = ["node", "express", "python", "django", "flask", "java", "spring", "golang", "sql", "postgres", "mongodb", "redis", "graphql", "rest", "fastapi"];

  const feSkills = skills.filter((s) => feKeywords.some((k) => s.toLowerCase().includes(k)));
  const beSkills = skills.filter((s) => beKeywords.some((k) => s.toLowerCase().includes(k)));
  const otherSkills = skills.filter((s) => !feSkills.includes(s) && !beSkills.includes(s));

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#E2E8F0] font-sans selection:bg-[#6366F1]/30 selection:text-white">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#6366F1]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-20">
        {/* Header Hero */}
        <header className="border-b border-[#1E293B] pb-14 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#6366F1]/15 text-[#818CF8] border border-[#6366F1]/30">
                <Terminal className="w-3.5 h-3.5" />
                <span>Full-Stack Architecture & Systems</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                {profile?.name || "Full-Stack Engineer"}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-[#94A3B8]">
                {profile?.headline || "Building scalable distributed web applications"}
              </p>
            </div>

            {/* Quick Status Pill */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E293B]/70 border border-[#334155] shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-[#CBD5E1]">Architecture Ready</span>
            </div>
          </div>

          {profile?.professionalSummary && (
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-3xl leading-relaxed">
              {profile.professionalSummary}
            </p>
          )}

          {/* Contact & Social Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[#94A3B8] pt-2">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 hover:text-[#818CF8] transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span>{profile.email}</span>
              </a>
            )}
            {profile?.phone && (
              <span className="inline-flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>{profile.phone}</span>
              </span>
            )}
            {profile?.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{profile.location}</span>
              </span>
            )}
            {profile?.website && (
              <a href={profile.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#818CF8]">
                <Globe className="w-3.5 h-3.5" />
                <span>Live Domain</span>
              </a>
            )}
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#818CF8]">
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#818CF8]">
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            )}
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#818CF8]">
                <TwitterIcon className="w-3.5 h-3.5" />
                <span>Twitter</span>
              </a>
            )}
          </div>
        </header>

        {/* Stack Architecture Matrix */}
        {skills.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#818CF8]" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#818CF8]">
                Full-Stack Systems Matrix
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Frontend Card */}
              <div className="rounded-2xl bg-[#131B2E] border border-[#1E293B] p-6 space-y-4">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Layout className="w-4 h-4 text-sky-400" />
                  <span>Frontend Engineering</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(feSkills.length > 0 ? feSkills : skills.slice(0, 4)).map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#1E293B] text-sky-300 border border-sky-500/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend Card */}
              <div className="rounded-2xl bg-[#131B2E] border border-[#1E293B] p-6 space-y-4">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Server className="w-4 h-4 text-emerald-400" />
                  <span>Backend & APIs</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(beSkills.length > 0 ? beSkills : skills.slice(4, 8)).map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#1E293B] text-emerald-300 border border-emerald-500/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cloud / Other */}
              <div className="rounded-2xl bg-[#131B2E] border border-[#1E293B] p-6 space-y-4">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Database className="w-4 h-4 text-indigo-400" />
                  <span>Data & Infrastructure</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(otherSkills.length > 0 ? otherSkills : skills.slice(8)).map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#1E293B] text-indigo-300 border border-indigo-500/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Featured Full-Stack Builds */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-[#818CF8]" />
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#818CF8]">
                  Production Deployments & Architecture
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#131B2E] border border-[#1E293B] p-6 flex flex-col justify-between space-y-6 hover:border-[#6366F1]/50 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#818CF8] transition-colors">
                        {proj.title}
                      </h3>
                      {proj.category && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#1E293B] text-[#94A3B8] border border-[#334155]">
                          {proj.category}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                      {proj.description}
                    </p>

                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {proj.technologies.map((t, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[#0B0F19] text-[#CBD5E1] border border-[#1E293B]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-[#1E293B]">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#6366F1] hover:bg-[#4F46E5] px-3.5 py-1.5 rounded-xl transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live System</span>
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#CBD5E1] hover:text-white bg-[#1E293B] hover:bg-[#334155] px-3.5 py-1.5 rounded-xl transition-colors border border-[#334155]"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Repository</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Timeline */}
        {experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#818CF8]">
              Engineering Leadership & Roles
            </h2>

            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#131B2E] border border-[#1E293B] p-6 sm:p-8 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {exp.position}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-[#818CF8]">
                        {exp.company} {exp.location && `· ${exp.location}`}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8]">
                      <Calendar className="w-3.5 h-3.5 text-[#818CF8]" />
                      <span>{exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}</span>
                    </div>
                  </div>

                  {exp.description && (
                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="space-y-1.5 text-xs text-[#CBD5E1]">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#818CF8] mt-0.5">▹</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.technologies.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#0B0F19] text-[#94A3B8] border border-[#1E293B]">
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

        {/* Education & Certifications */}
        {(education.length > 0 || certifications.length > 0) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#1E293B] pt-12">
            {education.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#818CF8]">
                  Education & Foundation
                </h2>
                <div className="space-y-3">
                  {education.map((edu, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#131B2E] border border-[#1E293B] space-y-1">
                      <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                      <p className="text-xs text-[#818CF8]">{edu.institution}</p>
                      <p className="text-[11px] font-mono text-[#94A3B8]">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#818CF8]">
                  Verified Certifications
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#131B2E] border border-[#1E293B] space-y-1">
                      <h3 className="text-sm font-bold text-white">{cert.name}</h3>
                      <p className="text-xs text-[#818CF8]">{cert.issuer}</p>
                      {cert.issueDate && <p className="text-[11px] font-mono text-[#94A3B8]">{cert.issueDate}</p>}
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
