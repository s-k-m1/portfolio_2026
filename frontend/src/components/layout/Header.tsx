"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Twitter, X } from "lucide-react";
import { SITE } from "@/lib/site";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Services", path: "/services" },
  { label: "Experience", path: "/experience" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const SOCIALS = [
  { href: SITE.github, label: "GitHub", Icon: Github },
  { href: SITE.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SITE.twitter, label: "Twitter / X", Icon: Twitter },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-violet-400/25 bg-night/80 shadow-[0_0_28px_rgb(139_92_246/0.30)] backdrop-blur-xl"
            : "border-b border-violet-400/10 bg-night/30 shadow-[0_0_20px_rgb(139_92_246/0.12)] backdrop-blur-md"
        }`}
      >
      <div className="relative flex w-full items-center justify-between gap-4 py-3 pl-[20px] pr-5 sm:pr-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-lg"
          aria-label={SITE.shortName}
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-[2px] shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-105">
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
          <span className="text-sm font-semibold tracking-tight text-white">
            {SITE.shortName}
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                aria-current={active ? "page" : undefined}
                className={`group relative rounded-lg px-3.5 py-2 text-sm font-medium tracking-wide transition-colors duration-200 ${
                  active
                    ? "bg-white/[0.06] text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span className="relative">
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-center rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400 transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-1 pr-[20px] md:flex">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-lg p-2 text-slate-400 transition-all duration-200 hover:bg-violet-500/10 hover:text-violet-300"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <button
          onClick={() => setNavOpen((v) => !v)}
          className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-violet-400/40 md:hidden"
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-expanded={navOpen}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-[2px] w-full rounded-full bg-white transition-all duration-300 ${
                navOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-[2px] w-full -translate-y-1/2 rounded-full bg-white transition-all duration-300 ${
                navOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-[2px] w-full rounded-full bg-white transition-all duration-300 ${
                navOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </div>

      {navOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div
            className="absolute inset-0 animate-fade-in bg-night/70 backdrop-blur-sm"
            onClick={() => setNavOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-72 max-w-[85%] animate-drawer flex-col rounded-l-3xl border-l border-white/10 bg-ink shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <span className="flex items-center gap-2 text-sm font-bold text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-[2px]">
                  <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-night">
                    <Image
                      src="/assets/images/skm-logo.png"
                      alt={`${SITE.shortName} logo`}
                      width={26}
                      height={26}
                      className="h-[22px] w-[22px] object-contain"
                    />
                  </span>
                </span>
                Menu
              </span>
              <button
                onClick={() => setNavOpen(false)}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-5" aria-label="Mobile">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setNavOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      active
                        ? "bg-white/[0.06] text-white"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 group-hover:bg-violet-400 ${
                        active
                          ? "bg-gradient-to-r from-indigo-400 to-fuchsia-400 shadow-[0_0_8px_rgb(192_132_252/0.8)]"
                          : "bg-slate-600"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
              <div className="flex gap-2">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-slate-300 transition-colors hover:border-violet-400/40 hover:text-violet-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-slate-600">
                Menu
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
