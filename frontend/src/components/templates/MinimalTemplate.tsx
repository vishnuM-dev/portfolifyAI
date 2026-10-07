import React from "react";
import { IPortfolio } from "@/types/portfolio";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterXIcon, InstagramIcon } from "@/components/common/SocialIcons";

export function MinimalTemplate({ portfolio }: { portfolio: IPortfolio }) {
  const { profile, skills, experience, education, projects, certifications, socialLinks } = portfolio;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B1D1C] font-sans py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Minimal Header */}
        <header className="space-y-4 pb-8 border-b border-[#E8DFD3]">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2B1D1C] tracking-tight">
            {profile.name || "Portfolio Creator"}
          </h1>
          <p className="text-base sm:text-lg font-mono text-[#2D5D60]">
            {profile.headline || "Specialist & Creator"}
          </p>

          {profile.professionalSummary && (
            <p className="text-sm sm:text-base text-[#52413F] leading-relaxed pt-2">
              {profile.professionalSummary}
            </p>
          )}

          {/* Contact Details */}
          <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#6B5755]">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1 hover:text-[#2D5D60] underline">
                <Mail className="w-3.5 h-3.5" />
                <span>{profile.email}</span>
              </a>
            )}
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className="inline-flex items-center gap-1 hover:text-[#2D5D60]">
                <Phone className="w-3.5 h-3.5" />
                <span>{profile.phone}</span>
              </a>
            )}
            {profile.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#9B4D60]" />
                <span>{profile.location}</span>
              </span>
            )}
            {profile.website && (
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#2D5D60] underline">
                <Globe className="w-3.5 h-3.5" />
                <span>Website</span>
              </a>
            )}
          </div>

          {/* Social Icons */}
          {socialLinks && Object.values(socialLinks).some(Boolean) && (
            <div className="pt-2 flex items-center gap-4 text-xs text-[#6B5755]">
              {socialLinks.github && (
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#2B1D1C] inline-flex items-center gap-1 font-mono" aria-label="GitHub">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#2B1D1C] inline-flex items-center gap-1 font-mono" aria-label="LinkedIn">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-[#2B1D1C] inline-flex items-center gap-1 font-mono" aria-label="Twitter / X">
                  <TwitterXIcon className="w-3.5 h-3.5" />
                  <span>Twitter</span>
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#2B1D1C] inline-flex items-center gap-1 font-mono" aria-label="Instagram">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          )}
        </header>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="space-y-3 pb-8 border-b border-[#E8DFD3]">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#7B6866]">Skills & Technologies</h2>
            <p className="text-sm text-[#2B1D1C] leading-relaxed">
              {skills.join(" • ")}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="space-y-6 pb-8 border-b border-[#E8DFD3]">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#7B6866]">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-base font-bold text-[#2B1D1C]">{exp.position}</h3>
                    <span className="text-xs font-mono text-[#7B6866]">
                      {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#2D5D60]">{exp.company} {exp.location ? `| ${exp.location}` : ""}</p>
                  {exp.description && (
                    <p className="text-xs sm:text-sm text-[#52413F] leading-relaxed pt-1">
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc pl-4 text-xs text-[#6B5755] space-y-1 pt-1">
                      {exp.achievements.map((ach, j) => (
                        <li key={j}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className="space-y-6 pb-8 border-b border-[#E8DFD3]">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#7B6866]">Projects</h2>
            <div className="space-y-5">
              {projects.map((proj, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#2B1D1C]">{proj.title}</h3>
                    <div className="flex items-center gap-3">
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#2D5D60] hover:underline inline-flex items-center gap-1">
                          <span>Source</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#9B4D60] hover:underline inline-flex items-center gap-1">
                          <span>Live</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#52413F] leading-relaxed">
                    {proj.description}
                  </p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[11px] font-mono text-[#7B6866] pt-1">
                      Stack: {proj.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications */}
        {(education?.length || certifications?.length) ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {education && education.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#7B6866]">Education</h2>
                <div className="space-y-3">
                  {education.map((edu, i) => (
                    <div key={i} className="space-y-0.5">
                      <h3 className="text-xs sm:text-sm font-bold text-[#2B1D1C]">{edu.degree}</h3>
                      <p className="text-xs text-[#2D5D60]">{edu.institution}</p>
                      <p className="text-[11px] text-[#7B6866]">{edu.startDate} – {edu.endDate || "Present"}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications && certifications.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#7B6866]">Certifications</h2>
                <div className="space-y-3">
                  {certifications.map((cert, i) => (
                    <div key={i} className="space-y-0.5">
                      <h3 className="text-xs sm:text-sm font-bold text-[#2B1D1C]">{cert.name}</h3>
                      <p className="text-xs text-[#9B4D60]">{cert.issuer} {cert.issueDate ? `(${cert.issueDate})` : ""}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default MinimalTemplate;
