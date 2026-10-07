import React from "react";
import { IPortfolio } from "@/types/portfolio";
import { Mail, Phone, MapPin, Globe, ExternalLink, Award, GraduationCap, Briefcase, Sparkles, FolderGit2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterXIcon, InstagramIcon } from "@/components/common/SocialIcons";

export function ProfessionalTemplate({ portfolio }: { portfolio: IPortfolio }) {
  const { profile, skills, experience, education, projects, certifications, socialLinks } = portfolio;

  const initials =
    profile.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "P";

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B1D1C] font-sans antialiased py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Profile Card */}
        <header className="rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-md shadow-[#2B1D1C]/5 p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#2D5D60] to-[#1E3F41] text-white flex items-center justify-center font-bold text-3xl sm:text-4xl shadow-lg shadow-[#2D5D60]/20 shrink-0">
              {profile.profileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2B1D1C] tracking-tight">
                  {profile.name || "Untitled Portfolio"}
                </h1>
                <p className="text-base sm:text-lg font-semibold text-[#2D5D60] mt-1">
                  {profile.headline || "Professional Specialist"}
                </p>
              </div>

              {profile.professionalSummary && (
                <p className="text-xs sm:text-sm text-[#52413F] leading-relaxed max-w-3xl">
                  {profile.professionalSummary}
                </p>
              )}

              {/* Contact Information Chips */}
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#6B5755]">
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#F3ECE0] border border-[#E8DFD3] transition-colors">
                    <Mail className="w-3.5 h-3.5 text-[#2D5D60]" />
                    <span>{profile.email}</span>
                  </a>
                )}
                {profile.phone && (
                  <a href={`tel:${profile.phone}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#F3ECE0] border border-[#E8DFD3] transition-colors">
                    <Phone className="w-3.5 h-3.5 text-[#2D5D60]" />
                    <span>{profile.phone}</span>
                  </a>
                )}
                {profile.location && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3]">
                    <MapPin className="w-3.5 h-3.5 text-[#9B4D60]" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#F3ECE0] border border-[#E8DFD3] transition-colors">
                    <Globe className="w-3.5 h-3.5 text-[#2D5D60]" />
                    <span>Website</span>
                  </a>
                )}
              </div>

              {/* Social Links */}
              {socialLinks && Object.values(socialLinks).some(Boolean) && (
                <div className="pt-1 flex items-center justify-center sm:justify-start gap-2.5">
                  {socialLinks.github && (
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#2D5D60] hover:text-white border border-[#E8DFD3] transition-all text-[#2B1D1C]" aria-label="GitHub">
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#2D5D60] hover:text-white border border-[#E8DFD3] transition-all text-[#2B1D1C]" aria-label="LinkedIn">
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#2D5D60] hover:text-white border border-[#E8DFD3] transition-all text-[#2B1D1C]" aria-label="Twitter / X">
                      <TwitterXIcon className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#2D5D60] hover:text-white border border-[#E8DFD3] transition-all text-[#2B1D1C]" aria-label="Instagram">
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* 2-Column Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Skills, Education, Certifications) */}
          <div className="space-y-8">
            {/* Skills */}
            {skills && skills.length > 0 && (
              <section className="rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E8DFD3]">
                  <Sparkles className="w-4 h-4 text-[#2D5D60]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#2B1D1C]">Core Competencies</h2>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-[#FAF0F2] text-[#9B4D60] text-xs font-semibold border border-[#EAD2D8]">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <section className="rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E8DFD3]">
                  <GraduationCap className="w-4 h-4 text-[#2D5D60]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#2B1D1C]">Education</h2>
                </div>
                <div className="space-y-4 pt-1">
                  {education.map((edu, i) => (
                    <div key={i} className="space-y-1">
                      <h3 className="text-xs sm:text-sm font-bold text-[#2B1D1C]">{edu.degree}</h3>
                      <p className="text-xs font-semibold text-[#2D5D60]">{edu.institution}</p>
                      {edu.fieldOfStudy && <p className="text-xs text-[#6B5755]">{edu.fieldOfStudy}</p>}
                      <div className="flex items-center justify-between text-[11px] text-[#7B6866] pt-1">
                        <span>{edu.startDate} - {edu.endDate || "Present"}</span>
                        {edu.grade && <span className="font-semibold text-[#9B4D60]">{edu.grade}</span>}
                      </div>
                      {edu.description && <p className="text-xs text-[#6B5755] pt-1 leading-relaxed">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <section className="rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E8DFD3]">
                  <Award className="w-4 h-4 text-[#2D5D60]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#2B1D1C]">Certifications</h2>
                </div>
                <div className="space-y-3 pt-1">
                  {certifications.map((cert, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xs font-bold text-[#2B1D1C]">{cert.name}</h3>
                        {cert.credentialUrl && (
                          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-[#2D5D60] hover:text-[#22484A]">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-[#9B4D60]">{cert.issuer}</p>
                      {cert.issueDate && <p className="text-[11px] text-[#7B6866]">{cert.issueDate}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column (Experience & Projects) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            {experience && experience.length > 0 && (
              <section className="rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-sm p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-[#E8DFD3]">
                  <Briefcase className="w-4 h-4 text-[#2D5D60]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#2B1D1C]">Work Experience</h2>
                </div>

                <div className="space-y-6 pt-1">
                  {experience.map((exp, i) => (
                    <div key={i} className="relative pl-6 sm:pl-8 pb-6 border-l-2 border-[#E8DFD3] last:pb-0 last:border-l-transparent">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#2D5D60] border-4 border-[#FAF7F2]" />
                      <div className="space-y-1.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h3 className="text-sm sm:text-base font-bold text-[#2B1D1C]">{exp.position}</h3>
                          <span className="text-[11px] font-mono text-[#7B6866] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#E8DFD3] w-fit">
                            {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate || "Present"}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-[#2D5D60]">
                          {exp.company} {exp.location ? `• ${exp.location}` : ""}
                        </p>
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
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <section className="rounded-3xl bg-[#FFFFFF] border border-[#E8DFD3] shadow-sm p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-[#E8DFD3]">
                  <FolderGit2 className="w-4 h-4 text-[#2D5D60]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#2B1D1C]">Featured Projects</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {projects.map((proj, i) => (
                    <div key={i} className="rounded-2xl bg-[#FAF7F2] border border-[#E8DFD3] p-5 flex flex-col justify-between space-y-4 hover:border-[#2D5D60]/50 transition-colors">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-bold text-[#2B1D1C]">{proj.title}</h3>
                          <div className="flex items-center gap-2 shrink-0">
                            {proj.githubUrl && (
                              <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#6B5755] hover:text-[#2B1D1C]" aria-label="GitHub Repository">
                                <GithubIcon className="w-4 h-4" />
                              </a>
                            )}
                            {proj.liveUrl && (
                              <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#2D5D60] hover:text-[#22484A]">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-[#52413F] leading-relaxed line-clamp-3">
                          {proj.description}
                        </p>
                      </div>

                      {proj.technologies && proj.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E8DFD3]">
                          {proj.technologies.map((tech, k) => (
                            <span key={k} className="text-[10px] px-2 py-0.5 rounded-md bg-[#FFFFFF] text-[#2D5D60] font-mono border border-[#E8DFD3]">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalTemplate;
