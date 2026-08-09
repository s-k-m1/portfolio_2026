import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Film, PlayCircle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { getBlogPosts } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog Videos",
  description: `Video library by ${SITE.name} on Django, React, and web development.`,
};

export default async function BlogVideosPage() {
  const posts = await getBlogPosts();
  const videos = posts.filter((p) => p.video_url);

  return (
    <section className="mt-12" aria-label="Video library">
      <Reveal>
        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
          <Film className="h-5 w-5 text-violet-400" /> Videos
        </h2>
      </Reveal>

      {videos.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {videos.map((post, vi) => (
            <Reveal key={post.id} delay={(vi % 2) * 100}>
              <div className="glass group h-full overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30">
                <div className="relative aspect-video w-full overflow-hidden">
                  <iframe
                    src={post.video_url}
                    title={post.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-0.5 text-xs font-semibold text-violet-300">
                    <PlayCircle className="h-3.5 w-3.5" /> Video
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-white transition-colors duration-200 group-hover:text-violet-300">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(post.created_at)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-500">
          Videos coming soon.
        </p>
      )}
    </section>
  );
}