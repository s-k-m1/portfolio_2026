import type { Metadata } from "next";
import ProjectFilters from "@/components/project/ProjectFilters";
import Reveal from "@/components/ui/Reveal";
import { getProjects, getContentBlocks } from "@/lib/api";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Portfolio of ${SITE.name} — full-stack, backend, frontend, and security projects built with React, Django, and PostgreSQL.`,
};

export default async function ProjectsPage() {
  const [projects, content] = await Promise.all([getProjects(), getContentBlocks()]);

  return (
    <div className="relative overflow-hidden">
      <div className="aurora-blob left-[-10%] top-[-12%] h-[24rem] w-[24rem] animate-float bg-indigo-600/25" aria-hidden />
      <div className="aurora-blob right-[-10%] top-[20%] h-[20rem] w-[20rem] animate-float-slow bg-fuchsia-600/20" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Projects
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
            Featured <span className="text-aurora">Projects</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
            {content["projects-intro"]}
          </p>
        </Reveal>

        {projects.length > 0 ? (
          <div className="mt-10">
            <ProjectFilters projects={projects} />
          </div>
        ) : (
          <p className="py-20 text-center text-sm text-slate-500">
            Projects coming soon.
          </p>
        )}
      </div>
    </div>
  );
}