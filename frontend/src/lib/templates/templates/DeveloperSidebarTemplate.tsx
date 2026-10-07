"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import { Mail, MapPin, Globe, ExternalLink, Code2, Terminal, Briefcase, GraduationCap } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function DeveloperSidebarTemplate({ portfolio }: Props) {
  const { profile, skills = [], experience = [], education = [], projects = [], certifications = [], socialLinks = {} } = portfolio;

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#E2E8F0] font-mono selection:bg-[#38BDF8]/20 selection:text-[#38BDF8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 lg:py-20 flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left Sticky Sidebar */}
        <aside className="lg:w-96 shrink-0 lg:sticky lg:top-20 lg:h-[calc(100vh-10rem)] flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
                <Terminal className="w-3.5 h-3.5" />
                <span>available for hire</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                {profile?.name || "Developer"}
              </h1>
              <h2 className="text-base text-[#38BDF8] font-medium font-mono">
                {profile?.headline || "Full Stack Engineer"}
              </h2>
            </div>

            {profile?.professionalSummary && (
              <p className="text-xs sm:text-sm text-[#94A3B8] font-sans leading-relaxed">
                {profile.professionalSummary}
              </p>
            )}

            {/* Quick metadata */}
            <div className="space-y-2 text-xs text-[#64748B] pt-2">
              {profile?.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <a href={`mailto:${profile.email}`} className="hover:text-[#38BDF8] transition-colors">{profile.email}</a>
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-[#94A3B8]">
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-[#1E293B] hover:text-[#38BDF8] hover:bg-[#334155] transition-all">
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-[#1E293B] hover:text-[#38BDF8] hover:bg-[#334155] transition-all">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-[#1E293B] hover:text-[#38BDF8] hover:bg-[#334155] transition-all">
                <TwitterIcon className="w-4 h-4" />
              </a>
            )}
            {profile?.website && (
              <a href={profile.website} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-[#1E293B] hover:text-[#38BDF8] hover:bg-[#334155] transition-all">
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        </aside>

        {/* Right Scrolling Content */}
        <main className="flex-1 space-y-16">
          {/* Tech Stack */}
          {skills.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
                <Code2 className="w-4 h-4" />
                <span>// Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-[#1E293B] border border-[#334155] text-[#38BDF8] hover:border-[#38BDF8]/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Featured Projects */}
          {projects.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
                <Terminal className="w-4 h-4" />
                <span>// Featured Projects</span>
              </div>
              <div className="grid grid-cols-1 gap-5">
                {projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#1E293B]/70 border border-[#334155] hover:border-[#38BDF8]/40 transition-all space-y-3 group"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white font-sans group-hover:text-[#38BDF8] transition-colors">
                        {proj.title}
                      </h3>
                      <div className="flex items-center gap-3 text-[#94A3B8]">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white">
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:text-white">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#94A3B8] font-sans leading-relaxed">
                      {proj.description}
                    </p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {proj.technologies.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#0F172A] text-[#38BDF8] border border-[#334155]">
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

          {/* Experience */}
          {experience.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                <span>// Experience</span>
              </div>
              <div className="space-y-6 border-l border-[#334155] pl-5 ml-2">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative space-y-2">
                    <div className="absolute -left-[25px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#38BDF8] ring-4 ring-[#0F172A]" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="text-sm font-bold text-white font-sans">{exp.position}</h3>
                      <span className="text-xs text-[#64748B] font-mono">
                        {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate || "Present"}
                      </span>
                    </div>
                    <p className="text-xs text-[#38BDF8] font-mono">{exp.company} {exp.location ? `· ${exp.location}` : ""}</p>
                    {exp.description && (
                      <p className="text-xs text-[#94A3B8] font-sans leading-relaxed pt-1">{exp.description}</p>
                    )}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-xs text-[#94A3B8] font-sans pt-1">
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

          {/* Education & Certs */}
          {(education.length > 0 || certifications.length > 0) && (
            <section className="space-y-6 pt-6 border-t border-[#334155]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>// Background & Credentials</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#1E293B]/40 border border-[#334155] space-y-1">
                    <h4 className="text-xs font-bold text-white font-sans">{edu.degree}</h4>
                    <p className="text-xs text-[#38BDF8]">{edu.institution}</p>
                    <p className="text-[11px] text-[#64748B] font-mono">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
                {certifications.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#1E293B]/40 border border-[#334155] space-y-1">
                    <h4 className="text-xs font-bold text-white font-sans">{c.name}</h4>
                    <p className="text-xs text-[#94A3B8]">{c.issuer}</p>
                    {c.issueDate && <p className="text-[11px] text-[#64748B] font-mono">{c.issueDate}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
