import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] px-4">
      <div className="w-full max-w-md bg-[#050b14] border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-slate-500 mb-8 font-mono text-xs">LOGIN_TO_SYSTEM_ACCESS</p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-600" size={16} />
              <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-blue-500 outline-none" placeholder="saroj@skm.dev" />
            </div>
          </div>
          
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-600" size={16} />
              <input type="password" className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-blue-500 outline-none" placeholder="••••••••" />
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
            SIGN IN <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-center text-slate-500 text-xs mt-6">
          Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}