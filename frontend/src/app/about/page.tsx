import type { Metadata } from "next";
import { GraduationCap, MapPin, Award, Briefcase, Mail, Sparkles } from "lucide-react";
import SkillBar from "@/components/ui/SkillBar";
import Reveal from "@/components/ui/Reveal";
import { getSkills, getProfile, getEducation, getCertifications, getContentBlocks } from "@/lib/api";
import { formatDate, formatPeriod } from "@/lib/format";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `About — ${SITE.shortName}`,
  description: SITE.description,
};

export default async function AboutPage() {
  const [skills, profile, education, certifications, content] = await Promise.all([
    getSkills(),
    getProfile(),
    getEducation(),
    getCertifications(),
    getContentBlocks(),
  ]);

  const facts = [
    { icon: Briefcase, label: "Role", value: profile?.role || SITE.role },
    { icon: MapPin, label: "Based in", value: profile?.address || SITE.location },
    { icon: Mail, label: "Email", value: profile?.email || SITE.email },
    { icon: Sparkles, label: "Availability", value: content["availability-badge"] || "Open for projects" },
  ];

  const groups = Array.from(new Set(skills.map((s) => s.category))).map((category) => ({
    category,
    items: skills.filter((s) => s.category === category),
  }));

  return (
    <div className="relative overflow-hidden">
      <div className="aurora-blob left-[-15%] top-[-10%] h-[24rem] w-[24rem] animate-float bg-indigo-600/25" aria-hidden />
      <div className="aurora-blob right-[-10%] bottom-[10%] h-[20rem] w-[20rem] animate-float-slow bg-fuchsia-600/20" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            About
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
            About <span className="text-aurora">Me</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
            {profile?.portfolio_description || SITE.tagline}
          </p>
          {profile?.address && (
            <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin className="h-4 w-4 text-violet-400" />
              Based in {profile.address}
            </p>
          )}
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {facts.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 90}>
              <div className="glass group flex items-center gap-4 rounded-2xl p-5 transition-colors duration-300 hover:border-violet-400/30">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-110">
                  <fact.icon className="h-5 w-5 text-white" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {fact.label}
                  </p>
                  <p className="truncate text-sm font-semibold text-white">{fact.value}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {groups.length > 0 && (
          <section className="mt-14">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Technical <span className="text-aurora">Skills</span>
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {groups.map((group, gi) => (
                <Reveal key={group.category} delay={gi * 110}>
                  <div className="glass rounded-2xl p-7 transition-colors duration-300 hover:border-violet-400/30">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-violet-300">
                      {group.category}
                    </h3>
                    <div className="mt-6 space-y-4">
                      {group.items.map((skill) => (
                        <SkillBar key={skill.id} skill={skill} />
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mt-14">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                <span className="text-aurora">Education</span>
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {education.map((edu, ei) => (
                <Reveal key={edu.id} delay={ei * 110}>
                  <div className="glass flex items-start gap-4 rounded-2xl p-7 transition-colors duration-300 hover:border-violet-400/30">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-violet-500/25">
                      <GraduationCap className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="font-bold leading-snug text-white">{edu.degree}</h3>
                      <p className="mt-0.5 text-sm text-slate-400">{edu.institution}</p>
                      <p className="mt-1 text-xs font-medium text-violet-300">
                        {formatPeriod(edu.start_date, edu.end_date)}
                      </p>
                      {edu.field && (
                        <p className="mt-1 text-xs text-slate-500">{edu.field}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="mt-14">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                <span className="text-aurora">Certifications</span>
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {certifications.map((cert, ci) => (
                <Reveal key={cert.id} delay={(ci % 4) * 90}>
                  <div className="glass group h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-110">
                      <Award className="h-5 w-5 text-white" />
                    </span>
                    <h3 className="mt-4 font-bold leading-snug text-white">{cert.title}</h3>
                    <p className="mt-1 text-sm text-violet-300">{cert.issuer}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      Issued {formatDate(cert.issue_date)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}