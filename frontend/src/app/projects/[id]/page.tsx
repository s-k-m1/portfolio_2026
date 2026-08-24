import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Quote,
  Building2,
  UserRound,
  Star,
} from "lucide-react";
import { getProject, getProjects, getProjectReviews } from "@/lib/api";
import { SITE } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import ReviewForm from "@/components/project/ReviewForm";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

// Always render on demand so admin edits show immediately.
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.slice(0, 10).map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);

  return {
    title: project?.title ?? "Project",
    description: project?.desc,
    alternates: {
      canonical: `${SITE.url}/projects/${id}`,
    },
    openGraph: {
      title: `${project?.title ?? "Project"} — ${SITE.name}`,
      description: project?.desc,
      images: project?.image_url ? [project.image_url] : undefined,
    },
  };
}

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= rating ? "fill-amber-400 text-amber-400" : "text-slate-600"
          }`}
        />
      ))}
    </div>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  const otherProjects = await getProjects();
  const more = otherProjects.filter((p) => String(p.id) !== id).slice(0, 3);
  const reviews = await getProjectReviews(id);

  const imageUrl = project.image || project.image_url;
  const techList = project.tech
    ? project.tech.split("|").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="relative overflow-hidden">
      <div
        className="aurora-blob right-[-15%] top-[-10%] h-[24rem] w-[24rem] animate-float bg-violet-600/20"
        aria-hidden
      />

      <article className="relative mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-violet-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Link>

        {/* Hero */}
        <Reveal className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-300">
              {project.category}
            </span>
            {project.client_name && (
              <span className="text-sm text-slate-400">
                Client ·{" "}
                <span className="text-slate-200">{project.client_name}</span>
              </span>
            )}
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl">
            {project.title}
          </h1>
        </Reveal>

        {/* Image left / Details right */}
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
          {/* Left: cover image */}
          <Reveal>
            <div className="lg:sticky lg:top-24">
              {imageUrl ? (
                <div className="glow-card relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 512px"
                    className="object-cover"
                    priority
                  />
                  {project.demo && (
                    <Link
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs font-medium text-white backdrop-blur transition-colors hover:bg-violet-500/30"
                    >
                      Live Preview <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              ) : (
                <div className="glow-card relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-fuchsia-500/20">
                  <span className="text-sm text-slate-400">{project.title}</span>
                </div>
              )}
            </div>
          </Reveal>

          {/* Right: details + description */}
          <div className="space-y-8">
            {project.client_name && (
              <Reveal>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center gap-2 text-violet-400">
                      <UserRound className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Client
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-white">
                      {project.client_name}
                    </p>
                  </div>
                  {project.client_role && (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <div className="flex items-center gap-2 text-violet-400">
                        <Building2 className="h-4 w-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">
                          Role
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-medium text-white">
                        {project.client_role}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            )}

            <Reveal>
              <section>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                  Overview
                </h2>
                <p className="text-lg leading-relaxed text-slate-300">
                  {project.desc}
                </p>
              </section>
            </Reveal>

            {techList.length > 0 && (
              <Reveal>
                <section>
                  <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                    Tech Stack
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {techList.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              </Reveal>
            )}

            <Reveal>
              <div className="flex flex-col gap-3 sm:flex-row">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:shadow-violet-500/50 hover:brightness-110"
                  >
                    <Github className="h-4 w-4" /> View Source
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                  >
                    Live Demo <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Public reviews + submission */}
        <Reveal className="mt-16">
          <div className="border-t border-white/10 pt-10">
            <ReviewForm projectId={id} initialReviews={reviews} />
          </div>
        </Reveal>

        {/* Client review */}
        {project.client_review && (
          <Reveal className="mt-16">
            <div className="border-t border-white/10 pt-10">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Quote className="h-5 w-5 text-violet-400" />
                  <h2 className="text-xl font-bold text-white">Client Review</h2>
                </div>
                {project.client_rating ? <Stars rating={project.client_rating} /> : null}
              </div>

              <blockquote className="glass relative overflow-hidden rounded-3xl p-8">
                <Quote className="absolute right-6 top-6 h-10 w-10 text-violet-400/10" aria-hidden />
                <p className="relative text-xl leading-relaxed text-slate-100">
                  &ldquo;{project.client_review}&rdquo;
                </p>
                <footer className="mt-6 flex items-center gap-3 border-t border-white/10 pt-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-sm font-bold text-white">
                    {(project.client_name || "C")
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {project.client_name}
                    </span>
                    {project.client_role && (
                      <span className="block text-xs text-slate-400">
                        {project.client_role}
                      </span>
                    )}
                  </span>
                  <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 sm:inline-flex">
                    <Star className="h-3.5 w-3.5 fill-emerald-300 text-emerald-300" />
                    Verified Client
                  </span>
                </footer>
              </blockquote>
            </div>
          </Reveal>
        )}

        {/* More projects */}
        {more.length > 0 && (
          <Reveal className="mt-16">
            <div className="border-t border-white/10 pt-8">
              <h2 className="mb-6 text-xl font-bold text-white">More Projects</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {more.map((p) => (
                  <Link
                    key={p.id}
                    href={`/projects/${p.id}`}
                    className="glass group rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30"
                  >
                    <p className="text-xs font-semibold text-violet-400">
                      {p.category}
                    </p>
                    <p className="mt-2 font-bold leading-snug text-white transition-colors group-hover:text-violet-300">
                      {p.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </article>
    </div>
  );
}
