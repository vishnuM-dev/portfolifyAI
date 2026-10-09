"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  PenTool,
  Sparkles,
  Users,
  Target,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import { LinkedinIcon, TwitterIcon, GithubIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function UiUxDesignerTemplate({ portfolio }: Props) {
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
    <div className="min-h-screen bg-[#FDFBF7] text-[#1F1924] font-sans selection:bg-[#8B5CF6]/20">
      {/* Decorative Pastel Gradient */}
      <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-[#8B5CF6]/10 via-[#FDFBF7] to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-20">
        {/* Header Hero */}
        <header className="space-y-8 pb-12 border-b border-[#E9E1DF]">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8B5CF6]/10 text-[#7C3AED] border border-[#8B5CF6]/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Product & UX/UI Designer</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-[#1F1924] tracking-tight">
                {profile?.name || "Product Designer"}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-[#7C3AED]">
                {profile?.headline || "Designing human-centered digital experiences"}
              </p>
            </div>

            {profile?.profileImage && (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-[#8B5CF6]/30 shadow-md shadow-[#8B5CF6]/10 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {profile?.professionalSummary && (
            <p className="text-sm sm:text-base text-[#574E5D] max-w-2xl leading-relaxed">
              {profile.professionalSummary}
            </p>
          )}

          {/* Contact Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#574E5D] pt-2">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="px-3 py-1.5 rounded-xl bg-white border border-[#E9E1DF] hover:border-[#8B5CF6] hover:text-[#7C3AED] inline-flex items-center gap-1.5 transition-colors shadow-2xs">
                <Mail className="w-3.5 h-3.5" />
                <span>{profile.email}</span>
              </a>
            )}
            {profile?.location && (
              <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E9E1DF] inline-flex items-center gap-1.5 shadow-2xs">
                <MapPin className="w-3.5 h-3.5" />
                <span>{profile.location}</span>
              </span>
            )}
            {profile?.website && (
              <a href={profile.website} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-xl bg-white border border-[#E9E1DF] hover:border-[#8B5CF6] hover:text-[#7C3AED] inline-flex items-center gap-1.5 transition-colors shadow-2xs">
                <Globe className="w-3.5 h-3.5" />
                <span>Portfolio Site</span>
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white border border-[#E9E1DF] hover:border-[#8B5CF6] hover:text-[#7C3AED] transition-colors shadow-2xs" title="LinkedIn">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white border border-[#E9E1DF] hover:border-[#8B5CF6] hover:text-[#7C3AED] transition-colors shadow-2xs" title="Twitter">
                <TwitterIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </header>

        {/* Design Competencies */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs uppercase font-bold tracking-widest text-[#7C3AED]">
              Design Tooling & UX Competencies
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-2xl text-xs font-semibold bg-white border border-[#E9E1DF] text-[#1F1924] hover:border-[#8B5CF6] hover:shadow-sm transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Case Studies */}
        {projects.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-xs uppercase font-bold tracking-widest text-[#7C3AED]">
              Featured Design Case Studies
            </h2>

            <div className="space-y-6">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-[#E9E1DF] p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-md hover:border-[#8B5CF6]/50 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-[#1F1924]">{proj.title}</h3>
                      {proj.category && (
                        <p className="text-xs font-semibold text-[#7C3AED] mt-0.5">{proj.category}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold shadow-sm transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View Prototype</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#574E5D] leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Problem & Solution Callout Pill */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FAF7F3] border border-[#EFE8E6] text-xs">
                    <div className="space-y-1">
                      <span className="font-bold text-[#1F1924] inline-flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-[#7C3AED]" /> User Problem
                      </span>
                      <p className="text-[#6D6374]">Streamlining workflow friction and cognitive overload.</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-[#1F1924] inline-flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-emerald-600" /> Design Solution
                      </span>
                      <p className="text-[#6D6374]">Intuitive hierarchy, atomic tokens, and micro-interactions.</p>
                    </div>
                  </div>

                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="px-3 py-1 rounded-xl text-xs bg-[#FAF7F3] text-[#574E5D] border border-[#E9E1DF]">
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

        {/* Experience Timeline */}
        {experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs uppercase font-bold tracking-widest text-[#7C3AED]">
              Product Design Journey
            </h2>

            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E9E1DF] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-bold text-[#1F1924]">{exp.position}</h3>
                    <span className="text-xs font-semibold text-[#8B5CF6]">{exp.company}</span>
                  </div>
                  <span className="text-xs text-[#8F8496]">{exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}</span>

                  {exp.description && (
                    <p className="text-xs sm:text-sm text-[#574E5D] leading-relaxed pt-1">{exp.description}</p>
                  )}

                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="space-y-1.5 text-xs text-[#574E5D] pt-2">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
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
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-[#E9E1DF]">
            {education.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-bold tracking-widest text-[#7C3AED]">Design Education</h3>
                {education.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E9E1DF]">
                    <p className="font-bold text-sm text-[#1F1924]">{edu.degree}</p>
                    <p className="text-xs text-[#7C3AED]">{edu.institution}</p>
                  </div>
                ))}
              </div>
            )}

            {certifications.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-bold tracking-widest text-[#7C3AED]">Certifications</h3>
                {certifications.map((cert, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E9E1DF]">
                    <p className="font-bold text-sm text-[#1F1924]">{cert.name}</p>
                    <p className="text-xs text-[#7C3AED]">{cert.issuer}</p>
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
