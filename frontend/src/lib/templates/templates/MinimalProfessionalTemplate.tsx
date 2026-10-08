"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import { Mail, Phone, MapPin, Globe, ExternalLink, Calendar } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function MinimalProfessionalTemplate({ portfolio }: Props) {
  const { profile, skills = [], experience = [], education = [], projects = [], certifications = [], socialLinks = {} } = portfolio;

  return (
    <div className="min-h-screen bg-[#F8F3EC] text-[#2B1D15] font-sans selection:bg-[#E6DACB]">
      <main className="max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-16">
        {/* Header / Profile */}
        <header className="space-y-6 border-b border-[#E6DACB] pb-12">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-[#2B1D15]">
              {profile?.name || "Your Name"}
            </h1>
            <p className="text-base sm:text-xl font-medium text-[#D47A41]">
              {profile?.headline || "Professional Title"}
            </p>
          </div>

          {profile?.professionalSummary && (
            <p className="text-sm sm:text-base text-[#52413F] leading-relaxed max-w-2xl font-normal">
              {profile.professionalSummary}
            </p>
          )}

          {/* Contact & Socials */}
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs text-[#6D594D] pt-2">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 hover:text-[#D47A41] transition-colors">
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
              <a href={profile.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#D47A41]">
                <Globe className="w-3.5 h-3.5" />
                <span>Website</span>
              </a>
            )}
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#D47A41]">
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#D47A41]">
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            )}
            {socialLinks?.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#D47A41]">
                <TwitterIcon className="w-3.5 h-3.5" />
                <span>Twitter</span>
              </a>
            )}
          </div>
        </header>

        {/* Skills */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#DE8638]">Expertise & Capabilities</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[#FFFFFF] border border-[#E6DACB] text-[#2B1D15]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#DE8638]">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="text-base font-semibold text-[#2B1D15]">{exp.position}</h3>
                      <p className="text-xs font-medium text-[#D47A41]">
                        {exp.company} {exp.location ? `· ${exp.location}` : ""}
                      </p>
                    </div>
                    <span className="text-xs text-[#9E8C7E] font-mono shrink-0">
                      {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs sm:text-sm text-[#52413F] leading-relaxed font-normal">{exp.description}</p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-xs text-[#52413F]">
                      {exp.achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects */}
        {projects.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#DE8638]">Selected Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6DACB] space-y-3 flex flex-col justify-between hover:border-[#D47A41]/40 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#2B1D15]">{proj.title}</h3>
                      <div className="flex items-center gap-2 text-[#6D594D]">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:text-[#D47A41]">
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:text-[#D47A41]">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-[#52413F] leading-relaxed">{proj.description}</p>
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.technologies.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#F8F3EC] text-[#6D594D] border border-[#E6DACB]">
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
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-[#E6DACB]">
            {education.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#DE8638]">Education</h2>
                <div className="space-y-4">
                  {education.map((edu, idx) => (
                    <div key={idx} className="space-y-1">
                      <h3 className="text-xs font-bold text-[#2B1D15]">{edu.degree}</h3>
                      <p className="text-xs text-[#D47A41]">{edu.institution}</p>
                      <p className="text-[11px] text-[#9E8C7E] font-mono">
                        {edu.startDate} — {edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#DE8638]">Certifications</h2>
                <div className="space-y-3">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <h3 className="text-xs font-bold text-[#2B1D15]">{cert.name}</h3>
                      <p className="text-xs text-[#6D594D]">{cert.issuer} {cert.issueDate ? `· ${cert.issueDate}` : ""}</p>
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
