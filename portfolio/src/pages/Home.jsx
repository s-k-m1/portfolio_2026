import React, { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import skmPic from "../assets/images/skm-pic.jpeg";
import { projectData } from "../data/projectData";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const navigate = useNavigate();

  const defaultProjects = [
    projectData.find((p) => p.category === "Frontend"),
    projectData.find((p) => p.category === "Backend"),
    projectData.find((p) => p.category === "Full Stack"),
  ].filter(Boolean);

  useEffect(() => {
    const cards = document.querySelectorAll(".interactive-project-row");

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xc = rect.width / 2;
      const yc = rect.height / 2;

      const angleX = (yc - y) / 15;
      const angleY = (x - xc) / 30;

      card.style.transform =
        `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-2px)`;
    };

    const handleMouseLeave = (card) => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    };

    cards.forEach((card) => {
      const move = (e) => handleMouseMove(e, card);
      const leave = () => handleMouseLeave(card);

      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);

      card.cleanup = () => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      };
    });

    return () => {
      cards.forEach((card) => card.cleanup?.());
    };
  }, []);

  return (
    <div className="bg-[#030712] min-h-screen text-slate-100 font-sans">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-8 pb-10">

        <div className="flex flex-col items-center text-center space-y-5">

          {/* TAG */}
          <div className="inline-flex items-center gap-2 text-sm text-blue-400">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            FULL STACK DEVELOPER
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
  
        {/* LEFT tira ko CONTENT */}
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-4">
            Saroj Kumar <span className="text-slate-400">Mahato</span>
          </h1>

          <p className="text-slate-400 max-w-xl leading-relaxed">
            I build scalable web applications using React, Django, and modern system architecture.
          </p>
        </div>

        {/* RIGHT ko IMAGE */}
        <div className="flex justify-center">
          <img
            src={skmPic}
            alt="profile"
            className="w-105 h-110 rounded-full object-cover border-4 border-slate-800"
          />
        </div>

      </div>

          {/* BUTTON */}
          <button
            onClick={() =>
              document.getElementById("works").scrollIntoView({ behavior: "smooth" })
            }
            className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition"
          >
            View Projects
          </button>

        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="works"
        className="border-t border-slate-900 bg-[#02050c] py-10"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

          <h2 className="text-3xl font-bold mb-8">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {defaultProjects.map((project, index) => (
              <div key={index} className="interactive-project-row">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigate("/projects")}
              className="px-6 py-3 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-900 transition"
            >
              View More Projects{" "}
              <ArrowUpRight size={16} className="inline ml-2" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}