"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import { Briefcase, GraduationCap, Award, Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function ResumeTimelineTemplate({ portfolio }: Props) {
  const { profile, skills = [], experience = [], education = [], projects = [], certifications = [], socialLinks = {} } = portfolio;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B1D1C] font-sans selection:bg-[#2D5D60]/20">
      <main className="max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-16">
        {/* Clean Header */}
        <header className="space-y-4 border-b border-[#E8DFD3] pb-10">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#2B1D1C]">
              {profile?.name || "Professional"}
            </h1>
            <p className="text-base sm:text-xl font-bold text-[#2D5D60]">
              {profile?.headline || "Senior Engineer"}
            </p>
          </div>

          {profile?.professionalSummary && (
            <p className="text-sm text-[#52413F] leading-relaxed max-w-2xl">
              {profile.professionalSummary}
            </p>
          )}

          {/* Contact Bar */}
          <div className="flex flex-wrap gap-4 text-xs text-[#6B5755] pt-2">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1 hover:text-[#2D5D60]">
                <Mail className="w-3.5 h-3.5" />
                <span>{profile.email}</span>
              </a>
            )}
            {profile?.phone && (
              <span className="inline-flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                <span>{profile.phone}</span>
              </span>
            )}
            {profile?.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{profile.location}</span>
              </span>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-[#2D5D60]">
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            )}
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-[#2D5D60]">
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </header>

        {/* CONNECTED TIMELINE: Experience & Education */}
        <section className="space-y-12">
          {experience.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#9B4D60] flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Career Experience</span>
              </h2>

              <div className="relative border-l-2 border-[#E8DFD3] ml-3 pl-6 space-y-8">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative space-y-2">
                    {/* Timeline Node */}
                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#2D5D60] ring-4 ring-[#FAF7F2]" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="text-sm font-bold text-[#2B1D1C]">{exp.position}</h3>
                      <span className="text-xs text-[#8A7573] font-mono">
                        {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate || "Present"}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#2D5D60]">{exp.company} {exp.location ? `· ${exp.location}` : ""}</p>
                    {exp.description && <p className="text-xs text-[#52413F] leading-relaxed">{exp.description}</p>}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-xs text-[#52413F] pt-1">
                        {exp.achievements.map((ach, i) => (
                          <li key={i}>{ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Timeline */}
          {education.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#9B4D60] flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>Education & Academic History</span>
              </h2>

              <div className="relative border-l-2 border-[#E8DFD3] ml-3 pl-6 space-y-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative space-y-1">
                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#9B4D60] ring-4 ring-[#FAF7F2]" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="text-sm font-bold text-[#2B1D1C]">{edu.degree}</h3>
                      <span className="text-xs text-[#8A7573] font-mono">{edu.startDate} — {edu.endDate}</span>
                    </div>
                    <p className="text-xs font-semibold text-[#2D5D60]">{edu.institution}</p>
                    {edu.fieldOfStudy && <p className="text-xs text-[#52413F]">{edu.fieldOfStudy}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Skills List */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#9B4D60]">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-white border border-[#E8DFD3] text-[#2B1D1C]"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#9B4D60]">Highlighted Builds</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E8DFD3] space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#2B1D1C]">{proj.title}</h3>
                    <div className="flex items-center gap-2 text-[#6B5755]">
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:text-[#2D5D60]">
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:text-[#2D5D60]">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-[#52413F] leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
