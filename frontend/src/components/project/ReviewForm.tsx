"use client";

import { useState } from "react";
import { Star, Send, CheckCircle2, Plus } from "lucide-react";
import type { ProjectReview } from "@/types";
import { createProjectReview } from "@/lib/api";

interface ReviewFormProps {
  projectId: string;
  initialReviews: ProjectReview[];
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= rating ? "fill-amber-400 text-amber-400" : "text-slate-600"
          }`}
        />
      ))}
    </div>
  );
}

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default function ReviewForm({ projectId, initialReviews }: ReviewFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !comment.trim()) {
      setError("Please add your name and a short review.");
      return;
    }
    setSubmitting(true);
    try {
      await createProjectReview(projectId, {
        name: name.trim(),
        email: email.trim() || undefined,
        rating,
        comment: comment.trim(),
      });
      setDone(true);
      setName("");
      setEmail("");
      setComment("");
      setRating(5);
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header with Leave a Review button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-white">
          {initialReviews.length > 0
            ? `Client Reviews (${initialReviews.length})`
            : "Client Reviews"}
        </h3>
        {!done && (
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold text-violet-200 transition-colors hover:bg-violet-500/20"
          >
            <Plus className="h-3.5 w-3.5" /> Leave a Review
          </button>
        )}
      </div>

      {/* Submission form */}
      {open && !done && (
        <div className="glass rounded-3xl p-6 sm:p-8">
          <p className="text-sm text-slate-400">
            Share your experience. Reviews are published after moderation.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-violet-400/60"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-violet-400/60"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setRating(i)}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`${i} star${i > 1 ? "s" : ""}`}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-7 w-7 ${
                        i <= (hover || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Review
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Tell others about your experience working with me..."
                className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-violet-400/60"
              />
            </div>

            {error && <p className="text-sm text-rose-400">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:brightness-110 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-slate-400 transition-colors hover:text-white"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {done && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
          <p className="text-sm text-emerald-100">
            Thanks! Your review was submitted and is pending approval. It will
            appear here once approved.
          </p>
        </div>
      )}

      {/* Existing reviews */}
      {initialReviews.length === 0 ? (
        <p className="text-sm text-slate-400">
          No reviews yet — be the first to share your experience.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {initialReviews.map((r) => (
            <div key={r.id} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <Stars rating={r.rating} />
                <span className="text-xs text-slate-500">
                  {formatDate(r.created_at)}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                &ldquo;{r.comment}&rdquo;
              </p>
              <p className="mt-3 text-sm font-semibold text-white">{r.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
