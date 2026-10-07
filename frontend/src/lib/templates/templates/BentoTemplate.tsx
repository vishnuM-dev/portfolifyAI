"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import { Mail, MapPin, Globe, ExternalLink, Sparkles, FolderGit2, Briefcase, GraduationCap, Award } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function BentoTemplate({ portfolio }: Props) {
  const { profile, skills = [], experience = [], education = [], projects = [], certifications = [], socialLinks = {} } = portfolio;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B1D1C] font-sans p-6 sm:p-10 lg:p-16 selection:bg-[#9B4D60]/20 selection:text-[#9B4D60]">
      <main className="max-w-6xl mx-auto space-y-6">
        {/* Bento Row 1: Profile Main Hero & Quick Socials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Hero Card (2 Cols) */}
          <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF0F2] text-[#9B4D60] border border-[#EAD2D8]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Portfolio</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2B1D1C]">
                {profile?.name || "Portfolio Builder"}
              </h1>
              <p className="text-lg sm:text-xl font-bold text-[#2D5D60]">
                {profile?.headline || "Engineering & Design"}
              </p>
              {profile?.professionalSummary && (
                <p className="text-sm sm:text-base text-[#52413F] leading-relaxed max-w-xl">
                  {profile.professionalSummary}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#6B5755] pt-2">
              {profile?.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#2D5D60]" />
                  {profile.location}
                </span>
              )}
              {profile?.email && (
                <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-[#2D5D60]">
                  <Mail className="w-4 h-4 text-[#2D5D60]" />
                  {profile.email}
                </a>
              )}
            </div>
          </div>

          {/* Social & Connect Bento Card (1 Col) */}
          <div className="p-8 rounded-3xl bg-[#2D5D60] text-white shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Let&apos;s Connect</h2>
              <p className="text-xs text-white/80 pt-1">Reach out directly or explore my open source links.</p>
            </div>

            <div className="space-y-3">
              {socialLinks?.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all text-xs font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4" /> GitHub
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/70" />
                </a>
              )}
              {socialLinks?.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all text-xs font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4" /> LinkedIn
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/70" />
                </a>
              )}
              {socialLinks?.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all text-xs font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <TwitterIcon className="w-4 h-4" /> Twitter
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/70" />
                </a>
              )}
              {profile?.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all text-xs font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Personal Website
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/70" />
                </a>
              )}
            </div>

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="w-full py-3 rounded-2xl bg-white text-[#2D5D60] font-bold text-xs text-center hover:bg-[#FAF7F2] transition-colors shadow-xs"
              >
                Send Direct Email
              </a>
            )}
          </div>
        </div>

        {/* Bento Row 2: Skills Badges Card & Experience Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skills Pill Cloud (1 Col) */}
          {skills.length > 0 && (
            <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#9B4D60]">Core Arsenal</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF7F2] text-[#2B1D1C] border border-[#E8DFD3] hover:border-[#2D5D60] transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience Bento Card (2 Cols) */}
          {experience.length > 0 && (
            <div className="lg:col-span-2 p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD3]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#9B4D60] flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Work History</span>
                </h3>
              </div>
              <div className="space-y-6">
                {experience.slice(0, 3).map((exp, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-sm font-bold text-[#2B1D1C]">{exp.position}</h4>
                      <span className="text-xs text-[#8A7573] font-mono">
                        {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate || "Present"}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#2D5D60]">{exp.company} {exp.location ? `· ${exp.location}` : ""}</p>
                    {exp.description && <p className="text-xs text-[#52413F] leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bento Row 3: Projects Grid */}
        {projects.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#9B4D60] flex items-center gap-2 px-1">
              <FolderGit2 className="w-4 h-4" />
              <span>Showcased Projects ({projects.length})</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#2D5D60] transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#2B1D1C]">{proj.title}</h4>
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
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-[#FAF0F2] text-[#9B4D60] border border-[#EAD2D8]">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bento Row 4: Education & Credentials */}
        {(education.length > 0 || certifications.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.length > 0 && (
              <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-sm space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#9B4D60] flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education</span>
                </h3>
                <div className="space-y-4">
                  {education.map((edu, idx) => (
                    <div key={idx} className="space-y-1">
                      <h4 className="text-xs font-bold text-[#2B1D1C]">{edu.degree}</h4>
                      <p className="text-xs text-[#2D5D60]">{edu.institution}</p>
                      <p className="text-[11px] text-[#8A7573] font-mono">{edu.startDate} — {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-sm space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#9B4D60] flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Certifications & Badges</span>
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <h4 className="text-xs font-bold text-[#2B1D1C]">{cert.name}</h4>
                      <p className="text-xs text-[#6B5755]">{cert.issuer} {cert.issueDate ? `· ${cert.issueDate}` : ""}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
