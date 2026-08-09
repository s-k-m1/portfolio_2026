import type { Metadata } from "next";
import { Code2, Database, GitBranch, Layers, Terminal, Workflow } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { getServices, getContentBlocks } from "@/lib/api";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Web development services by ${SITE.name} — full-stack development, React frontends, Django backends, APIs, and agile delivery.`,
};

const ICON_MAP: Record<string, React.ReactNode> = {
  "react.js client applications": <Layers className="h-5 w-5" />,
  "react frontend systems": <Layers className="h-5 w-5" />,
  "django & python backends": <Terminal className="h-5 w-5" />,
  "api design & qa": <Database className="h-5 w-5" />,
  "agile management": <Workflow className="h-5 w-5" />,
  "version control & ci/cd": <GitBranch className="h-5 w-5" />,
};

function ServiceIcon({ title }: { title: string }) {
  const key = title.toLowerCase().trim();
  return ICON_MAP[key] ?? <Code2 className="h-5 w-5" />;
}

export default async function ServicesPage() {
  const [services, content] = await Promise.all([getServices(), getContentBlocks()]);

  return (
    <div className="relative overflow-hidden">
      <div className="aurora-blob left-[-12%] top-[-8%] h-[22rem] w-[22rem] animate-float bg-violet-600/25" aria-hidden />
      <div className="aurora-blob right-[-12%] top-[30%] h-[18rem] w-[18rem] animate-float-slow bg-cyan-500/15" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Services
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
            What I <span className="text-aurora">Offer</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
            {content["services-intro"]}
          </p>
        </Reveal>

        {services.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 110}>
                <div className="glass group h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/30 hover:shadow-[0_16px_50px_-12px_rgb(139_92_246/0.3)]">
                  <div className="mb-5 flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-110">
                      <ServiceIcon title={s.title} />
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-slate-400">
                      {s.category}
                    </span>
                  </div>
                  <h3 className="text-[17px] font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-400">
                    {s.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-sm text-slate-500">
            Services coming soon.
          </p>
        )}
      </div>
    </div>
  );
}