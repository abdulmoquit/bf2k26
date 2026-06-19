"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Youtube, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative z-20 mt-auto pt-16 pb-12 overflow-hidden bg-[#1E1208] border-t-2 border-[#A37F3E]">
      
      {/* ── Faded Compass SVG background ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] opacity-[0.035] pointer-events-none z-0">
        <svg className="w-full h-full text-[#E8D7A5] animate-compass-spin" viewBox="0 0 100 100" fill="none" stroke="currentColor">
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

          {/* Brand & Contact Info */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 select-none">
              <span className="font-display font-black tracking-widest text-xl text-[#E8D7A5] uppercase">
                BOSCO<span className="text-[#65C466] font-light">FEST</span>
              </span>
            </Link>
            
            <ul className="space-y-3 text-xs text-[#ebdcb9] font-medium mb-6 max-w-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4.5 w-4.5 shrink-0 mt-0.5 text-[#E8D7A5]" />
                <span>Don Bosco School, Park Circus, Kolkata, West Bengal 700017</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#65C466]" />
                <a href="tel:+913333879202" className="hover:text-white transition-colors font-bold text-[#ebdcb9]">+91 33 3387-9202</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#6EC6FF]" />
                <a href="mailto:home.boscofest@gmail.com" className="hover:text-white transition-colors font-bold text-[#ebdcb9]">home.boscofest@gmail.com</a>
              </li>
            </ul>

            <div className="flex gap-3">
              {[
                { href: "https://www.instagram.com/boscofest26?igsh=eW14dnphMGltdDEz", Icon: Instagram },
                { href: "https://youtube.com/@donboscoschoolparkcircus1452?si=-cOPtOWFAypyTlL2",   Icon: Youtube   },
              ].map(({ href, Icon }, idx) => (
                <a key={idx} href={href} target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-[#ebdcb9]/20 bg-[#2B1A0E]/50 hover:bg-[#6EC6FF]/25 hover:border-white transition-all hover:scale-105"
                  aria-label="Social Link">
                  <Icon className="h-4 w-4 text-[#E8D7A5]" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-bold uppercase tracking-widest text-xs mb-4 text-[#E8D7A5]">
              JUMP BACK TO
            </h4>
            <ul className="space-y-2.5 text-xs font-bold uppercase text-[#ebdcb9]">
              {[
                { label: "Home", href: "/" },
                { label: "Events", href: "/events" },
                { label: "Schedule", href: "/schedule" },
                { label: "Schools", href: "/schools" },
                { label: "About Us", href: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href}
                    className="hover:text-[#6EC6FF] transition-colors inline-flex items-center gap-1.5 py-1 text-[#ebdcb9]">
                    <span className="w-1 h-1 rounded-full bg-[#65C466]" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Map Location */}
          <div className="w-full flex flex-col">
            <h4 className="font-display font-bold uppercase tracking-widest text-xs mb-4 text-[#E8D7A5]">
              Location Map
            </h4>
            <div className="w-full h-48 border-2 border-[#A37F3E]/40 rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.580796347101!2d88.36931137593645!3d22.54421733346617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276d498292c3f%3A0x633d1b6441d65d49!2sDon%20Bosco%20School%2C%20Park%20Circus!5e0!3m2!1sen!2sin!4v1718774000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#ebdcb9]/12">
          <p className="text-[11px] text-[#ebdcb9]/60 font-semibold tracking-wide">
            © {new Date().getFullYear()} Boscofest · Don Bosco School, Kolkata. All trails mapped.
          </p>
          <button onClick={scrollToTop}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider py-2 px-3 border border-[#ebdcb9]/30 bg-[#2B1A0E] text-[#ebdcb9] hover:bg-[#1E1208] hover:text-white active:translate-y-[1px] transition-all"
            style={{ borderRadius: "10px 4px 8px 4px / 6px 8px 4px 6px" }}>
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
