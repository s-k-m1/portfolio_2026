import type { Metadata } from "next";
import { Briefcase, GraduationCap, Award, CalendarDays } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { getExperience, getEducation, getCertifications } from "@/lib/api";
import { formatDate, formatPeriod } from "@/lib/format";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Experience",
  description: `Professional experience, education, and certifications of ${SITE.name}, Full Stack Developer.`,
};

export default async function ExperiencePage() {
  const [experiences, education, certifications] = await Promise.all([
    getExperience(),
    getEducation(),
    getCertifications(),
  ]);

  return (
    <div className="relative overflow-hidden">
      <div className="aurora-blob left-[-12%] top-[-8%] h-[22rem] w-[22rem] animate-float bg-indigo-600/25" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Experience
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
            Experience & <span className="text-aurora">Education</span>
          </h1>
        </Reveal>

        <section className="mt-14" aria-label="Professional experience">
          <Reveal>
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              <Briefcase className="h-5 w-5 text-violet-400" /> Professional Experience
            </h2>
          </Reveal>
          {experiences.length > 0 ? (
            <ol className="mt-8 space-y-8 border-l-2 border-white/10 pl-8">
              {experiences.map((exp, i) => (
                <li key={exp.id} className="relative">
                  <Reveal delay={i * 110}>
                    <span className="absolute -left-[41px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-violet-500/40">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                    {exp.is_current && (
                      <span className="animate-glow rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-violet-300">
                    {exp.company}
                    {exp.location ? ` — ${exp.location}` : ""}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatPeriod(exp.start_date, exp.end_date)}
                  </p>
                  {exp.description && (
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                      {exp.description}
                    </p>
                  )}
                  </Reveal>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-8 rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-500">
              Experience timeline coming soon.
            </p>
          )}
        </section>

        <section className="mt-14" aria-label="Education">
          <Reveal>
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              <GraduationCap className="h-5 w-5 text-violet-400" /> Education
            </h2>
          </Reveal>
          {education.length > 0 ? (
            <div className="mt-8 space-y-4">
              {education.map((e, i) => (
                <Reveal key={e.id} delay={i * 100}>
                  <div className="glass rounded-2xl p-6 transition-colors duration-300 hover:border-violet-400/30">
                    <h3 className="text-lg font-bold text-white">{e.degree}</h3>
                    <p className="mt-1 text-sm font-medium text-violet-300">{e.institution}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {e.field} — {formatPeriod(e.start_date, e.end_date)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-500">
              No education entries yet.
            </p>
          )}
        </section>

        <section className="mt-14" aria-label="Certifications">
          <Reveal>
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              <Award className="h-5 w-5 text-violet-400" /> Certifications
            </h2>
          </Reveal>
          {certifications.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {certifications.map((c, i) => (
                <Reveal key={c.id} delay={(i % 2) * 110}>
                  <div className="glass group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-bold text-white">{c.title}</p>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-violet-500/25">
                        <Award className="h-4 w-4 text-white" />
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-violet-300">{c.issuer}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      Issued {formatDate(c.issue_date)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-500">
              No certifications yet.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}