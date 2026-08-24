"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";
import { login, getToken } from "@/lib/auth";
import { SITE } from "@/lib/site";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (typeof window !== "undefined" && getToken()) {
    router.replace("/admin");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="aurora-blob left-[-10%] top-[-10%] h-72 w-72 animate-float bg-violet-600/25" aria-hidden />
      <div className="aurora-blob right-[-10%] bottom-[-10%] h-72 w-72 animate-float-slow bg-cyan-500/20" aria-hidden />

      <form
        onSubmit={onSubmit}
        className="glass relative w-full max-w-sm rounded-3xl p-8 shadow-2xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500">
            <Lock className="h-5 w-5 text-white" />
          </span>
          <div>
            <h1 className="text-lg font-bold text-white">Super Admin</h1>
            <p className="text-xs text-slate-400">{SITE.shortName}</p>
          </div>
        </div>

        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
          Username
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
          className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-violet-400/50"
        />

        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="mb-5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-violet-400/50"
        />

        {error && (
          <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:brightness-110 disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Sign in
        </button>
      </form>
    </div>
  );
}
