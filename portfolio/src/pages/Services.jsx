import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Layers, 
  Terminal, 
  Database, 
  Workflow, 
  GitBranch,
  SlidersHorizontal,
  Cpu
} from "lucide-react";

export default function Services() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  
  // Hardcoded premium data matrix featuring categories and individual technology badges
  const staticServices = [
    {
      title: "Full-Stack Web Development",
      category: "DEV",
      description: "Engineering scalable web applications from scratch using clean HTML, CSS, and modern JavaScript architectures combined with high-performance frameworks.",
      IconComponent: Code2,
      techStack: ["HTML5", "CSS3", "JavaScript", "PHP"],
      protocol: "ENGINE // WEB_CORE"
    },
    {
      title: "React.js Client Applications",
      category: "DEV",
      description: "Designing dynamic, interactive user interfaces with React.js. Implementing smooth transitions, responsive states, and clean component architecture.",
      IconComponent: Layers,
      techStack: ["React.js", "ES6+", "Framer Motion"],
      protocol: "UI // VIRTUAL_DOM"
    },
    {
      title: "Django & Python Backends",
      category: "DEV",
      description: "Building robust servers, custom logic layers, and secure database interactions using Python and the Django Web Framework.",
      IconComponent: Terminal,
      techStack: ["Python", "Django", "C / Java Basics"],
      protocol: "SYS // WSGI_CORE"
    },
    {
      title: "API Design & Postman Testing",
      category: "QA",
      description: "Developing robust RESTful API endpoints and running strict validation, debugging, and data payload assertions via Postman.",
      IconComponent: Database,
      techStack: ["Postman", "REST API", "PostgreSQL", "MySQL"],
      protocol: "DATA // CRUD_ASSERT"
    },
    {
      title: "Agile Management & Jira Flow",
      category: "QA",
      description: "Organizing production steps, breaking down feature sprints, tracking operational dependencies, and managing tasks smoothly inside Jira environments.",
      IconComponent: Workflow,
      techStack: ["Jira Software", "Agile Sprints", "Scrum Board"],
      protocol: "MGMT // SPRINT_FLOW"
    },
    {
      title: "Version Control & Git Pipelines",
      category: "QA",
      description: "Maintaining absolute codebase integrity. Managing concurrent feature branches, review workflows, and secure remote deployments via GitHub.",
      IconComponent: GitBranch,
      techStack: ["Git", "GitHub", "CI/CD Workflows"],
      protocol: "REPO // MAIN_BRANCH"
    }
  ];

  // Filtering Logic
  const filteredServices = activeFilter === "ALL" 
    ? staticServices 
    : staticServices.filter(s => s.category === activeFilter);

  const handleServiceClick = (serviceTitle) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }

    window.dispatchEvent(
      new CustomEvent("serviceSelected", {
        detail: serviceTitle,
      })
    );
  };

  return (
    <section id="services" className="bg-[#030712] pt-4 sm:pt-6 pb-16 sm:pb-24 px-4 sm:px-6 md:px-8 lg:px-16 text-slate-100 font-sans antialiased relative overflow-hidden select-none">
      
      {/* Structural Accent Top Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800/20 to-transparent relative z-20 mb-6 sm:mb-8" />
      
      {/* Ambient Underlying Blue Backlighting */}
      <div className="absolute top-1/3 right-1/4 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-indigo-500/5 blur-[100px] sm:blur-[130px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8 sm:space-y-12">
        
        {/* Cyber Header Block Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3 sm:space-y-4 text-left">
            <div className="inline-flex items-center gap-2 bg-slate-950/80 border border-slate-900 px-2.5 py-1.5 rounded-md backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 font-semibold">
                CAPABILITY_MATRIX
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              Professional <span className="text-blue-500">Services</span>
            </h2>
            
            <p className="text-slate-400 font-light leading-relaxed text-xs sm:text-sm md:text-base">
              Engineered software development solutions tailored for scale, structural compliance, and backend efficiency.
            </p>
          </div>

          {/* Interactive Dynamic Category Toggles */}
          <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-900/80 p-1 rounded-xl font-mono text-[9px] sm:text-[10px] tracking-wider shrink-0 self-start md:self-end">
            <div className="p-2 text-slate-600 hidden sm:block">
              <SlidersHorizontal size={12} />
            </div>
            {[
              { id: "ALL", label: "ALL_CAPABILITIES" },
              { id: "DEV", label: "CORE_DEVELOPMENT" },
              { id: "QA", label: "INFRASTRUCTURE_&_QA" }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id)}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 relative uppercase ${
                  activeFilter === btn.id 
                    ? "text-blue-400 bg-slate-900 border border-slate-800/60" 
                    : "text-slate-500 hover:text-slate-300 border border-transparent"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Multi-Device Grid System */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 pt-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((s, index) => {
              const IconComponent = s.IconComponent;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 5 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  key={s.title}
                  onClick={() => handleServiceClick(s.title)}
                  whileHover={{ y: -6 }}
                  className="group cursor-pointer bg-slate-950/20 border border-slate-900/60 rounded-2xl p-6 sm:p-7 hover:bg-slate-900/10 hover:border-slate-800/80 transition-all flex flex-col justify-between max-w-2xl mx-auto w-full sm:max-w-none relative overflow-hidden touch-manipulation min-h-[310px]"
                >
                  {/* Decorative Internal Card Corner Light */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="space-y-4">
                    {/* Top Container: Icon and Live Code Protocol string */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center text-blue-400 group-hover:text-indigo-400 group-hover:border-slate-800 transition-all duration-300">
                        <IconComponent size={20} className="transition-colors duration-300" />
                      </div>
                      
                      {/* Hover Terminal Protocol Flag */}
                      <span className="font-mono text-[8px] tracking-widest text-slate-600 group-hover:text-blue-500/60 transition-colors duration-300 flex items-center gap-1">
                        <Cpu size={10} className="opacity-40" />
                        {s.protocol}
                      </span>
                    </div>

                    {/* Text Details Block */}
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                        {s.title}
                      </h3>
                      <p className="text-slate-400 text-xs font-light leading-relaxed line-clamp-3 sm:line-clamp-4 lg:line-clamp-3">
                        {s.description}
                      </p>
                    </div>
                  </div>

                  {/* Core Tech Stack Specs Micro-Badges Block */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.techStack.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-0.5 bg-slate-950/60 border border-slate-900/60 text-slate-500 text-[9px] font-mono rounded-md group-hover:border-slate-800 group-hover:text-slate-400 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Cyber-styled Item Index Footer */}
                  <div className="mt-5 pt-3 border-t border-slate-900/60 flex justify-between items-center font-mono text-[10px] text-slate-500 tracking-wider">
                    <span className="group-hover:text-slate-400 transition-colors">
                      {"// DISPATCH_ACTION"}
                    </span>
                    <span className="text-slate-600 group-hover:text-blue-500/80 font-bold transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}