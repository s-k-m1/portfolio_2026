import React, { useEffect } from "react";
import { ArrowUpRight, Code, Database, Cpu, Layers, ShieldCheck, BookOpen, Users, GraduationCap } from "lucide-react";
import skmPic from "../assets/images/skm-pic.jpeg";

export default function Home() {
  const projects = [
    { 
      title: "Restaurant Management System", 
      scope: "Full Stack Business Ecosystems",
      icon: <Database size={16} className="text-blue-400" />,
      stack: ["React", "Django", "PostgreSQL", "JWT"],
      desc: "Engineered a high-performance shopping and ordering ecosystem with a completely decoupled architecture. Optimized core database query pipelines and integrated robust payment settlement hooks to manage fluid state transactions.", 
      link: "#" 
    },
    { 
      title: "School Management System", 
      scope: "Enterprise Educational Platforms",
      icon: <GraduationCap size={16} className="text-emerald-400" />,
      stack: ["React", "Django Rest Framework", "PostgreSQL", "Tailwind"],
      desc: "Designed and built an enterprise educational dashboard handling academic tracking, complex student databases, ledger billing metrics, and low-latency grading pipelines.", 
      link: "#" 
    },
    { 
      title: "Advanced Library Management Engine", 
      scope: "Automated Inventory Systems",
      icon: <BookOpen size={16} className="text-amber-400" />,
      stack: ["Python", "Django Models", "MySQL", "Cron Jobs"],
      desc: "Architected an automated indexing ledger system tracking book inventory states, book rental durations, background overdue email alerts, and optimized backend query response constraints.", 
      link: "#" 
    },
    { 
      title: "Enterprise Employee Management Hub", 
      scope: "Workforce Data Processing",
      icon: <Users size={16} className="text-purple-400" />,
      stack: ["Python", "Django", "PostgreSQL", "ORM Queries"],
      desc: "Engineered a secure data matrix for corporate human resource mapping. Successfully handles background processing for complex payroll calculation scales, timestamped attendance tracking, and organizational tiers.", 
      link: "#" 
    },
    { 
      title: "Centralized Secure Auth Matrix", 
      scope: "Cryptographic Identity Protocols",
      icon: <ShieldCheck size={16} className="text-red-400" />,
      stack: ["Python", "Django", "JWT Rotation", "Redis Crypto"],
      desc: "Implemented a robust, high-availability security broker supplying multi-tenant RBAC permissions, token validation checkpoints, sliding absolute-timeout expiration window rotation, and Redis session blocklists.", 
      link: "#" 
    },
    { 
      title: "SKM Tech Corporate Portfolio", 
      scope: "UI/UX & Component Architecture",
      icon: <Layers size={16} className="text-cyan-400" />,
      stack: ["React Ecosystem", "Tailwind CSS Layouts", "Vite", "Lucide Icons"],
      desc: "Architected a scalable design layout leveraging fluid glassmorphic styling boundaries. Utilized strict atomic component patterns and highly optimized render cycles for blazing fast deployment performance.", 
      link: "#" 
    },
  ];

  // Dynamic 3D Interactivity — Only activates on hover-capable pointer setups
  useEffect(() => {
    const cards = document.querySelectorAll(".interactive-project-row");
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    
    if (isTouchDevice) return; // Terminate tracking on mobile to save performance bounds

    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const angleX = (yc - y) / 15;
      const angleY = (x - xc) / 30;
      
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-2px)`;
    };

    const handleMouseLeave = (card) => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    };

    cards.forEach(card => {
      card.addEventListener("mousemove", (e) => handleMouseMove(e, card));
      card.addEventListener("mouseleave", () => handleMouseLeave(card));
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener("mousemove", (e) => handleMouseMove(e, card));
        card.removeEventListener("mouseleave", () => handleMouseLeave(card));
      });
    };
  }, []);

  return (
    <div className="bg-[#030712] min-h-screen text-slate-100 font-sans antialiased selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      
      {/* Structural Horizon Accent Line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800/50 to-transparent relative z-20" />

      {/* Hero Environment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-20 md:pb-32 relative">
        
        {/* Calibrated Ambient Space Glow */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] lg:w-[800px] h-[300px] bg-gradient-to-b from-blue-500/5 via-indigo-500/5 to-transparent blur-[80px] sm:blur-[140px] pointer-events-none z-0" />

        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 sm:gap-16 relative z-10">
          
          {/* Elite Text Presentation */}
          <div className="w-full flex-1 space-y-6 sm:space-y-8 text-center lg:text-left transform-gpu animate-[fadeIn_0.8s_ease-out]">
            <div className="inline-flex items-center gap-2.5 bg-slate-950/80 border border-slate-900/80 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-2xl backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,1)] animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] text-slate-400 font-semibold">
                FULL_STACK_SYSTEMS_ARCHITECT
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] font-sans">
              Saroj Kumar <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400">Mahato</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-400 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              I specialize in turning complex system requirements into pristine digital assets—crafting exceptional interactive frontends with <span className="text-blue-400 font-mono text-xs sm:text-sm">React</span> and designing bulletproof backend infrastructures with <span className="text-indigo-400 font-mono text-xs sm:text-sm">Django</span>.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 w-full sm:w-auto text-xs font-mono tracking-widest uppercase">
              <a
                href="#works"
                className="w-full sm:w-auto px-6 py-4 bg-white text-slate-950 rounded-xl hover:bg-slate-200 transition-all duration-300 shadow-xl text-center font-bold transform-gpu hover:-translate-y-0.5 active:translate-y-0"
              >
                COMPILE_WORKS.SH
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-6 py-4 bg-slate-950/60 border border-slate-900 text-slate-300 rounded-xl hover:bg-slate-900 hover:border-slate-800 transition-all duration-300 text-center backdrop-blur-sm transform-gpu hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <span>INIT_BRIEFING</span>
                <ArrowUpRight size={14} className="text-slate-500" />
              </a>
            </div>
          </div>

          {/* Premium Spatial Profile Presentation */}
          <div className="flex-shrink-0 relative group z-10 transform-gpu animate-[fadeIn_1s_ease-out] w-48 h-48 sm:w-64 sm:h-64 lg:w-auto lg:h-auto">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 to-indigo-500/0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none" />
            
            <div className="p-2 sm:p-3 bg-slate-950/40 border border-slate-900 rounded-[1.5rem] sm:rounded-[2rem] backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              <div className="w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-xl sm:rounded-2xl overflow-hidden relative border border-slate-900 bg-slate-950">
                <img
                  src={skmPic}
                  alt="Saroj Kumar Mahato"
                  className="w-full h-full object-cover grayscale contrast-[1.05] saturate-[0.85] transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-[#030712]/20 pointer-events-none mix-blend-multiply" />
              </div>
            </div>
            
            {/* Minimalist Blueprint Label */}
            <div className="absolute -bottom-2 -left-2 sm:bottom-6 sm:-left-4 bg-slate-950/90 border border-slate-800/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[8px] sm:text-[9px] font-mono tracking-widest text-slate-400 backdrop-blur-sm shadow-xl flex items-center gap-1.5 transform-gpu -rotate-2 group-hover:rotate-0 transition-transform duration-300">
              <Code size={10} className="text-blue-500" /> STATUS: ACTIVE
            </div>
          </div>

        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="border-t border-slate-900/50 bg-[#02050c] py-20 sm:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          
          <div className="max-w-xl mb-16 sm:mb-24 space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-blue-500 uppercase">
              <span>//</span> CAPABILITIES INDEX
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              Production Implementations
            </h2>
            <p className="text-slate-400 font-light text-xs sm:text-sm sm:text-base leading-relaxed">
              Vetted applications built with precise data models, clean execution protocols, and polished interface mechanics.
            </p>
          </div>

          {/* Interactive Stacked Rows Layout */}
          <div className="space-y-4">
            {projects.map((proj, idx) => (
              <div 
                key={idx} 
                className="interactive-project-row group relative w-full bg-slate-950/20 border border-slate-900/60 rounded-xl sm:rounded-2xl p-5 sm:p-8 flex flex-col lg:grid lg:grid-cols-12 gap-5 lg:gap-8 items-start lg:items-center transition-all duration-300 ease-out hover:bg-slate-900/20 hover:border-slate-800/80 overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(400px_circle_at_var(--mx,0px)_var(--my,0px),#1e3a8a0c,transparent_100%)]" />
                
                {/* Identification (Col 2) */}
                <div className="font-mono lg:col-span-2 space-y-0.5 sm:space-y-1">
                  <span className="block text-[9px] sm:text-[10px] text-slate-600 group-hover:text-blue-500 transition-colors">
                    SYS_BUILD_0{idx + 1}
                  </span>
                  <span className="block text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    {proj.scope}
                  </span>
                </div>

                {/* Main Specification Data Block (Col 7) */}
                <div className="w-full lg:col-span-7 space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center shadow-inner">
                      {proj.icon}
                    </div>
                    <h3 className="text-base sm:text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                      {proj.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                    {proj.desc}
                  </p>
                  
                  {/* Tech Tokens */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {proj.stack.map((tech, i) => (
                      <span 
                        key={i} 
                        className="text-[8px] sm:text-[9px] font-mono tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-slate-950 border border-slate-900 text-slate-400 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hyperlink Action Component (Col 3) */}
                <div className="w-full lg:col-span-3 lg:text-right pt-2 lg:pt-0">
                  <a 
                    href={proj.link} 
                    className="w-full lg:w-auto inline-flex items-center justify-center lg:justify-start gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.15em] px-4 py-3 rounded-lg bg-slate-950/40 border border-slate-900 text-slate-400 group-hover:text-white group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all duration-300"
                  >
                    <span>INSPECT_SYSTEM</span>
                    <ArrowUpRight size={12} className="text-slate-500 group-hover:text-blue-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>
      
    </div>
  );
}