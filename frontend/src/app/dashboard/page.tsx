"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, LayoutDashboard } from "lucide-react";
import { adminFetch } from "@/lib/auth";
import { ADMIN_RESOURCES } from "@/lib/adminResources";

interface Counts {
  [key: string]: number | null;
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const next: Counts = {};
      await Promise.all(
        ADMIN_RESOURCES.map(async (r) => {
          try {
            const data = await adminFetch<{
              count?: number;
              results?: unknown[];
            }>(`/${r.key}/`);
            next[r.key] =
              typeof data.count === "number"
                ? data.count
                : Array.isArray(data.results)
                  ? data.results.length
                  : null;
          } catch {
            next[r.key] = null;
          }
        }),
      );
      if (active) {
        setCounts(next);
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-w-0">
      <div className="mb-8">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
          <LayoutDashboard className="h-4 w-4" /> Super Admin Panel
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Manage every section of your portfolio. Writes are restricted to
          super admins.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ADMIN_RESOURCES.map((r) => (
          <Link
            key={r.key}
            href={`/dashboard/${r.key}`}
            className="glass group flex items-center justify-between rounded-2xl p-5 transition-colors hover:border-violet-400/40"
          >
            <div>
              <p className="text-sm font-semibold text-white">{r.label}</p>
              <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-300">
                {loading
                  ? "…"
                  : counts[r.key] === null
                    ? "—"
                    : counts[r.key]}
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-slate-500 transition-colors group-hover:text-violet-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}
