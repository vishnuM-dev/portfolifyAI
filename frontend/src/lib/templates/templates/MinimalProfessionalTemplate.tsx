"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  CalendarDays,
  BriefcaseBusiness,
  GraduationCap,
  Award,
  ArrowUpRight,
  Code2,
  Sparkles,
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

const sectionLabel =
  "text-[10px] font-bold uppercase tracking-[0.22em] text-[#B66B43]";

const cardStyle =
  "rounded-2xl border border-[#E8DDD1] bg-white p-5 sm:p-7";

function SectionTitle({
  eyebrow,
  title,
  count,
}: {
  eyebrow: string;
  title: string;
  count?: number;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className={sectionLabel}>{eyebrow}</p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-[#30231D] sm:text-2xl">
          {title}
        </h2>
      </div>

      {count !== undefined && (
        <span className="rounded-full border border-[#E8DDD1] bg-white px-3 py-1 text-xs font-semibold text-[#806A5C]">
          {String(count).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}

function ContactLink({
  href,
  label,
  icon: Icon,
  external = false,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  external?: boolean;
}) {
  if (!href) return null;

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex min-w-0 items-center gap-2 text-xs font-medium text-[#766458] transition-colors hover:text-[#B66B43] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C67B50]"
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-[#B66B43]" />
      <span className="break-all">{label}</span>
    </a>
  );
}

export default function MinimalProfessionalTemplate({
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

  const hasSocialLinks = Boolean(
    socialLinks?.github ||
    socialLinks?.linkedin ||
    socialLinks?.twitter
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#F8F4EE] font-sans text-[#30231D] selection:bg-[#E8CBB4] selection:text-[#30231D]">
      <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-10 sm:py-14 lg:px-12 lg:py-16">

        {/* Minimal masthead */}
        <nav className="mb-12 flex items-center justify-between border-b border-[#E5D8CB] pb-5">
          <a
            href="#profile"
            className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C67B50]"
            aria-label="Back to portfolio profile"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#30231D] text-white">
              <Code2 className="h-4 w-4" />
            </span>

            <span className="text-sm font-bold tracking-tight">
              {profile?.name || "Portfolio"}
              <span className="text-[#B66B43]">.</span>
            </span>
          </a>

          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-[#927C6D] sm:block">
            Professional Profile
          </span>

          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#E5D8CB] bg-white px-3.5 py-2 text-xs font-semibold text-[#655044] transition-colors hover:border-[#C67B50] hover:text-[#A65F3B]"
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Contact</span>
            </a>
          )}
        </nav>

        {/* Profile introduction */}
        <header
          id="profile"
          className="border-b border-[#E5D8CB] pb-10 sm:pb-12"
        >
          <div className="mb-6 flex items-center gap-2">
            <span className="h-px w-7 bg-[#C67B50]" />
            <p className={sectionLabel}>Introduction</p>
          </div>

          <h1 className="max-w-4xl break-words text-4xl font-semibold leading-[1.12] tracking-[-0.045em] text-[#30231D] sm:text-6xl lg:text-7xl">
            {profile?.name || "Your Name"}
            <span className="text-[#C67B50]">.</span>
          </h1>

          <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-[#B66B43] sm:text-xl">
            {profile?.headline || "Your Professional Title"}
          </p>

          {profile?.professionalSummary && (
            <p className="mt-6 max-w-3xl whitespace-pre-line text-sm leading-7 text-[#766458] sm:text-base sm:leading-8">
              {profile.professionalSummary}
            </p>
          )}

          {/* Contact details */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 border-t border-[#EDE3D9] pt-6">
            {profile?.email && (
              <ContactLink
                href={`mailto:${profile.email}`}
                label={profile.email}
                icon={Mail}
              />
            )}

            {profile?.phone && (
              <ContactLink
                href={`tel:${profile.phone}`}
                label={profile.phone}
                icon={Phone}
              />
            )}

            {profile?.location && (
              <ContactLink
                href=""
                label={profile.location}
                icon={MapPin}
              />
            )}

            {profile?.website && (
              <ContactLink
                href={profile.website}
                label="Personal Website"
                icon={Globe}
                external
              />
            )}

            {socialLinks?.github && (
              <ContactLink
                href={socialLinks.github}
                label="GitHub"
                icon={GithubIcon}
                external
              />
            )}

            {socialLinks?.linkedin && (
              <ContactLink
                href={socialLinks.linkedin}
                label="LinkedIn"
                icon={LinkedinIcon}
                external
              />
            )}

            {socialLinks?.twitter && (
              <ContactLink
                href={socialLinks.twitter}
                label="Twitter"
                icon={TwitterIcon}
                external
              />
            )}
          </div>
        </header>

        {/* Skills */}
        {skills.length > 0 && (
          <section className="border-b border-[#E5D8CB] py-10 sm:py-12">
            <SectionTitle
              eyebrow="Capabilities"
              title="Areas of Expertise"
              count={skills.length}
            />

            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-xl border border-[#E8DDD1] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#655044] transition-colors hover:border-[#D8B49A] hover:bg-[#FCF3EB] hover:text-[#A65F3B] sm:text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="border-b border-[#E5D8CB] py-10 sm:py-12">
            <SectionTitle
              eyebrow="Career"
              title="Professional Experience"
              count={experience.length}
            />

            <div className="space-y-9">
              {experience.map((exp, index) => (
                <article
                  key={`${exp.company}-${exp.position}-${index}`}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8"
                >
                  <div className="min-w-0">
                    <h3 className="text-base font-bold leading-6 text-[#30231D] sm:text-lg">
                      {exp.position}
                    </h3>

                    <p className="mt-1.5 text-sm font-semibold text-[#B66B43]">
                      {exp.company}
                    </p>

                    {exp.location && (
                      <p className="mt-1 text-xs text-[#927C6D]">
                        {exp.location}
                      </p>
                    )}

                    {exp.description && (
                      <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#766458]">
                        {exp.description}
                      </p>
                    )}

                    {exp.achievements &&
                      exp.achievements.length > 0 && (
                        <ul className="mt-4 space-y-2.5">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-sm leading-6 text-[#766458]"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C67B50]" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>

                  <div className="sm:text-right">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#927C6D]">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {exp.startDate || "Start date"} —{" "}
                      {exp.currentlyWorking
                        ? "Present"
                        : exp.endDate || "Present"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Selected projects */}
        {projects.length > 0 && (
          <section className="border-b border-[#E5D8CB] py-10 sm:py-12">
            <SectionTitle
              eyebrow="Selected work"
              title="Projects"
              count={projects.length}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {projects.map((project, index) => (
                <article
                  key={`${project.title}-${index}`}
                  className="group flex min-w-0 flex-col rounded-2xl border border-[#E8DDD1] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D8B49A] hover:shadow-[0_10px_28px_rgba(65,42,28,0.05)] sm:p-6"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F9EDE2] text-[#B66B43] transition-transform group-hover:rotate-[-4deg]">
                      <Code2 className="h-5 w-5" />
                    </span>

                    <span className="font-mono text-xs tracking-widest text-[#C2B0A0]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="break-words text-base font-bold leading-6 text-[#30231D] transition-colors group-hover:text-[#A65F3B]">
                    {project.title}
                  </h3>

                  <p className="mt-3 flex-1 whitespace-pre-line text-sm leading-7 text-[#766458]">
                    {project.description || "Project details"}
                  </p>

                  {project.technologies &&
                    project.technologies.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.map((technology, i) => (
                          <span
                            key={`${technology}-${i}`}
                            className="rounded-lg bg-[#F8F4EE] px-2.5 py-1.5 text-[10px] font-medium text-[#806A5C]"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}

                  {(project.githubUrl || project.liveUrl) && (
                    <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[#F0E7DE] pt-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} source code`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#655044] transition-colors hover:text-[#B66B43] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C67B50]"
                        >
                          <GithubIcon className="h-4 w-4" />
                          Source Code
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} live demo`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B66B43] transition-colors hover:text-[#804329] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C67B50]"
                        >
                          Live Demo
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Education and certifications */}
        {(education.length > 0 || certifications.length > 0) && (
          <section className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 sm:gap-10 sm:py-12">
            {education.length > 0 && (
              <div>
                <SectionTitle
                  eyebrow="Academic background"
                  title="Education"
                  count={education.length}
                />

                <div className="space-y-5">
                  {education.map((item, index) => (
                    <article
                      key={`${item.institution}-${item.degree}-${index}`}
                      className="border-l-2 border-[#E5C8B0] pl-4"
                    >
                      <h3 className="text-sm font-bold leading-6 text-[#30231D]">
                        {item.degree}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-[#B66B43]">
                        {item.institution}
                      </p>

                      {(item.startDate || item.endDate) && (
                        <p className="mt-2 text-xs text-[#927C6D]">
                          {item.startDate || "Start date"} —{" "}
                          {item.endDate || "Present"}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <SectionTitle
                  eyebrow="Professional development"
                  title="Certifications"
                  count={certifications.length}
                />

                <div className="space-y-4">
                  {certifications.map((certification, index) => (
                    <article
                      key={`${certification.name}-${index}`}
                      className="flex min-w-0 items-start gap-3.5 rounded-2xl border border-[#E8DDD1] bg-white p-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F9EDE2] text-[#B66B43]">
                        <Award className="h-5 w-5" />
                      </span>

                      <div className="min-w-0">
                        <h3 className="break-words text-sm font-bold leading-6 text-[#30231D]">
                          {certification.name}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-[#806A5C]">
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

        {/* Closing contact section */}
        <footer className="rounded-2xl bg-[#30231D] px-6 py-8 text-white sm:px-9 sm:py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[#D9A783]">
                <Sparkles className="h-4 w-4" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  Thank you for visiting
                </p>
              </div>

              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Let&apos;s create something meaningful.
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/60">
                Interested in working together? Get in touch.
              </p>
            </div>

            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-[#F4E4D5] px-5 py-3 text-sm font-bold text-[#30231D] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4E4D5]"
              >
                <Mail className="h-4 w-4" />
                Contact Me
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {profile?.name || "Portfolio"}
              <span className="text-[#D9A783]">.</span>
            </p>

            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
