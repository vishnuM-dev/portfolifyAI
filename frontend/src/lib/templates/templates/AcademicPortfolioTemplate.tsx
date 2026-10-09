"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  BookOpen,
  GraduationCap,
  Award,
  FileText,
  Bookmark,
} from "lucide-react";
import { LinkedinIcon, TwitterIcon, GithubIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function AcademicPortfolioTemplate({ portfolio }: Props) {
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
    <div className="min-h-screen bg-[#FDFCF7] text-[#1E293B] font-serif selection:bg-[#475569]/20">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-16">
        {/* Header / Institutional Affiliation */}
        <header className="border-b-2 border-[#E2E8F0] pb-12 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-sans uppercase tracking-widest text-[#64748B] font-semibold">
              Curriculum Vitae & Research Profile
            </span>
            <h1 className="text-3xl sm:text-5xl font-normal text-[#0F172A] tracking-tight">
              {profile?.name || "Dr. Scholar"}
            </h1>
            <p className="text-base sm:text-xl italic text-[#475569]">
              {profile?.headline || "Senior Researcher & Academic Fellow"}
            </p>
          </div>

          {profile?.professionalSummary && (
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed max-w-3xl font-serif">
              {profile.professionalSummary}
            </p>
          )}

          {/* Academic Contact Details */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-sans text-[#64748B] pt-2">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 hover:text-[#0F172A] transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span>{profile.email}</span>
              </a>
            )}
            {profile?.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{profile.location}</span>
              </span>
            )}
            {profile?.website && (
              <a href={profile.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#0F172A]">
                <Globe className="w-3.5 h-3.5" />
                <span>Institutional Page</span>
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#0F172A]">
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </header>

        {/* Education & Academic Credentials */}
        {education.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm font-sans uppercase font-bold tracking-widest text-[#475569] border-b border-[#E2E8F0] pb-2">
              Education & Degrees
            </h2>
            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-sm">
                    <span className="font-bold text-[#0F172A]">{edu.degree}</span>
                    <span className="text-xs font-sans text-[#64748B]">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <p className="text-xs font-sans text-[#475569] italic">{edu.institution} {edu.grade && `(${edu.grade})`}</p>
                  {edu.description && <p className="text-xs text-[#475569] pt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Research Fields & Methodologies */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm font-sans uppercase font-bold tracking-widest text-[#475569] border-b border-[#E2E8F0] pb-2">
              Research Interests & Methodologies
            </h2>
            <div className="flex flex-wrap gap-2 pt-1 font-sans">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md text-xs font-medium bg-[#F1F5F9] border border-[#CBD5E1] text-[#334155]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Publications & Scholarly Projects */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-sm font-sans uppercase font-bold tracking-widest text-[#475569] border-b border-[#E2E8F0] pb-2">
              Publications & Research Projects
            </h2>

            <div className="space-y-6">
              {projects.map((proj, idx) => (
                <div key={idx} className="space-y-2 pl-4 border-l-2 border-[#CBD5E1]">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-base font-bold text-[#0F172A]">{proj.title}</h3>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-xs font-sans text-[#2563EB] hover:underline inline-flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        <span>Paper / Repository</span>
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-[#334155] leading-relaxed">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[11px] font-sans text-[#64748B]">
                      Keywords: {proj.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Appointments & Experience */}
        {experience.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm font-sans uppercase font-bold tracking-widest text-[#475569] border-b border-[#E2E8F0] pb-2">
              Academic Appointments & Service
            </h2>

            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-sm">
                    <span className="font-bold text-[#0F172A]">{exp.position}</span>
                    <span className="text-xs font-sans text-[#64748B]">{exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}</span>
                  </div>
                  <p className="text-xs font-sans text-[#475569] italic">{exp.company} {exp.location && `(${exp.location})`}</p>
                  {exp.description && <p className="text-xs text-[#475569] pt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Grants */}
        {certifications.length > 0 && (
          <section className="space-y-4 border-t border-[#E2E8F0] pt-8">
            <h2 className="text-sm font-sans uppercase font-bold tracking-widest text-[#475569]">
              Honors, Grants & Affiliations
            </h2>
            <div className="space-y-2">
              {certifications.map((c, idx) => (
                <div key={idx} className="text-xs">
                  <span className="font-bold text-[#0F172A]">{c.name}</span>
                  <span className="text-[#64748B]"> — {c.issuer}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
