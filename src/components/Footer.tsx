"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Youtube, Facebook, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative z-20 mt-auto pt-16 pb-12 overflow-hidden bg-[#E8D7A5] border-t-2 border-[#2B1A0E]">
      
      {/* ── Faded Compass SVG background ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] opacity-[0.035] pointer-events-none z-0">
        <svg className="w-full h-full text-[#2B1A0E] animate-compass-spin" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <circle cx="50" cy="50" r="45" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="38" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="1.5" fill="currentColor" />
          {/* Compass Rose Points */}
          <path d="M 50,12 L 53,42 L 50,45 L 47,42 Z" fill="currentColor" />
          <path d="M 50,88 L 53,58 L 50,55 L 47,58 Z" fill="currentColor" />
          <path d="M 88,50 L 58,53 L 55,50 L 58,47 Z" fill="currentColor" />
          <path d="M 12,50 L 42,53 L 45,50 L 42,47 Z" fill="currentColor" />
          {/* Sub-points */}
          <path d="M 23,23 L 45,45 L 43,47 Z" fill="currentColor" opacity="0.6" />
          <path d="M 77,77 L 55,55 L 57,53 Z" fill="currentColor" opacity="0.6" />
          <path d="M 77,23 L 55,45 L 57,47 Z" fill="currentColor" opacity="0.6" />
          <path d="M 23,77 L 45,55 L 43,53 Z" fill="currentColor" opacity="0.6" />
          {/* Text markers */}
          <text x="48" y="10" fontSize="8" fontWeight="bold" fill="currentColor">N</text>
          <text x="48" y="96" fontSize="8" fontWeight="bold" fill="currentColor">S</text>
          <text x="91" y="53" fontSize="8" fontWeight="bold" fill="currentColor">E</text>
          <text x="4" y="53" fontSize="8" fontWeight="bold" fill="currentColor">W</text>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 select-none">
              <span className="font-display font-black tracking-widest text-xl text-[#2B1A0E] uppercase">
                BOSCO<span className="text-[#65C466] font-light">FEST</span>
              </span>
            </Link>
            <p className="font-display font-bold text-sm tracking-[0.15em] text-[#2B1A0E] uppercase mb-1">
              UNTOLD. UNFAZED. UNCHARTED.
            </p>
            <p className="text-xs italic text-[#5C4331] max-w-sm mb-6">
              &ldquo;Every expedition begins with a single step.&rdquo; Step beyond the horizon at the annual flagship fest of Don Bosco School, Park Circus, Kolkata.
            </p>
            <div className="flex gap-3">
              {[
                { href: "https://instagram.com", Icon: Instagram },
                { href: "https://youtube.com",   Icon: Youtube   },
                { href: "https://facebook.com",  Icon: Facebook  },
              ].map(({ href, Icon }, idx) => (
                <a key={idx} href={href} target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-[#2B1A0E]/30 bg-[#F7F1D5] hover:bg-[#6EC6FF]/25 hover:border-[#2B1A0E] transition-all hover:scale-105"
                  aria-label="Social Link">
                  <Icon className="h-4 w-4 text-[#2B1A0E]" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-bold uppercase tracking-widest text-xs mb-4 text-[#2B1A0E]">
              Expedition Log
            </h4>
            <ul className="space-y-2.5 text-xs font-bold uppercase">
              {["Home", "Events", "Sponsors", "Register"].map((label) => (
                <li key={label}>
                  <Link href={label === "Home" || label === "Events" ? (label === "Home" ? "/" : "/events") : `#${label.toLowerCase()}`}
                    className="hover:text-[#6EC6FF] transition-colors inline-flex items-center gap-1.5 py-1">
                    <span className="w-1 h-1 rounded-full bg-[#65C466]" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold uppercase tracking-widest text-xs mb-4 text-[#2B1A0E]">
              Headquarters
            </h4>
            <ul className="space-y-3.5 text-xs text-[#5C4331]">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4.5 w-4.5 shrink-0 mt-0.5 text-[#2B1A0E]" />
                <span>Don Bosco School, Park Circus, Kolkata, West Bengal 700017</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#65C466]" />
                <a href="tel:+919876543210" className="hover:text-[#2B1A0E] transition-colors font-bold">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#6EC6FF]" />
                <a href="mailto:info@boscofest.in" className="hover:text-[#2B1A0E] transition-colors font-bold">info@boscofest.in</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#2B1A0E]/12">
          <p className="text-[10px] text-[#5C4331] font-medium tracking-wide">
            © {new Date().getFullYear()} Boscofest · Don Bosco School, Kolkata. All trails mapped.
          </p>
          <button onClick={scrollToTop}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider py-2 px-3 border border-[#2B1A0E]/20 bg-[#F7F1D5] hover:bg-[#F7F1D5]/80 active:translate-y-[1px] transition-all"
            style={{ borderRadius: "10px 4px 8px 4px / 6px 8px 4px 6px" }}>
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
