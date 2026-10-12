"use client";

import React from "react";
import {
  Mail,
  MapPin,
  Globe,
  ExternalLink,
  Sparkles,
  FolderGit2,
  BriefcaseBusiness,
  GraduationCap,
  Award,
  ArrowUpRight,
  CalendarDays,
  Code2,
  Send,
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

function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
  count,
}: {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  count?: number;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#B66B43]">
          {eyebrow}
        </p>
        <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#30231D] sm:text-2xl">
          <Icon className="h-5 w-5 shrink-0 text-[#C67B50]" />
          {title}
        </h2>
      </div>

      {typeof count === "number" && (
        <span className="rounded-full border border-[#E9DCCF] bg-white px-3 py-1 text-xs font-semibold text-[#806A5C]">
          {String(count).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
}) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${label} profile`}
      className="group flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F3C5A3]"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#F4D7C1] transition-colors group-hover:bg-white/15">
          <Icon className="h-[17px] w-[17px]" />
        </span>

        <span className="truncate text-sm font-medium text-white/90">
          {label}
        </span>
      </span>

      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
    </a>
  );
}

export default function BentoTemplate({ portfolio }: Props) {
  const {
    profile,
    skills = [],
    experience = [],
    education = [],
    projects = [],
    certifications = [],
    socialLinks = {},
  } = portfolio;

  const hasSocialLinks = Boolean(
    socialLinks?.github ||
    socialLinks?.linkedin ||
    socialLinks?.twitter ||
    profile?.website
  );

  const hasContact = Boolean(profile?.email || profile?.location);

  const hasAdditionalSections =
    education.length > 0 || certifications.length > 0;

  return (
    <div className="min-h-screen overflow-hidden bg-[#F8F4EE] font-sans text-[#30231D] selection:bg-[#C67B50]/20 selection:text-[#8F4E2F]">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#E8C8AD]/20 blur-3xl" />
        <div className="absolute -left-40 top-[40%] h-80 w-80 rounded-full bg-[#E7D8C8]/30 blur-3xl" />
      </div>

      <main className="relative mx-auto w-full max-w-7xl space-y-8 px-4 py-6 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <a
            href="#home"
            className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C67B50]"
            aria-label="Go to portfolio home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#30231D] text-white shadow-sm transition-transform group-hover:rotate-[-5deg]">
              <Code2 className="h-5 w-5" />
            </span>

            <span>
              <span className="block text-sm font-extrabold tracking-tight text-[#30231D]">
                {profile?.name || "My Portfolio"}
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#967C6B]">
                Personal Portfolio
              </span>
            </span>
          </a>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#E5D8C9] bg-white/80 px-3.5 py-2 text-[11px] font-semibold text-[#806A5C] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#77936C]" />
            Portfolio Showcase
          </div>
        </header>

        {/* Hero and Connect */}
        <section
          id="home"
          className="grid grid-cols-1 gap-5 lg:grid-cols-3"
          aria-label="Profile and contact information"
        >
          {/* Main profile card */}
          <div className="group relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[28px] border border-[#E8DDD1] bg-white p-6 shadow-[0_4px_24px_rgba(65,42,28,0.035)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(65,42,28,0.07)] sm:p-9 lg:col-span-2 lg:p-11">
            <div
              className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-[#E8D8C8]/70"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-4 -top-8 h-40 w-40 rounded-full bg-[#F9EDE2]/60 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#F0D9C7] bg-[#FCF3EB] px-3.5 py-2">
                <Sparkles className="h-3.5 w-3.5 text-[#B66B43]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9D5B39]">
                  Personal Introduction
                </span>
              </div>

              <p className="mb-3 text-sm font-medium text-[#947968]">
                Hello, I&apos;m
              </p>

              <h1 className="max-w-3xl break-words text-4xl font-extrabold leading-[1.08] tracking-[-0.045em] text-[#30231D] sm:text-5xl lg:text-6xl">
                {profile?.name || "Your Name"}
                <span className="text-[#C67B50]">.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-lg font-semibold leading-snug text-[#A9623C] sm:text-xl">
                {profile?.headline || "Your Professional Headline"}
              </p>

              {profile?.professionalSummary && (
                <p className="mt-5 max-w-2xl whitespace-pre-line text-sm leading-7 text-[#766458] sm:text-base sm:leading-8">
                  {profile.professionalSummary}
                </p>
              )}
            </div>

            {hasContact && (
              <div className="relative mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#F0E6DC] pt-5">
                {profile?.location && (
                  <span className="inline-flex min-w-0 items-center gap-2 text-xs font-medium text-[#806D60]">
                    <MapPin className="h-4 w-4 shrink-0 text-[#C67B50]" />
                    <span className="break-words">{profile.location}</span>
                  </span>
                )}

                {profile?.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex min-w-0 items-center gap-2 text-xs font-medium text-[#806D60] transition-colors hover:text-[#B66B43] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C67B50]"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-[#C67B50]" />
                    <span className="break-all">{profile.email}</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Connect card */}
          <aside className="relative flex flex-col overflow-hidden rounded-[28px] bg-[#30231D] p-6 text-white shadow-[0_12px_32px_rgba(48,35,29,0.12)] sm:p-8">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/[0.08]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#C67B50]/15 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-[#E8B48E]">
                <Send className="h-5 w-5" />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D9A783]">
                Get in touch
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                Let&apos;s Connect.
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/60">
                Have a project in mind or want to collaborate? Let&apos;s start
                a conversation.
              </p>
            </div>

            {hasSocialLinks && (
              <div className="relative mt-7 space-y-2.5">
                <SocialLink
                  href={socialLinks?.github || ""}
                  label="GitHub"
                  icon={GithubIcon}
                />

                <SocialLink
                  href={socialLinks?.linkedin || ""}
                  label="LinkedIn"
                  icon={LinkedinIcon}
                />

                <SocialLink
                  href={socialLinks?.twitter || ""}
                  label="Twitter"
                  icon={TwitterIcon}
                />

                <SocialLink
                  href={profile?.website || ""}
                  label="Personal Website"
                  icon={Globe}
                />
              </div>
            )}

            {!hasSocialLinks && (
              <div className="relative mt-7 rounded-2xl border border-dashed border-white/15 p-4 text-sm leading-6 text-white/55">
                Social profiles can be added to your portfolio to help visitors
                discover your work.
              </div>
            )}

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="relative mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#F4E4D5] px-4 py-3.5 text-sm font-bold text-[#30231D] transition-all duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4E4D5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#30231D]"
              >
                Send an Email
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </aside>
        </section>

        {/* Skills and experience */}
        {(skills.length > 0 || experience.length > 0) && (
          <section
            className={`grid grid-cols-1 gap-5 ${skills.length > 0 && experience.length > 0
                ? "lg:grid-cols-3"
                : ""
              }`}
            aria-label="Skills and professional experience"
          >
            {/* Skills */}
            {skills.length > 0 && (
              <div
                className={`rounded-[28px] border border-[#E8DDD1] bg-white p-6 shadow-[0_4px_24px_rgba(65,42,28,0.025)] sm:p-8 ${experience.length > 0 ? "" : ""
                  }`}
              >
                <SectionHeading
                  icon={Code2}
                  eyebrow="What I work with"
                  title="Core Skills"
                  count={skills.length}
                />

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-xl border border-[#EAE0D6] bg-[#FAF6F1] px-3 py-2 text-xs font-semibold text-[#655044] transition-all duration-200 hover:border-[#D8AD8D] hover:bg-[#F9EDE2] hover:text-[#9D5B39]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex items-center gap-2 border-t border-[#F0E7DE] pt-4 text-xs text-[#9A8677]">
                  <Sparkles className="h-3.5 w-3.5 text-[#C67B50]" />
                  Skills and technologies
                </div>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div
                className={`rounded-[28px] border border-[#E8DDD1] bg-white p-6 shadow-[0_4px_24px_rgba(65,42,28,0.025)] sm:p-8 ${skills.length > 0 ? "lg:col-span-2" : ""
                  }`}
              >
                <SectionHeading
                  icon={BriefcaseBusiness}
                  eyebrow="Professional journey"
                  title="Work Experience"
                  count={experience.length}
                />

                <div className="space-y-7">
                  {experience.map((exp, index) => (
                    <article
                      key={`${exp.company}-${exp.position}-${index}`}
                      className="relative pl-6"
                    >
                      {index !== experience.length - 1 && (
                        <span
                          className="absolute bottom-[-26px] left-[5px] top-3 w-px bg-[#EADBCB]"
                          aria-hidden="true"
                        />
                      )}

                      <span
                        className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-[#C67B50] bg-white ring-4 ring-[#F9EDE2]"
                        aria-hidden="true"
                      />

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold leading-6 text-[#30231D] sm:text-base">
                            {exp.position}
                          </h3>

                          <p className="mt-1 text-sm font-semibold text-[#B66B43]">
                            {exp.company}
                          </p>
                        </div>

                        <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-lg bg-[#F9F3EC] px-2.5 py-1.5 text-[10px] font-semibold text-[#8D7768]">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {exp.startDate || "Start date"} —{" "}
                          {exp.currentlyWorking
                            ? "Present"
                            : exp.endDate || "Present"}
                        </span>
                      </div>

                      {exp.location && (
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-[#9A8677]">
                          <MapPin className="h-3.5 w-3.5" />
                          {exp.location}
                        </p>
                      )}

                      {exp.description && (
                        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#79695D]">
                          {exp.description}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section id="projects" aria-label="Portfolio projects">
            <SectionHeading
              icon={FolderGit2}
              eyebrow="Things I've built"
              title="Selected Projects"
              count={projects.length}
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => (
                <article
                  key={`${project.title}-${index}`}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-[26px] border border-[#E8DDD1] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#D8B49A] hover:shadow-[0_16px_36px_rgba(65,42,28,0.07)]"
                >
                  {/* Project card accent */}
                  <div className="h-1 w-full bg-gradient-to-r from-[#B66B43] via-[#D9A783] to-[#F0DDCB]" />

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="mb-6 flex items-center justify-between gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F9EDE2] text-[#B66B43] transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-105">
                        <FolderGit2 className="h-5 w-5" />
                      </span>

                      <span className="font-mono text-xs font-semibold tracking-widest text-[#C2B0A0]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col">
                      <h3 className="break-words text-lg font-bold leading-snug tracking-tight text-[#30231D] transition-colors group-hover:text-[#A65F3B]">
                        {project.title}
                      </h3>

                      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#79695D]">
                        {project.description || "A project built with care."}
                      </p>

                      {project.technologies &&
                        project.technologies.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {project.technologies.map((technology, i) => (
                              <span
                                key={`${technology}-${i}`}
                                className="rounded-lg border border-[#F0E4D8] bg-[#FCF8F3] px-2.5 py-1.5 text-[10px] font-semibold text-[#8A6A56]"
                              >
                                {technology}
                              </span>
                            ))}
                          </div>
                        )}
                    </div>

                    <div className="mt-7 flex items-center gap-3 border-t border-[#F0E7DE] pt-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} source code on GitHub`}
                          className="inline-flex items-center gap-2 rounded-xl border border-[#EAE0D6] px-3 py-2.5 text-xs font-semibold text-[#655044] transition-colors hover:border-[#C67B50] hover:bg-[#FCF3EB] hover:text-[#9D5B39] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C67B50]"
                        >
                          <GithubIcon className="h-4 w-4" />
                          Source Code
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View live ${project.title} project`}
                          className="inline-flex items-center gap-2 rounded-xl bg-[#30231D] px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#594034] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C67B50]"
                        >
                          Live Demo
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}

                      {!project.githubUrl && !project.liveUrl && (
                        <span className="text-xs text-[#A18D7D]">
                          Project showcase
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Education and certifications */}
        {hasAdditionalSections && (
          <section
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
            aria-label="Education and certifications"
          >
            {/* Education */}
            {education.length > 0 && (
              <div className="rounded-[28px] border border-[#E8DDD1] bg-white p-6 shadow-[0_4px_24px_rgba(65,42,28,0.025)] sm:p-8">
                <SectionHeading
                  icon={GraduationCap}
                  eyebrow="Academic background"
                  title="Education"
                  count={education.length}
                />

                <div className="space-y-3">
                  {education.map((item, index) => (
                    <article
                      key={`${item.institution}-${item.degree}-${index}`}
                      className="rounded-2xl border border-[#F0E7DE] bg-[#FCFAF7] p-4 transition-colors hover:border-[#E1C7B0]"
                    >
                      <h3 className="text-sm font-bold leading-6 text-[#30231D]">
                        {item.degree}
                      </h3>

                      <p className="mt-1.5 text-sm font-medium text-[#B66B43]">
                        {item.institution}
                      </p>

                      {(item.startDate || item.endDate) && (
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-[#9A8677]">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {item.startDate || "Start date"} —{" "}
                          {item.endDate || "Present"}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="rounded-[28px] border border-[#E8DDD1] bg-white p-6 shadow-[0_4px_24px_rgba(65,42,28,0.025)] sm:p-8">
                <SectionHeading
                  icon={Award}
                  eyebrow="Professional development"
                  title="Certifications"
                  count={certifications.length}
                />

                <div className="space-y-3">
                  {certifications.map((certification, index) => (
                    <article
                      key={`${certification.name}-${index}`}
                      className="flex items-start gap-3.5 rounded-2xl border border-[#F0E7DE] bg-[#FCFAF7] p-4 transition-colors hover:border-[#E1C7B0]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F9EDE2] text-[#B66B43]">
                        <Award className="h-5 w-5" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="break-words text-sm font-bold leading-6 text-[#30231D]">
                          {certification.name}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-[#8B7566]">
                          {certification.issuer}
                        </p>

                        {certification.issueDate && (
                          <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-[#B66B43]">
                            Issued {certification.issueDate}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-[#E6D9CC] pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <a
              href="#home"
              className="text-sm font-bold tracking-tight text-[#655044] transition-colors hover:text-[#B66B43]"
            >
              {profile?.name || "My Portfolio"}
              <span className="text-[#C67B50]">.</span>
            </a>

            <p className="text-xs text-[#9A8677]">
              Crafted with care
              <span className="mx-2 text-[#D3BBA7]">•</span>
              {new Date().getFullYear()}
            </p>

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#806A5C] transition-colors hover:text-[#B66B43]"
              >
                <Mail className="h-3.5 w-3.5" />
                Get in touch
              </a>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
}
