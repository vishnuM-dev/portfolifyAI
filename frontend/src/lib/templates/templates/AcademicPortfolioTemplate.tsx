
"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  GraduationCap,
  BriefcaseBusiness,
  FlaskConical,
  Award,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Sparkles,
  Quote,
  LibraryBig,
  MoveUpRight,
} from "lucide-react";

import { IPortfolio } from "@/types/portfolio";
import {
  LinkedinIcon,
  GithubIcon,
} from "@/components/ui/SocialIcons";

interface Props {
  portfolio: IPortfolio;
  isPreview?: boolean;
}

const AcademicPortfolioTemplate = ({ portfolio }: Props) => {
  const {
    profile,
    skills = [],
    experience = [],
    education = [],
    projects = [],
    certifications = [],
    socialLinks = {},
  } = portfolio;

  const name = profile?.name || "Your Name";
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
      return ["http:", "https:"].includes(parsed.protocol)
        ? parsed.href
        : undefined;
    } catch {
      return undefined;
    }
  };

  const sectionLabel =
    "text-[10px] font-semibold uppercase tracking-[0.24em] text-[#A47C45]";

  const sectionTitle =
    "mt-3 font-serif text-3xl font-medium tracking-tight text-[#203448] sm:text-4xl";

  const mutedText = "text-[#727B80]";

  const cardClass =
    "border border-[#E8E1D5] bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-[#C7AD82] hover:shadow-[0_18px_45px_rgba(48,54,48,0.07)]";

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F5F0] text-[#263A49] selection:bg-[#D9C29B]/50">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#E8DDC8]/30 blur-[100px]" />
        <div className="absolute -left-40 top-[800px] h-[450px] w-[450px] rounded-full bg-[#DDE6E0]/40 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-14">
        {/* Navigation */}
        <nav className="flex items-center justify-between border-b border-[#E5DED2] py-5 sm:py-6">
          <a
            href="#home"
            aria-label="Go to homepage"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4C09D] bg-[#EEE5D5]">
              <BookOpen className="h-5 w-5 text-[#987345]" />
            </div>

            <div>
              <p className="font-serif text-base font-semibold tracking-tight text-[#203448]">
                {name}
              </p>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.22em] text-[#918A7E]">
                Academic Portfolio
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-7 text-xs font-medium text-[#68747B] lg:flex">
            <a href="#about" className="transition hover:text-[#A47C45]">
              About
            </a>
            <a href="#education" className="transition hover:text-[#A47C45]">
              Education
            </a>
            <a href="#research" className="transition hover:text-[#A47C45]">
              Research
            </a>
            <a href="#experience" className="transition hover:text-[#A47C45]">
              Experience
            </a>
          </div>

          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#203448] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#345267] sm:px-5"
            >
              Contact <ArrowUpRight size={15} />
            </a>
          )}
        </nav>

        {/* Hero */}
        <header
          id="home"
          className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:py-28"
        >
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E3D7C2] bg-white/70 px-4 py-2.5">
              <Sparkles size={14} className="text-[#A47C45]" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B7049]">
                Research · Scholarship · Discovery
              </span>
            </div>

            <div>
              <p className="mb-4 font-serif text-lg italic text-[#A18B6C]">
                Welcome to my academic world.
              </p>

              <h1 className="max-w-3xl break-words font-serif text-5xl font-medium leading-[1.08] tracking-tight text-[#203448] sm:text-6xl lg:text-7xl">
                {name}
                <span className="text-[#B18B58]">.</span>
              </h1>

              <div className="mt-7 h-px w-20 bg-[#B18B58]" />

              <h2 className="mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-[#65727A] sm:text-2xl">
                {profile?.headline ||
                  "Researcher, Academic & Lifelong Learner"}
              </h2>

              {profile?.professionalSummary && (
                <p
                  id="about"
                  className={`mt-6 max-w-2xl text-sm leading-8 sm:text-base ${mutedText}`}
                >
                  {profile.professionalSummary}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#203448] px-6 py-3.5 text-xs font-semibold text-white transition hover:bg-[#345267]"
                >
                  <Mail size={15} />
                  Get in Touch
                  <ArrowUpRight size={14} />
                </a>
              )}

              {profile?.website && safeUrl(profile.website) && (
                <a
                  href={safeUrl(profile.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#DCD3C4] bg-white/60 px-6 py-3.5 text-xs font-semibold text-[#354B5A] transition hover:border-[#B18B58] hover:bg-white"
                >
                  <Globe size={15} />
                  Academic Website
                  <ExternalLink size={13} />
                </a>
              )}
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-4 border-t border-[#E4DDD1] pt-6 text-xs text-[#727B80]">
              {profile?.location && (
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} className="text-[#A47C45]" />
                  {profile.location}
                </span>
              )}

              {profile?.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="inline-flex items-center gap-2 hover:text-[#A47C45]"
                >
                  <Phone size={15} className="text-[#A47C45]" />
                  {profile.phone}
                </a>
              )}

              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 break-all hover:text-[#A47C45]"
                >
                  <Mail size={15} className="text-[#A47C45]" />
                  {profile.email}
                </a>
              )}
            </div>
          </div>

          {/* Elegant profile illustration */}
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute inset-5 rounded-[48%] bg-[#E8DECB] blur-3xl" />

            <div className="relative overflow-hidden rounded-t-[48%] rounded-b-[44%] border border-[#D8C7A8] bg-[#EAE2D3] p-3">
              <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-t-[48%] rounded-b-[44%] border border-[#D7C5A4] bg-gradient-to-b from-[#F7F1E5] via-[#EDE3D1] to-[#D7C8B0]">
                <div className="absolute inset-5 rounded-t-[48%] rounded-b-[44%] border border-[#CBB48B]/70" />
                <div className="absolute inset-10 rounded-t-[48%] rounded-b-[44%] border border-[#CBB48B]/50" />

                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-[#D0BB96] bg-[#F8F3E8] shadow-[0_15px_50px_rgba(93,75,46,0.08)] sm:h-48 sm:w-48">
                  <span className="font-serif text-6xl font-medium tracking-tight text-[#9C7849] sm:text-7xl">
                    {initials || "AP"}
                  </span>
                  <span className="absolute bottom-3 right-2 flex h-10 w-10 items-center justify-center rounded-full border border-[#D9C7A7] bg-white text-[#A47C45]">
                    <GraduationCap size={19} />
                  </span>
                </div>

                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <p className="font-serif text-lg text-[#344957]">
                    Knowledge & Discovery
                  </p>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.28em] text-[#8E7A5B]">
                    Academic Excellence
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -left-5 top-16 hidden items-center gap-3 border border-[#E5D9C4] bg-[#FFFDF8] p-4 shadow-lg shadow-[#6B5A40]/5 sm:flex">
              <div className="flex h-10 w-10 items-center justify-center bg-[#F0E8D9]">
                <LibraryBig size={19} className="text-[#A47C45]" />
              </div>
              <div>
                <p className="font-serif text-lg text-[#203448]">
                  {education.length.toString().padStart(2, "0")}
                </p>
                <p className="text-[9px] uppercase tracking-wider text-[#8A8A80]">
                  Qualifications
                </p>
              </div>
            </div>

            <div className="absolute -right-3 bottom-24 hidden items-center gap-3 border border-[#E5D9C4] bg-[#FFFDF8] p-4 shadow-lg shadow-[#6B5A40]/5 sm:flex">
              <div className="flex h-10 w-10 items-center justify-center bg-[#F0E8D9]">
                <FlaskConical size={19} className="text-[#A47C45]" />
              </div>
              <div>
                <p className="font-serif text-lg text-[#203448]">
                  {projects.length.toString().padStart(2, "0")}
                </p>
                <p className="text-[9px] uppercase tracking-wider text-[#8A8A80]">
                  Selected Projects
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Highlights */}
        <section className="grid grid-cols-2 border-y border-[#E3DBCE] sm:grid-cols-4">
          {[
            {
              number: education.length,
              label: "Education",
              icon: GraduationCap,
            },
            {
              number: projects.length,
              label: "Research & Projects",
              icon: FlaskConical,
            },
            {
              number: experience.length,
              label: "Experience",
              icon: BriefcaseBusiness,
            },
            {
              number: certifications.length,
              label: "Recognition",
              icon: Award,
            },
          ].map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`flex items-center gap-3 px-4 py-6 sm:justify-center sm:px-5 ${idx % 2 === 0 ? "border-r border-[#E3DBCE]" : ""
                  } ${idx < 2 ? "border-b border-[#E3DBCE] sm:border-b-0" : ""
                  } ${idx === 1
                    ? "sm:border-r"
                    : idx === 2
                      ? "sm:border-r"
                      : ""
                  }`}
              >
                <Icon
                  size={21}
                  strokeWidth={1.5}
                  className="hidden shrink-0 text-[#A47C45] sm:block"
                />
                <div>
                  <p className="font-serif text-2xl text-[#203448] sm:text-3xl">
                    {String(item.number).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-wider text-[#81847F] sm:text-[10px]">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* Main content */}
        <div className="grid gap-14 py-20 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 lg:py-24">
          <div className="min-w-0 space-y-20">
            {/* Education */}
            {education.length > 0 && (
              <section id="education" className="scroll-mt-8">
                <div className="mb-9">
                  <p className={sectionLabel}>01 / Academic Background</p>
                  <h2 className={sectionTitle}>Education & Learning</h2>
                  <p className={`mt-4 max-w-xl text-sm leading-7 ${mutedText}`}>
                    The academic foundations and learning experiences that
                    continue to shape my journey.
                  </p>
                </div>

                <div className="relative ml-2 space-y-5 border-l border-[#D9C7A8] pl-7">
                  {education.map((edu, idx) => (
                    <article
                      key={idx}
                      className={`${cardClass} relative p-6 sm:p-7`}
                    >
                      <span className="absolute -left-[33px] top-7 h-3 w-3 rounded-full border-[3px] border-[#F7F5F0] bg-[#B18B58] ring-1 ring-[#D9C7A8]" />

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-serif text-xl font-semibold leading-snug text-[#203448]">
                            {edu.degree}
                          </h3>
                          <p className="mt-2 text-sm font-medium text-[#8D7047]">
                            {edu.institution}
                          </p>
                        </div>

                        {(edu.startDate || edu.endDate) && (
                          <span className="flex w-fit shrink-0 items-center gap-2 border border-[#E9E0D1] bg-[#F8F5EF] px-3 py-2 text-[10px] text-[#807969]">
                            <CalendarDays size={13} />
                            {edu.startDate || "—"} – {edu.endDate || "Present"}
                          </span>
                        )}
                      </div>

                      {edu.description && (
                        <p className={`mt-4 text-sm leading-7 ${mutedText}`}>
                          {edu.description}
                        </p>
                      )}

                      {edu.grade && (
                        <p className="mt-4 inline-block border border-[#E8DDCA] bg-[#F7F2E9] px-3 py-1.5 text-xs text-[#8D7047]">
                          Grade / Score: {edu.grade}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section id="skills" className="scroll-mt-8">
                <p className={sectionLabel}>02 / Areas of Expertise</p>
                <h2 className={sectionTitle}>Research Interests</h2>
                <p className={`mt-4 max-w-xl text-sm leading-7 ${mutedText}`}>
                  Subjects, disciplines, and skills that inform my academic
                  and professional interests.
                </p>

                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {skills.map((skill, idx) => (
                    <div
                      key={`${skill}-${idx}`}
                      className={`${cardClass} flex items-center gap-4 p-4`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#F1E9DB] font-serif text-sm text-[#9D7947]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="break-words text-sm font-medium text-[#354A58]">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Research and projects */}
            {projects.length > 0 && (
              <section id="research" className="scroll-mt-8">
                <div className="mb-9">
                  <p className={sectionLabel}>03 / Selected Work</p>
                  <h2 className={sectionTitle}>Research & Projects</h2>
                  <p className={`mt-4 max-w-xl text-sm leading-7 ${mutedText}`}>
                    Selected work, investigations, and projects demonstrating
                    curiosity, problem-solving, and practical application.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {projects.map((proj, idx) => (
                    <article
                      key={idx}
                      className={`${cardClass} group flex min-w-0 flex-col p-6 sm:p-7`}
                    >
                      <div className="mb-6 flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center bg-[#F1E9DB] transition-colors group-hover:bg-[#E8DDC8]">
                          <FlaskConical
                            size={22}
                            strokeWidth={1.5}
                            className="text-[#987345]"
                          />
                        </div>
                        <span className="font-serif text-2xl italic text-[#D3C2A5]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="break-words font-serif text-xl font-semibold leading-snug text-[#203448] transition-colors group-hover:text-[#9A7646]">
                        {proj.title}
                      </h3>

                      {proj.description && (
                        <p className={`mt-3 flex-1 text-sm leading-7 ${mutedText}`}>
                          {proj.description}
                        </p>
                      )}

                      {proj.technologies && proj.technologies.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {proj.technologies.map((tech, techIdx) => (
                            <span
                              key={`${tech}-${techIdx}`}
                              className="border border-[#E8E0D3] bg-[#F8F5EF] px-2.5 py-1.5 text-[10px] font-medium text-[#7C715E]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {(safeUrl(proj.liveUrl) || safeUrl(proj.githubUrl)) && (
                        <div className="mt-6 flex flex-wrap gap-4 border-t border-[#EEE8DF] pt-5">
                          {safeUrl(proj.liveUrl) && (
                            <a
                              href={safeUrl(proj.liveUrl)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-xs font-semibold text-[#927044] hover:text-[#203448]"
                            >
                              View Project
                              <MoveUpRight size={14} />
                            </a>
                          )}

                          {safeUrl(proj.githubUrl) && (
                            <a
                              href={safeUrl(proj.githubUrl)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-xs font-semibold text-[#6C777B] hover:text-[#203448]"
                            >
                              <GithubIcon className="h-3.5 w-3.5" />
                              Repository
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
              <section id="experience" className="scroll-mt-8">
                <div className="mb-9">
                  <p className={sectionLabel}>04 / Professional Journey</p>
                  <h2 className={sectionTitle}>Experience</h2>
                  <p className={`mt-4 max-w-xl text-sm leading-7 ${mutedText}`}>
                    Professional roles, contributions, and experiences along
                    the way.
                  </p>
                </div>

                <div className="relative space-y-6 border-l border-[#D9C7A8] pl-7">
                  {experience.map((exp, idx) => (
                    <article
                      key={idx}
                      className={`${cardClass} relative p-6 sm:p-7`}
                    >
                      <span className="absolute -left-[33px] top-7 h-3 w-3 rounded-full border-[3px] border-[#F7F5F0] bg-[#B18B58] ring-1 ring-[#D9C7A8]" />

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-serif text-xl font-semibold text-[#203448]">
                            {exp.position}
                          </h3>
                          <p className="mt-2 text-sm font-medium text-[#8D7047]">
                            {exp.company}
                          </p>
                        </div>

                        <span className="flex w-fit shrink-0 items-center gap-2 border border-[#E9E0D1] bg-[#F8F5EF] px-3 py-2 text-[10px] text-[#807969]">
                          <CalendarDays size={13} />
                          {exp.startDate || "—"} –{" "}
                          {exp.currentlyWorking ? "Present" : exp.endDate || "—"}
                        </span>
                      </div>

                      {exp.description && (
                        <p className={`mt-4 text-sm leading-7 ${mutedText}`}>
                          {exp.description}
                        </p>
                      )}

                      {exp.responsibilities &&
                        exp.responsibilities.length > 0 && (
                          <ul className="mt-5 space-y-3">
                            {exp.responsibilities.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-sm leading-6 text-[#69757A]"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B18B58]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="border border-[#E4DAC9] bg-[#EEE7D9] p-6 sm:p-7 lg:sticky lg:top-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4C09D] bg-[#F8F5EF]">
                <Quote size={20} className="text-[#A47C45]" />
              </div>

              <p className={`${sectionLabel} mt-6`}>A Personal Note</p>

              <h2 className="mt-3 font-serif text-2xl leading-snug text-[#203448]">
                Knowledge is a journey, not a destination.
              </h2>

              <div className="my-6 h-px w-12 bg-[#B18B58]" />

              <p className="text-sm leading-7 text-[#70756F]">
                Driven by curiosity, guided by research, and inspired by the
                opportunity to contribute meaningful knowledge.
              </p>

              {profile?.location && (
                <div className="mt-6 flex items-start gap-3 border-t border-[#DCCFB9] pt-5">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#A47C45]" />
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#8A8171]">
                      Based in
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#354A58]">
                      {profile.location}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="border border-[#E8E1D5] bg-white/80 p-6 sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center bg-[#F1E9DB]">
                  <Award size={20} className="text-[#987345]" />
                </div>

                <p className={`${sectionLabel} mt-5`}>Recognition</p>
                <h2 className="mt-2 font-serif text-2xl text-[#203448]">
                  Certifications
                </h2>

                <div className="mt-6 space-y-5">
                  {certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="border-l-2 border-[#D6C09B] pl-4"
                    >
                      <h3 className="text-sm font-semibold leading-6 text-[#354A58]">
                        {cert.name}
                      </h3>
                      {cert.issuer && (
                        <p className="mt-1 text-xs leading-5 text-[#8A8171]">
                          {cert.issuer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social links */}
            {(safeUrl(socialLinks?.linkedin) ||
              safeUrl(socialLinks?.github) ||
              safeUrl(socialLinks?.twitter)) && (
                <div className="border border-[#E8E1D5] bg-white/80 p-6">
                  <p className={sectionLabel}>Stay Connected</p>
                  <h2 className="mt-2 font-serif text-2xl text-[#203448]">
                    Find Me Online
                  </h2>

                  <div className="mt-4 space-y-1">
                    {safeUrl(socialLinks?.linkedin) && (
                      <a
                        href={safeUrl(socialLinks.linkedin)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between border-b border-[#EEE8DF] py-3 text-sm text-[#5F6E76] transition hover:text-[#A47C45]"
                      >
                        <span className="flex items-center gap-3">
                          <LinkedinIcon className="h-4 w-4" />
                          LinkedIn
                        </span>
                        <ArrowUpRight size={15} />
                      </a>
                    )}

                    {safeUrl(socialLinks?.github) && (
                      <a
                        href={safeUrl(socialLinks.github)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between border-b border-[#EEE8DF] py-3 text-sm text-[#5F6E76] transition hover:text-[#A47C45]"
                      >
                        <span className="flex items-center gap-3">
                          <GithubIcon className="h-4 w-4" />
                          GitHub
                        </span>
                        <ArrowUpRight size={15} />
                      </a>
                    )}

                    {safeUrl(socialLinks?.twitter) && (
                      <a
                        href={safeUrl(socialLinks.twitter)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between py-3 text-sm text-[#5F6E76] transition hover:text-[#A47C45]"
                      >
                        <span className="flex items-center gap-3">
                          <Globe size={16} />
                          Twitter / X
                        </span>
                        <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>
                </div>
              )}

            {/* Contact card */}
            {profile?.email && (
              <div className="bg-[#203448] p-6 sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D9C29B]">
                  Open to Connections
                </p>
                <h2 className="mt-4 font-serif text-2xl leading-snug text-white">
                  Let&apos;s exchange ideas.
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#C3CDD3]">
                  Interested in collaboration, research, or an academic
                  discussion?
                </p>

                <a
                  href={`mailto:${profile.email}`}
                  className="mt-6 inline-flex items-center gap-2 border border-white/25 px-4 py-3 text-xs font-semibold text-white transition hover:bg-white/10"
                >
                  Send an Email
                  <ArrowUpRight size={15} />
                </a>
              </div>
            )}
          </aside>
        </div>

        {/* Footer */}
        <footer className="border-t border-[#E3DBCE] py-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-serif text-lg font-semibold text-[#203448]">
                {name}
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#8D8A80]">
                Academic Portfolio · Curriculum Vitae
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="text-[#7D817D] transition hover:text-[#A47C45]"
                >
                  <Mail size={18} />
                </a>
              )}
              {safeUrl(socialLinks?.linkedin) && (
                <a
                  href={safeUrl(socialLinks.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-[#7D817D] transition hover:text-[#A47C45]"
                >
                  <LinkedinIcon className="h-[18px] w-[18px]" />
                </a>
              )}
              {safeUrl(socialLinks?.github) && (
                <a
                  href={safeUrl(socialLinks.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-[#7D817D] transition hover:text-[#A47C45]"
                >
                  <GithubIcon className="h-[18px] w-[18px]" />
                </a>
              )}
            </div>

            <p className="text-xs text-[#8D908A]">
              Crafted with care ·{" "}
              <span className="font-medium text-[#8D7047]">Portfolify AI</span>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default AcademicPortfolioTemplate;
