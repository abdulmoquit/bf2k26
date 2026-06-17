"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Compass, Calendar, School, Info, Menu, X, ArrowRight, Flag } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home",     href: "/",         icon: Map },
  { label: "Events",   href: "/events",   icon: Compass },
  { label: "Schedule", href: "/schedule", icon: Calendar },
  { label: "Schools",  href: "/schools",  icon: School },
  { label: "About Us", href: "/about",    icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobile]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "top-0 py-2.5 bg-[#F7F1D5]/90 backdrop-blur-md border-b border-[#2B1A0E]/15 shadow-sm" 
          : "top-0 py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 group select-none py-1">
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-[#2B1A0E]/30 bg-[#E8D7A5]">
            <Image 
              src="/logo2026.png" 
              alt="Boscofest 2026" 
              fill
              className="object-contain p-0.5 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-black tracking-widest text-sm text-[#2B1A0E] uppercase">
              BOSCO<span className="text-[#65C466] font-light">FEST</span>
            </span>
            <span className="text-[7.5px] tracking-[0.2em] text-[#5C4331] uppercase font-bold mt-0.5">
              2026 · Uncharted
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative px-3.5 py-2 flex items-center gap-2 font-sans text-xs font-bold tracking-wider uppercase text-[#2B1A0E] hover:text-[#6EC6FF] transition-colors rounded-lg"
              >
                <Icon className="h-3.5 w-3.5 opacity-70" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#65C466]"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Desktop CTA button ── */}
        <div className="hidden md:block">
          <Link
            href="#register"
            className="inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-black tracking-widest uppercase text-[#2B1A0E] bg-[#6EC6FF] border border-[#2B1A0E] shadow-[2px_2px_0px_rgba(43,26,14,1)] hover:bg-[#6EC6FF]/80 transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_rgba(43,26,14,1)]"
            style={{ borderRadius: "20px 8px 18px 10px / 12px 18px 10px 14px" }}
          >
            <span>Register Now</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* ── Mobile menu toggle (large 48px hit box) ── */}
        <button
          onClick={() => setMobile(!mobileOpen)}
          className="md:hidden flex items-center justify-center h-11 w-11 text-[#2B1A0E] hover:text-[#6EC6FF] transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
        </button>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden w-full overflow-hidden bg-[#F7F1D5] border-b border-[#2B1A0E]/15 shadow-md"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobile(false)}
                    className="flex items-center gap-3.5 py-3 px-4 rounded-xl border border-transparent font-sans text-sm font-black tracking-widest uppercase text-[#2B1A0E] transition-all"
                    style={isActive ? {
                      backgroundColor: "rgba(232, 215, 165, 0.4)",
                      borderColor: "rgba(43, 26, 14, 0.12)"
                    } : {}}
                  >
                    <Icon className={`h-4.5 w-4.5 ${isActive ? "text-[#65C466]" : "opacity-60"}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <Link
                href="#register"
                onClick={() => setMobile(false)}
                className="mt-4 flex items-center justify-center gap-2 py-3.5 rounded-full font-sans text-sm font-black tracking-widest uppercase text-[#2B1A0E] bg-[#6EC6FF] border border-[#2B1A0E] shadow-[3px_3px_0px_rgba(43,26,14,1)] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[2px_2px_0px_rgba(43,26,14,1)] transition-all"
              >
                <Flag className="h-4 w-4" />
                <span>Register Now</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
