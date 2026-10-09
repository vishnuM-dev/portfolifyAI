"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  Terminal,
  Server,
  Database,
  Cpu,
  Activity,
  CheckCircle,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function BackendDeveloperTemplate({ portfolio }: Props) {
  const {
    profile,
    skills = [],
    experience = [],
    education = [],
    projects = [],
    certifications = [],
    socialLinks = {},
  } = portfolio;

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#C9D1D9] font-mono selection:bg-[#238636]/40 selection:text-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-16">
        {/* Terminal Window Header */}
        <header className="rounded-2xl bg-[#161B22] border border-[#30363D] overflow-hidden shadow-2xl">
          {/* Top Bar */}
          <div className="bg-[#21262D] px-4 py-3 flex items-center justify-between border-b border-[#30363D]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="text-xs text-[#8B949E] ml-2">bash ~ {profile?.name?.toLowerCase().replace(/\s+/g, "_") || "backend_dev"}@cluster</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#2EA043]">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>CLUSTER STATUS: HEALTHY (99.99%)</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1 text-xs text-[#8B949E]">
              <p>$ whoami</p>
              <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                {profile?.name || "Backend Systems Engineer"}
              </h1>
            </div>

            <div className="space-y-1 text-xs text-[#8B949E]">
              <p>$ echo $TITLE</p>
              <p className="text-sm sm:text-base text-[#58A6FF] font-semibold">
                {profile?.headline || "Backend Architecture · Distributed Systems · High-Throughput APIs"}
              </p>
            </div>

            {profile?.professionalSummary && (
              <div className="space-y-1 text-xs text-[#8B949E]">
                <p>$ cat /etc/bio.txt</p>
                <p className="text-xs sm:text-sm text-[#C9D1D9] leading-relaxed max-w-3xl">
                  {profile.professionalSummary}
                </p>
              </div>
            )}

            {/* Quick Shell Links */}
            <div className="pt-2 border-t border-[#30363D] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
              {profile?.email && (
                <a href={`mailto:${profile.email}`} className="text-[#58A6FF] hover:underline inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{profile.email}</span>
                </a>
              )}
              {profile?.phone && (
                <span className="text-[#8B949E] inline-flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{profile.phone}</span>
                </span>
              )}
              {profile?.location && (
                <span className="text-[#8B949E] inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{profile.location}</span>
                </span>
              )}
              {profile?.website && (
                <a href={profile.website} target="_blank" rel="noreferrer" className="text-[#58A6FF] hover:underline inline-flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Host</span>
                </a>
              )}
              {socialLinks?.github && (
                <a href={socialLinks.github} target="_blank" rel="noreferrer" className="text-[#58A6FF] hover:underline inline-flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {socialLinks?.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-[#58A6FF] hover:underline inline-flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Technical Infrastructure Skills */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-[#3FB950]">
              <Database className="w-4 h-4" />
              <h2 className="text-xs uppercase tracking-widest text-[#3FB950] font-bold">
                $ sysctl -a | grep technologies
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center justify-between text-xs"
                >
                  <span className="text-white font-medium">{skill}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-[#238636]" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects / Microservices Endpoints */}
        {projects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-[#58A6FF]">
              <Server className="w-4 h-4" />
              <h2 className="text-xs uppercase tracking-widest text-[#58A6FF] font-bold">
                $ curl -X GET /api/v1/projects
              </h2>
            </div>

            <div className="space-y-4">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#161B22] border border-[#30363D] space-y-4 hover:border-[#58A6FF]/60 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#238636]/20 text-[#3FB950] border border-[#238636]/40">
                        200 OK
                      </span>
                      <h3 className="text-base font-bold text-white">{proj.title}</h3>
                    </div>

                    <div className="flex items-center gap-3">
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-[#58A6FF] hover:underline inline-flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Endpoint</span>
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-[#8B949E] hover:text-white inline-flex items-center gap-1"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Source</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#8B949E] leading-relaxed">
                    {proj.description}
                  </p>

                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] bg-[#0D1117] text-[#58A6FF] border border-[#30363D]"
                        >
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

        {/* Career & System Logs */}
        {experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-[#3FB950] font-bold">
              $ journalctl -u career-history.service
            </h2>

            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#161B22] border border-[#30363D] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                    <div>
                      <span className="text-[#3FB950] font-bold">{exp.position}</span>
                      <span className="text-[#8B949E]"> @ </span>
                      <span className="text-white font-semibold">{exp.company}</span>
                    </div>
                    <span className="text-[#8B949E]">{exp.startDate} – {exp.currentlyWorking ? "Active" : exp.endDate}</span>
                  </div>

                  {exp.description && (
                    <p className="text-xs text-[#8B949E] leading-relaxed">{exp.description}</p>
                  )}

                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <div className="space-y-1 text-xs text-[#C9D1D9]">
                      {exp.responsibilities.map((r, i) => (
                        <p key={i}>&gt; {r}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certs */}
        {(education.length > 0 || certifications.length > 0) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#30363D] pt-10 text-xs">
            {education.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-[#58A6FF] font-bold uppercase">$ cat credentials/education</h3>
                {education.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#161B22] border border-[#30363D]">
                    <p className="text-white font-bold">{edu.degree}</p>
                    <p className="text-[#8B949E]">{edu.institution} ({edu.startDate} - {edu.endDate})</p>
                  </div>
                ))}
              </div>
            )}

            {certifications.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-[#58A6FF] font-bold uppercase">$ cat credentials/certs</h3>
                {certifications.map((cert, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#161B22] border border-[#30363D]">
                    <p className="text-white font-bold">{cert.name}</p>
                    <p className="text-[#8B949E]">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
