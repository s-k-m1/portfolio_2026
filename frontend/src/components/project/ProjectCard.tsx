import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const imageUrl = project.image || project.image_url;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-ink/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-15px_rgb(139_92_246/0.35)]">
      <div className="glow-card h-full rounded-2xl">
        {imageUrl && (
          <Link
            href={`/projects/${project.id}`}
            className="relative block aspect-[16/9] overflow-hidden"
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={index < 3}
            />
            <span className="absolute right-3 bottom-3 z-20 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-medium text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
              View <ArrowUpRight className="h-3 w-3" />
            </span>
          </Link>
        )}

        <div className="flex flex-1 flex-col p-7">
          <span className="text-xs font-semibold tracking-wide text-violet-400">
            {project.category}
          </span>

          <h3 className="mt-2 mb-2 text-xl font-bold leading-snug text-white">
            <Link
              href={`/projects/${project.id}`}
              className="transition-colors duration-200 group-hover:text-violet-300"
            >
              {project.title}
            </Link>
          </h3>

          <p className="mb-3 line-clamp-3 flex-1 text-[15px] leading-relaxed text-slate-400">
            {project.desc}
          </p>

          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tech.split("|").map((tech) => (
              <span
                key={tech.trim()}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-slate-300"
              >
                {tech.trim()}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <Link
              href={`/projects/${project.id}`}
              className="flex items-center gap-1 text-sm font-semibold text-slate-300 transition-colors duration-200 hover:text-violet-300"
            >
              View Details <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code`}
                className="text-slate-500 transition-colors duration-200 hover:text-violet-300"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}