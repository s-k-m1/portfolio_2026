import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowRight, Terminal, Eye, SlidersHorizontal } from "lucide-react";

// Robust unified animation schemas for seamless filtering behavior
const cardItemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 25 }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 }
  }
};

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
    <section id="projects" className="bg-[#020617] pt-12 pb-24 px-4 sm:px-8 lg:px-12 text-slate-100 font-sans antialiased relative overflow-hidden">
      
      {/* Visual Accent Top Divider */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-slate-800 to-transparent relative z-20 mb-12" />
      
      {/* Ambient Radial Mesh Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] bg-blue-500/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Modernized Header Block Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-slate-900">
          <div className="max-w-3xl space-y-3 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={animate ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-slate-950 border-2 border-slate-800 px-3 py-1.5 rounded-md shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 font-black">
                PRODUCTION_CASE_STUDIES
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={animate ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase leading-none"
            >
              Featured <span className="text-blue-500">Projects</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={animate ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 font-normal leading-relaxed text-base sm:text-lg"
            >
              An analytical review of architectural software solutions handling full-stack web environments, secure runtime logic, and automated workflows.
            </motion.p>
          </div>

          {/* Navigation Tabs */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={animate ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2 bg-slate-950 border-2 border-slate-800 p-1.5 rounded-xl font-mono text-xs tracking-wider shrink-0 self-start lg:self-end overflow-x-auto max-w-full no-scrollbar shadow-xl"
          >
            <div className="p-2 text-slate-500 hidden xl:block">
              <SlidersHorizontal size={14} />
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2.5 rounded-lg font-bold transition-all duration-300 uppercase whitespace-nowrap ${
                  filter === cat
                    ? "text-blue-400 bg-slate-900 border-2 border-slate-800 shadow-md font-black"
                    : "text-slate-400 hover:text-slate-200 border border-transparent"
                }`}
              >
                {cat.replace(" ", "_")}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Layout Grid Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                variants={cardItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                key={project.id}
                onClick={(e) => handleProjectLink(e, project.demo, project.title)}
                className="group cursor-pointer bg-slate-950/70 border-2 border-slate-800 rounded-2xl overflow-hidden hover:bg-slate-950/90 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between max-w-2xl mx-auto w-full sm:max-w-none shadow-xl relative"
              >
                {/* Media Container Box */}
                <div className="relative h-56 overflow-hidden bg-slate-950 border-b-2 border-slate-900">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-40 md:grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-30 group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                  
                  {/* HUD Backdrop Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/40 backdrop-blur-[3px]">
                    <div className="px-4 py-2.5 bg-slate-950 border-2 border-slate-800 rounded-xl text-xs font-mono font-bold tracking-widest text-blue-400 flex items-center gap-2 shadow-2xl">
                      <Eye size={14} className="animate-pulse text-blue-500" />
                      <span>{project.demo === "#" ? "REQUEST_LOCAL_DEV_DEMO" : "VISIT_LIVE_PROTOTYPE"}</span>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4">
                    <span className="bg-slate-950 border-2 border-slate-800 text-slate-300 text-xs font-mono font-black uppercase tracking-widest px-3 py-1.5 rounded-md shadow-md">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Text Information Block */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300 uppercase">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-base font-normal leading-relaxed line-clamp-3 sm:line-clamp-4">
                      {project.desc}
                    </p>
                  </div>

                  {/* Tech Stack Indicators */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs font-mono font-bold text-slate-400 bg-slate-950 border-2 border-slate-900 px-2.5 py-1 rounded-md group-hover:text-slate-200 group-hover:border-slate-800 transition-colors duration-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Toggles row */}
                  <div className="flex gap-6 border-t border-slate-900 pt-5 mt-2">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer"
                      className="action-btn flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-slate-400 hover:text-white transition-colors duration-200 touch-manipulation min-h-9"
                    >
                      <Github size={15} className="text-slate-500 group-hover:text-blue-400 transition-colors" /> 
                      <span>CODE_MANIFEST</span>
                    </a>

                    {project.demo === "#" ? (
                      <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-slate-600 select-none min-h-9">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700 animate-pulse" />
                        <span>LOCAL_ENVIRONMENT</span>
                      </div>
                    ) : (
                      <a 
                        href={project.demo} 
                        target="_blank"
                        rel="noreferrer"
                        className="action-btn flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-slate-400 hover:text-white transition-colors duration-200 touch-manipulation min-h-9"
                      >
                        <ExternalLink size={15} className="text-slate-500 group-hover:text-blue-400 transition-colors" /> 
                        <span className="text-blue-400 font-black">LIVE_SERVER</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Highlight Footer Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-12"
        >
          <div className="bg-slate-950 border-2 border-slate-800 p-6 sm:p-10 rounded-2xl relative overflow-hidden backdrop-blur-md text-left flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 shadow-2xl">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/5 blur-[80px] pointer-events-none" />
            
            <div className="space-y-3 max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-wide">Have a custom architecture deployment requirement?</h3>
              <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
                I am actively open to engineering high-availability databases, custom full-stack solutions, or modular microservices optimized for enterprise execution workflows.
              </p>
            </div>

            <button 
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-slate-900 hover:bg-slate-850 border-2 border-slate-800 text-white font-black text-xs font-mono tracking-widest uppercase rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shrink-0 touch-manipulation h-12 shadow-lg"
            >
              <Terminal size={14} className="text-blue-500" />
              <span>Initialize_Inquiry</span>
              <ArrowRight size={13} className="text-slate-400" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}