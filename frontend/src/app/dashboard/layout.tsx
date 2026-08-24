"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Mail,
} from "lucide-react";
import {
  getToken,
  getMe,
  logout,
  isAdmin,
} from "@/lib/auth";
import { ADMIN_RESOURCES } from "@/lib/dashboardResources";
import { SITE } from "@/lib/site";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    async function guard() {
      const token = getToken();
      if (!token) {
        router.replace("/dashboard/login");
        return;
      }
      try {
        const me = await getMe();
        if (!active) return;
        if (!isAdmin(me)) {
          await logout();
          router.replace("/dashboard/login");
          return;
        }
        setChecked(true);
      } catch {
        if (!active) return;
        await logout();
        router.replace("/dashboard/login");
      }
    }
    guard();
    return () => {
      active = false;
    };
  }, [router]);

  async function onLogout() {
    setBusy(true);
    await logout();
    router.replace("/dashboard/login");
  }

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-night">
        <span className="animate-pulse text-sm text-slate-500">
          Verifying access…
        </span>
      </div>
    );
  }

  const linkBase =
    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors";
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="flex min-h-screen bg-night text-slate-200">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-ink/60 p-4 md:flex">
        <Link
          href="/dashboard"
          className="mb-6 flex items-center gap-2.5 px-2 py-1"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500">
            <ShieldCheck className="h-4 w-4 text-white" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-white">Super Admin</p>
            <p className="text-[11px] text-slate-500">{SITE.shortName}</p>
          </div>
        </Link>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
          <Link
            href="/dashboard"
            className={`${linkBase} ${
              isActive("/dashboard") && pathname === "/dashboard"
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>

          <p className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-widest text-slate-600">
            Content
          </p>
          {ADMIN_RESOURCES.map((r) => (
            <Link
              key={r.key}
              href={`/dashboard/${r.key}`}
              className={`${linkBase} ${
                isActive(`/dashboard/${r.key}`)
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {r.label}
            </Link>
          ))}

          <Link
            href="/dashboard/inquiries"
            className={`${linkBase} ${
              isActive("/dashboard/inquiries")
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Mail className="h-4 w-4" /> Inquiries
          </Link>
        </nav>

        <div className="mt-4 flex flex-col gap-1 border-t border-white/10 pt-4">
          <Link
            href="/"
            target="_blank"
            className={`${linkBase} text-slate-400 hover:bg-white/5 hover:text-white`}
          >
            <ExternalLink className="h-4 w-4" /> View Site
          </Link>
          <button
            onClick={onLogout}
            disabled={busy}
            className={`${linkBase} text-slate-400 hover:bg-red-500/10 hover:text-red-300`}
          >
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 bg-ink/40 px-5 py-3 md:hidden">
          <span className="text-sm font-bold text-white">Super Admin</span>
          <button
            onClick={onLogout}
            className="rounded-lg p-2 text-slate-400 hover:text-red-300"
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </header>

        <main className="min-w-0 flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
