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

const serviceItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 20 }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 }
  }
};

export default function Services() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  
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

  const filteredServices = activeFilter === "ALL" 
    ? staticServices 
    : staticServices.filter(s => s.category === activeFilter);

  const handleServiceClick = (serviceTitle) => {
    const contactSection = document.getElementById("contact");
    
    if (contactSection) {
      const yOffset = -90; 
      const yPosition = contactSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    } else {
      window.location.hash = "contact";
    }

    window.dispatchEvent(
      new CustomEvent("serviceSelected", {
        detail: serviceTitle,
      })
    );
  };

  return (
    <section id="services" className="bg-[#020617] pt-12 pb-24 px-4 sm:px-8 lg:px-12 text-slate-100 font-sans antialiased relative overflow-hidden">
      
      {/* Structural Accent Top Divider */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-slate-800 to-transparent relative z-20 mb-12" />
      
      {/* Ambient Underlying Blue Backlighting */}
      <div className="absolute top-1/3 right-1/4 w-[400px] sm:w-[600px] h-[400px] bg-indigo-500/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Cyber Header Block Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-slate-900">
          <div className="max-w-3xl space-y-3 text-left">
            <div className="inline-flex items-center gap-2 bg-slate-950 border-2 border-slate-800 px-3 py-1.5 rounded-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 font-black">
                CAPABILITY_MATRIX
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase leading-none">
              Professional <span className="text-blue-500">Services</span>
            </h2>
            
            <p className="text-slate-300 font-normal leading-relaxed text-base sm:text-lg">
              Engineered software development solutions tailored for scale, structural compliance, and backend efficiency.
            </p>
          </div>

          {/* Interactive Dynamic Category Toggles */}
          <div className="flex items-center gap-2 bg-slate-950 border-2 border-slate-800 p-1.5 rounded-xl font-mono text-xs tracking-wider shrink-0 self-start lg:self-end overflow-x-auto max-w-full shadow-xl">
            <div className="p-2 text-slate-500 hidden sm:block">
              <SlidersHorizontal size={14} />
            </div>
            {[
              { id: "ALL", label: "ALL_CAPABILITIES" },
              { id: "DEV", label: "CORE_DEVELOPMENT" },
              { id: "QA", label: "INFRASTRUCTURE_&_QA" }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id)}
                className={`px-4 py-2.5 rounded-lg font-bold transition-all duration-300 relative uppercase whitespace-nowrap ${
                  activeFilter === btn.id 
                    ? "text-blue-400 bg-slate-900 border-2 border-slate-800/60 font-black shadow-md" 
                    : "text-slate-400 hover:text-slate-200 border border-transparent"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Multi-Device Grid System */}
        {/* Switched container to native layout grid tracking to prevent structural collapse */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2">
          <AnimatePresence mode="wait">
            {filteredServices.map((s, index) => {
              const IconComponent = s.IconComponent;

              return (
                <motion.div
                  key={`${s.title}-${activeFilter}`}
                  layoutId={`${s.title}-${activeFilter}`}
                  variants={serviceItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => handleServiceClick(s.title)}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group cursor-pointer bg-slate-950/70 border-2 border-slate-800 rounded-2xl p-6 sm:p-7 hover:bg-slate-950/90 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between max-w-2xl mx-auto w-full sm:max-w-none relative overflow-hidden shadow-xl min-h-[330px]"
                >
                  {/* Decorative Internal Card Corner Light */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="space-y-5">
                    {/* Top Container: Icon and Live Code Protocol string */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border-2 border-slate-900 flex items-center justify-center text-blue-400 group-hover:text-indigo-400 group-hover:border-slate-800 transition-all duration-300 shadow-inner">
                        <IconComponent size={22} className="transition-colors duration-300" />
                      </div>
                      
                      {/* Hover Terminal Protocol Flag */}
                      <span className="font-mono text-[10px] tracking-widest text-slate-500 group-hover:text-blue-500 transition-colors duration-300 flex items-center gap-1.5 font-bold">
                        <Cpu size={12} className="opacity-50" />
                        {s.protocol}
                      </span>
                    </div>

                    {/* Text Details Block */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300 uppercase">
                        {s.title}
                      </h3>
                      <p className="text-slate-300 text-base font-normal leading-relaxed line-clamp-3 sm:line-clamp-4 lg:line-clamp-3">
                        {s.description}
                      </p>
                    </div>
                  </div>

                  {/* Core Tech Stack Specs Micro-Badges Block */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.techStack.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="px-2.5 py-1 bg-slate-950 border-2 border-slate-900 text-slate-400 text-xs font-mono font-bold rounded-md group-hover:border-slate-800 group-hover:text-slate-200 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Cyber-styled Item Index Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-900 flex justify-between items-center font-mono text-xs text-slate-500 tracking-wider font-semibold">
                    <span className="group-hover:text-slate-400 transition-colors">
                      {"// DISPATCH_INQUIRY"}
                    </span>
                    <span className="text-slate-600 group-hover:text-blue-500 font-black transition-colors text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}