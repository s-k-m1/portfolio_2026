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
    const onScroll = () => setScrolled(window.scrollY > 10);
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
          ? "border-b border-white/10 bg-night/80 shadow-[0_8px_30px_rgb(0_0_0/0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between gap-4 pl-5 pr-4 py-3.5 sm:pr-6">
        <Link href="/" className="group flex animate-fade-up items-center gap-2.5" aria-label={SITE.shortName}>
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-[2px] shadow-lg shadow-violet-500/30 transition-transform duration-300 group-hover:scale-105">
            <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-night">
              <Image
                src="/assets/images/skm-logo.png"
                alt={`${SITE.shortName} logo`}
                width={32}
                height={32}
                className="h-7 w-7 object-contain"
              />
            </span>
          </span>
          <span className="text-sm font-bold tracking-tight text-white">
            {SITE.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.path}
              href={item.path}
              aria-current={isActive(item.path) ? "page" : undefined}
              style={{ animationDelay: `${i * 60}ms` }}
              className={`group relative animate-fade-up rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                isActive(item.path)
                  ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span className="relative">
                {item.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400 transition-all duration-300 ${
                    isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-0.5 md:flex">
          {SOCIALS.map(({ href, label, Icon }, i) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{ animationDelay: `${440 + i * 60}ms` }}
              className="animate-fade-up rounded-lg p-2 text-slate-400 transition-all duration-200 hover:scale-110 hover:bg-violet-500/10 hover:text-violet-300"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <button
          onClick={() => setNavOpen((v) => !v)}
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-violet-400/40 md:hidden"
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-expanded={navOpen}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-[2px] w-full rounded-full transition-all duration-300 ${
                navOpen
                  ? "top-1/2 -translate-y-1/2 rotate-45 bg-white"
                  : "top-0 bg-white"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-[2px] -translate-y-1/2 rounded-full transition-all duration-300 ${
                navOpen
                  ? "w-0 opacity-0"
                  : "w-2/3 bg-gradient-to-r from-indigo-400 to-fuchsia-400"
              }`}
            />
            <span
              className={`absolute left-0 block h-[2px] w-full rounded-full transition-all duration-300 ${
                navOpen
                  ? "top-1/2 -translate-y-1/2 -rotate-45 bg-white"
                  : "bottom-0 bg-white"
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
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setNavOpen(false)}
                  className={`group flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-indigo-500/20 via-violet-500/15 to-transparent text-white"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 group-hover:bg-violet-400 ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-indigo-400 to-fuchsia-400 shadow-[0_0_8px_rgb(192_132_252/0.8)]"
                        : "bg-slate-600"
                    }`}
                  />
                </Link>
              ))}
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