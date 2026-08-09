import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Images } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { getBlogPosts } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog Photos",
  description: `Photo gallery by ${SITE.name} — images from projects and articles.`,
};

export default async function BlogPhotosPage() {
  const posts = await getBlogPosts();
  const photos = posts.filter((p) => !p.video_url && (p.image_url || p.image));

  return (
    <section className="mt-12" aria-label="Photo gallery">
      <Reveal>
        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
          <Images className="h-5 w-5 text-violet-400" /> Photos
        </h2>
      </Reveal>

      {photos.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-3">
          {photos.map((post, pi) => (
            <Reveal key={post.id} delay={(pi % 3) * 100}>
              <Link
                href={`/blog/${post.id}`}
                className="glass group block h-full overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image_url || post.image || ""}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <span className="absolute bottom-3 left-4 z-10 rounded-full border border-white/15 bg-black/40 px-3 py-0.5 text-xs font-semibold text-white backdrop-blur">
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="line-clamp-2 text-base font-bold text-white transition-colors duration-200 group-hover:text-violet-300">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(post.created_at)}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-500">
          Photos coming soon.
        </p>
      )}
    </section>
  );
}