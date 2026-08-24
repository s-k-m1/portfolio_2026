"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/project/ProjectCard";
import type { Project } from "@/types";

const PER_PAGE = 8;

export default function ProjectFilters({ projects }: { projects: Project[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))],
    [projects],
  );
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter, projects],
  );

  const totalPages = Math.max(1, Math.ceil(visible.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const pageItems = visible.slice(start, start + PER_PAGE);

  const goTo = (p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
              onClick={() => {
                setFilter(cat);
                setPage(1);
              }}
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

      {pageItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pageItems.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-sm text-slate-500">
          No projects in this category yet.
        </p>
      )}

      {totalPages > 1 && (
        <nav
          className="mt-10 flex items-center justify-center gap-2"
          aria-label="Projects pagination"
        >
          <button
            type="button"
            onClick={() => goTo(safePage - 1)}
            disabled={safePage === 1}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => goTo(p)}
              aria-current={p === safePage}
              className={`h-9 w-9 rounded-lg text-sm font-semibold transition-colors ${
                p === safePage
                  ? "bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goTo(safePage + 1)}
            disabled={safePage === totalPages}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
