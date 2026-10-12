"use client";

import React from "react";
import {
  Sparkles,
  Mail,
  MapPin,
  Globe,
  ExternalLink,
  Flame,
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  Award,
  Code2,
  CalendarDays,
} from "lucide-react";
import { IPortfolio } from "@/types/portfolio";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

export default function CreativeMotionTemplate({ portfolio }: Props) {
  const {
    profile,
    skills = [],
    experience = [],
    education = [],
    projects = [],
    certifications = [],
    socialLinks = {},
  } = portfolio;

  const hasSocialLinks =
    Boolean(socialLinks?.github) ||
    Boolean(socialLinks?.linkedin) ||
    Boolean(socialLinks?.twitter);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF8F5] font-sans text-[#211D24] selection:bg-[#F1B8A5]/50">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-32 h-[420px] w-[420px] rounded-full bg-[#E9DDF8]/45 blur-[100px]" />
        <div className="absolute -left-40 top-[520px] h-[380px] w-[380px] rounded-full bg-[#F8DCCF]/45 blur-[100px]" />
        <div className="absolute right-[10%] top-[1150px] h-[320px] w-[320px] rounded-full bg-[#DDECE8]/50 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
        {/* Navigation */}
        <nav className="mb-16 flex items-center justify-between sm:mb-24">
          <a
            href="#home"
            className="group flex items-center gap-2.5"
            aria-label="Back to home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#211D24] text-white shadow-lg shadow-[#211D24]/10 transition-transform duration-300 group-hover:-rotate-6">
              <Sparkles size={18} />
            </span>
            <span className="text-sm font-extrabold tracking-tight">
              {profile?.name?.split(" ")[0] || "Creative"}
              <span className="text-[#E77760]">.</span>
            </span>
          </a>

          <a
            href={profile?.email ? `mailto:${profile.email}` : "#projects"}
            className="inline-flex items-center gap-2 rounded-full border border-[#E9E2DD] bg-white/75 px-4 py-2.5 text-xs font-bold shadow-sm transition-all duration-300 hover:border-[#E77760] hover:bg-white sm:px-5"
          >
            Let&apos;s talk
            <ArrowUpRight size={14} />
          </a>
        </nav>

        {/* Hero */}
        <header id="home" className="mb-24 scroll-mt-8 sm:mb-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E8DCD5] bg-white/70 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#9B6658] shadow-sm sm:text-[11px]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E77760] opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E77760]" />
                </span>
                Creative portfolio
              </div>

              <div className="space-y-5">
                <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-[-0.055em] sm:text-7xl lg:text-[88px]">
                  Hey, I&apos;m{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-[#E77760]">
                      {profile?.name || "Creative Maker"}
                    </span>
                    <span className="absolute bottom-1 left-0 -z-0 h-3 w-full -rotate-2 rounded-full bg-[#F4D7C9]/80 sm:bottom-3 sm:h-5" />
                  </span>
                  <span className="text-[#C9B4DE]">.</span>
                </h1>

                <p className="max-w-2xl text-xl font-bold leading-relaxed tracking-tight text-[#6D5A68] sm:text-2xl lg:text-3xl">
                  {profile?.headline ||
                    "Building thoughtful digital experiences with creativity and code."}
                </p>
              </div>

              {profile?.professionalSummary && (
                <p className="max-w-xl text-sm leading-7 text-[#786F75] sm:text-base sm:leading-8">
                  {profile.professionalSummary}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                {profile?.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#211D24] px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-[#211D24]/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#E77760] hover:shadow-xl"
                  >
                    <Mail size={15} />
                    Get in touch
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                )}

                {socialLinks?.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E9E2DD] bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-[#211D24] hover:bg-white"
                  >
                    <GithubIcon className="h-[18px] w-[18px]" />
                  </a>
                )}

                {socialLinks?.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E9E2DD] bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-[#7C68A6] hover:bg-white"
                  >
                    <LinkedinIcon className="h-[18px] w-[18px]" />
                  </a>
                )}

                {socialLinks?.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E9E2DD] bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-[#559DAA] hover:bg-white"
                  >
                    <TwitterIcon className="h-[18px] w-[18px]" />
                  </a>
                )}
              </div>

              {profile?.location && (
                <div className="flex items-center gap-2 pt-2 text-xs font-medium text-[#92858D]">
                  <MapPin size={14} className="text-[#E77760]" />
                  {profile.location}
                </div>
              )}
            </div>

            {/* Decorative identity card */}
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div className="absolute -right-3 -top-3 h-full w-full rotate-6 rounded-[2rem] bg-[#DCCBEF] sm:-right-4 sm:-top-4" />
              <div className="absolute -bottom-4 -left-3 h-24 w-24 rounded-full border-[12px] border-[#F2D5C8]/80 sm:-left-5" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-[#EDE6F3] p-6 shadow-2xl shadow-[#49354A]/10 sm:p-8">
                <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/60 blur-2xl" />
                <div className="absolute -bottom-10 -left-8 h-40 w-40 rounded-full bg-[#E9B7A8]/40 blur-2xl" />

                <div className="relative flex min-h-[310px] flex-col justify-between sm:min-h-[350px]">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-[#7C68A6] shadow-sm">
                      <Sparkles size={22} />
                    </div>
                    <span className="rounded-full border border-white/80 bg-white/60 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#7C68A6]">
                      My creative space
                    </span>
                  </div>

                  <div className="relative py-8">
                    <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 sm:h-48 sm:w-48" />
                    <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 sm:h-40 sm:w-40" />

                    <div className="relative mx-auto flex h-36 w-36 rotate-[-5deg] items-center justify-center rounded-[2.5rem] border-4 border-white/80 bg-[#E77760] text-white shadow-xl shadow-[#E77760]/20 transition-transform duration-500 hover:rotate-0 sm:h-44 sm:w-44">
                      <span className="text-6xl font-black tracking-tighter sm:text-7xl">
                        {profile?.name
                          ? profile.name
                            .trim()
                            .split(/\s+/)
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join("")
                            .toUpperCase()
                          : "CM"}
                      </span>
                      <span className="absolute -right-3 -top-3 flex h-11 w-11 items-center justify-center rounded-2xl border-4 border-[#EDE6F3] bg-[#DCCBEF] text-[#514067]">
                        <Flame size={19} />
                      </span>
                    </div>

                    <div className="absolute left-0 top-2 flex h-11 w-11 rotate-[-12deg] items-center justify-center rounded-2xl bg-white text-[#E77760] shadow-md">
                      <Code2 size={19} />
                    </div>
                    <div className="absolute bottom-1 right-0 flex h-12 w-12 rotate-[12deg] items-center justify-center rounded-2xl bg-[#D8E9E2] text-[#4C7E6D] shadow-md">
                      <Sparkles size={20} />
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8E7D94]">
                        Designed with intention
                      </p>
                      <p className="mt-1.5 text-lg font-black tracking-tight text-[#352B3C]">
                        Made to make a mark.
                      </p>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80 text-[#E77760]">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick overview */}
          <div className="mt-12 grid grid-cols-2 gap-2.5 sm:mt-20 sm:grid-cols-4 sm:gap-4">
            {[
              {
                value: String(projects.length).padStart(2, "0"),
                label: "Projects",
                icon: Code2,
                color: "text-[#E77760]",
                bg: "bg-[#F9E6DE]",
              },
              {
                value: String(experience.length).padStart(2, "0"),
                label: "Experiences",
                icon: BriefcaseBusiness,
                color: "text-[#7C68A6]",
                bg: "bg-[#EDE6F5]",
              },
              {
                value: String(skills.length).padStart(2, "0"),
                label: "Skills",
                icon: Sparkles,
                color: "text-[#4C7E6D]",
                bg: "bg-[#E1EEE7]",
              },
              {
                value: String(certifications.length).padStart(2, "0"),
                label: "Certificates",
                icon: Award,
                color: "text-[#B18B42]",
                bg: "bg-[#F5EDD9]",
              },
            ].map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-[#EAE2DC] bg-white/75 p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#49354A]/5 sm:rounded-3xl sm:p-5 min-w-0"
                >
                  <div
                    className={`mb-5 flex h-9 w-9 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                  >
                    <Icon size={17} />
                  </div>
                  <p className="text-2xl font-black tracking-tight sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.13em] text-[#92858D] sm:text-[11px]">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </header>

        {/* Skills */}
        {skills.length > 0 && (
          <section id="skills" className="mb-24 scroll-mt-8 sm:mb-32">
            <SectionHeading
              eyebrow="What I work with"
              title="My creative toolkit."
              description="The technologies and tools I use to turn ideas into meaningful digital experiences."
              number="01"
            />

            <div className="mt-9 overflow-hidden rounded-[2rem] border border-[#EAE2DC] bg-white/80 p-6 shadow-sm sm:p-9">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F9E6DE] text-[#E77760]">
                  <Code2 size={19} />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold">Skills & technologies</h3>
                  <p className="mt-1 text-xs text-[#92858D]">
                    Always learning, always building.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, idx) => (
                  <span
                    key={`${skill}-${idx}`}
                    className="group inline-flex items-center gap-2 rounded-xl border border-[#EAE2DC] bg-[#FAF8F5] px-4 py-3 text-xs font-bold text-[#574C57] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E77760]/40 hover:bg-[#F9E6DE]/60 hover:text-[#B95845]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D7B8A9] transition-colors group-hover:bg-[#E77760]" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section id="projects" className="mb-24 scroll-mt-8 sm:mb-32">
            <SectionHeading
              eyebrow="Selected work"
              title="Things I've created."
              description="A collection of projects, experiments, and ideas brought to life through design and development."
              number="02"
            />

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((proj, idx) => {
                const palettes = [
                  {
                    bg: "bg-[#F4E6DF]",
                    icon: "text-[#C46C58]",
                    number: "text-[#D3A493]",
                    border: "group-hover:border-[#E7B6A7]",
                  },
                  {
                    bg: "bg-[#EAE3F4]",
                    icon: "text-[#7C68A6]",
                    number: "text-[#B5A3D1]",
                    border: "group-hover:border-[#C8B8E0]",
                  },
                  {
                    bg: "bg-[#E2EEE7]",
                    icon: "text-[#4C7E6D]",
                    number: "text-[#9ABDAE]",
                    border: "group-hover:border-[#B4D1C4]",
                  },
                ];
                const palette = palettes[idx % palettes.length];

                return (
                  <article
                    key={`${proj.title}-${idx}`}
                    className={`group flex flex-col overflow-hidden rounded-[1.75rem] border border-[#EAE2DC] bg-white/85 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#49354A]/[0.07] ${palette.border}`}
                  >
                    <div
                      className={`relative flex h-44 items-center justify-center overflow-hidden ${palette.bg}`}
                    >
                      <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full border-[20px] border-white/25 transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full border-[18px] border-white/25 transition-transform duration-500 group-hover:scale-110" />

                      <span
                        className={`absolute left-5 top-5 text-xs font-black tracking-[0.2em] ${palette.number}`}
                      >
                        PROJECT / {String(idx + 1).padStart(2, "0")}
                      </span>

                      <div className="relative flex h-[76px] w-[76px] rotate-[-6deg] items-center justify-center rounded-[1.5rem] border border-white/80 bg-white/75 shadow-lg shadow-black/5 transition-all duration-500 group-hover:rotate-0 group-hover:scale-105">
                        <Code2 size={30} className={palette.icon} />
                      </div>

                      <div className="absolute bottom-4 right-4 flex items-center gap-2">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${proj.title} source code`}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/80 text-[#574C57] transition-all hover:bg-[#211D24] hover:text-white"
                          >
                            <GithubIcon className="h-4 w-4" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${proj.title} live demo`}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/80 text-[#574C57] transition-all hover:bg-[#E77760] hover:text-white"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <h3 className="text-lg font-extrabold leading-snug tracking-tight text-[#29222D]">
                          {proj.title}
                        </h3>
                        <ArrowUpRight
                          size={18}
                          className="mt-1 shrink-0 text-[#C4B7C0] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#E77760]"
                        />
                      </div>

                      <p className="flex-1 text-xs leading-6 text-[#786F75] sm:text-sm sm:leading-7">
                        {proj.description}
                      </p>

                      {proj.technologies &&
                        proj.technologies.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[#F0EAE5] pt-4">
                            {proj.technologies.map((technology, i) => (
                              <span
                                key={`${technology}-${i}`}
                                className="rounded-lg bg-[#F6F1ED] px-2.5 py-1.5 text-[10px] font-bold text-[#847681]"
                              >
                                {technology}
                              </span>
                            ))}
                          </div>
                        )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section id="experience" className="mb-24 scroll-mt-8 sm:mb-32">
            <SectionHeading
              eyebrow="The journey so far"
              title="Where I've made an impact."
              description="Every role is an opportunity to learn, collaborate, and create something better."
              number="03"
            />

            <div className="relative mt-10 space-y-5">
              <div className="absolute bottom-12 left-[19px] top-12 hidden w-px bg-gradient-to-b from-[#E77760]/60 via-[#C8B8E0]/60 to-transparent sm:block" />

              {experience.map((exp, idx) => (
                <article
                  key={`${exp.company}-${exp.position}-${idx}`}
                  className="group relative grid gap-5 rounded-[1.75rem] border border-[#EAE2DC] bg-white/80 p-5 transition-all duration-300 hover:border-[#E7B6A7] hover:shadow-lg hover:shadow-[#49354A]/5 sm:grid-cols-[44px_1fr] sm:gap-5 sm:p-7"
                >
                  <div className="relative z-10 hidden h-10 w-10 items-center justify-center rounded-2xl border border-[#F0D5CA] bg-[#F9E6DE] text-[#C46C58] transition-transform duration-300 group-hover:rotate-[-6deg] sm:flex">
                    <BriefcaseBusiness size={18} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-base font-extrabold tracking-tight text-[#29222D] sm:text-lg">
                          {exp.position}
                        </h3>
                        <p className="mt-1.5 text-sm font-bold text-[#E77760]">
                          {exp.company}
                          {exp.location ? (
                            <span className="font-medium text-[#A0959E]">
                              {" "}
                              · {exp.location}
                            </span>
                          ) : null}
                        </p>
                      </div>

                      <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-[#EAE2DC] bg-[#FAF8F5] px-3 py-1.5 text-[10px] font-bold text-[#847681]">
                        <CalendarDays size={12} />
                        {exp.startDate || "Start"} —{" "}
                        {exp.currentlyWorking
                          ? "Present"
                          : exp.endDate || "Present"}
                      </span>
                    </div>

                    {exp.description && (
                      <p className="mt-4 whitespace-pre-line text-xs leading-7 text-[#786F75] sm:text-sm">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Education and certifications */}
        {(education.length > 0 || certifications.length > 0) && (
          <section id="background" className="mb-24 scroll-mt-8 sm:mb-32">
            <SectionHeading
              eyebrow="Beyond the work"
              title="Learning never stops."
              description="The foundations I've built and the milestones that keep me moving forward."
              number="04"
            />

            <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {education.length > 0 && (
                <div className="rounded-[1.75rem] border border-[#EAE2DC] bg-white/80 p-6 sm:p-8">
                  <div className="mb-7 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAE3F4] text-[#7C68A6]">
                      <GraduationCap size={21} />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold">
                        Education
                      </h3>
                      <p className="mt-1 text-xs text-[#92858D]">
                        Where the journey began
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {education.map((edu, idx) => (
                      <div
                        key={`${edu.institution}-${edu.degree}-${idx}`}
                        className="relative border-l-2 border-[#EAE3F4] pb-1 pl-5 last:border-transparent"
                      >
                        <span className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-[#A48BC8]" />
                        <h4 className="text-sm font-extrabold leading-relaxed text-[#29222D]">
                          {edu.degree}
                        </h4>
                        <p className="mt-1 text-xs font-semibold text-[#7C68A6]">
                          {edu.institution}
                        </p>
                        {(edu.startDate || edu.endDate) && (
                          <p className="mt-2 text-[10px] font-medium text-[#A0959E]">
                            {edu.startDate || ""}
                            {edu.startDate && edu.endDate ? " — " : ""}
                            {edu.endDate || ""}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {certifications.length > 0 && (
                <div className="rounded-[1.75rem] border border-[#EAE2DC] bg-white/80 p-6 sm:p-8">
                  <div className="mb-7 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5EDD9] text-[#B18B42]">
                      <Award size={21} />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold">
                        Certifications
                      </h3>
                      <p className="mt-1 text-xs text-[#92858D]">
                        Knowledge in action
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {certifications.map((cert, idx) => (
                      <div
                        key={`${cert.name}-${idx}`}
                        className="group flex items-start gap-3 rounded-2xl border border-[#F0EAE5] bg-[#FCFAF7] p-4 transition-all duration-300 hover:border-[#E8D6A9] hover:bg-[#FBF7EC]"
                      >
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#F5EDD9] text-[#B18B42] transition-transform group-hover:rotate-6">
                          <Award size={15} />
                        </span>
                        <div className="min-w-0">
                          <h4 className="text-xs font-extrabold leading-relaxed text-[#29222D]">
                            {cert.name}
                          </h4>
                          {cert.issuer && (
                            <p className="mt-1 text-[11px] leading-relaxed text-[#92858D]">
                              {cert.issuer}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Contact banner */}
        <section
          id="contact"
          className="relative mb-16 overflow-hidden rounded-[2rem] bg-[#29222D] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14"
        >
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[40px] border-white/[0.04]" />
          <div className="pointer-events-none absolute -bottom-28 right-[30%] h-64 w-64 rounded-full bg-[#8E76B4]/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#E77760]/15 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#E9B8A9]">
                <Sparkles size={13} />
                Have a project in mind?
              </span>

              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                Let&apos;s make something{" "}
                <span className="text-[#E9B8A9]">remarkable.</span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-white/60">
                Great ideas start with a conversation. Reach out and let&apos;s
                explore what we can create together.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#F3C9B9] px-6 py-3.5 text-xs font-extrabold text-[#29222D] transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  <Mail size={15} />
                  Say hello
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              )}

              {hasSocialLinks && (
                <div className="flex items-center gap-2">
                  {socialLinks?.github && (
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white/80 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                  )}

                  {socialLinks?.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white/80 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                    </a>
                  )}

                  {socialLinks?.twitter && (
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white/80 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                    >
                      <TwitterIcon className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-4 border-t border-[#EAE2DC] pt-7 text-center sm:flex-row sm:text-left">
          <a href="#home" className="text-sm font-extrabold tracking-tight">
            {profile?.name || "Creative Maker"}
            <span className="text-[#E77760]">.</span>
          </a>

          <p className="text-[11px] font-medium text-[#A0959E]">
            Crafted with creativity, curiosity, and a little bit of magic.
          </p>

          <a
            href="#home"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#786F75] transition-colors hover:text-[#E77760]"
          >
            Back to top
            <ArrowUpRight size={13} />
          </a>
        </footer>
      </div>
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  number,
}: {
  eyebrow: string;
  title: string;
  description: string;
  number: string;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-7 bg-[#E77760]" />
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#B66E60] sm:text-[11px]">
            {eyebrow}
          </p>
        </div>

        <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] text-[#29222D] sm:text-4xl lg:text-5xl">
          {title}
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-7 text-[#92858D]">
          {description}
        </p>
      </div>

      <span className="hidden text-5xl font-black tracking-[-0.07em] text-[#E9E0DA] sm:block lg:text-6xl">
        {number}
      </span>
    </div>
  );
}