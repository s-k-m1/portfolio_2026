"use client";

import { useEffect, useMemo, useState } from "react";
import { Mail, Send, Loader2, CheckCircle2, AlertCircle, Search } from "lucide-react";
import {
  getInquiries,
  replyToInquiry,
  updateInquiryStatus,
} from "@/lib/inquiries";
import type { Inquiry, InquiryStatus } from "@/types";

const STATUS_STYLES: Record<InquiryStatus, string> = {
  new: "bg-violet-100 text-violet-700 border-violet-200",
  replied: "bg-emerald-100 text-emerald-700 border-emerald-200",
  closed: "bg-slate-100 text-slate-600 border-slate-200",
};

const STATUS_ORDER: InquiryStatus[] = ["new", "replied", "closed"];

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function StatusBadge({ status }: { status: InquiryStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

export default function InquiryManager() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [statusBusy, setStatusBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionOk, setActionOk] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | InquiryStatus>("all");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await getInquiries();
        if (!active) return;
        setItems(data);
        setSelected(data[0] ?? null);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!actionOk && !actionError) return;
    const id = setTimeout(() => {
      setActionOk(null);
      setActionError(null);
    }, 5000);
    return () => clearTimeout(id);
  }, [actionOk, actionError]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length, new: 0, replied: 0, closed: 0 };
    items.forEach((i) => (c[i.status] = (c[i.status] ?? 0) + 1));
    return c;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      if (filter !== "all" && i.status !== filter) return false;
      if (!q) return true;
      return (
        i.name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        (i.subject ?? "").toLowerCase().includes(q) ||
        i.message.toLowerCase().includes(q)
      );
    });
  }, [items, query, filter]);

  function choose(item: Inquiry) {
    setSelected(item);
    setReplyText("");
    setActionError(null);
    setActionOk(null);
  }

  async function sendReply() {
    if (!selected || !replyText.trim()) return;
    setSending(true);
    setActionError(null);
    setActionOk(null);
    try {
      const updated = await replyToInquiry(selected.id, replyText.trim());
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      setSelected(updated);
      setReplyText("");
      setActionOk("Reply sent to the client's email.");
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to send reply");
    } finally {
      setSending(false);
    }
  }

  async function changeStatus(status: InquiryStatus) {
    if (!selected) return;
    setStatusBusy(true);
    setActionError(null);
    setActionOk(null);
    try {
      const updated = await updateInquiryStatus(selected.id, status);
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      setSelected(updated);
      setActionOk(`Status set to "${status}".`);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setStatusBusy(false);
    }
  }

  return (
    <div className="min-w-0">
      <div className="mb-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          <Mail className="h-4 w-4" /> Inquiries
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-2">
          Client Inquiries
        </h1>
        <p className="mt-2 text-sm text-muted">
          Review submitted inquiries, reply directly to clients via email, and
          track each conversation.
        </p>
      </div>

      {error && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <p className="py-20 text-center text-sm text-muted">Loading…</p>
      ) : items.length === 0 ? (
        <p className="py-20 text-center text-sm text-muted">No inquiries yet.</p>
      ) : (
        <>
          {/* Toolbar: search + status filters */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, message…"
                className="admin-input pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", ...STATUS_ORDER] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                    filter === s
                      ? "border-accent bg-accent text-white"
                      : "border-line bg-white text-muted hover:text-ink-2"
                  }`}
                >
                  {s} <span className="opacity-70">{counts[s]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
            {/* List */}
            <div className="flex max-h-[70vh] flex-col gap-2 overflow-y-auto pr-1">
              {filtered.length === 0 && (
                <p className="py-10 text-center text-sm text-muted">
                  No matching inquiries.
                </p>
              )}
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => choose(item)}
                  className={`rounded-2xl border p-4 text-left transition-colors ${
                    selected?.id === item.id
                      ? "border-accent/50 bg-accent-soft"
                      : "border-line bg-white hover:border-accent/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-ink-2">
                      {item.name}
                    </span>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="mt-1 truncate text-xs text-muted">
                    {item.subject}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">
                    {item.email} · {formatDate(item.created_at)}
                  </p>
                </button>
              ))}
            </div>

            {/* Detail */}
            {selected && (
              <div className="min-w-0 admin-card p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-ink-2">{selected.name}</h2>
                    <a
                      href={`mailto:${selected.email}`}
                      className="text-sm text-accent-strong hover:underline"
                    >
                      {selected.email}
                    </a>
                  </div>
                  <StatusBadge status={selected.status} />
                </div>
                <p className="mt-1 text-sm text-muted">{selected.subject}</p>

                {/* Conversation */}
                <div className="mt-5 space-y-3">
                  <div className="rounded-xl border border-line bg-canvas-soft p-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
                      Original message · {formatDate(selected.created_at)}
                    </p>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-2">
                      {selected.message}
                    </p>
                  </div>

                  {selected.replies.map((r) => (
                    <div
                      key={r.id}
                      className="rounded-xl border border-accent/20 bg-accent-soft p-4"
                    >
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent-strong">
                        Reply from {r.sent_by || "admin"} · {formatDate(r.created_at)}
                      </p>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-2">
                        {r.message}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Status controls */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Status
                  </span>
                  {STATUS_ORDER.map((s) => (
                    <button
                      key={s}
                      disabled={statusBusy || selected.status === s}
                      onClick={() => changeStatus(s)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors disabled:opacity-50 ${
                        selected.status === s
                          ? STATUS_STYLES[s]
                          : "border-line bg-white text-muted hover:text-ink-2"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Reply composer */}
                <div className="mt-5">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                    Reply to client
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                    placeholder="Write your reply — it will be emailed to the client."
                    className="admin-input resize-none"
                  />
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={sendReply}
                      disabled={sending || !replyText.trim()}
                      className="admin-btn admin-btn-primary disabled:opacity-60"
                    >
                      {sending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      Send Reply
                    </button>
                    {actionOk && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <CheckCircle2 className="h-4 w-4" /> {actionOk}
                      </span>
                    )}
                  </div>
                  {actionError && (
                    <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-rose-600">
                      <AlertCircle className="h-4 w-4" /> {actionError}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
