import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { getBlogPost } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { SITE } from "@/lib/site";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getBlogPost(id);

  return {
    title: post?.title ?? "Blog Post",
    description: post?.content.slice(0, 160),
    alternates: {
      canonical: `${SITE.url}/blog/${id}`,
    },
    openGraph: {
      title: post?.title ?? "Blog Post",
      description: post?.content.slice(0, 160),
      type: "article",
      publishedTime: post?.created_at,
      authors: [post?.author ?? SITE.name],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) notFound();

  return (
    <div className="relative overflow-hidden">
      <div className="aurora-blob right-[-15%] top-[-10%] h-[22rem] w-[22rem] animate-float bg-indigo-600/25" aria-hidden />

      <article className="relative mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <Link
          href="/blog/articles"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-violet-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <div className="mt-6 mb-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-0.5 text-xs font-semibold text-violet-300">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-slate-500">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(post.created_at)}
          </span>
          <span className="text-sm text-slate-500">By {post.author}</span>
        </div>

        <h1 className="mb-8 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {post.title}
        </h1>

        {post.image_url && (
          <div className="glow-card relative mb-8 aspect-[16/9] overflow-hidden rounded-3xl">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {post.video_url && (
          <div className="mb-8 overflow-hidden rounded-3xl border border-white/10">
            <div className="relative aspect-video w-full">
              <iframe
                src={post.video_url}
                title={post.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        )}

        <div className="space-y-5 text-[17px] leading-relaxed text-slate-300">
          {post.content.split("\n").map((para, i) =>
            para.trim() ? <p key={i}>{para}</p> : null,
          )}
        </div>
      </article>
    </div>
  );
}