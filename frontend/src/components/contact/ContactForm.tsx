"use client";

import { useEffect, useState } from "react";
import { Send, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { sendContactMessage } from "@/lib/api";

type AlertState = { type: "success" | "error"; message: string } | null;

const initialForm = { name: "", email: "", subject: "", message: "", website: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<AlertState>(null);
  const [sending, setSending] = useState(false);

  // Auto-dismiss success/error messages after 5 seconds.
  useEffect(() => {
    if (!status) return;
    const id = setTimeout(() => setStatus(null), 5000);
    return () => clearTimeout(id);
  }, [status]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      await sendContactMessage(form);
      setStatus({
        type: "success",
        message: "Message transmitted securely. I'll get back to you shortly.",
      });
      setForm(initialForm);
    } catch (err) {
      const detail =
        err instanceof Error && err.message
          ? err.message
          : "Failed to send the message. Please try again or email me directly.";
      setStatus({ type: "error", message: detail });
    } finally {
      setSending(false);
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-all duration-200 placeholder:text-slate-500 focus:border-violet-400/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/20";

  return (
    <div>
      {status && (
        <div
          role="status"
          className={`mb-6 flex items-start gap-3 rounded-xl border p-4 text-sm ${
            status.type === "success"
              ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
              : "border-red-400/30 bg-red-500/10 text-red-300"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          <p>{status.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot — hidden from real users; bots fill it and get silently dropped */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Saroj Kumar Mahato"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="info@saroj01.com.np"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-slate-300">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            value={form.subject}
            onChange={handleChange}
            placeholder="Project inquiry"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-300">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={form.message}
            onChange={handleChange}
            placeholder="Tell me about your project…"
            className={`${inputClasses} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:shadow-violet-500/50 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send Message <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}