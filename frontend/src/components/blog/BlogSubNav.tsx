"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, Images, Newspaper } from "lucide-react";

const TABS = [
  {
    href: "/blog/articles",
    label: "Articles",
    Icon: Newspaper,
  },
  { href: "/blog/videos", label: "Videos", Icon: Film },
  { href: "/blog/photos", label: "Photos", Icon: Images },
];

export default function BlogSubNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Blog sections"
      className="mx-auto mt-8 w-full max-w-2xl"
    >
      <div className="flex items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-1.5 backdrop-blur sm:gap-2 sm:p-2">
        {TABS.map(({ href, label, Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 sm:px-5 ${
                isActive
                  ? "bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}