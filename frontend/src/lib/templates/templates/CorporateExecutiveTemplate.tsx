"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import { Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap, Building2, CheckCircle2 } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function CorporateExecutiveTemplate({ portfolio }: Props) {
  const { profile, skills = [], experience = [], education = [], projects = [], certifications = [], socialLinks = {} } = portfolio;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#1E3A8A]/20">
      {/* Executive Header Banner */}
      <header className="bg-[#0F172A] text-white py-16 sm:py-20 px-6 sm:px-12 border-b-4 border-[#3B82F6]">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#60A5FA] font-bold">Executive Profile</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              {profile?.name || "Executive Leader"}
            </h1>
            <p className="text-lg sm:text-xl text-[#94A3B8] font-medium">
              {profile?.headline || "Director / Senior Technical Executive"}
            </p>
          </div>

          {profile?.professionalSummary && (
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed max-w-3xl pt-2 border-t border-[#334155]">
              {profile.professionalSummary}
            </p>
          )}

          {/* Executive Contact Info */}
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs text-[#94A3B8] pt-2">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 hover:text-[#60A5FA] transition-colors">
                <Mail className="w-4 h-4 text-[#60A5FA]" />
                <span>{profile.email}</span>
              </a>
            )}
            {profile?.phone && (
              <span className="inline-flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#60A5FA]" />
                <span>{profile.phone}</span>
              </span>
            )}
            {profile?.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#60A5FA]" />
                <span>{profile.location}</span>
              </span>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#60A5FA]">
                <LinkedinIcon className="w-4 h-4 text-[#60A5FA]" />
                <span>LinkedIn</span>
              </a>
            )}
            {profile?.website && (
              <a href={profile.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#60A5FA]">
                <Globe className="w-4 h-4 text-[#60A5FA]" />
                <span>Website</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-5xl mx-auto px-6 sm:px-12 py-16 space-y-16">
        {/* Core Competencies */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1E3A8A]">Core Competencies & Capabilities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E2E8F0] shadow-2xs flex items-center gap-2 text-xs font-semibold text-[#1E293B]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Executive Leadership & Career History */}
        {experience.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1E3A8A] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#3B82F6]" />
              <span>Career Experience</span>
            </h2>
            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E2E8F0] shadow-sm space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-2 border-b border-[#F1F5F9]">
                    <div>
                      <h3 className="text-base font-bold text-[#0F172A]">{exp.position}</h3>
                      <p className="text-xs font-semibold text-[#3B82F6]">{exp.company} {exp.location ? `· ${exp.location}` : ""}</p>
                    </div>
                    <span className="text-xs text-[#64748B] font-mono">
                      {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  {exp.description && <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{exp.description}</p>}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Key Initiatives & Deliverables</h4>
                      <ul className="list-disc list-inside space-y-1 text-xs text-[#475569]">
                        {exp.achievements.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Strategic Projects & Case Studies */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1E3A8A] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#3B82F6]" />
              <span>Key Initiatives & Case Studies</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E2E8F0] shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-[#0F172A]">{proj.title}</h3>
                    <p className="text-xs text-[#475569] leading-relaxed">{proj.description}</p>
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F1F5F9] text-[#475569]">
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

        {/* Education & Executive Credentials */}
        {(education.length > 0 || certifications.length > 0) && (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-[#E2E8F0]">
            {education.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#1E3A8A] flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#3B82F6]" />
                  <span>Academic Qualifications</span>
                </h2>
                <div className="space-y-3">
                  {education.map((edu, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E8F0] space-y-0.5">
                      <h3 className="text-xs font-bold text-[#0F172A]">{edu.degree}</h3>
                      <p className="text-xs text-[#3B82F6]">{edu.institution}</p>
                      <p className="text-[11px] text-[#64748B] font-mono">{edu.startDate} — {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#1E3A8A] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#3B82F6]" />
                  <span>Board & Professional Certifications</span>
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2E8F0] space-y-0.5">
                      <h3 className="text-xs font-bold text-[#0F172A]">{cert.name}</h3>
                      <p className="text-xs text-[#475569]">{cert.issuer} {cert.issueDate ? `(${cert.issueDate})` : ""}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
