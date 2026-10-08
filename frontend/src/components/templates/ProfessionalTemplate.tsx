import React from "react";
import { IPortfolio } from "@/types/portfolio";
import { Mail, Phone, MapPin, Globe, ExternalLink, Award, GraduationCap, Briefcase, Sparkles, FolderGit2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterXIcon, InstagramIcon } from "@/components/common/SocialIcons";

export function ProfessionalTemplate({ portfolio }: { portfolio: IPortfolio }) {
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
      .slice(0, 2) || "P";

  return (
    <div className="min-h-screen bg-[#F8F3EC] text-[#2B1D15] font-sans antialiased py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Profile Card */}
        <header className="rounded-3xl bg-[#FFFFFF] border border-[#E6DACB] shadow-md shadow-[#2B1D15]/5 p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#D47A41] to-[#A35525] text-white flex items-center justify-center font-bold text-3xl sm:text-4xl shadow-lg shadow-[#D47A41]/20 shrink-0">
              {profile.profileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2B1D15] tracking-tight">
                  {profile.name || "Untitled Portfolio"}
                </h1>
                <p className="text-base sm:text-lg font-semibold text-[#D47A41] mt-1">
                  {profile.headline || "Professional Specialist"}
                </p>
              </div>

              {profile.professionalSummary && (
                <p className="text-xs sm:text-sm text-[#52413F] leading-relaxed max-w-3xl">
                  {profile.professionalSummary}
                </p>
              )}

              {/* Contact Information Chips */}
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#6D594D]">
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8F3EC] hover:bg-[#EFE6D8] border border-[#E6DACB] transition-colors">
                    <Mail className="w-3.5 h-3.5 text-[#D47A41]" />
                    <span>{profile.email}</span>
                  </a>
                )}
                {profile.phone && (
                  <a href={`tel:${profile.phone}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8F3EC] hover:bg-[#EFE6D8] border border-[#E6DACB] transition-colors">
                    <Phone className="w-3.5 h-3.5 text-[#D47A41]" />
                    <span>{profile.phone}</span>
                  </a>
                )}
                {profile.location && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8F3EC] border border-[#E6DACB]">
                    <MapPin className="w-3.5 h-3.5 text-[#DE8638]" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8F3EC] hover:bg-[#EFE6D8] border border-[#E6DACB] transition-colors">
                    <Globe className="w-3.5 h-3.5 text-[#D47A41]" />
                    <span>Website</span>
                  </a>
                )}
              </div>

              {/* Social Links */}
              {socialLinks && Object.values(socialLinks).some(Boolean) && (
                <div className="pt-1 flex items-center justify-center sm:justify-start gap-2.5">
                  {socialLinks.github && (
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#F8F3EC] hover:bg-[#D47A41] hover:text-white border border-[#E6DACB] transition-all text-[#2B1D15]" aria-label="GitHub">
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#F8F3EC] hover:bg-[#D47A41] hover:text-white border border-[#E6DACB] transition-all text-[#2B1D15]" aria-label="LinkedIn">
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#F8F3EC] hover:bg-[#D47A41] hover:text-white border border-[#E6DACB] transition-all text-[#2B1D15]" aria-label="Twitter / X">
                      <TwitterXIcon className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#F8F3EC] hover:bg-[#D47A41] hover:text-white border border-[#E6DACB] transition-all text-[#2B1D15]" aria-label="Instagram">
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
            {showSkills && (
              <section className="rounded-3xl bg-[#FFFFFF] border border-[#E6DACB] shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E6DACB]">
                  <Sparkles className="w-4 h-4 text-[#D47A41]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#2B1D15]">Core Competencies</h2>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-[#FDF1E8] text-[#DE8638] text-xs font-semibold border border-[#F3CDB7]">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {showEducation && (
              <section className="rounded-3xl bg-[#FFFFFF] border border-[#E6DACB] shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E6DACB]">
                  <GraduationCap className="w-4 h-4 text-[#D47A41]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#2B1D15]">Education</h2>
                </div>
                <div className="space-y-4 pt-1">
                  {education.map((edu, i) => (
                    <div key={i} className="space-y-1">
                      <h3 className="text-xs sm:text-sm font-bold text-[#2B1D15]">{edu.degree}</h3>
                      <p className="text-xs font-semibold text-[#D47A41]">{edu.institution}</p>
                      {edu.fieldOfStudy && <p className="text-xs text-[#6D594D]">{edu.fieldOfStudy}</p>}
                      <div className="flex items-center justify-between text-[11px] text-[#6D594D] pt-1">
                        <span>{edu.startDate} - {edu.endDate || "Present"}</span>
                        {edu.grade && <span className="font-semibold text-[#DE8638]">{edu.grade}</span>}
                      </div>
                      {edu.description && <p className="text-xs text-[#6D594D] pt-1 leading-relaxed">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {showCertifications && (
              <section className="rounded-3xl bg-[#FFFFFF] border border-[#E6DACB] shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E6DACB]">
                  <Award className="w-4 h-4 text-[#D47A41]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#2B1D15]">Certifications</h2>
                </div>
                <div className="space-y-3 pt-1">
                  {certifications.map((cert, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xs font-bold text-[#2B1D15]">{cert.name}</h3>
                        {cert.credentialUrl && (
                          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-[#D47A41] hover:text-[#BF6A34]">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-[#DE8638]">{cert.issuer}</p>
                      {cert.issueDate && <p className="text-[11px] text-[#6D594D]">{cert.issueDate}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column (Experience, Projects, Custom Sections) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            {showExperience && (
              <section className="rounded-3xl bg-[#FFFFFF] border border-[#E6DACB] shadow-sm p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-[#E6DACB]">
                  <Briefcase className="w-4 h-4 text-[#D47A41]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#2B1D15]">Work Experience</h2>
                </div>

                <div className="space-y-6 pt-1">
                  {experience.map((exp, i) => (
                    <div key={i} className="relative pl-6 sm:pl-8 pb-6 border-l-2 border-[#E6DACB] last:pb-0 last:border-l-transparent">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#D47A41] border-4 border-[#F8F3EC]" />
                      <div className="space-y-1.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h3 className="text-sm sm:text-base font-bold text-[#2B1D15]">{exp.position}</h3>
                          <span className="text-[11px] font-mono text-[#6D594D] bg-[#F8F3EC] px-2.5 py-1 rounded-md border border-[#E6DACB] w-fit">
                            {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate || "Present"}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-[#D47A41]">
                          {exp.company} {exp.location ? `• ${exp.location}` : ""}
                        </p>
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
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {showProjects && (
              <section className="rounded-3xl bg-[#FFFFFF] border border-[#E6DACB] shadow-sm p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-[#E6DACB]">
                  <FolderGit2 className="w-4 h-4 text-[#D47A41]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#2B1D15]">Featured Projects</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {projects.map((proj, i) => (
                    <div key={i} className="rounded-2xl bg-[#F8F3EC] border border-[#E6DACB] p-5 flex flex-col justify-between space-y-4 hover:border-[#D47A41]/50 transition-colors">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-bold text-[#2B1D15]">{proj.title}</h3>
                          <div className="flex items-center gap-2 shrink-0">
                            {proj.githubUrl && (
                              <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#6D594D] hover:text-[#2B1D15]" aria-label="GitHub Repository">
                                <GithubIcon className="w-4 h-4" />
                              </a>
                            )}
                            {proj.liveUrl && (
                              <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#D47A41] hover:text-[#BF6A34]">
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
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E6DACB]">
                          {proj.technologies.map((tech, k) => (
                            <span key={k} className="text-[10px] px-2 py-0.5 rounded-md bg-[#FFFFFF] text-[#D47A41] font-mono border border-[#E6DACB]">
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

            {/* Additional Custom Sections */}
            {showCustomSections && (
              <section className="rounded-3xl bg-[#FFFFFF] border border-[#E6DACB] shadow-sm p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-[#E6DACB]">
                  <Sparkles className="w-4 h-4 text-[#DE8638]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#2B1D15]">Additional Highlights</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {customSections.map((item, i) => (
                    <div key={i} className="rounded-2xl bg-[#F8F3EC] border border-[#E6DACB] p-5 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#D47A41] bg-[#FFFDF9] px-2 py-0.5 rounded border border-[#E6DACB]">
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
                      </div>
                      {item.date && (
                        <p className="text-[11px] font-mono text-[#9E8C7E] pt-1 border-t border-[#E6DACB]">
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
      </div>
    </div>
  );
}

export default ProfessionalTemplate;
