"use client";

import { useEffect, useState } from "react";
import type { Skill } from "@/types";

interface SkillBarProps {
  skill: Skill;
  animate?: boolean;
}

export default function SkillBar({ skill, animate = true }: SkillBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setWidth(animate ? skill.percentage : 0);
    });
    return () => cancelAnimationFrame(id);
  }, [animate, skill.percentage]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-200">{skill.name}</span>
        <span className="font-bold text-violet-300">{skill.percentage}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="relative h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
          role="progressbar"
          aria-valuenow={skill.percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skill.name}: ${skill.percentage}%`}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>
      </div>
    </div>
  );
}