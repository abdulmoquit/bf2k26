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
          ? "top-0 py-2.5 bg-[#2B1A0E]/85 backdrop-blur-md border-b border-[#ebdcb9]/10 shadow-lg" 
          : "top-0 py-4 bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 group select-none py-1">
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-gold-accent bg-black">
            <Image 
              src="/logo2026.webp" 
              alt="Boscofest 2026" 
              fill
              className="object-contain p-0.5 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bebas text-lg tracking-wider text-white uppercase">
              BOSCO FEST
            </span>
            <span className="text-[7.5px] tracking-[0.2em] text-gold-accent uppercase font-bold mt-0.5">
              2026
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
                className={`relative px-3.5 py-2 flex items-center gap-2 font-sans text-xs font-bold tracking-wider uppercase transition-colors rounded-lg ${
                  isActive ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5 opacity-70" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-map-green"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
 
        {/* ── Desktop CTA button ── */}
        <div className="hidden md:block">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 green-btn text-sm font-bebas tracking-wider uppercase"
          >
            <span>Register Now</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* ── Mobile menu toggle ── */}
        <button
          onClick={() => setMobile(!mobileOpen)}
          className="md:hidden flex items-center justify-center h-11 w-11 text-white hover:text-gold-accent transition-colors"
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
            className="md:hidden w-full overflow-hidden bg-[#2B1A0E]/95 backdrop-blur-lg border-b border-white/10 shadow-md"
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
                    className={`flex items-center gap-3.5 py-3 px-4 rounded-xl border border-transparent font-sans text-sm font-black tracking-widest uppercase transition-all ${
                      isActive ? "text-white bg-white/10 border-white/10" : "text-white/80 hover:text-white"
                    }`}
                  >
                    <Icon className={`h-4.5 w-4.5 ${isActive ? "text-map-green" : "opacity-60"}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <a
                href="#"
                onClick={() => setMobile(false)}
                className="mt-4 flex items-center justify-center gap-2 py-3.5 green-btn text-sm font-bebas tracking-widest uppercase"
              >
                <Flag className="h-4 w-4" />
                <span>Register Now</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
