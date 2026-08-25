"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  LayoutDashboard,
  Mail,
  Users,
  FileText,
  Sparkles,
} from "lucide-react";
import { adminFetch } from "@/lib/auth";
import { ADMIN_RESOURCES } from "@/lib/adminResources";
import { getInquiries } from "@/lib/inquiries";
import type { Inquiry } from "@/types";
import AreaChart from "@/components/admin/AreaChart";

type CountMap = Record<string, number | null>;

function buildSeries(inquiries: Inquiry[]) {
  const arr: { d: Date; label: string; value: number }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    arr.push({
      d,
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      value: 0,
    });
  }
  for (const it of inquiries) {
    const c = new Date(it.created_at);
    c.setHours(0, 0, 0, 0);
    const found = arr.find((a) => a.d.getTime() === c.getTime());
    if (found) found.value++;
  }
  return arr;
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState<CountMap>({});
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      // counts (cached by adminFetch)
      const next: CountMap = {};
      await Promise.all(
        ADMIN_RESOURCES.map(async (r) => {
          try {
            const data = await adminFetch<{ count?: number; results?: unknown[] }>(
              `/${r.key}/`,
            );
            next[r.key] =
              typeof data.count === "number"
                ? data.count
                : Array.isArray(data.results)
                  ? data.results.length
                  : 0;
          } catch {
            next[r.key] = 0;
          }
        }),
      );

      // inquiries (for the live chart + stats)
      let inqs: Inquiry[] = [];
      try {
        inqs = await getInquiries();
      } catch {
        inqs = [];
      }

      if (!active) return;
      setCounts(next);
      setInquiries(inqs);
      setUpdatedAt(new Date());
      setLoading(false);
    }
    load();
    const id = setInterval(load, 20000); // real-time refresh
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  const series = useMemo(() => buildSeries(inquiries), [inquiries]);
  const totalContent = Object.values(counts).reduce<number>(
    (a, b) => a + (b ?? 0),
    0,
  );
  const newInquiries = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <LayoutDashboard className="mr-1 inline h-3.5 w-3.5" /> Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-bold text-ink-2 sm:text-3xl">
            Welcome back, Admin
          </h1>
          <p className="mt-1 text-sm text-muted">
            Live overview of your portfolio & inquiries.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-muted shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Live
          {updatedAt && (
            <span className="text-muted/70">· {updatedAt.toLocaleTimeString()}</span>
          )}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="admin-card h-24 animate-pulse bg-canvas-soft"
            />
          ))}
        </div>
      ) : (
        <>
          {/* Summary stat cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {ADMIN_RESOURCES.map((r) => (
              <Link
                key={r.key}
                href={`/dashboard/${r.key}`}
                className="admin-card group flex flex-col gap-2 p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted">
                    {r.label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted opacity-0 transition group-hover:opacity-100" />
                </div>
                <span className="text-2xl font-bold text-ink-2">
                  {counts[r.key] ?? 0}
                </span>
              </Link>
            ))}

            <Link
              href="/dashboard/inquiries"
              className="admin-card group flex flex-col gap-2 p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted">Inquiries</span>
                <Mail className="h-4 w-4 text-muted" />
              </div>
              <span className="text-2xl font-bold text-ink-2">
                {inquiries.length}
              </span>
              <span className="text-xs text-accent">{newInquiries} new</span>
            </Link>
          </div>

          {/* Real-time chart */}
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="admin-card p-5 lg:col-span-2">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-ink-2">
                    Inquiries · last 7 days
                  </h2>
                  <p className="text-xs text-muted">Updates every 20s</p>
                </div>
                <span className="text-2xl font-bold text-ink-2">
                  {series.reduce((a, b) => a + b.value, 0)}
                </span>
              </div>
              <AreaChart data={series} />
            </div>

            <div className="flex flex-col gap-4">
              <div className="admin-card flex items-center gap-4 p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                  <FileText className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-2xl font-bold text-ink-2">{totalContent}</p>
                  <p className="text-xs text-muted">Content items</p>
                </div>
              </div>
              <div className="admin-card flex items-center gap-4 p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <Users className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-2xl font-bold text-ink-2">
                    {newInquiries}
                  </p>
                  <p className="text-xs text-muted">Unread inquiries</p>
                </div>
              </div>
              <Link
                href="/dashboard/inquiries"
                className="admin-btn admin-btn-primary w-full"
              >
                <Sparkles className="h-4 w-4" /> Manage inquiries
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
