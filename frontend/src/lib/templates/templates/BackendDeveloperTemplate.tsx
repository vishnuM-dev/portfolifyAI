
"use client";

import React from "react";
import { IPortfolio } from "@/types/portfolio";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  ArrowUpRight,
  Terminal,
  Server,
  Database,
  Code2,
  BriefcaseBusiness,
  GraduationCap,
  Award,
  CheckCircle2,
  MoveRight,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
} from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function BackendDeveloperTemplate({
  portfolio,
}: Props) {
  const {
    profile,
    skills = [],
    experience = [],
    education = [],
    projects = [],
    certifications = [],
    socialLinks = {},
  } = portfolio;

  const name = profile?.name || "Backend Developer";
  const headline =
    profile?.headline ||
    "Building reliable systems, scalable APIs, and better digital experiences.";

  const summary = profile?.professionalSummary;
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const safeUrl = (url?: string) => {
    if (!url) return undefined;

    try {
      const parsed = new URL(url);
      if (["http:", "https:"].includes(parsed.protocol)) {
        return parsed.href;
      }
    } catch {
      return undefined;
    }

    return undefined;
  };

  const sectionClass = "scroll-mt-24 space-y-8";
  const sectionTitle =
    "text-2xl sm:text-3xl font-bold tracking-tight text-white";
  const mutedText = "text-[#9CA9BA]";

  const cardClass =
    "rounded-2xl border border-[#263443] bg-[#111821] transition-all duration-300 hover:border-[#5EE6A8]/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20";

  return (
    <main className="min-h-screen overflow-hidden bg-[#0B0F14] text-[#E8EDF4] selection:bg-[#5EE6A8]/30 selection:text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-48 right-[-100px] h-[450px] w-[450px] rounded-full bg-[#5EE6A8]/[0.07] blur-[130px]" />
        <div className="absolute left-[-200px] top-[700px] h-[400px] w-[400px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#8BA0B8 1px, transparent 1px), linear-gradient(90deg, #8BA0B8 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-6 sm:px-8 lg:px-12">
        {/* Navigation */}
        <nav className="flex items-center justify-between border-b border-[#263443] pb-5">
          <a
            href="#home"
            className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EE6A8]"
            aria-label="Go to homepage"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#5EE6A8]/30 bg-[#5EE6A8]/10 font-mono text-sm font-bold text-[#5EE6A8]">
              {initials || "BD"}
            </div>
            <div>
              <p className="font-semibold tracking-tight text-white">
                {name}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8392A5]">
                Software Engineer
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-7 text-sm text-[#A6B0BE] md:flex">
            <a href="#about" className="transition hover:text-[#5EE6A8]">
              About
            </a>
            <a href="#skills" className="transition hover:text-[#5EE6A8]">
              Skills
            </a>
            <a href="#projects" className="transition hover:text-[#5EE6A8]">
              Projects
            </a>
            <a href="#experience" className="transition hover:text-[#5EE6A8]">
              Experience
            </a>
          </div>

          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-[#5EE6A8]/40 px-3 py-2 text-xs font-semibold text-[#5EE6A8] transition hover:bg-[#5EE6A8]/10 sm:px-4 sm:text-sm"
            >
              <Mail size={15} />
              <span className="hidden sm:inline">Contact Me</span>
              <span className="sm:hidden">Contact</span>
            </a>
          )}
        </nav>

        {/* Hero */}
        <section
          id="home"
          className="grid min-h-[580px] items-center gap-14 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28"
        >
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#5EE6A8]/20 bg-[#5EE6A8]/[0.07] px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5EE6A8] opacity-50 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5EE6A8]" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#5EE6A8]">
                Backend Engineering · System Design
              </span>
            </div>

            <div className="space-y-5">
              <p className="font-mono text-sm text-[#8392A5]">
                Hello, I&apos;m
              </p>

              <h1 className="break-words text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl xl:text-7xl">
                {name.split(" ").map((part, index) => (
                  <React.Fragment key={`${part}-${index}`}>
                    {index > 0 && " "}
                    <span className={index === 0 ? "text-white" : "text-[#5EE6A8]"}>
                      {part}
                    </span>
                  </React.Fragment>
                ))}
                <span className="text-[#5EE6A8]">.</span>
              </h1>

              <h2 className="max-w-2xl text-xl font-medium leading-relaxed text-[#BCC6D3] sm:text-2xl">
                {headline}
              </h2>

              {summary && (
                <p className={`max-w-xl text-sm leading-8 sm:text-base ${mutedText}`}>
                  {summary}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-[#5EE6A8] px-5 py-3.5 text-sm font-bold text-[#07130E] transition hover:bg-[#86F3BF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Explore My Work
                <ArrowUpRight size={17} />
              </a>

              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#344252] bg-[#111821] px-5 py-3.5 text-sm font-semibold text-white transition hover:border-[#5EE6A8]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EE6A8]"
                >
                  Let&apos;s Connect
                  <MoveRight size={16} />
                </a>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#263443] pt-6 text-sm text-[#9CA9BA]">
              {profile?.location && (
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} className="text-[#5EE6A8]" />
                  {profile.location}
                </span>
              )}

              {profile?.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="inline-flex items-center gap-2 transition hover:text-[#5EE6A8]"
                >
                  <Phone size={15} className="text-[#5EE6A8]" />
                  {profile.phone}
                </a>
              )}

              {profile?.website && safeUrl(profile.website) && (
                <a
                  href={safeUrl(profile.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-[#5EE6A8]"
                >
                  <Globe size={15} className="text-[#5EE6A8]" />
                  Website
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>

          {/* Code-inspired visual */}
          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="absolute -inset-5 rounded-[32px] bg-[#5EE6A8]/[0.05] blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-[#344252] bg-[#101720] shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-[#263443] bg-[#151E29] px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B6B]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F4C95D]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#5EE6A8]" />
                </div>
                <span className="font-mono text-xs text-[#8392A5]">
                  developer.ts
                </span>
                <Terminal size={15} className="text-[#8392A5]" />
              </div>

              <div className="space-y-6 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#5EE6A8]/20 bg-[#5EE6A8]/10">
                    <Code2 size={23} className="text-[#5EE6A8]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{name}</p>
                    <p className="mt-1 font-mono text-xs text-[#8392A5]">
                      ./build/developer
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-[#263443] bg-[#0B0F14] p-4 font-mono text-xs leading-7 sm:p-5 sm:text-sm">
                  <p className="text-[#8392A5]">
                    <span className="text-[#C792EA]">const</span>{" "}
                    developer = {"{"}
                  </p>
                  <p className="pl-4 text-[#BCC6D3]">
                    name:{" "}
                    <span className="break-words text-[#A5E6A1]">
                      &quot;{name}&quot;
                    </span>
                    ,
                  </p>
                  <p className="pl-4 text-[#BCC6D3]">
                    focus:{" "}
                    <span className="text-[#A5E6A1]">
                      &quot;Backend&quot;
                    </span>
                    ,
                  </p>
                  <p className="pl-4 text-[#BCC6D3]">
                    scalable:{" "}
                    <span className="text-[#F4C95D]">true</span>,
                  </p>
                  <p className="pl-4 text-[#BCC6D3]">
                    reliable:{" "}
                    <span className="text-[#F4C95D]">true</span>
                  </p>
                  <p className="text-[#8392A5]">{"}"}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#9CA9BA]">
                      <Server size={14} className="mr-2 inline text-[#5EE6A8]" />
                      System architecture
                    </span>
                    <span className="font-mono text-[#5EE6A8]">READY</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#263443]">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-[#248F65] to-[#5EE6A8]" />
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#9CA9BA]">
                      <Database size={14} className="mr-2 inline text-[#5EE6A8]" />
                      API development
                    </span>
                    <span className="font-mono text-[#5EE6A8]">READY</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#263443]">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-[#248F65] to-[#5EE6A8]" />
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-[#263443] pt-4 font-mono text-xs text-[#8392A5]">
                  <CheckCircle2 size={15} className="text-[#5EE6A8]" />
                  Focused on clean, maintainable code
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-3 hidden items-center gap-2 rounded-xl border border-[#344252] bg-[#151E29] px-4 py-3 shadow-xl sm:flex">
              <CheckCircle2 size={17} className="text-[#5EE6A8]" />
              <span className="text-xs font-medium text-white">
                Quality-driven development
              </span>
            </div>
          </div>
        </section>

        {/* About / overview */}
        {summary && (
          <section id="about" className={`${sectionClass} border-t border-[#263443] py-16`}>
            <div className="max-w-3xl space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5EE6A8]">
                01 / About
              </p>
              <h2 className={sectionTitle}>Engineering with purpose.</h2>
              <p className={`text-sm leading-8 sm:text-base ${mutedText}`}>
                {summary}
              </p>
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section id="skills" className={`${sectionClass} border-t border-[#263443] py-16`}>
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5EE6A8]">
                02 / Technical Expertise
              </p>
              <h2 className={sectionTitle}>Tools of my trade.</h2>
              <p className={`max-w-2xl text-sm leading-7 ${mutedText}`}>
                Technologies and tools used to build, maintain, and improve software.
              </p>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {skills.map((skill, idx) => (
                <div
                  key={`${skill}-${idx}`}
                  className={`${cardClass} group flex items-center gap-3 p-3.5 sm:p-5 min-w-0`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#5EE6A8]/[0.08] transition group-hover:bg-[#5EE6A8]/15">
                    <Code2 size={17} className="text-[#5EE6A8]" />
                  </div>
                  <span className="break-words text-sm font-medium text-[#DCE4EE] truncate min-w-0">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section id="projects" className={`${sectionClass} border-t border-[#263443] py-16`}>
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5EE6A8]">
                  03 / Selected Work
                </p>
                <h2 className={sectionTitle}>Things I&apos;ve built.</h2>
                <p className={`max-w-xl text-sm leading-7 ${mutedText}`}>
                  Projects that showcase problem-solving, engineering, and implementation.
                </p>
              </div>
              <span className="w-fit rounded-lg border border-[#263443] bg-[#111821] px-3 py-2 font-mono text-xs text-[#9CA9BA]">
                {String(projects.length).padStart(2, "0")} PROJECTS
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((proj, idx) => (
                <article
                  key={`${proj.title}-${idx}`}
                  className={`${cardClass} group flex flex-col p-6 sm:p-7`}
                >
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#5EE6A8]/20 bg-[#5EE6A8]/[0.07]">
                      <Terminal size={22} className="text-[#5EE6A8]" />
                    </div>
                    <span className="font-mono text-xs text-[#65758A]">
                      PROJECT_{String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white transition group-hover:text-[#5EE6A8]">
                    {proj.title}
                  </h3>

                  {proj.description && (
                    <p className={`mt-3 flex-1 text-sm leading-7 ${mutedText}`}>
                      {proj.description}
                    </p>
                  )}

                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {proj.technologies.map((tech, techIdx) => (
                        <span
                          key={`${tech}-${techIdx}`}
                          className="rounded-md border border-[#263443] bg-[#0B0F14] px-2.5 py-1.5 font-mono text-[11px] text-[#B5C2D2]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {(safeUrl(proj.liveUrl) || safeUrl(proj.githubUrl)) && (
                    <div className="mt-7 flex flex-wrap gap-3 border-t border-[#263443] pt-5">
                      {safeUrl(proj.liveUrl) && (
                        <a
                          href={safeUrl(proj.liveUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-[#5EE6A8] px-4 py-2.5 text-xs font-bold text-[#07130E] transition hover:bg-[#86F3BF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          Live Demo
                          <ArrowUpRight size={15} />
                        </a>
                      )}

                      {safeUrl(proj.githubUrl) && (
                        <a
                          href={safeUrl(proj.githubUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-[#344252] px-4 py-2.5 text-xs font-semibold text-[#DCE4EE] transition hover:border-[#5EE6A8]/50 hover:text-[#5EE6A8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EE6A8]"
                        >
                          <GithubIcon className="h-4 w-4" />
                          Source Code
                        </a>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section id="experience" className={`${sectionClass} border-t border-[#263443] py-16`}>
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5EE6A8]">
                04 / Career Journey
              </p>
              <h2 className={sectionTitle}>Experience that matters.</h2>
            </div>

            <div className="relative space-y-6 before:absolute before:bottom-8 before:left-[15px] before:top-8 before:w-px before:bg-[#344252]">
              {experience.map((exp, idx) => (
                <article
                  key={`${exp.company}-${exp.position}-${idx}`}
                  className="relative pl-10"
                >
                  <span className="absolute left-[9px] top-7 z-10 h-[13px] w-[13px] rounded-full border-[3px] border-[#0B0F14] bg-[#5EE6A8] shadow-[0_0_12px_rgba(94,230,168,0.25)]" />

                  <div className={`${cardClass} p-6 sm:p-7`}>
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {exp.position}
                        </h3>
                        <p className="mt-1 flex items-center gap-2 text-sm font-medium text-[#5EE6A8]">
                          <BriefcaseBusiness size={15} />
                          {exp.company}
                        </p>
                      </div>

                      <span className="w-fit rounded-lg border border-[#344252] bg-[#0B0F14] px-3 py-2 font-mono text-[11px] text-[#A6B0BE]">
                        {exp.startDate || ""}
                        {exp.startDate ? " — " : ""}
                        {exp.currentlyWorking
                          ? "Present"
                          : exp.endDate || ""}
                      </span>
                    </div>

                    {exp.description && (
                      <p className={`mt-5 text-sm leading-7 ${mutedText}`}>
                        {exp.description}
                      </p>
                    )}

                    {exp.responsibilities &&
                      exp.responsibilities.length > 0 && (
                        <ul className="mt-5 space-y-3">
                          {exp.responsibilities.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm leading-6 text-[#BCC6D3]"
                            >
                              <CheckCircle2
                                size={16}
                                className="mt-1 shrink-0 text-[#5EE6A8]"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Education and Certifications */}
        {(education.length > 0 || certifications.length > 0) && (
          <section className={`${sectionClass} border-t border-[#263443] py-16`}>
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5EE6A8]">
                05 / Qualifications
              </p>
              <h2 className={sectionTitle}>Learning never stops.</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {education.length > 0 && (
                <div className="space-y-5">
                  <h3 className="flex items-center gap-3 text-lg font-semibold text-white">
                    <GraduationCap size={21} className="text-[#5EE6A8]" />
                    Education
                  </h3>

                  {education.map((edu, idx) => (
                    <article
                      key={`${edu.institution}-${edu.degree}-${idx}`}
                      className={`${cardClass} p-5`}
                    >
                      <h4 className="font-semibold leading-6 text-white">
                        {edu.degree}
                      </h4>
                      <p className="mt-2 text-sm text-[#A6B0BE]">
                        {edu.institution}
                      </p>
                      {(edu.startDate || edu.endDate) && (
                        <p className="mt-3 font-mono text-xs text-[#5EE6A8]">
                          {[edu.startDate, edu.endDate]
                            .filter(Boolean)
                            .join(" — ")}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              )}

              {certifications.length > 0 && (
                <div className="space-y-5">
                  <h3 className="flex items-center gap-3 text-lg font-semibold text-white">
                    <Award size={21} className="text-[#5EE6A8]" />
                    Certifications
                  </h3>

                  {certifications.map((cert, idx) => (
                    <article
                      key={`${cert.name}-${idx}`}
                      className={`${cardClass} flex items-start gap-4 p-5`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#5EE6A8]/10">
                        <Award size={19} className="text-[#5EE6A8]" />
                      </div>
                      <div>
                        <h4 className="font-semibold leading-6 text-white">
                          {cert.name}
                        </h4>
                        {cert.issuer && (
                          <p className="mt-1 text-sm text-[#A6B0BE]">
                            {cert.issuer}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Contact */}
        <section className="border-t border-[#263443] py-16">
          <div className="relative overflow-hidden rounded-3xl border border-[#344252] bg-[#111821] p-7 sm:p-12 lg:p-14">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#5EE6A8]/10 blur-[80px]" />

            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-xl space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5EE6A8]">
                  What&apos;s Next?
                </p>
                <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                  Let&apos;s build something meaningful.
                </h2>
                <p className={`text-sm leading-7 sm:text-base ${mutedText}`}>
                  Have an interesting idea or opportunity? I&apos;d love to
                  connect and explore how we can create something great.
                </p>
              </div>

              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-[#5EE6A8] px-6 py-4 text-sm font-bold text-[#07130E] transition hover:bg-[#86F3BF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Mail size={18} />
                  Get in Touch
                  <ArrowUpRight size={17} />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col justify-between gap-5 border-t border-[#263443] py-7 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold text-white">{name}</p>
            <p className="mt-1 text-xs text-[#8392A5]">
              Designed with purpose. Built with code.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="text-[#8392A5] transition hover:text-[#5EE6A8]"
              >
                <Mail size={18} />
              </a>
            )}

            {safeUrl(socialLinks?.github) && (
              <a
                href={safeUrl(socialLinks.github)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[#8392A5] transition hover:text-[#5EE6A8]"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
            )}

            {safeUrl(socialLinks?.linkedin) && (
              <a
                href={safeUrl(socialLinks.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[#8392A5] transition hover:text-[#5EE6A8]"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            )}

            {safeUrl(socialLinks?.twitter) && (
              <a
                href={safeUrl(socialLinks.twitter)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-[#8392A5] transition hover:text-[#5EE6A8]"
              >
                <Globe size={18} />
              </a>
            )}
          </div>

          <p className="text-xs text-[#65758A]">
            Built with <span className="text-[#5EE6A8]">Portfolify AI</span>
          </p>
        </footer>
      </div>
    </main>
  );
}
