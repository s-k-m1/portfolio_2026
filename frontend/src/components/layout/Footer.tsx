import Image from "next/image";
import { Github, Linkedin, Twitter, MapPin, Mail, Phone } from "lucide-react";
import { getProfile, getContentBlocks } from "@/lib/api";
import { SITE } from "@/lib/site";

export default async function Footer() {
  const year = new Date().getFullYear();
  const [profile, content] = await Promise.all([getProfile(), getContentBlocks()]);

  const email = profile?.email || SITE.email;
  const phone = profile?.phone || SITE.phone;
  const location = profile?.address || SITE.location;
  const github = profile?.github || SITE.github;
  const linkedin = profile?.linkedin || SITE.linkedin;
  const tagline = profile?.tagline || content["footer-tagline"] || SITE.tagline;
  const fullName = profile?.full_name || SITE.name;
  const socials = [
    { href: github, label: "GitHub", Icon: Github },
    { href: linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: SITE.twitter, label: "Twitter / X", Icon: Twitter },
  ];

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-ink/80">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <p className="flex items-center gap-2.5 text-base font-bold tracking-tight text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-[2px] shadow-lg shadow-violet-500/20">
                <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-night">
                  <Image
                    src="/assets/images/skm-logo.png"
                    alt={`${SITE.shortName} logo`}
                    width={28}
                    height={28}
                    className="h-6 w-6 object-contain"
                  />
                </span>
              </span>
              {SITE.shortName}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {tagline}
            </p>
            <div className="mt-5 flex gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-slate-400 transition-all duration-200 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
              Contact
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-violet-400">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-600">
                    Location
                  </p>
                  {location}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-violet-400">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-600">
                    Email
                  </p>
                  <a href={`mailto:${email}`} className="transition-colors hover:text-violet-300">
                    {email}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-violet-400">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-600">
                    Phone
                  </p>
                  <a
                    href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                    className="transition-colors hover:text-violet-300"
                  >
                    {phone}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Availability */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
              Availability
            </h3>
            <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                {content["availability-badge"] || "Open for projects"}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                {content["availability-note"]}
              </p>
            </div>
            <a
              href={`mailto:${email}?subject=Project%20Inquiry`}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-violet-500/45 hover:brightness-110"
            >
              {content["footer-cta-button"] || "Let's Talk"}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {year} {fullName}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-violet-400">{content["footer-built-with"]}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}