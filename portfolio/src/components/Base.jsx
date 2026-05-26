import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Facebook, Instagram, Linkedin, Terminal, Activity } from "lucide-react";

export default function Base({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTabStyle, setActiveTabStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const lastScroll = useRef(0);
  const navContainerRef = useRef(null);
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Projects", path: "/projects" },
    { label: "ClientShare", path: "/clientShare" },
    { label: "Contact", path: "/contact" }
  ];
  
  const socialIcons = [
    { icon: <Github size={14} strokeWidth={2} />, link: "https://github.com/s-k-m1" },
    { icon: <Facebook size={14} strokeWidth={2} />, link: "https://www.facebook.com/share/17oLBH5ShL" },
    { icon: <Instagram size={14} strokeWidth={2} />, link: "https://instagram.com/" },
    { icon: <Linkedin size={14} strokeWidth={2} />, link: "https://linkedin.com/" },
  ];

  // System Engine Timer
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Elite Floating Capsule Scroll Transition
  useEffect(() => {
    const onScroll = () => {
      const curr = window.scrollY;
      setIsScrolled(curr > 30);
      lastScroll.current = curr;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sliding Highlight Magnetic Pill Calculations
  useEffect(() => {
    const updateTabTracker = () => {
      if (!navContainerRef.current) return;
      const activeLink = navContainerRef.current.querySelector('[data-active="true"]');
      
      if (activeLink) {
        const { offsetLeft, offsetWidth } = activeLink;
        setActiveTabStyle({
          left: offsetLeft,
          width: offsetWidth,
          opacity: 1
        });
      } else {
        setActiveTabStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    // Run layout calculations on path modification or frame resizes
    updateTabTracker();
    window.addEventListener("resize", updateTabTracker);
    return () => window.removeEventListener("resize", updateTabTracker);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 font-sans antialiased selection:bg-blue-500/30 selection:text-blue-200 relative">
      
      {/* High-Fidelity Engineering Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370e_1px,transparent_1px),linear-gradient(to_bottom,#1f29370e_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      
      {/* Floating Capsule Nav System */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 sm:px-6 transition-all duration-500 pt-4 sm:pt-6">
        <header
          className={`w-full max-w-5xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full border flex items-center justify-between px-6 py-3 ${
            isScrolled
              ? "bg-slate-950/70 border-slate-800/60 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl max-w-4xl"
              : "bg-slate-900/10 border-transparent backdrop-blur-none"
          }`}
        >
          {/* Identity Blueprint */}
          <Link to="/" className="flex items-center gap-3 z-50 group">
            <div className="h-8 w-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center p-1 relative overflow-hidden group-hover:border-blue-500/40 transition-colors duration-300">
              <img src="src/assets/images/skm-logo.png" alt="SKM" className="h-full w-full object-cover rounded-md" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-white/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
            <div className="flex flex-col font-mono text-left">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-200 group-hover:text-blue-400 transition-colors">SKM.DEV</span>
              <span className="text-[8px] tracking-widest text-slate-500 uppercase">SYS_RUNNING</span>
            </div>
          </Link>

          {/* Magnetic Sliding Tab Array (Desktop Only) */}
          <nav ref={navContainerRef} className="hidden md:flex items-center relative bg-slate-950/40 border border-slate-900/60 p-1 rounded-full">
            
            {/* Sliding Fluid Indicator Shadow Background Block */}
            <div 
              className="absolute top-1 bottom-1 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-full transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) pointer-events-none"
              style={{
                left: `${activeTabStyle.left}px`,
                width: `${activeTabStyle.width}px`,
                opacity: activeTabStyle.opacity,
              }}
            />

            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  data-active={isActive}
                  className={`px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 relative z-10 ${
                    isActive ? "text-blue-400 font-semibold" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Terminal Access Shell */}
          <div className="hidden md:flex items-center gap-3">
            {socialIcons.map((s, i) => (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-500 hover:text-slate-200 hover:border-slate-700 transition-all duration-300 transform-gpu hover:-translate-y-[1px]"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Micro-Interaction Hamburger Mechanism */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden flex flex-col justify-center items-end gap-1 w-8 h-8 z-50 relative focus:outline-none"
            aria-label="Toggle Core Console Matrix"
          >
            <span className={`h-[1px] bg-white transition-all duration-300 ${navOpen ? "w-5 rotate-45 translate-y-[2px]" : "w-5"}`} />
            <span className={`h-[1px] bg-white transition-all duration-300 ${navOpen ? "w-0 opacity-0" : "w-3"}`} />
            <span className={`h-[1px] bg-white transition-all duration-300 ${navOpen ? "w-5 -rotate-45 -translate-y-[2px]" : "w-4"}`} />
          </button>
        </header>
      </div>

      {/* Mobile Curtain Backdrop Blur */}
      {navOpen && (
        <div 
          onClick={() => setNavOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-lg z-40 transition-all duration-500 md:hidden" 
        />
      )}

      {/* Cyberpunk Terminal Drawer Panels */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[280px] bg-[#050b18]/95 border-l border-slate-900 p-8 pt-28 flex flex-col gap-8 z-40 transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) md:hidden ${
          navOpen ? "translate-x-0 shadow-[-20px_0_40px_rgba(0,0,0,0.8)]" : "translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <p className="text-[9px] font-mono tracking-[0.3em] text-slate-600 uppercase border-b border-slate-900 pb-2 flex items-center gap-2">
            <Terminal size={10} className="text-blue-500" /> CONSOLE_LINKS
          </p>
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setNavOpen(false)}
                  className={`text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300 pl-2 border-l ${
                    isActive ? "text-blue-400 border-blue-500 font-bold" : "text-slate-400 border-transparent hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-auto space-y-4">
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-600">CONNECTED_ENDPOINTS</p>
          <div className="flex items-center gap-3">
            {socialIcons.map((s, i) => (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content Mount Engine */}
      <main className="flex-1 w-full relative z-10 pt-28">{children}</main>

      {/* Industrial Developer Environment Footer */}
      <footer className="w-full bg-[#02050c] border-t border-slate-900/60 py-8 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-[10px] font-mono text-slate-500 tracking-[0.15em] flex items-center gap-2 group">
            <Activity size={12} className="text-slate-700 group-hover:text-emerald-500 transition-colors duration-500" />
            <span>© {currentTime.getFullYear()}</span>
            <span className="text-slate-300 font-bold tracking-[0.2em]">SAROJ KUMAR MAHATO</span>
            <span className="text-slate-800 hidden sm:inline">//</span>
            <span className="hidden sm:inline text-slate-600">CORE_RELASE_V2</span>
          </div>

          {/* Digital Telemetry Shell */}
          <div className="text-[10px] font-mono tracking-widest bg-slate-950 border border-slate-900/80 px-4 py-2 rounded-full text-slate-400 shadow-inner flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <span className="text-slate-500">SYS_TIME:</span>
            <span className="text-slate-300">
              {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
            </span>
          </div>

          <div className="flex gap-4">
            {socialIcons.map((s, i) => (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-200 transition-colors duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}