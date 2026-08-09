import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Github, Sparkles, ArrowUpRight } from "lucide-react";
import ProjectCard from "@/components/project/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import { getProjects, getProfile, getSkills, getServices, getExperience, getContentBlocks } from "@/lib/api";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.role}`,
  description: SITE.description,
};

export default async function HomePage() {
  const [projects, profile, skills, services, experiences, content] = await Promise.all([
    getProjects(),
    getProfile(),
    getSkills(),
    getServices(),
    getExperience(),
    getContentBlocks(),
  ]);

  const featured = [
    projects.find((p) => p.category === "Full Stack"),
    projects.find((p) => p.category === "Frontend"),
    projects.find((p) => p.category === "Backend"),
    projects.find((p) => p.category === "Security"),
  ]
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);
  const fallbackFeatured =
    featured.length > 0 ? featured : projects.slice(0, 4);
  const stats = [
    { label: "Projects", value: projects.length },
    { label: "Skills", value: skills.length },
    { label: "Services", value: services.length },
    { label: "Experiences", value: experiences.length },
  ];

  const nameParts = (profile?.full_name || SITE.name).split(" ");
  const firstName = nameParts[0] ?? "Saroj";
  const lastName = nameParts.slice(1).join(" ") || "Mahato";

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <div
          className="aurora-blob left-[-10%] top-[-15%] h-[26rem] w-[26rem] animate-float bg-indigo-600/30"
          aria-hidden
        />
        <div
          className="aurora-blob right-[-8%] top-[10%] h-[22rem] w-[22rem] animate-float-slow bg-fuchsia-600/25"
          aria-hidden
        />
        <div
          className="aurora-blob bottom-[-20%] left-[30%] h-[20rem] w-[20rem] animate-float bg-cyan-500/20"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-16 sm:pt-24">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300">
                <Sparkles className="h-3.5 w-3.5" />
                {profile?.role || SITE.role}
              </span>

              <h1 className="mt-6 text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl">
                {firstName}
                <span className="text-aurora block">{lastName}</span>
              </h1>

              <p className="mt-6 max-w-lg leading-relaxed text-slate-400">
                {profile?.portfolio_description || profile?.tagline || SITE.tagline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:shadow-violet-500/50 hover:brightness-110"
                >
                  View Projects
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                >
                  Contact Me
                </Link>
                {profile?.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="rounded-xl border border-white/15 bg-white/5 p-3 text-slate-200 backdrop-blur transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
              </div>

              {profile?.address && (
                <p className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4 text-violet-400" />
                  {profile.address}
                </p>
              )}
            </div>

            <div className="animate-fade-up md:flex md:justify-end" style={{ animationDelay: "150ms" }}>
              <div className="glow-card relative rounded-full p-1.5">
                <Image
                  src="/assets/images/skm-pic.jpeg"
                  alt={`Profile photo of ${SITE.name}`}
                  width={320}
                  height={320}
                  priority
                  className="h-64 w-64 rounded-full object-cover sm:h-80 sm:w-80"
                />
                <div
                  className="aurora-blob -inset-6 -z-10 h-full w-full animate-glow bg-violet-600/30"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS MARQUEE */}
      {skills.length > 0 && (
        <section className="border-y border-white/10 bg-ink/60 py-5">
          <Marquee
            items={skills.map((s) => s.name)}
            className="mx-auto max-w-7xl px-6"
          />
        </section>
      )}

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} className="glass rounded-2xl p-5 text-center transition-colors hover:border-violet-400/30">
              <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-widest text-slate-500">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      {fallbackFeatured.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-6">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                  Selected Work
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
                  Featured <span className="text-aurora">Projects</span>
                </h2>
              </div>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-300 transition-colors hover:text-violet-300"
              >
                View all
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {fallbackFeatured.map((project, index) => (
              <Reveal key={project.id} delay={index * 120}>
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <Reveal>
          <div className="glow-card relative overflow-hidden rounded-3xl bg-ink/80 px-8 py-12 text-center">
            <div
              className="aurora-blob left-1/2 top-[-60%] h-72 w-72 -translate-x-1/2 animate-glow bg-violet-600/25"
              aria-hidden
            />
            <h2 className="relative text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {content["hero-cta-title"] || SITE.tagline}
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-slate-400">
              {content["hero-cta-subtitle"]}
            </p>
            <Link
              href="/contact"
              className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:shadow-violet-500/50 hover:brightness-110"
            >
              {content["hero-cta-button"] || "Get in touch"} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}