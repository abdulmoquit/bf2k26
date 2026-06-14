"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Compass } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home",     href: "/" },
  { label: "Events",   href: "/events" },
  { label: "Gallery",  href: "#gallery" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled,  setScrolled]  = useState(false);
  const [mobileOpen,  setMobile]    = useState(false);
  const [hoveredIdx,  setHovered]   = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        isScrolled 
          ? "top-4 w-[calc(100%-2rem)] max-w-7xl rounded-2xl py-0" 
          : "top-0 w-full py-5 bg-transparent"
      }`}
      style={isScrolled ? {
        background: "rgba(2, 12, 18, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(41, 171, 226, 0.15)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.65), inset 0 0 20px rgba(41,171,226,0.05)",
      } : {}}
    >
      {/* Inner container */}
      <div className={`w-full px-6 ${isScrolled ? "py-2.5" : ""}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group relative">
            <div className="relative h-10 w-10 overflow-hidden rounded-full transition-all duration-500 group-hover:scale-110"
              style={{ border:"1.5px solid rgba(41,171,226,0.35)", boxShadow:"0 0 12px rgba(41,171,226,0.15)" }}>
              <Image src="/logo2026.png" alt="Boscofest 2026" fill
                className="object-cover scale-110 group-hover:scale-125 transition-transform duration-500" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-black tracking-widest text-base uppercase transition-colors"
                style={{ color:"#F0EDD8" }}>
                BOSCO<span style={{ color:"#6AAD1A", fontWeight:300 }}>FEST</span>
              </span>
              <span className="text-[8px] tracking-[0.22em] uppercase font-medium"
                style={{ color:"rgba(41,171,226,0.55)" }}>
                2026 · Uncharted
              </span>
            </div>
            <div className="absolute -bottom-1 left-0 right-0 h-[1.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full"
              style={{ background:"linear-gradient(90deg, transparent, rgba(41,171,226,0.6), rgba(106,172,26,0.5), transparent)" }} />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.label} href={item.href}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative px-4 py-2 font-sans text-sm font-medium tracking-wider uppercase transition-colors"
                  style={{ color: isActive ? "#29ABE2" : "rgba(240,237,216,0.65)" }}>
                  <span className="relative z-10 transition-colors" style={hoveredIdx===idx?{color:"#F0EDD8"}:{}}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div layoutId="activeUnderline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                      style={{ background:"linear-gradient(90deg,#29ABE2,#6AAD1A)", boxShadow:"0 0 8px rgba(41,171,226,0.6)" }}
                      transition={{ type:"spring", stiffness:380, damping:30 }}
                    />
                  )}
                  <AnimatePresence>
                    {hoveredIdx === idx && !isActive && (
                      <motion.div layoutId="hoverPill"
                        className="absolute inset-0 rounded-lg -z-0"
                        style={{ background:"rgba(41,171,226,0.06)", border:"1px solid rgba(41,171,226,0.15)" }}
                        initial={{ opacity:0, scale:0.94 }}
                        animate={{ opacity:1, scale:1 }}
                        exit={{ opacity:0, scale:0.94 }}
                        transition={{ type:"spring", stiffness:350, damping:25 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </nav>

          {/* ── Register CTA ── */}
          <div className="hidden md:block">
            <Link href="#register"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse-slow"
              style={{ 
                background: "linear-gradient(135deg, #1A6FA8 0%, #2D6414 100%)",
                border: "1px solid rgba(41,171,226,0.25)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.65), 0 0 12px rgba(41,171,226,0.25)" 
              }}>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-sky-light/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <span className="relative z-10 flex items-center gap-1.5 text-parchment group-hover:text-white">
                <Compass className="h-3.5 w-3.5 text-sky group-hover:animate-spin" />
                Register <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 text-sky" />
              </span>
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button onClick={() => setMobile(!mobileOpen)}
            className="md:hidden p-2 transition-colors"
            style={{ color:"rgba(240,237,216,0.7)" }}
            aria-label="Toggle menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }}
            exit={{ opacity:0, height:0 }}
            className="md:hidden w-full overflow-hidden"
            style={{ 
              background: "rgba(2, 12, 18, 0.98)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(41, 171, 226, 0.15)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.7)"
            }}>
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.label} href={item.href}
                    onClick={() => setMobile(false)}
                    className="text-lg font-semibold uppercase tracking-wider py-2 border-b transition-colors"
                    style={{ 
                      color:isActive?"#29ABE2":"rgba(240,237,216,0.65)",
                      borderColor:"rgba(45,100,20,0.15)" 
                    }}>
                    {item.label}
                  </Link>
                );
              })}
              <Link href="#register" onClick={() => setMobile(false)}
                className="mt-4 relative flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold uppercase tracking-widest text-white border"
                style={{ 
                  background: "linear-gradient(135deg, #1A6FA8 0%, #2D6414 100%)",
                  borderColor: "rgba(41,171,226,0.25)",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.5), 0 0 10px rgba(41,171,226,0.2)"
                }}>
                <Compass className="h-4 w-4 text-sky" /> Register Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
