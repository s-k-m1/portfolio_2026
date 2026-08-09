import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { getProject, getProjects } from "@/lib/api";
import { SITE } from "@/lib/site";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

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

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  const otherProjects = await getProjects();
  const more = otherProjects.filter((p) => String(p.id) !== id).slice(0, 3);

  return (
    <div className="relative overflow-hidden">
      <div className="aurora-blob right-[-15%] top-[-10%] h-[24rem] w-[24rem] animate-float bg-violet-600/25" aria-hidden />

      <article className="relative mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-violet-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Link>

        <div className="mt-6 mb-8 animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            {project.category}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {project.title}
          </h1>
        </div>

        {project.image_url && (
          <div className="glow-card relative mb-8 aspect-[16/9] overflow-hidden rounded-3xl">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <p className="mb-8 text-lg leading-relaxed text-slate-400">{project.desc}</p>

        {project.tech && (
          <div className="mb-10">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.split("|").map((tech) => (
                <span
                  key={tech.trim()}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:shadow-violet-500/50 hover:brightness-110"
            >
              <Github className="h-4 w-4" /> View Source
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-white/30 hover:bg-white/10"
            >
              Live Demo <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>

        {more.length > 0 && (
          <div className="mt-16 border-t border-white/10 pt-8">
            <h2 className="mb-6 text-xl font-bold text-white">More Projects</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {more.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="glass group rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30"
                >
                  <p className="text-xs font-semibold text-violet-400">{p.category}</p>
                  <p className="mt-2 font-bold leading-snug text-white transition-colors group-hover:text-violet-300">
                    {p.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}