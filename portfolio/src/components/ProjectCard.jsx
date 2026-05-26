import React from "react";

import {
  Github,
  ExternalLink,
  Eye,
  ArrowUpRight,
  Database,
  GraduationCap,
  BookOpen,
  Users,
  ShieldCheck,
  Layers,
  Code
} from "lucide-react";

import { motion } from "framer-motion";

export default function ProjectCard({
  project,
  variants,
  handleLink,
  index
}) {

  // Dynamic Icon System
  const getIcon = (type) => {
    const icons = {
      database: <Database size={16} className="text-blue-400" />,
      graduation: <GraduationCap size={16} className="text-emerald-400" />,
      book: <BookOpen size={16} className="text-amber-400" />,
      users: <Users size={16} className="text-purple-400" />,
      shield: <ShieldCheck size={16} className="text-red-400" />,
      layers: <Layers size={16} className="text-cyan-400" />
    };

    return icons[type] || <Code size={16} className="text-white" />;
  };

  return (
    <motion.div
      layout
      variants={variants}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={(e) =>
        handleLink &&
        handleLink(e, project.demo, project.title)
      }
      className="interactive-project-row group relative w-full bg-slate-950/20 border border-slate-900/60 rounded-xl sm:rounded-2xl p-5 sm:p-8 flex flex-col lg:grid lg:grid-cols-12 gap-5 lg:gap-8 items-start lg:items-center transition-all duration-300 ease-out hover:bg-slate-900/20 hover:border-slate-800/80 overflow-hidden cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
    >

      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(400px_circle_at_var(--mx,0px)_var(--my,0px),#1e3a8a0c,transparent_100%)]" />

      {/* LEFT IDENTIFICATION */}
      <div className="font-mono lg:col-span-2 space-y-1 relative z-10">

        <span className="block text-[10px] text-slate-600 group-hover:text-blue-500 transition-colors">
          SYS_BUILD_0{index + 1}
        </span>

        <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          {project.scope || project.category}
        </span>

      </div>

      {/* MAIN CONTENT */}
      <div className="w-full lg:col-span-7 space-y-4 relative z-10">

        {/* Title */}
        <div className="flex items-center gap-3">

          <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center shadow-inner">
            {getIcon(project.type)}
          </div>

          <h3 className="text-base sm:text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300 uppercase">
            {project.title}
          </h3>

        </div>

        {/* Description */}
        <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
          {project.desc}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-1">

          {project.tech?.map((tech, i) => (
            <span
              key={i}
              className="text-[9px] sm:text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-md bg-slate-950 border border-slate-900 text-slate-400 font-medium group-hover:text-slate-200 group-hover:border-slate-800 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}

        </div>

      </div>

      {/* ACTIONS */}
      <div className="w-full lg:col-span-3 lg:text-right pt-2 lg:pt-0 relative z-10">

        <div className="flex flex-wrap lg:justify-end gap-3">

          {/* GitHub */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.15em] px-4 py-3 rounded-lg bg-slate-950/40 border border-slate-900 text-slate-400 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300"
            >

              <Github
                size={14}
                className="text-slate-500 group-hover:text-blue-400"
              />

              <span>CODE_MANIFEST</span>

            </a>
          )}

          {/* Live Demo */}
          {project.demo && project.demo !== "#" && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.15em] px-4 py-3 rounded-lg bg-slate-950/40 border border-slate-900 text-slate-400 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300"
            >

              <ExternalLink
                size={14}
                className="text-slate-500 group-hover:text-blue-400"
              />

              <span className="text-blue-400">
                LIVE_SERVER
              </span>

            </a>
          )}

        </div>

      </div>

      {/* Optional Image Preview */}
      {project.image && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none">

          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />

        </div>
      )}

    </motion.div>
  );
}