"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  GraduationCap,
  Award,
  BookOpen,
  Code,
  Rocket,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function StudentFresherTemplate({ portfolio }: Props) {
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
    <div className="min-h-screen bg-[#F0F9FF] text-[#0C4A6E] font-sans selection:bg-[#0EA5E9]/20 selection:text-[#0369A1]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-16">
        {/* Header Hero */}
        <header className="rounded-3xl bg-white border border-[#BAE6FD] p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]">
                <Rocket className="w-3.5 h-3.5" />
                <span>Ready for Full-Time Roles & Internships</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-[#0C4A6E] tracking-tight">
                {profile?.name || "Aspiring Graduate"}
              </h1>
              <p className="text-base sm:text-xl font-semibold text-[#0284C7]">
                {profile?.headline || "Recent Graduate & Software Developer"}
              </p>
            </div>

            {profile?.profileImage && (
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#BAE6FD] shadow-sm shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {profile?.professionalSummary && (
            <p className="text-sm sm:text-base text-[#0369A1] leading-relaxed max-w-2xl font-normal">
              {profile.professionalSummary}
            </p>
          )}

          {/* Contact Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#0369A1] pt-2">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="px-3.5 py-2 rounded-xl bg-[#F0F9FF] hover:bg-[#E0F2FE] border border-[#BAE6FD] inline-flex items-center gap-1.5 transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>{profile.email}</span>
              </a>
            )}
            {profile?.location && (
              <span className="px-3.5 py-2 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>{profile.location}</span>
              </span>
            )}
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#F0F9FF] hover:bg-[#E0F2FE] border border-[#BAE6FD] transition-colors" title="GitHub">
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#F0F9FF] hover:bg-[#E0F2FE] border border-[#BAE6FD] transition-colors" title="LinkedIn">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </header>

        {/* Education Highlight (Prominently Placed for Students/Freshers) */}
        {education.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-[#0284C7]">
              <GraduationCap className="w-5 h-5" />
              <h2 className="text-sm uppercase font-bold tracking-wider">
                Education & Academic Background
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {education.map((edu, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-[#BAE6FD] space-y-2 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#0C4A6E]">{edu.degree}</h3>
                      <p className="text-xs font-semibold text-[#0284C7]">{edu.institution}</p>
                    </div>
                    {edu.grade && (
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">
                        {edu.grade}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#0369A1]">{edu.startDate} - {edu.endDate}</p>
                  {edu.description && <p className="text-xs text-[#0369A1] pt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical & Core Skills */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-[#0284C7]">
              <Code className="w-5 h-5" />
              <h2 className="text-sm uppercase font-bold tracking-wider">
                Technical Skills & Knowledge Areas
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white border border-[#BAE6FD] text-[#0C4A6E] shadow-2xs hover:border-[#0284C7] transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects & Builds */}
        {projects.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-[#0284C7]">
              <Rocket className="w-5 h-5" />
              <h2 className="text-sm uppercase font-bold tracking-wider">
                Academic & Independent Projects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-[#BAE6FD] flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-all">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-[#0C4A6E]">{proj.title}</h3>
                    <p className="text-xs text-[#0369A1] leading-relaxed">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.technologies.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#E0F2FE] text-[#0284C7]">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-[#E0F2FE]">
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-white bg-[#0284C7] hover:bg-[#0369A1] px-3.5 py-1.5 rounded-xl transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-[#0369A1] hover:text-[#0C4A6E] bg-[#F0F9FF] px-3 py-1.5 rounded-xl border border-[#BAE6FD] transition-colors">
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Internships & Leadership */}
        {experience.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm uppercase font-bold tracking-wider text-[#0284C7]">
              Internships & Campus Leadership
            </h2>

            <div className="space-y-3">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-[#BAE6FD] space-y-2 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                    <span className="font-bold text-sm text-[#0C4A6E]">{exp.position} · {exp.company}</span>
                    <span className="text-[#0369A1]">{exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}</span>
                  </div>
                  {exp.description && <p className="text-xs text-[#0369A1] leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Hackathons */}
        {certifications.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-[#0284C7]">
              <Award className="w-5 h-5" />
              <h2 className="text-sm uppercase font-bold tracking-wider">
                Certifications & Achievements
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((c, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-[#BAE6FD] text-xs">
                  <p className="font-bold text-[#0C4A6E]">{c.name}</p>
                  <p className="text-[#0284C7]">{c.issuer}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
