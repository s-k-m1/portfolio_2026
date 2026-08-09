import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-6">
      <div className="aurora-blob left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 animate-glow bg-violet-600/25" aria-hidden />
      <div className="relative text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
          Error 404
        </p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
          Page <span className="text-aurora">Not Found</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-slate-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:shadow-violet-500/50 hover:brightness-110"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}