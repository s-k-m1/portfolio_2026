"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/project/ProjectCard";
import type { Project } from "@/types";

export default function ProjectFilters({ projects }: { projects: Project[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))],
    [projects],
  );
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter, projects],
  );

  return (
    <div>
      {categories.length > 1 && (
        <div
          className="mb-6 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                filter === cat
                  ? "bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25"
                  : "border border-white/10 bg-white/5 text-slate-400 hover:border-white/25 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-sm text-slate-500">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}