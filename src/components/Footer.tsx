"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Youtube, Facebook, ArrowUp, Compass } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative z-20 mt-auto pt-16 pb-12 overflow-hidden"
      style={{ background:"rgba(2,12,18,0.9)", backdropFilter:"blur(16px)",
        borderTop:"1px solid rgba(41,171,226,0.12)" }}>

      {/* Jungle floor glow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[700px] h-[280px] rounded-full blur-[120px] pointer-events-none"
        style={{ background:"radial-gradient(ellipse,rgba(41,171,226,0.06) 0%,rgba(45,100,20,0.04) 50%,transparent 70%)" }} />

      {/* Top sky blue / green vine line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background:"linear-gradient(90deg,transparent,rgba(41,171,226,0.15),rgba(106,172,26,0.12),transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="relative h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background:"rgba(41,171,226,0.08)", border:"1px solid rgba(41,171,226,0.25)" }}>
                <Compass className="h-4 w-4" style={{ color:"#29ABE2" }} />
              </div>
              <span className="font-display font-black tracking-widest text-xl uppercase" style={{ color:"#F0EDD8" }}>
                BOSCO<span style={{ color:"#6AAD1A", fontWeight:300 }}>FEST</span>
              </span>
            </Link>
            <p className="text-sm max-w-sm leading-relaxed mb-6" style={{ color:"rgba(240,237,216,0.45)" }}>
              Boscofest 2026 —{" "}
              <span className="font-medium" style={{ color:"#29ABE2" }}>Untold. Unfazed. Uncharted.</span>{" "}
              The annual cultural and technical flagship of Don Bosco School, Kolkata. Step beyond the horizon.
            </p>
            <div className="flex gap-3">
              {[
                { href:"https://instagram.com", Icon:Instagram },
                { href:"https://youtube.com",   Icon:Youtube   },
                { href:"https://facebook.com",  Icon:Facebook  },
              ].map(({ href, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ background:"rgba(41,171,226,0.06)", border:"1px solid rgba(41,171,226,0.15)",
                    color:"rgba(240,237,216,0.45)" }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="#29ABE2";(e.currentTarget as HTMLElement).style.boxShadow="0 0 14px rgba(41,171,226,0.25)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="rgba(240,237,216,0.45)";(e.currentTarget as HTMLElement).style.boxShadow="none";}}>
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold uppercase tracking-widest text-xs mb-5" style={{ color:"#F0EDD8" }}>
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              {["Home","Events","Gallery","Sponsors","Register"].map((label) => (
                <li key={label}>
                  <Link href={label==="Home"?"/":`#${label.toLowerCase()}`}
                    className="group flex items-center gap-2 transition-colors"
                    style={{ color:"rgba(240,237,216,0.45)" }}
                    onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color="#F0EDD8"}
                    onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color="rgba(240,237,216,0.45)"}>
                    <span className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor:"#6AAD1A" }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold uppercase tracking-widest text-xs mb-5" style={{ color:"#F0EDD8" }}>
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm" style={{ color:"rgba(240,237,216,0.45)" }}>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" style={{ color:"#29ABE2" }} />
                <span>Don Bosco School, Park Circus, Kolkata, West Bengal 700017</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" style={{ color:"#6AAD1A" }} />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" style={{ color:"#29ABE2" }} />
                <a href="mailto:info@boscofest.in" className="hover:text-white transition-colors">info@boscofest.in</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop:"1px solid rgba(45,100,20,0.1)" }}>
          <p className="text-xs" style={{ color:"rgba(240,237,216,0.3)" }}>
            © {new Date().getFullYear()} Boscofest · Don Bosco School, Kolkata ·{" "}
            <span style={{ color:"rgba(41,171,226,0.55)" }}>Untold. Unfazed. Uncharted.</span>
          </p>
          <button onClick={scrollToTop}
            className="flex items-center gap-2 text-xs uppercase tracking-widest transition-colors py-2 px-3 rounded-md"
            style={{ color:"rgba(240,237,216,0.35)" }}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color="#F0EDD8"}
            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color="rgba(240,237,216,0.35)"}>
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
