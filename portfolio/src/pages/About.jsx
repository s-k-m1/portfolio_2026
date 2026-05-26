import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  Globe, 
  Database, 
  Layers, 
  ShieldAlert, 
  Wrench,
  Code2,
  Activity,
  Milestone,
  GraduationCap
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

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
    <div className="space-y-2.5 font-mono group">
      <div className="flex justify-between text-sm sm:text-base tracking-wide font-medium">
        <span className="text-slate-200 group-hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
          <span className="text-sm text-blue-500 font-black">&gt;</span>
          {name}
        </span>
        <span className="text-cyan-400 font-bold tracking-wide">{percentage}%</span>
      </div>
      
      <div className="h-3 w-full bg-slate-950 border-2 border-slate-800 rounded-md p-[1px] relative flex items-center shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 rounded-sm transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(59,130,246,0.5)]"
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

  const resolvedData = Array.isArray(data) ? data[0] : data;
  const aboutData = resolvedData?.about || resolvedData || {};
  
  const fallbackSkills = {
    frontend: [
      { name: "React.js (SPA / Hooks)", percentage: 60 },
      { name: "JavaScript (ES6+) & JSON", percentage: 68 },
      { name: "Tailwind CSS & HTML5", percentage: 72 }
    ],
    backend: [
      { name: "Python & Django Framework", percentage: 64 },
      { name: "Django REST Framework (DRF)", percentage: 62 },
      { name: "PostgreSQL / MySQL / ORM", percentage: 70 }
    ],
    toolsAndLanguages: [
      { name: "Postman API Testing", percentage: 40 },
      { name: "Git & Enterprise GitHub", percentage: 86 },
      { name: "Jira Agile Management", percentage: 40 },
      { name: "C / Java Basics", percentage: 65 }
    ]
  };

  const skillsData = resolvedData?.skills || fallbackSkills;

  return (
    <section className="relative pt-6 sm:pt-7 pb-15 px-4 sm:px-4 lg:px-8 bg-[#020617] text-slate-100 overflow-hidden">
      
      {/* Space Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Module Header with Entrance Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={animate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-slate-800 pb-6 gap-4"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-slate-950 border-2 border-slate-800 px-3 py-1.5 rounded-md shadow-md">
              <Terminal className="w-4 h-4 text-blue-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 font-black">STABLE.CORE_PROFILE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-none">
              {aboutData.title || "About Me"}
            </h1>
          </div>
          <div className="font-mono text-base md:text-lg text-blue-400 font-bold tracking-wide">
            {`// Specializing in Python / Django Full-Stack Architecture`}
          </div>
        </motion.div>

        {/* 3-Column Workspace Dashboard Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Column 1: Core Terminal Console */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bg-slate-950/70 border-2 border-slate-800 hover:border-slate-700 transition-colors duration-300 p-6 sm:p-7 rounded-xl backdrop-blur-xl flex flex-col justify-between shadow-2xl relative overflow-hidden group min-h-[460px]"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/60" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  <span className="ml-2 font-mono text-sm text-slate-400 font-medium">django_manifest.json</span>
                </div>
                <Cpu className="w-5 h-5 text-slate-500 group-hover:text-blue-500 transition-colors" />
              </div>

              {/* Large, Clear-Read Body Text */}
              <div className="text-slate-200 text-base sm:text-lg leading-relaxed font-sans font-normal space-y-4">
                {aboutData.description || aboutData.bio ? (
                  <p>{aboutData.description || aboutData.bio}</p>
                ) : (
                  <p>
                    Focused Software Developer specializing in engineering Python backend microservices and full-stack systems. Driven by combining robust, object-oriented Django MVC layouts with clean, interactive user environments built on React.js.
                  </p>
                )}
              </div>
            </div>

            {/* Embedded Live Console Stream */}
            <div className="mt-8 space-y-5">
              <div className="p-4 bg-slate-950 border-2 border-slate-900 rounded-lg font-mono text-xs text-slate-300 space-y-1.5 shadow-md">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2 text-slate-400 font-bold">
                  <span className="flex items-center gap-2">
                    <Activity size={14} className="text-blue-500 animate-pulse" />
                    WSGI_SERVER_FEED
                  </span>
                  <span className="text-emerald-400">● LIVE</span>
                </div>
                <p><span className="text-indigo-400">[django]</span> PyTest / model assertions verified</p>
                <p><span className="text-cyan-400">[postgres]</span> ORM query pools pooled securely</p>
              </div>

              {/* Status Section Footnote */}
              <div className="pt-4 border-t border-slate-800/60 grid grid-cols-3 gap-2 font-mono text-xs text-slate-400">
                <div>
                  <span className="block text-[10px] uppercase font-black text-slate-500">Engine</span>
                  <span className="text-blue-400 font-bold mt-1 block">Python 3.x</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-black text-slate-500">Location</span>
                  <span className="text-slate-200 truncate font-semibold mt-1 block">
                    {aboutData.location || "Kathmandu, NP"}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-black text-slate-500">Operation</span>
                  <span className="text-emerald-400 font-bold mt-1 block">DRF_API</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Balanced Core Engineering Matrix */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bg-slate-950/70 border-2 border-slate-800 hover:border-slate-700 transition-colors duration-300 p-6 sm:p-7 rounded-xl backdrop-blur-xl flex flex-col gap-6 justify-between shadow-2xl"
          >
            {/* Django Backend Matrix */}
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
                <Database className="w-4 h-4 text-cyan-400" />
                <h3 className="font-mono text-sm uppercase tracking-wider font-black text-slate-200">Python Backend Infrastructure</h3>
              </div>
              <div className="space-y-4">
                {skillsData.backend?.map((skill, index) => (
                  <SkillBar key={`be-${index}`} name={skill.name} percentage={skill.percentage || skill.percent} animate={animate} />
                )) || <div className="text-sm font-mono text-slate-600">NO_DATA</div>}
              </div>
            </div>

            {/* Frontend Matrix */}
            <div className="space-y-4 flex-1 pt-4 border-t border-slate-800/40">
              <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
                <Layers className="w-4 h-4 text-indigo-400" />
                <h3 className="font-mono text-sm uppercase tracking-wider font-black text-slate-200">React Frontend Systems</h3>
              </div>
              <div className="space-y-4">
                {skillsData.frontend?.map((skill, index) => (
                  <SkillBar key={`fe-${index}`} name={skill.name} percentage={skill.percentage || skill.percent} animate={animate} />
                )) || <div className="text-sm font-mono text-slate-600">NO_DATA</div>}
              </div>
            </div>
          </motion.div>

          {/* Column 3: Framework Toolsets & Academic Anchor */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bg-slate-950/70 border-2 border-slate-800 hover:border-slate-700 transition-colors duration-300 p-6 sm:p-7 rounded-xl backdrop-blur-xl flex flex-col justify-between shadow-2xl md:col-span-2 lg:col-span-1"
          >
            {/* Tools Block */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
                <Wrench className="w-4 h-4 text-blue-400" />
                <h3 className="font-mono text-sm uppercase tracking-wider font-black text-slate-200">Testing Tools & Agile</h3>
              </div>
              <div className="space-y-4">
                {skillsData.toolsAndLanguages?.map((skill, index) => (
                  <SkillBar key={`tl-${index}`} name={skill.name} percentage={skill.percentage || skill.percent} animate={animate} />
                )) || <div className="text-sm font-mono text-slate-600">NO_DATA</div>}
              </div>
            </div>

            {/* Academic Board */}
            <div className="mt-6 pt-5 border-t border-slate-800/40 space-y-3">
              <div className="flex items-center gap-2 text-slate-300 font-mono text-sm font-black">
                <GraduationCap size={18} className="text-indigo-400" />
                UNIVERSITY_REGIME
              </div>
              <div className="bg-slate-950 border-2 border-slate-900 p-4 rounded-xl font-mono text-sm space-y-1.5 shadow-inner">
                <p className="text-slate-100 font-bold text-base truncate">Bachelor of Computer Science & IT</p>
                <p className="text-slate-400 text-xs font-semibold">Pokhara University Core Program</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Operational Focus Highlights Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {[
            {
              icon: <Code2 size={18} className="text-indigo-400" />,
              title: "01 // Django & React Integration Architecture",
              text: "Building scalable decoupled architectures. Connecting Python backend business configurations seamlessly with component-driven React.js clients via JWT-protected API frameworks."
            },
            {
              icon: <Database size={18} className="text-cyan-400" />,
              title: "02 // Database Management & Agile Pipeline",
              text: "Developing normalized database relationships across PostgreSQL and MySQL. Automating payload analysis flows inside Postman arrays while staying synchronized with team workflows on Jira."
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-slate-950/50 border-2 border-slate-800 hover:border-slate-700 p-6 rounded-xl space-y-3 transition-colors duration-300 shadow-lg"
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <h4 className="text-base sm:text-lg font-black text-white font-mono uppercase tracking-wide">{item.title}</h4>
              </div>
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed font-sans">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footprint Impact Ticker Metric Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 pt-8 border-t-2 border-slate-800"
        >
          {[
            { label: "DJANGO_DEPLOYMENTS", value: "12+", sub: "Full Stack Apps Online" },
            { label: "API_TEST_ASSERTIONS", value: "150+", sub: "Verified Postman Runs" },
            { label: "AGILE_SPRINTS", value: "25+", sub: "Organized via Jira Boards" },
            { label: "DATABASE_SCHEMAS", value: "40+", sub: "Relational Engine Tables" },
          ].map((metric, index) => (
            <div key={index} className="bg-slate-950 border-2 border-slate-800 hover:border-slate-700 p-5 rounded-xl font-mono shadow-xl transition-colors duration-300">
              <span className="text-[10px] sm:text-xs text-slate-400 block font-black tracking-widest">{metric.label}</span>
              <span className="text-3xl sm:text-4xl font-black text-blue-500 block mt-1.5">{metric.value}</span>
              <span className="text-xs sm:text-sm text-slate-300 font-sans font-normal block leading-tight mt-1">{metric.sub}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}