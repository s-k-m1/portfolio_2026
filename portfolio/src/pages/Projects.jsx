import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowRight, Terminal, Eye, SlidersHorizontal } from "lucide-react";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [animate, setAnimate] = useState(false);

  const categories = ["All", "Full Stack", "Frontend", "Backend", "Security"];

  const projectData = [
    {
      id: 1,
      title: "Restaurant Management System",
      category: "Full Stack",
      desc: "A comprehensive solution for order tracking, inventory management, and live sales metrics analytics.",
      tech: ["React", "Django", "PostgreSQL", "JWT"],
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
      github: "https://github.com/s-k-m1",
      demo: "#",
    },
    {
      id: 2,
      title: "School Management System",
      category: "Full Stack",
      desc: "Enterprise educational dashboard handling academic tracking, student databases, ledger billing, and grading pipelines.",
      tech: ["React", "Django Rest Framework", "PostgreSQL", "Tailwind"],
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1000&auto=format&fit=crop",
      github: "https://github.com/s-k-m1",
      demo: "#",
    },
    {
      id: 3,
      title: "SKM Tech Corporate Portfolio",
      category: "Frontend",
      desc: "High-performance agency branding site featuring fluid glassmorphism UI layouts and real-time dashboard structures.",
      tech: ["React", "Tailwind CSS", "Vite", "Lucide Icons"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
      github: "https://github.com/s-k-m1",
      demo: "https://github.com/s-k-m1",
    },
    {
      id: 4,
      title: "Advanced Library Management Engine",
      category: "Backend",
      desc: "Automated indexing ledger tracking book inventory states, rental durations, overdue alerts, and dynamic query handling.",
      tech: ["Python", "Django Models", "MySQL", "Cron Jobs"],
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop",
      github: "https://github.com/s-k-m1",
      demo: "#",
    },
    {
      id: 5,
      title: "Enterprise Employee Management Hub",
      category: "Backend",
      desc: "Backend data matrix for workforce management, tracking payroll calculation scales, attendance stamps, and corporate hierarchy.",
      tech: ["Python", "Django", "PostgreSQL", "ORM Queries"],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
      github: "https://github.com/s-k-m1",
      demo: "#",
    },
    {
      id: 6,
      title: "Centralized Secure Auth Provider Matrix",
      category: "Security",
      desc: "Robust authentication protocol server handling multi-tenant RBAC (Role-Based Access Control), sliding JWT token expiration windows, and active session blocklists via Redis.",
      tech: ["Python", "Django", "JWT Rotation", "Redis Crypto"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
      github: "https://github.com/s-k-m1",
      demo: "#",
    },
    {
      id: 7,
      title: "Bank Demat Automator",
      category: "Backend",
      desc: "Scripting and structural logic processing automated verification logs for Centralized KYC (CKYC) pipelines.",
      tech: ["Python", "Django", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1550565118-3d143c61582b?q=80&w=1000&auto=format&fit=crop",
      github: "https://github.com/s-k-m1",
      demo: "#",
    },
  ];

  useEffect(() => {
    setAnimate(true);
    return () => setAnimate(false);
  }, []);

  const filteredProjects = filter === "All" 
    ? projectData 
    : projectData.filter(p => p.category === filter);

  const handleProjectLink = (e, url, title) => {
    if (e.target.closest('.action-btn')) return;

    if (url === "#") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
      window.dispatchEvent(
        new CustomEvent("serviceSelected", { detail: `Inquiry regarding: ${title}` })
      );
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="projects" className="bg-[#030712] pt-4 sm:pt-6 pb-16 sm:pb-24 px-4 sm:px-6 md:px-8 lg:px-16 text-slate-100 font-sans antialiased relative overflow-hidden select-none">
      
      {/* Structural Accent Top Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800/20 to-transparent relative z-20 mb-6 sm:mb-8" />
      
      {/* Ambient Underlying Backlighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-blue-500/5 blur-[100px] sm:blur-[130px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8 sm:space-y-12">
        
        {/* Header Block Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3 sm:space-y-4 text-left">
            <motion.div 
              initial={{ opacity: 0, translateY: 10 }}
              animate={animate ? { opacity: 1, translateY: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 bg-slate-950/80 border border-slate-900 px-2.5 py-1.5 rounded-md backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 font-semibold">
                PRODUCTION_CASE_STUDIES
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, translateY: 15 }}
              animate={animate ? { opacity: 1, translateY: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight"
            >
              Featured <span className="text-blue-500">Projects</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, translateY: 15 }}
              animate={animate ? { opacity: 1, translateY: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-slate-400 font-light leading-relaxed text-xs sm:text-sm md:text-base"
            >
              A selection of my technical work in full-stack web architectures, secure frameworks, and dynamic automation logic.
            </motion.p>
          </div>

          {/* Filter Navigation Tabs */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={animate ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-900/80 p-1 rounded-xl font-mono text-[9px] sm:text-[10px] tracking-wider shrink-0 self-start md:self-end overflow-x-auto max-w-full lg:overflow-visible no-scrollbar"
          >
            <div className="p-2 text-slate-600 hidden lg:block">
              <SlidersHorizontal size={12} />
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 uppercase whitespace-nowrap ${
                  filter === cat
                    ? "text-blue-400 bg-slate-900 border border-slate-800/60 font-bold shadow-md"
                    : "text-slate-500 hover:text-slate-300 border border-transparent"
                }`}
              >
                {cat.replace(" ", "_")}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Dynamic Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 pt-2 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 5 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => handleProjectLink(e, project.demo, project.title)}
                className="group cursor-pointer bg-slate-950/20 border border-slate-900/60 rounded-2xl overflow-hidden hover:bg-slate-900/10 hover:border-slate-800/80 transition-all duration-500 ease-out flex flex-col justify-between max-w-2xl mx-auto w-full sm:max-w-none relative"
              >
                {/* Media Enclosure Block with Overlay Trigger */}
                <div className="relative h-48 sm:h-52 lg:h-54 overflow-hidden bg-slate-950">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-50 md:grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-40 group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent" />
                  
                  {/* Interactive Target Badge Display */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/30 font-mono backdrop-blur-[2px]">
                    <div className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-[10px] tracking-widest text-blue-400 flex items-center gap-2 shadow-xl">
                      <Eye size={12} className="animate-pulse" />
                      <span>{project.demo === "#" ? "REQUEST_LOCAL_DEV_DEMO" : "VISIT_LIVE_PROTOTYPE"}</span>
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="bg-slate-950/90 text-slate-400 border border-slate-800 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Information Payload Container */}
                <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-xs font-light leading-relaxed line-clamp-3 sm:line-clamp-4">
                      {project.desc}
                    </p>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[9px] sm:text-[10px] font-mono text-slate-500 bg-slate-950/80 border border-slate-900 px-2 py-0.5 rounded-md group-hover:text-slate-400 group-hover:border-slate-800 transition-colors duration-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Navigation Toggles */}
                  <div className="flex gap-5 border-t border-slate-900/60 pt-4 mt-1">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer"
                      className="action-btn flex items-center gap-1.5 text-[10px] sm:text-xs font-mono tracking-wider text-slate-400 hover:text-white transition-colors duration-300 touch-manipulation min-h-8"
                    >
                      <Github size={13} className="text-slate-500 group-hover:text-blue-400 transition-colors" /> 
                      <span>CODE</span>
                    </a>

                    {project.demo === "#" ? (
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono tracking-wider text-slate-600 select-none min-h-8">
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                        <span>LOCAL_ENVIRONMENT</span>
                      </div>
                    ) : (
                      <a 
                        href={project.demo} 
                        target="_blank"
                        rel="noreferrer"
                        className="action-btn flex items-center gap-1.5 text-[10px] sm:text-xs font-mono tracking-wider text-slate-400 hover:text-white transition-colors duration-300 touch-manipulation min-h-8"
                      >
                        <ExternalLink size={13} className="text-slate-500 group-hover:text-blue-400 transition-colors" /> 
                        <span className="text-blue-400/90 font-bold">LIVE_VIEW</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Call To Action Block */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-8 sm:pt-12"
        >
          <div className="bg-slate-950/30 border border-slate-900/80 p-6 sm:p-10 lg:p-12 rounded-2xl relative overflow-hidden backdrop-blur-sm text-left flex flex-col md:flex-row md:items-center md:justify-between gap-6 max-w-2xl mx-auto w-full sm:max-w-none">
            <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-indigo-500/5 blur-[70px] pointer-events-none" />
            
            <div className="space-y-2 max-w-xl">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">Have a custom architecture deployment requirement?</h3>
              <p className="text-slate-400 text-xs font-light leading-relaxed">
                I am actively open to engineering high-availability databases, automated logic streams, or custom full-stack solutions.
              </p>
            </div>

            <button 
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-medium text-[11px] font-mono tracking-widest uppercase rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap w-full md:w-auto touch-manipulation h-11"
            >
              <Terminal size={13} className="text-blue-500" />
              <span>Initialize_Inquiry</span>
              <ArrowRight size={11} className="text-slate-400" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}