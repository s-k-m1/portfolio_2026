import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectData } from "../data/projectData";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Full Stack", "Frontend", "Backend", "Security"];

  const filteredProjects =
    filter === "All"
      ? projectData
      : projectData.filter((p) => p.category === filter);

  const handleProjectLink = (e, url) => {
    if (e.target.closest(".action-btn")) return;

    if (url === "#") {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      id="projects"
      className="bg-[#020617] py-6 sm:py-10 lg:py-14 px-4 sm:px-8 text-slate-100"
    >
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4 pb-3 sm:pb-5 border-b border-slate-800">

          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white">
              Featured <span className="text-blue-500">Projects</span>
            </h2>

            <p className="text-slate-400 mt-1 font-mono text-[10px] sm:text-sm">
              ARCHITECTURAL_SYSTEMS_MANIFEST
            </p>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 border-2 font-mono text-[10px] sm:text-[11px] font-bold uppercase transition-all duration-200 ${
                  filter === cat
                    ? "border-blue-500 text-blue-400 bg-blue-500/10"
                    : "border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    handleLink={handleProjectLink}
                  />
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-slate-500 py-10 sm:py-16 font-mono text-xs sm:text-sm">
                // NO_PROJECTS_FOUND_IN_CATEGORY_
                {filter.toUpperCase().replace(" ", "_")}
              </p>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}