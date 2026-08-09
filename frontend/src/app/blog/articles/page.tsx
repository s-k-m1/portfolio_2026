import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Newspaper } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { getBlogPosts } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog Articles",
  description: `Articles and notes by ${SITE.name} on Django, React, PostgreSQL, and web development.`,
};

export default async function BlogArticlesPage() {
  const posts = await getBlogPosts();
  const articles = posts.filter((p) => !p.video_url && !p.image_url && !p.image);

  return (
    <section className="mt-12" aria-label="Articles">
      <Reveal>
        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
          <Newspaper className="h-5 w-5 text-violet-400" /> Articles
        </h2>
      </Reveal>

      {articles.length > 0 ? (
        <div className="mt-6 space-y-5">
          {articles.map((post, i) => (
            <Reveal key={post.id} delay={i * 100}>
              <Link
                href={`/blog/${post.id}`}
                className="glass group block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-0.5 text-xs font-semibold text-violet-300">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(post.created_at)}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold text-white transition-colors duration-200 group-hover:text-violet-300">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
                  {post.content.slice(0, 200)}
                </p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-300 transition-colors group-hover:text-violet-300">
                  Read article
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-500">
          Articles coming soon.
        </p>
      )}
    </section>
  );
}