import React from "react";
import { IPortfolio } from "@/types/portfolio";
import { Mail, Phone, MapPin, Globe, ExternalLink, Award, GraduationCap, Briefcase, Sparkles, Terminal, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterXIcon, InstagramIcon } from "@/components/common/SocialIcons";

export function ModernTemplate({ portfolio }: { portfolio: IPortfolio }) {
  const { profile, skills, experience, education, projects, certifications, socialLinks } = portfolio;

  const initials =
    profile.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "M";

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B1D1C] font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Modern Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2D5D60] via-[#244C4F] to-[#1E3F41] text-white p-8 sm:p-12 shadow-xl shadow-[#2D5D60]/20">
          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-3xl text-[#FAF7F2] shadow-inner shrink-0">
                {profile.profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <span>{initials}</span>
                )}
              </div>

              <div className="text-center sm:text-left space-y-2 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#F5EFE6] border border-white/20">
                  <Terminal className="w-3.5 h-3.5 text-[#BDE0CB]" />
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
              <p className="text-xs sm:text-sm text-[#FAF7F2]/90 leading-relaxed max-w-2xl">
                {profile.professionalSummary}
              </p>
            )}

            {/* Quick Contact & Socials Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#BDE0CB]" />
                  <span>{profile.email}</span>
                </a>
              )}
              {profile.phone && (
                <a href={`tel:${profile.phone}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#BDE0CB]" />
                  <span>{profile.phone}</span>
                </a>
              )}
              {profile.location && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-[#FAF7F2]">
                  <MapPin className="w-3.5 h-3.5 text-[#EAD2D8]" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors">
                  <Globe className="w-3.5 h-3.5 text-[#BDE0CB]" />
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

          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#FAF0F2]/10 blur-2xl pointer-events-none" />
        </section>

        {/* Tech Stack Chips */}
        {skills && skills.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#2D5D60]" />
              <h2 className="text-lg font-bold text-[#2B1D1C]">Technical Stack</h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#E8DFD3] text-xs font-semibold text-[#2B1D1C] shadow-2xs hover:border-[#2D5D60] transition-colors">
                  <span className="w-2 h-2 rounded-full bg-[#2D5D60]" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#9B4D60]" />
                <h2 className="text-lg font-bold text-[#2B1D1C]">Featured Work & Projects</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((proj, i) => (
                <div key={i} className="rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] p-6 flex flex-col justify-between space-y-5 hover:shadow-md hover:border-[#2D5D60]/40 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-bold text-[#2B1D1C]">{proj.title}</h3>
                      <div className="flex items-center gap-2 shrink-0">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-[#6B5755] hover:text-[#2B1D1C] hover:bg-[#FAF7F2] transition-colors" aria-label="GitHub Repository">
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-[#2D5D60] hover:text-[#1E3F41] hover:bg-[#FAF7F2] transition-colors">
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
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#E8DFD3]">
                      {proj.technologies.map((tech, k) => (
                        <span key={k} className="text-[11px] px-2.5 py-1 rounded-lg bg-[#FAF0F2] text-[#9B4D60] font-medium border border-[#EAD2D8]">
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
        {experience && experience.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#2D5D60]" />
              <h2 className="text-lg font-bold text-[#2B1D1C]">Career Experience</h2>
            </div>

            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div key={i} className="rounded-2xl bg-[#FFFFFF] border border-[#E8DFD3] p-6 space-y-3 hover:border-[#2D5D60]/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-base font-bold text-[#2B1D1C]">{exp.position}</h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#2D5D60] mt-0.5">
                        {exp.company} {exp.location ? `• ${exp.location}` : ""}
                      </p>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#FAF7F2] text-[#6B5755] border border-[#E8DFD3] w-fit">
                      {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="text-xs sm:text-sm text-[#52413F] leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc pl-4 text-xs text-[#6B5755] space-y-1">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education */}
          {education && education.length > 0 && (
            <section className="rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#E8DFD3]">
                <GraduationCap className="w-4 h-4 text-[#2D5D60]" />
                <h2 className="text-sm font-bold text-[#2B1D1C]">Education</h2>
              </div>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="space-y-1">
                    <h3 className="text-sm font-bold text-[#2B1D1C]">{edu.degree}</h3>
                    <p className="text-xs font-semibold text-[#2D5D60]">{edu.institution}</p>
                    <div className="flex justify-between text-xs text-[#7B6866] pt-0.5">
                      <span>{edu.fieldOfStudy}</span>
                      <span>{edu.startDate} - {edu.endDate || "Present"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className="rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#E8DFD3]">
                <Award className="w-4 h-4 text-[#9B4D60]" />
                <h2 className="text-sm font-bold text-[#2B1D1C]">Certifications</h2>
              </div>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <div key={i} className="space-y-0.5">
                    <h3 className="text-sm font-bold text-[#2B1D1C]">{cert.name}</h3>
                    <p className="text-xs text-[#9B4D60] font-semibold">{cert.issuer} {cert.issueDate ? `(${cert.issueDate})` : ""}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModernTemplate;
