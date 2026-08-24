"use client";

import { useEffect, useState } from "react";
import { Mail, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import {
  getInquiries,
  replyToInquiry,
  updateInquiryStatus,
} from "@/lib/inquiries";
import type { Inquiry, InquiryStatus } from "@/types";

const STATUS_STYLES: Record<InquiryStatus, string> = {
  new: "bg-violet-500/15 text-violet-300 border-violet-400/30",
  replied: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  closed: "bg-slate-500/15 text-slate-300 border-slate-400/30",
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
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${
        STATUS_STYLES[status]
      }`}
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

  // Auto-dismiss success/error messages after 5 seconds.
  useEffect(() => {
    if (!actionOk && !actionError) return;
    const id = setTimeout(() => {
      setActionOk(null);
      setActionError(null);
    }, 5000);
    return () => clearTimeout(id);
  }, [actionOk, actionError]);

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
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
          <Mail className="h-4 w-4" /> Inquiries
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Client Inquiries
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Review submitted inquiries, reply directly to clients via email, and
          track each conversation.
        </p>
      </div>

      {error && (
        <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-200">
          {error}
        </p>
      )}

      {loading ? (
        <p className="py-20 text-center text-sm text-slate-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="py-20 text-center text-sm text-slate-500">
          No inquiries yet.
        </p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* List */}
          <div className="flex max-h-[70vh] flex-col gap-2 overflow-y-auto pr-1">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => choose(item)}
                className={`rounded-2xl border p-4 text-left transition-colors ${
                  selected?.id === item.id
                    ? "border-violet-400/50 bg-white/5"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-white">
                    {item.name}
                  </span>
                  <StatusBadge status={item.status} />
                </div>
                <p className="mt-1 truncate text-xs text-slate-400">
                  {item.subject}
                </p>
                <p className="mt-1 text-[11px] text-slate-600">
                  {item.email} · {formatDate(item.created_at)}
                </p>
              </button>
            ))}
          </div>

          {/* Detail */}
          {selected && (
            <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white">{selected.name}</h2>
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-sm text-violet-300 hover:underline"
                  >
                    {selected.email}
                  </a>
                </div>
                <StatusBadge status={selected.status} />
              </div>
              <p className="mt-1 text-sm text-slate-400">{selected.subject}</p>

              {/* Conversation */}
              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Original message · {formatDate(selected.created_at)}
                  </p>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-200">
                    {selected.message}
                  </p>
                </div>

                {selected.replies.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-xl border border-violet-400/20 bg-violet-500/5 p-4"
                  >
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-violet-300">
                      Reply from {r.sent_by || "admin"} ·{" "}
                      {formatDate(r.created_at)}
                    </p>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-100">
                      {r.message}
                    </p>
                  </div>
                ))}
              </div>

              {/* Status controls */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
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
                        : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Reply composer */}
              <div className="mt-5">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Reply to client
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                  placeholder="Write your reply — it will be emailed to the client."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-violet-400/60"
                />
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={sendReply}
                    disabled={sending || !replyText.trim()}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:brightness-110 disabled:opacity-60"
                  >
                    {sending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Send Reply
                  </button>
                  {actionOk && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300">
                      <CheckCircle2 className="h-4 w-4" /> {actionOk}
                    </span>
                  )}
                </div>
                {actionError && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-rose-400">
                    <AlertCircle className="h-4 w-4" /> {actionError}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
