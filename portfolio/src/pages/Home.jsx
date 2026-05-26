import React, { useEffect } from "react";
import { ArrowUpRight, Code, Database, Cpu, Layers, ShieldCheck, BookOpen, Users, GraduationCap } from "lucide-react";
import skmPic from "../assets/images/skm-pic.jpeg";

export default function Home() {
  const projects = [
    { 
      title: "Restaurant Management System", 
      scope: "Full Stack Business Systems",
      icon: <Database size={18} className="text-blue-400" />,
      stack: ["React", "Django", "PostgreSQL", "JWT"],
      desc: "Engineered a high-performance shopping and ordering ecosystem with a completely decoupled architecture. Optimized core database query pipelines and integrated robust payment settlement hooks to manage fluid state transactions.", 
      link: "#" 
    },
    { 
      title: "School Management System", 
      scope: "Enterprise Educational Platforms",
      icon: <GraduationCap size={18} className="text-emerald-400" />,
      stack: ["React", "Django Rest Framework", "PostgreSQL", "Tailwind"],
      desc: "Designed and built an enterprise educational dashboard handling academic tracking, complex student databases, ledger billing metrics, and low-latency grading pipelines.", 
      link: "#" 
    },
    { 
      title: "Advanced Library Management Engine", 
      scope: "Automated Inventory Systems",
      icon: <BookOpen size={18} className="text-amber-400" />,
      stack: ["Python", "Django Models", "MySQL", "Cron Jobs"],
      desc: "Architected an automated indexing ledger system tracking book inventory states, book rental durations, background overdue email alerts, and optimized backend query response constraints.", 
      link: "#" 
    },
    { 
      title: "Enterprise Employee Management Hub", 
      scope: "Workforce Data Processing",
      icon: <Users size={18} className="text-purple-400" />,
      stack: ["Python", "Django", "PostgreSQL", "ORM Queries"],
      desc: "Engineered a secure data matrix for corporate human resource mapping. Successfully handles background processing for complex payroll calculation scales, timestamped attendance tracking, and organizational tiers.", 
      link: "#" 
    },
    { 
      title: "Centralized Secure Auth Matrix", 
      scope: "Cryptographic Identity Protocols",
      icon: <ShieldCheck size={18} className="text-red-400" />,
      stack: ["Python", "Django", "JWT Rotation", "Redis Crypto"],
      desc: "Implemented a robust, high-availability security broker supplying multi-tenant RBAC permissions, token validation checkpoints, sliding absolute-timeout expiration window rotation, and Redis session blocklists.", 
      link: "#" 
    },
    { 
      title: "SKM Tech Corporate Portfolio", 
      scope: "UI/UX & Component Architecture",
      icon: <Layers size={18} className="text-cyan-400" />,
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
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 pb-24 md:pb-36 relative">
        
        {/* Calibrated Ambient Space Glow */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] lg:w-[800px] h-[300px] bg-gradient-to-b from-blue-500/5 via-indigo-500/5 to-transparent blur-[80px] sm:blur-[140px] pointer-events-none z-0" />

        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 sm:gap-20 relative z-10">
          
          {/* Text Presentation */}
          <div className="w-full flex-1 space-y-6 sm:space-y-8 text-center lg:text-left transform-gpu animate-[fadeIn_0.8s_ease-out]">
            <div className="inline-flex items-center gap-2.5 bg-slate-950/80 border border-slate-900/80 px-4 py-2 rounded-full shadow-2xl backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,1)] animate-pulse" />
              {/* Scaled up from text-[9px] to text-xs */}
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-blue-400 font-bold">
                Full-Stack Software Developer
              </span>
            </div>

            {/* Title font scaling adjustment */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] font-sans">
              Saroj Kumar <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400">Mahato</span>
            </h1>

            {/* Main description text adjusted to modern text-base / text-lg */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              I specialize in turning complex system requirements into pristine digital assets—crafting exceptional interactive frontends with <span className="text-blue-400 font-semibold">React</span> and designing bulletproof backend infrastructures with <span className="text-indigo-400 font-semibold">Django</span>.
            </p>

            {/* Refined buttons with larger font and user-friendly labels */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto text-sm tracking-wide">
              <a
                href="#works"
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 rounded-xl hover:bg-slate-200 transition-all duration-300 shadow-xl text-center font-bold transform-gpu hover:-translate-y-0.5 active:translate-y-0"
              >
                View Portfolio
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 bg-slate-950/60 border border-slate-800 text-slate-200 rounded-xl hover:bg-slate-900 hover:border-slate-700 transition-all duration-300 text-center backdrop-blur-sm transform-gpu hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 font-medium"
              >
                <span>Get In Touch</span>
                <ArrowUpRight size={16} className="text-slate-400" />
              </a>
            </div>
          </div>

          {/* Premium Spatial Profile Presentation */}
          <div className="flex-shrink-0 relative group z-10 transform-gpu animate-[fadeIn_1s_ease-out] w-56 h-56 sm:w-72 sm:h-72 lg:w-auto lg:h-auto">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 to-indigo-500/0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none" />
            
            <div className="p-3 bg-slate-950/40 border border-slate-900 rounded-[2rem] backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              {/* Increased size footprint for profile grid */}
              <div className="w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden relative border border-slate-900 bg-slate-950">
                <img
                  src={skmPic}
                  alt="Saroj Kumar Mahato"
                  className="w-full h-full object-cover grayscale contrast-[1.05] saturate-[0.85] transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-[#030712]/20 pointer-events-none mix-blend-multiply" />
              </div>
            </div>
            
            {/* Minimalist Blueprint Label */}
            <div className="absolute -bottom-2 -left-2 sm:bottom-6 sm:-left-4 bg-slate-950/90 border border-slate-800/80 px-3 py-2 rounded-xl text-xs font-mono tracking-wider text-slate-300 backdrop-blur-sm shadow-xl flex items-center gap-2 transform-gpu -rotate-2 group-hover:rotate-0 transition-transform duration-300">
              <Code size={14} className="text-blue-500" /> Status: Active
            </div>
          </div>

        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="border-t border-slate-900/50 bg-[#02050c] py-24 sm:py-36 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          <div className="max-w-2xl mb-20 sm:mb-28 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-blue-500 uppercase font-bold">
              <span>//</span> Featured Projects
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
              Production Implementations
            </h2>
            <p className="text-slate-400 font-normal text-base sm:text-lg leading-relaxed">
              Vetted applications built with precise data models, clean execution protocols, and polished interface mechanics.
            </p>
          </div>

          {/* Interactive Stacked Rows Layout */}
          <div className="space-y-5">
            {projects.map((proj, idx) => (
              <div 
                key={idx} 
                className="interactive-project-row group relative w-full bg-slate-950/20 border border-slate-900/60 rounded-2xl p-6 sm:p-10 flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-10 items-start lg:items-center transition-all duration-300 ease-out hover:bg-slate-900/30 hover:border-slate-800/80 overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(400px_circle_at_var(--mx,0px)_var(--my,0px),#1e3a8a0c,transparent_100%)]" />
                
                {/* Identification Label (Col 2) */}
                <div className="font-mono lg:col-span-2 space-y-1">
                  <span className="block text-xs font-semibold text-slate-500 group-hover:text-blue-400 transition-colors">
                    Project Build 0{idx + 1}
                  </span>
                  <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {proj.scope}
                  </span>
                </div>

                {/* Main Specification Data Block (Col 7) */}
                <div className="w-full lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3.5">
                    {/* Bigger icon holder context */}
                    <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center shadow-inner">
                      {proj.icon}
                    </div>
                    {/* Font scale adjustment: text-xl to text-2xl */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                      {proj.title}
                    </h3>
                  </div>
                  
                  {/* Clean readable paragraph weights */}
                  <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
                    {proj.desc}
                  </p>
                  
                  {/* Tech Tokens */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {proj.stack.map((tech, i) => (
                      <span 
                        key={i} 
                        className="text-xs font-mono tracking-normal px-3 py-1 rounded-lg bg-slate-950 border border-slate-900 text-slate-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Link Component (Col 3) */}
                <div className="w-full lg:col-span-3 lg:text-right pt-3 lg:pt-0">
                  <a 
                    href={proj.link} 
                    className="w-full lg:w-auto inline-flex items-center justify-center lg:justify-start gap-2.5 text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 group-hover:text-white group-hover:border-blue-500/40 group-hover:bg-blue-500/10 transition-all duration-300 shadow-sm"
                  >
                    <span>Inspect Project</span>
                    <ArrowUpRight size={14} className="text-slate-400 group-hover:text-blue-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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