import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Layers, Terminal, Database, Workflow, GitBranch, Cpu } from "lucide-react";

// Optimized animation variants for professional feel
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  hover: { y: -8, transition: { duration: 0.2 } }
};

const borderGlow = {
  initial: { borderColor: "rgba(30, 41, 59, 1)" },
  hover: { borderColor: "rgba(59, 130, 246, 0.5)", transition: { duration: 0.3 } }
};

export default function Services() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  
  const staticServices = [
    { title: "Full-Stack Web Development", category: "DEV", description: "Engineering scalable web applications from scratch using clean HTML, CSS, and modern JavaScript architectures.", IconComponent: Code2, techStack: ["HTML5", "CSS3", "JavaScript", "PHP"], protocol: "WEB_CORE" },
    { title: "React.js Client Applications", category: "DEV", description: "Designing dynamic, interactive user interfaces with React.js. Implementing smooth transitions and responsive states.", IconComponent: Layers, techStack: ["React.js", "ES6+", "Framer Motion"], protocol: "UI_DOM" },
    { title: "Django & Python Backends", category: "DEV", description: "Building robust servers, custom logic layers, and secure database interactions using Python and Django.", IconComponent: Terminal, techStack: ["Python", "Django", "Postgres"], protocol: "WSGI_CORE" },
    { title: "API Design & QA", category: "QA", description: "Developing robust RESTful API endpoints and running strict validation, debugging, and payload assertions.", IconComponent: Database, techStack: ["Postman", "REST API", "DRF"], protocol: "CRUD_ASSERT" },
    { title: "Agile Management", category: "QA", description: "Organizing production steps, feature sprints, and operational dependencies inside Jira environments.", IconComponent: Workflow, techStack: ["Jira", "Scrum"], protocol: "SPRINT_FLOW" },
    { title: "Version Control", category: "QA", description: "Maintaining codebase integrity, concurrent feature branches, and secure deployments via GitHub.", IconComponent: GitBranch, techStack: ["Git", "GitHub", "CI/CD"], protocol: "MAIN_BRANCH" }
  ];

  const filteredServices = activeFilter === "ALL" ? staticServices : staticServices.filter(s => s.category === activeFilter);

  return (
    <section id="services" className="bg-[#020617] py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Tight Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
            Professional <span className="text-blue-500">Services</span>
          </h2>
          <div className="flex bg-slate-900/50 p-1 rounded-lg border border-slate-800 w-fit">
            {["ALL", "DEV", "QA"].map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)} 
                className={`px-4 py-1.5 text-xs font-mono uppercase rounded ${activeFilter === f ? "bg-slate-800 text-blue-400" : "text-slate-500"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Tightened Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((s) => (
              <motion.div
                key={s.title}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
                className="group relative bg-slate-950/40 p-6 rounded-2xl border border-slate-800 overflow-hidden"
              >
                {/* Glow Animation Element */}
                <motion.div variants={borderGlow} initial="initial" whileHover="hover" className="absolute inset-0 border rounded-2xl pointer-events-none" />
                
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-slate-900 rounded-lg text-blue-500"><s.IconComponent size={20} /></div>
                  <span className="font-mono text-[9px] text-slate-600 tracking-widest">{s.protocol}</span>
                </div>
                
                <h3 className="text-sm font-bold text-white mb-2 uppercase">{s.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-3">{s.description}</p>
                
                <div className="flex flex-wrap gap-1.5">
                  {s.techStack.map(t => (
                    <span key={t} className="px-1.5 py-0.5 text-[9px] bg-slate-900 text-slate-500 rounded border border-slate-800">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}