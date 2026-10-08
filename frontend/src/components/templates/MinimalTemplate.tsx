import React from "react";
import { IPortfolio } from "@/types/portfolio";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterXIcon, InstagramIcon } from "@/components/common/SocialIcons";

export function MinimalTemplate({ portfolio }: { portfolio: IPortfolio }) {
  const {
    profile,
    skills = [],
    experience = [],
    education = [],
    projects = [],
    certifications = [],
    customSections = [],
    sectionVisibility = {},
    socialLinks = {},
  } = portfolio;

  const vis = sectionVisibility;
  const showSkills = vis.skills !== false && skills.length > 0;
  const showEducation = vis.education !== false && education.length > 0;
  const showCertifications = vis.certifications !== false && certifications.length > 0;
  const showExperience = vis.experience !== false && experience.length > 0;
  const showProjects = vis.projects !== false && projects.length > 0;
  const showCustomSections = vis.customSections !== false && customSections.length > 0;

  return (
    <div className="min-h-screen bg-[#F8F3EC] text-[#2B1D15] font-sans py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Minimal Header */}
        <header className="space-y-4 pb-8 border-b border-[#E6DACB]">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2B1D15] tracking-tight">
            {profile.name || "Portfolio Creator"}
          </h1>
          <p className="text-base sm:text-lg font-mono text-[#D47A41]">
            {profile.headline || "Specialist & Creator"}
          </p>

          {profile.professionalSummary && (
            <p className="text-sm sm:text-base text-[#52413F] leading-relaxed pt-2">
              {profile.professionalSummary}
            </p>
          )}

          {/* Contact Details */}
          <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#6D594D]">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1 hover:text-[#D47A41] underline">
                <Mail className="w-3.5 h-3.5" />
                <span>{profile.email}</span>
              </a>
            )}
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className="inline-flex items-center gap-1 hover:text-[#D47A41]">
                <Phone className="w-3.5 h-3.5" />
                <span>{profile.phone}</span>
              </a>
            )}
            {profile.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#DE8638]" />
                <span>{profile.location}</span>
              </span>
            )}
            {profile.website && (
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-[#D47A41] underline">
                <Globe className="w-3.5 h-3.5" />
                <span>Website</span>
              </a>
            )}
          </div>

          {/* Social Icons */}
          {socialLinks && Object.values(socialLinks).some(Boolean) && (
            <div className="pt-2 flex items-center gap-4 text-xs text-[#6D594D]">
              {socialLinks.github && (
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#2B1D15] inline-flex items-center gap-1 font-mono" aria-label="GitHub">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#2B1D15] inline-flex items-center gap-1 font-mono" aria-label="LinkedIn">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-[#2B1D15] inline-flex items-center gap-1 font-mono" aria-label="Twitter / X">
                  <TwitterXIcon className="w-3.5 h-3.5" />
                  <span>Twitter</span>
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#2B1D15] inline-flex items-center gap-1 font-mono" aria-label="Instagram">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          )}
        </header>

        {/* Skills */}
        {showSkills && (
          <section className="space-y-3 pb-8 border-b border-[#E6DACB]">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#6D594D]">Skills & Technologies</h2>
            <p className="text-sm text-[#2B1D15] leading-relaxed">
              {skills.join(" • ")}
            </p>
          </section>
        )}

        {/* Experience */}
        {showExperience && (
          <section className="space-y-6 pb-8 border-b border-[#E6DACB]">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#6D594D]">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-base font-bold text-[#2B1D15]">{exp.position}</h3>
                    <span className="text-xs font-mono text-[#6D594D]">
                       {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#D47A41]">{exp.company} {exp.location ? `| ${exp.location}` : ""}</p>
                  {exp.description && (
                    <p className="text-xs sm:text-sm text-[#52413F] leading-relaxed pt-1">
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc pl-4 text-xs text-[#6D594D] space-y-1 pt-1">
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
        {showProjects && (
          <section className="space-y-6 pb-8 border-b border-[#E6DACB]">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#6D594D]">Projects</h2>
            <div className="space-y-5">
              {projects.map((proj, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#2B1D15]">{proj.title}</h3>
                    <div className="flex items-center gap-3">
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#D47A41] hover:underline inline-flex items-center gap-1">
                          <span>Source</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#DE8638] hover:underline inline-flex items-center gap-1">
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
                    <p className="text-[11px] font-mono text-[#6D594D] pt-1">
                      Stack: {proj.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications */}
        {(showEducation || showCertifications) ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-8 border-b border-[#E6DACB]">
            {showEducation && (
              <section className="space-y-4">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#6D594D]">Education</h2>
                <div className="space-y-3">
                  {education.map((edu, i) => (
                    <div key={i} className="space-y-0.5">
                      <h3 className="text-xs sm:text-sm font-bold text-[#2B1D15]">{edu.degree}</h3>
                      <p className="text-xs text-[#D47A41]">{edu.institution}</p>
                      <p className="text-[11px] text-[#6D594D]">{edu.startDate} – {edu.endDate || "Present"}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {showCertifications && (
              <section className="space-y-4">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#6D594D]">Certifications</h2>
                <div className="space-y-3">
                  {certifications.map((cert, i) => (
                    <div key={i} className="space-y-0.5">
                      <h3 className="text-xs sm:text-sm font-bold text-[#2B1D15]">{cert.name}</h3>
                      <p className="text-xs text-[#DE8638]">{cert.issuer} {cert.issueDate ? `(${cert.issueDate})` : ""}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : null}

        {/* Custom Sections */}
        {showCustomSections && (
          <section className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#6D594D]">Additional Highlights</h2>
            <div className="space-y-4">
              {customSections.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#D47A41]">{item.category || "General"}</span>
                    {item.url && (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#D47A41] hover:underline inline-flex items-center gap-1">
                        <span>Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-[#2B1D15]">{item.title}</h3>
                  {item.subtitle && <p className="text-xs text-[#6D594D]">{item.subtitle}</p>}
                  {item.description && <p className="text-xs text-[#52413F] leading-relaxed pt-0.5">{item.description}</p>}
                  {item.date && <p className="text-[11px] font-mono text-[#9E8C7E] pt-0.5">{item.date}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default MinimalTemplate;
