"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  Code2,
  GitCommit,
  CheckCircle,
  Cpu,
  Layers,
  Terminal,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function SoftwareEngineerTemplate({ portfolio }: Props) {
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#2563EB]/20 selection:text-[#1D4ED8]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-16">
        {/* Header Hero */}
        <header className="rounded-3xl bg-white border border-[#E2E8F0] p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                <Cpu className="w-3.5 h-3.5" />
                <span>Software Engineering & Algorithms</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
                {profile?.name || "Software Engineer"}
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-[#2563EB]">
                {profile?.headline || "Systems Architecture · Scalable Engineering · Clean Code"}
              </p>
            </div>

            {profile?.profileImage && (
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#BFDBFE] shadow-sm shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {profile?.professionalSummary && (
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-3xl">
              {profile.professionalSummary}
            </p>
          )}

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#475569] pt-2">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="px-3.5 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#E2E8F0] inline-flex items-center gap-1.5 transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>{profile.email}</span>
              </a>
            )}
            {profile?.location && (
              <span className="px-3.5 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>{profile.location}</span>
              </span>
            )}
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#E2E8F0] transition-colors" title="GitHub">
                <GithubIcon className="w-4 h-4 text-[#0F172A]" />
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#E2E8F0] transition-colors" title="LinkedIn">
                <LinkedinIcon className="w-4 h-4 text-[#2563EB]" />
              </a>
            )}
          </div>
        </header>

        {/* Core Competencies & Language Radar */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs uppercase font-mono tracking-widest text-[#2563EB] font-bold">
              Engineering Tooling & Competencies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {skills.map((skill, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between text-xs font-medium shadow-2xs">
                  <span className="text-[#0F172A]">{skill}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-[#2563EB]" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Software Builds */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs uppercase font-mono tracking-widest text-[#2563EB] font-bold">
              Featured Software Systems & Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md hover:border-[#2563EB]/40 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-[#0F172A]">{proj.title}</h3>
                      {proj.category && (
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-[#EFF6FF] text-[#2563EB]">
                          {proj.category}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {proj.technologies.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#F1F5F9] text-[#334155]">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-[#F1F5F9]">
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-3.5 py-2 rounded-xl transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Production</span>
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-2 rounded-xl transition-colors">
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

        {/* Experience Log */}
        {experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs uppercase font-mono tracking-widest text-[#2563EB] font-bold">
              Engineering History
            </h2>

            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] space-y-3 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                    <div>
                      <h3 className="text-base font-bold text-[#0F172A]">{exp.position}</h3>
                      <p className="text-xs font-semibold text-[#2563EB]">{exp.company} {exp.location && `· ${exp.location}`}</p>
                    </div>
                    <span className="text-[#64748B]">{exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}</span>
                  </div>

                  {exp.description && (
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pt-1">{exp.description}</p>
                  )}

                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="space-y-1 text-xs text-[#334155] pt-2">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#2563EB]">▹</span>
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
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-[#E2E8F0]">
            {education.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-mono tracking-widest text-[#2563EB] font-bold">Education</h3>
                {education.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E2E8F0]">
                    <p className="font-bold text-sm text-[#0F172A]">{edu.degree}</p>
                    <p className="text-xs text-[#2563EB]">{edu.institution} ({edu.startDate} - {edu.endDate})</p>
                  </div>
                ))}
              </div>
            )}

            {certifications.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-mono tracking-widest text-[#2563EB] font-bold">Certifications</h3>
                {certifications.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E2E8F0]">
                    <p className="font-bold text-sm text-[#0F172A]">{c.name}</p>
                    <p className="text-xs text-[#2563EB]">{c.issuer}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
