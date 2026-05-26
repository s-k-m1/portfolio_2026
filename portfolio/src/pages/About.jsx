import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  Globe, 
  Database, 
  Layers, 
  ShieldAlert, 
  FolderGit2,
  Wrench,
  Code2,
  Activity,
  Milestone
} from 'lucide-react';

const SkillBar = ({ name, percentage = 0, animate }) => {
  const [currentWidth, setCurrentWidth] = useState(0);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setCurrentWidth(percentage);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setCurrentWidth(0);
    }
  }, [animate, percentage]);

  return (
    <div className="space-y-1.5 font-mono group">
      <div className="flex justify-between text-xs tracking-wider">
        <span className="text-slate-300 group-hover:text-blue-400 transition-colors duration-300 flex items-center gap-1.5">
          <span className="text-[10px] text-blue-500/60 font-bold">&gt;_</span>
          {name}
        </span>
        <span className="text-blue-400/80 font-semibold">{percentage}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-950/80 rounded-sm overflow-hidden border border-slate-900/40 p-[1px]">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 rounded-sm transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(59,130,246,0.4)]"
          style={{ width: `${currentWidth}%` }}
        />
      </div>
    </div>
  );
};

export default function About({ data }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    return () => setAnimate(false);
  }, []);

  // Universal Parsing Engine: Resolves data variations from Arrays or Objects
  const resolvedData = Array.isArray(data) ? data[0] : data;
  const aboutData = resolvedData?.about || resolvedData || {};
  
  // Fallback skills architecture representing your exact technical assets
  const fallbackSkills = {
    frontend: [
      { name: "React.js", percentage: 90 },
      { name: "JavaScript (ES6+)", percentage: 88 },
      { name: "HTML5 & CSS3", percentage: 92 }
    ],
    backend: [
      { name: "Django & Python", percentage: 92 },
      { name: "PostgreSQL", percentage: 85 },
      { name: "MySQL", percentage: 82 }
    ],
    toolsAndLanguages: [
      { name: "Postman API Testing", percentage: 88 },
      { name: "Git & GitHub Knowledge", percentage: 86 },
      { name: "Jira Agile Workflow", percentage: 80 },
      { name: "PHP / C / Java (Basic)", percentage: 65 }
    ]
  };

  const skillsData = resolvedData?.skills || fallbackSkills;

  return (
    <section id="about" className="relative pt-4 sm:pt-6 pb-16 sm:pb-24 px-4 sm:px-6 md:px-8 lg:px-16 bg-[#030712] text-slate-100 overflow-hidden">
      
      {/* Structural Accent Top Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800/20 to-transparent relative z-20 mb-2 sm:mb-4" />
      
      {/* Cybernetic Matrix Grid Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-gradient-to-tr from-blue-500/5 to-indigo-600/0 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none z-0" />

      {/* Content Container Panel Wrapper */}
      <div className="max-w-6xl mx-auto relative z-10 space-y-10 sm:space-y-14 mt-6 sm:mt-10">
        
        {/* Dynamic Hero Header Layout */}
        <div className="max-w-3xl space-y-3 sm:space-y-4 text-left mx-auto md:mx-0">
          <motion.div 
            initial={{ opacity: 0, translateY: 10 }}
            animate={animate ? { opacity: 1, translateY: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 bg-slate-950/80 border border-slate-900 px-2.5 py-1.5 rounded-md backdrop-blur-sm"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 font-semibold">
              SYSTEM_PROFILE_INITIALIZATION
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, translateY: 15 }}
            animate={animate ? { opacity: 1, translateY: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight uppercase"
          >
            {aboutData.title || "SYSTEM IDENTITY"}
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, translateY: 15 }}
            animate={animate ? { opacity: 1, translateY: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-xs sm:text-sm text-blue-400/90 font-mono tracking-wider font-medium block"
          >
            {`// ${aboutData.subtitle || aboutData.designation || "FULL_STACK_SOFTWARE_DEVELOPER"}`}
          </motion.h2>
        </div>

        {/* Modular Grid System: Terminal Bio & Technical Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start pt-2">
          
          {/* Left Column: Main Terminal Console & Live Log */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between h-full">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-950/20 border border-slate-900/60 p-6 sm:p-8 rounded-2xl backdrop-blur-sm flex flex-col justify-between shadow-2xl relative group overflow-hidden min-h-[360px]"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-900/40 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/60 shadow-[0_0_8px_rgba(239,68,68,0.3)]" />
                    <div className="w-2 h-2 rounded-full bg-amber-500/60 shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/60 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                    <span className="ml-1.5 font-mono text-[10px] text-slate-500 tracking-wider">identity_manifest.json</span>
                  </div>
                  <Cpu className="w-4 h-4 text-slate-700 group-hover:text-blue-500 transition-colors duration-500" />
                </div>

                <div className="font-mono text-[11px] text-slate-500 space-y-1">
                  <p className="text-blue-500/80 font-semibold"><span>$</span> cat profile.log</p>
                  <p className="text-[10px] text-slate-600">// Compiled system core parameters and architecture overview</p>
                </div>

                <div className="text-slate-300 font-light leading-relaxed text-xs sm:text-sm md:text-base space-y-4 font-sans">
                  {aboutData.description || aboutData.bio ? (
                    <p>{aboutData.description || aboutData.bio}</p>
                  ) : (
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                      Versatile Software Developer specialized in engineering reliable full-stack applications. Leveraging scalable environments like Django alongside performance-driven systems built in React.js, I bridge technical architecture with clean interactive implementations.
                    </p>
                  )}
                </div>
              </div>

              {/* Live Environment Monitor System Log Block */}
              <div className="mt-6 p-3 bg-slate-950/80 border border-slate-900 rounded-xl font-mono text-[10px] text-slate-400 space-y-1">
                <div className="flex items-center justify-between text-[9px] text-slate-500 uppercase tracking-wider pb-1.5 border-b border-slate-900/60 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Activity size={10} className="text-blue-500 animate-pulse" />
                    SYSTEM_METRIC_FEED
                  </span>
                  <span className="text-emerald-400 font-bold tracking-widest animate-pulse">● LIVE</span>
                </div>
                <p><span className="text-indigo-400">[git]</span> push origin main - status 200 OK</p>
                <p><span className="text-cyan-400">[db]</span> Migrated schemas securely to PostgreSQL</p>
                <p><span className="text-amber-400">[api]</span> Verified payloads via Postman assertions</p>
              </div>

              {/* Quick Metrics / Status Tickers */}
              <div className="mt-6 pt-4 border-t border-slate-900/40 grid grid-cols-3 gap-2 font-mono text-[10px] sm:text-xs text-slate-500">
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-600 uppercase tracking-widest text-[8px]">Status</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                    ONLINE
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-600 uppercase tracking-widest text-[8px]">Location</span>
                  <span className="text-slate-300 truncate tracking-wide flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-500 inline" />
                    {aboutData.location || "Kathmandu, Nepal"}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-600 uppercase tracking-widest text-[8px]">Operation</span>
                  <span className="text-slate-300 truncate font-semibold flex items-center gap-1">
                    <FolderGit2 className="w-3 h-3 text-slate-500 inline" />
                    FULL_STACK
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Technical Capabilities Glass Cards Stack */}
          <div className="lg:col-span-6 flex flex-col gap-6 w-full">
            
            {/* Frontend Architecture Glass Card */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-950/20 border border-slate-900/60 p-6 rounded-2xl backdrop-blur-sm relative group overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex items-center gap-2.5 mb-5 border-b border-slate-900/40 pb-3">
                <Layers className="w-4 h-4 text-indigo-400" />
                <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold text-slate-300">
                  Frontend Ecosystem
                </h3>
              </div>
              
              <div className="space-y-4">
                {skillsData.frontend && skillsData.frontend.length > 0 ? (
                  skillsData.frontend.map((skill, index) => (
                    <SkillBar 
                      key={`fe-${index}`} 
                      name={skill.name} 
                      percentage={skill.percentage || skill.percent} 
                      animate={animate} 
                    />
                  ))
                ) : (
                  <div className="text-[10px] font-mono text-slate-600 py-4 flex items-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600/70" />
                    NO_FRONTEND_DATA_REGISTERED
                  </div>
                )}
              </div>
            </motion.div>

            {/* Backend Infrastructure Glass Card */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-950/20 border border-slate-900/60 p-6 rounded-2xl backdrop-blur-sm relative group overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex items-center gap-2.5 mb-5 border-b border-slate-900/40 pb-3">
                <Database className="w-4 h-4 text-cyan-400" />
                <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold text-slate-300">
                  Backend & Database
                </h3>
              </div>
              
              <div className="space-y-4">
                {skillsData.backend && skillsData.backend.length > 0 ? (
                  skillsData.backend.map((skill, index) => (
                    <SkillBar 
                      key={`be-${index}`} 
                      name={skill.name} 
                      percentage={skill.percentage || skill.percent} 
                      animate={animate} 
                    />
                  ))
                ) : (
                  <div className="text-[10px] font-mono text-slate-600 py-4 flex items-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600/70" />
                    NO_BACKEND_DATA_REGISTERED
                  </div>
                )}
              </div>
            </motion.div>

            {/* Tools, Testing & Languages Glass Card */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-950/20 border border-slate-900/60 p-6 rounded-2xl backdrop-blur-sm relative group overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex items-center gap-2.5 mb-5 border-b border-slate-900/40 pb-3">
                <Wrench className="w-4 h-4 text-blue-400" />
                <h3 className="font-mono text-[10px] uppercase tracking-widest font-bold text-slate-300">
                  Tools & Architecture Frameworks
                </h3>
              </div>
              
              <div className="space-y-4">
                {skillsData.toolsAndLanguages && skillsData.toolsAndLanguages.length > 0 ? (
                  skillsData.toolsAndLanguages.map((skill, index) => (
                    <SkillBar 
                      key={`tl-${index}`} 
                      name={skill.name} 
                      percentage={skill.percentage || skill.percent} 
                      animate={animate} 
                    />
                  ))
                ) : (
                  <div className="text-[10px] font-mono text-slate-600 py-4 flex items-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600/70" />
                    NO_TOOLS_DATA_REGISTERED
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        </div>

        {/* Professional Impact Metrics Row Element */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2"
        >
          {[
            { label: "PROJ_COMPLETED", value: "12+", sub: "Django & React Systems Deployed" },
            { label: "API_ASSERTIONS", value: "150+", sub: "Endpoints Asserted via Postman" },
            { label: "AGILE_SPRINTS", value: "25+", sub: "Managed using Jira Protocols" },
            { label: "DATABASE_TABLES", value: "40+", sub: "PostgreSQL & MySQL Schemas" },
          ].map((metric, index) => (
            <div key={index} className="bg-slate-950/40 border border-slate-900/50 p-4 sm:p-5 rounded-xl font-mono shadow-md hover:border-slate-800 transition-colors duration-300">
              <span className="text-[8px] sm:text-[9px] text-slate-500 block tracking-wider uppercase">{metric.label}</span>
              <span className="text-xl sm:text-2xl font-bold text-blue-400 block my-1">{metric.value}</span>
              <span className="text-[10px] text-slate-400 font-sans font-light block leading-tight">{metric.sub}</span>
            </div>
          ))}
        </motion.div>

        {/* Operational Specialties Matrix (What I Do) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="space-y-4 pt-4"
        >
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 flex items-center gap-2">
            <Milestone size={12} className="text-blue-500" />
            OPERATIONAL_SPECIALTIES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/20 border border-slate-900/60 p-5 rounded-xl space-y-2 group hover:border-slate-800/80 transition-colors duration-300">
              <div className="flex items-center gap-2">
                <Code2 size={14} className="text-indigo-400" />
                <h4 className="text-xs sm:text-sm font-bold text-white font-mono uppercase tracking-wide">01 // Full-Stack System Design</h4>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed font-sans">
                Building highly performant, decoupled tech stacks. Integrating interactive React user interfaces seamlessly with modular Django backends using secure, authenticated pathways.
              </p>
            </div>
            <div className="bg-slate-950/20 border border-slate-900/60 p-5 rounded-xl space-y-2 group hover:border-slate-800/80 transition-colors duration-300">
              <div className="flex items-center gap-2">
                <Database size={14} className="text-cyan-400" />
                <h4 className="text-xs sm:text-sm font-bold text-white font-mono uppercase tracking-wide">02 // API Lifecycle & Agile Flow</h4>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed font-sans">
                Architecting detailed database models across MySQL and PostgreSQL. Running strict integration testing streams via Postman and organizing continuous delivery through Jira boards.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}