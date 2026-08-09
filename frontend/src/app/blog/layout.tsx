import Reveal from "@/components/ui/Reveal";
import BlogSubNav from "@/components/blog/BlogSubNav";
import { getContentBlocks } from "@/lib/api";

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const content = await getContentBlocks();
  return (
    <div className="relative overflow-hidden">
      <div className="aurora-blob left-[-12%] top-[-10%] h-[22rem] w-[22rem] animate-float bg-fuchsia-600/20" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 pt-14 sm:pt-20">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Blog
          </p>
          <h1 className="mt-3 text-center text-4xl font-bold tracking-tight text-white">
            Articles, Photos & <span className="text-aurora">Videos</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-slate-400">
            {content["blog-intro"]}
          </p>
        </Reveal>

        <BlogSubNav />
        {children}
        <div className="h-16" aria-hidden />
      </div>
    </div>
  );
}