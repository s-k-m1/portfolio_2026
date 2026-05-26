import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Facebook, Instagram, Linkedin, Terminal, Activity, MapPin } from "lucide-react";

// Import your logo asset safely for the bundler
import skmLogo from "../assets/images/skm-logo.png"; 

export default function Base({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTabStyle, setActiveTabStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const lastScroll = useRef(0);
  const navContainerRef = useRef(null);
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
    { label: "Client Share", path: "/clientShare" }
    
  ];
  
  const socialIcons = [
    { icon: <Github size={18} strokeWidth={2} />, link: "https://github.com/s-k-m1" },
    { icon: <Linkedin size={18} strokeWidth={2} />, link: "https://linkedin.com/" },
    { icon: <Facebook size={18} strokeWidth={2} />, link: "https://www.facebook.com/share/17oLBH5ShL" },
    { icon: <Instagram size={18} strokeWidth={2} />, link: "https://instagram.com/" },
  ];

  // Floating Capsule Scroll Listener
  useEffect(() => {
    const onScroll = () => {
      const curr = window.scrollY;
      setIsScrolled(curr > 30);
      lastScroll.current = curr;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sliding Tracker Calculations
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

    updateTabTracker();
    window.addEventListener("resize", updateTabTracker);
    return () => window.removeEventListener("resize", updateTabTracker);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 font-sans antialiased selection:bg-blue-500/30 selection:text-blue-200 relative tracking-normal">
      
      {/* High-Fidelity Engineering Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370e_1px,transparent_1px),linear-gradient(to_bottom,#1f29370e_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      
      {/* Floating Capsule Nav System */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 sm:px-6 transition-all duration-500 pt-5 sm:pt-7">
        <header
          className={`w-full max-w-5xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full border border-slate-800 bg-slate-950/95 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center justify-between px-8 py-4 ${
            isScrolled ? "max-w-4xl border-slate-700/80" : ""
          }`}
        >
          {/* Brand Identity Branding */}
          <Link to="/" className="flex items-center gap-3.5 z-50 group">
            <div className="h-11 w-11 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-center p-1.5 relative overflow-hidden group-hover:border-blue-500/50 transition-colors duration-300 shadow-sm">
              <img src={skmLogo} alt="SKM Logo" className="h-full w-full object-cover rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-white/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
            <div className="flex flex-col font-mono text-left tracking-tight">
              <span className="text-[13px] font-bold tracking-[0.15em] text-slate-100 group-hover:text-blue-400 transition-colors duration-300">SKM.DEV</span>
              <span className="text-[9px] tracking-[0.12em] text-slate-500 font-medium">LIVE_ENVIRONMENT</span>
            </div>
          </Link>

          {/* User-Familiar Sliding Tab Dashboard Navigation */}
          <nav ref={navContainerRef} className="hidden md:flex items-center relative bg-slate-900/60 border border-slate-800/80 p-1.5 rounded-full backdrop-blur-md">
            <div 
              className="absolute top-1.5 bottom-1.5 bg-gradient-to-r from-blue-600/15 to-indigo-600/15 border border-blue-500/25 rounded-full transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) pointer-events-none"
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
                  className={`px-5 py-2 text-sm font-medium transition-colors duration-300 relative z-10 ${
                    isActive ? "text-blue-400 font-semibold" : "text-slate-300 hover:text-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Social Access Handlers */}
          <div className="hidden md:flex items-center gap-3">
            {socialIcons.map((s, i) => (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-950 border border-slate-800/60 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-[1px]"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Mobile Navigation Trigger */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden flex flex-col justify-center items-end gap-1.5 w-9 h-9 z-50 relative focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className={`h-[2px] bg-slate-200 transition-all duration-300 ${navOpen ? "w-6 rotate-45 translate-y-[5px]" : "w-6"}`} />
            <span className={`h-[2px] bg-slate-200 transition-all duration-300 ${navOpen ? "w-0 opacity-0" : "w-4.5"}`} />
            <span className={`h-[2px] bg-slate-200 transition-all duration-300 ${navOpen ? "w-6 -rotate-45 -translate-y-[5px]" : "w-5"}`} />
          </button>
        </header>
      </div>

      {/* Mobile Curtain Backdrop Blur */}
      {navOpen && (
        <div 
          onClick={() => setNavOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-all duration-500 md:hidden" 
        />
      )}

      {/* Clean Drawer Panel for Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[280px] bg-[#040a16]/98 border-l border-slate-900 p-8 pt-28 flex flex-col gap-8 z-40 transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) md:hidden ${
          navOpen ? "translate-x-0 shadow-[-20px_0_50px_rgba(0,0,0,0.9)]" : "translate-x-full"
        }`}
      >
        <div className="space-y-5">
          <p className="text-[11px] font-mono tracking-[0.2em] text-slate-500 uppercase border-b border-slate-900/60 pb-2 flex items-center gap-2">
            <Terminal size={14} className="text-blue-500" /> MENU
          </p>
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setNavOpen(false)}
                  className={`text-base font-medium transition-all duration-300 pl-3 border-l ${
                    isActive ? "text-blue-400 border-blue-500 font-semibold" : "text-slate-400 border-transparent hover:text-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-auto space-y-4">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500">FIND ME ON</p>
          <div className="flex items-center gap-3">
            {socialIcons.map((s, i) => (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors shadow-sm"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content Mount Engine */}
      <main className="flex-1 w-full relative z-10 pt-36">{children}</main>

      {/* Premium Highly Visible Developer Footer */}
      <footer className="w-full bg-[#050b14] border-t border-slate-800 py-6 relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="text-[12px] text-slate-300 flex items-center gap-2 group">
            <Activity size={14} className="text-slate-500 group-hover:text-emerald-400 transition-colors duration-500" />
            <span className="font-mono text-[12px] text-slate-400">© {new Date().getFullYear()}</span>
            <span className="font-semibold tracking-wide text-slate-100">SAROJ KUMAR MAHATO</span>
          </div>

          {/* Core Location Metrics Block */}
          <div className="text-[11px] font-mono tracking-normal bg-slate-950 border border-slate-800 px-4 py-1.5 rounded-full text-slate-300 shadow-inner flex items-center gap-2">
            <MapPin size={13} className="text-blue-500 animate-pulse" />
            <span className="text-slate-500">LOCATION:</span>
            <span className="text-slate-200">Your Location Here</span>
          </div>

          <div className="flex gap-4">
            {socialIcons.map((s, i) => (
              <a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
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