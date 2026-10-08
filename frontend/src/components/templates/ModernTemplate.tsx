import React from "react";
import { IPortfolio } from "@/types/portfolio";
import { Mail, Phone, MapPin, Globe, ExternalLink, Award, GraduationCap, Briefcase, Sparkles, Terminal, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterXIcon, InstagramIcon } from "@/components/common/SocialIcons";

export function ModernTemplate({ portfolio }: { portfolio: IPortfolio }) {
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

  const initials =
    profile.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "M";

  return (
    <div className="min-h-screen bg-[#F8F3EC] text-[#2B1D15] font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Modern Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#D47A41] via-[#BF6A34] to-[#A35525] text-white p-8 sm:p-12 shadow-xl shadow-[#D47A41]/20">
          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-3xl text-[#F8F3EC] shadow-inner shrink-0">
                {profile.profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <span>{initials}</span>
                )}
              </div>

              <div className="text-center sm:text-left space-y-2 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#F5EFE6] border border-white/20">
                  <Terminal className="w-3.5 h-3.5 text-[#BFDFCA]" />
                  <span>Available for high-impact opportunities</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                  {profile.name || "Portfolio Creator"}
                </h1>
                <p className="text-base sm:text-xl text-[#F5EFE6] font-medium">
                  {profile.headline || "Full Stack Engineer & Builder"}
                </p>
              </div>
            </div>

            {profile.professionalSummary && (
              <p className="text-xs sm:text-sm text-[#F8F3EC]/90 leading-relaxed max-w-2xl">
                {profile.professionalSummary}
              </p>
            )}

            {/* Quick Contact & Socials Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#BFDFCA]" />
                  <span>{profile.email}</span>
                </a>
              )}
              {profile.phone && (
                <a href={`tel:${profile.phone}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#BFDFCA]" />
                  <span>{profile.phone}</span>
                </a>
              )}
              {profile.location && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-[#F8F3EC]">
                  <MapPin className="w-3.5 h-3.5 text-[#F3CDB7]" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors">
                  <Globe className="w-3.5 h-3.5 text-[#BFDFCA]" />
                  <span>{profile.website.replace(/^https?:\/\//, "")}</span>
                </a>
              )}

              {/* Social Icon Pills */}
              {socialLinks && (
                <div className="flex items-center gap-2 pl-1">
                  {socialLinks.github && (
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white" aria-label="GitHub">
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white" aria-label="LinkedIn">
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white" aria-label="Twitter / X">
                      <TwitterXIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white" aria-label="Instagram">
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#FDF1E8]/10 blur-2xl pointer-events-none" />
        </section>

        {/* Tech Stack Chips */}
        {showSkills && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#D47A41]" />
              <h2 className="text-lg font-bold text-[#2B1D15]">Technical Stack</h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#E6DACB] text-xs font-semibold text-[#2B1D15] shadow-2xs hover:border-[#D47A41] transition-colors">
                  <span className="w-2 h-2 rounded-full bg-[#D47A41]" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {showProjects && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#DE8638]" />
                <h2 className="text-lg font-bold text-[#2B1D15]">Featured Work & Projects</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((proj, i) => (
                <div key={i} className="rounded-3xl bg-[#FFFFFF] border border-[#E6DACB] p-6 flex flex-col justify-between space-y-5 hover:shadow-md hover:border-[#D47A41]/40 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-bold text-[#2B1D15]">{proj.title}</h3>
                      <div className="flex items-center gap-2 shrink-0">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-[#6D594D] hover:text-[#2B1D15] hover:bg-[#F8F3EC] transition-colors" aria-label="GitHub Repository">
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-[#D47A41] hover:text-[#A35525] hover:bg-[#F8F3EC] transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#52413F] leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#E6DACB]">
                      {proj.technologies.map((tech, k) => (
                        <span key={k} className="text-[11px] px-2.5 py-1 rounded-lg bg-[#FDF1E8] text-[#DE8638] font-medium border border-[#F3CDB7]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {showExperience && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#D47A41]" />
              <h2 className="text-lg font-bold text-[#2B1D15]">Career Experience</h2>
            </div>

            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div key={i} className="rounded-2xl bg-[#FFFFFF] border border-[#E6DACB] p-6 space-y-3 hover:border-[#D47A41]/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-base font-bold text-[#2B1D15]">{exp.position}</h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#D47A41] mt-0.5">
                        {exp.company} {exp.location ? `• ${exp.location}` : ""}
                      </p>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#F8F3EC] text-[#6D594D] border border-[#E6DACB] w-fit">
                      {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="text-xs sm:text-sm text-[#52413F] leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc pl-4 text-xs text-[#6D594D] space-y-1">
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

        {/* Education & Certifications Row */}
        {(showEducation || showCertifications) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education */}
            {showEducation && (
              <section className="rounded-3xl bg-[#FFFFFF] border border-[#E6DACB] p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E6DACB]">
                  <GraduationCap className="w-4 h-4 text-[#D47A41]" />
                  <h2 className="text-sm font-bold text-[#2B1D15]">Education</h2>
                </div>
                <div className="space-y-4">
                  {education.map((edu, i) => (
                    <div key={i} className="space-y-1">
                      <h3 className="text-sm font-bold text-[#2B1D15]">{edu.degree}</h3>
                      <p className="text-xs font-semibold text-[#D47A41]">{edu.institution}</p>
                      <div className="flex justify-between text-xs text-[#6D594D] pt-0.5">
                        <span>{edu.fieldOfStudy}</span>
                        <span>{edu.startDate} - {edu.endDate || "Present"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {showCertifications && (
              <section className="rounded-3xl bg-[#FFFFFF] border border-[#E6DACB] p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E6DACB]">
                  <Award className="w-4 h-4 text-[#DE8638]" />
                  <h2 className="text-sm font-bold text-[#2B1D15]">Certifications</h2>
                </div>
                <div className="space-y-3">
                  {certifications.map((cert, i) => (
                    <div key={i} className="space-y-0.5">
                      <h3 className="text-sm font-bold text-[#2B1D15]">{cert.name}</h3>
                      <p className="text-xs text-[#DE8638] font-semibold">{cert.issuer} {cert.issueDate ? `(${cert.issueDate})` : ""}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Additional Custom Sections */}
        {showCustomSections && (
          <section className="rounded-3xl bg-[#FFFFFF] border border-[#E6DACB] p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold text-[#2B1D15]">Additional Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customSections.map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#F8F3EC] border border-[#E6DACB] space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FFFFFF] text-[#D47A41] border border-[#E6DACB]">
                        {item.category || "General"}
                      </span>
                      <h3 className="text-sm font-bold text-[#2B1D15] mt-1.5">{item.title}</h3>
                      {item.subtitle && <p className="text-xs text-[#6D594D] font-medium">{item.subtitle}</p>}
                    </div>
                    {item.url && (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[#D47A41] hover:text-[#BF6A34] p-1">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-[#52413F] leading-relaxed pt-1">
                      {item.description}
                    </p>
                  )}
                  {item.date && (
                    <p className="text-[11px] font-mono text-[#9E8C7E] pt-1">
                      {item.date}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default ModernTemplate;
