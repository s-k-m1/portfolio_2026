import React from "react";
import { Github, ExternalLink, Database, GraduationCap, BookOpen, Users, ShieldCheck, Layers, Code } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectCard({ project, index, handleLink }) {
  const getIcon = (type) => {
    const icons = {
      database: <Database size={16} />,
      graduation: <GraduationCap size={16} />,
      book: <BookOpen size={16} />,
      users: <Users size={16} />,
      shield: <ShieldCheck size={16} />,
      layers: <Layers size={16} />
    };
    return icons[type] || <Code size={16} />;
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -8 }}
      onClick={(e) => handleLink(e, project.demo)}
      className="h-full flex flex-col bg-[#050b14] border border-slate-800 rounded-xl p-6 sm:p-8 cursor-pointer hover:border-blue-500/50 transition-all group"
    >
      {/* Index & Category */}
      <div className="flex justify-between items-start mb-6">
        <span className="font-mono text-[10px] text-slate-500">SYS_BUILD_0{index + 1}</span>
        <div className="text-slate-400">
           {getIcon(project.type)}
        </div>
      </div>

      {/* Main Content - Flex-grow forces this to push the footer down */}
      <div className="flex-grow">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 uppercase leading-tight">
          {project.title}
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
          {project.desc}
        </p>
      </div>

      {/* Tags & Footer Actions */}
      <div className="mt-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech?.map((tech, i) => (
            <span key={i} className="text-[9px] uppercase font-mono px-2 py-1 bg-slate-900 border border-slate-800 text-slate-500 rounded">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3 pt-4 border-t border-slate-900">
           {project.github && (
             <a href={project.github} onClick={(e) => e.stopPropagation()} className="text-slate-500 hover:text-blue-400">
               <Github size={18} />
             </a>
           )}
           {project.demo && project.demo !== "#" && (
             <a href={project.demo} onClick={(e) => e.stopPropagation()} className="text-slate-500 hover:text-blue-400 ml-auto">
               <ExternalLink size={18} />
             </a>
           )}
        </div>
      </div>
    </motion.div>
  );
}