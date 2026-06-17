"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Compass, 
  MapPin, 
  ArrowDown, 
  ChevronRight, 
  X,
  Trophy,
  Zap,
  Headphones,
  Instagram,
  Facebook,
  Youtube,
  Music
} from "lucide-react";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Territory {
  id: string;
  name: string;
  preview: string;
  category: string;
  icon: string;
  x: string;
  y: string;
}

const TERRITORIES: Territory[] = [
  {
    id: "music",
    name: "Music Territory",
    preview: "Feel the rhythm",
    category: "Music",
    icon: "🎵",
    x: "18%",
    y: "22%",
  },
  {
    id: "sports",
    name: "Sports Territory",
    preview: "Compete. Conquer.",
    category: "Sports",
    icon: "🏆",
    x: "48%",
    y: "10%",
  },
  {
    id: "digital",
    name: "Digital Frontier",
    preview: "Code the future",
    category: "Cybernetics",
    icon: "</>",
    x: "72%",
    y: "18%",
  },
  {
    id: "dance",
    name: "Dance Territory",
    preview: "Move to inspire",
    category: "Dance",
    icon: "💃",
    x: "28%",
    y: "50%",
  },
  {
    id: "literary",
    name: "Literary Peaks",
    preview: "Words that wander",
    category: "Art and Literature",
    icon: "🖋️",
    x: "50%",
    y: "54%",
  },
  {
    id: "art",
    name: "Art Valley",
    preview: "Create the unseen",
    category: "Multimedia",
    icon: "🎨",
    x: "74%",
    y: "58%",
  },
];

// ─── Countdown timer logic ────────────────────────────────────────────────────
function useCountdown() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    const target = new Date("2026-08-15T09:00:00").getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTime({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }
      setTime({
        days:    Math.floor(diff / 86_400_000).toString().padStart(2, "0"),
        hours:   Math.floor((diff % 86_400_000) / 3_600_000).toString().padStart(2, "0"),
        minutes: Math.floor((diff % 3_600_000) / 60_000).toString().padStart(2, "0"),
        seconds: Math.floor((diff % 60_000) / 1000).toString().padStart(2, "0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    setMounted(true);
    return () => clearInterval(id);
  }, []);
  return { time, mounted };
}

// Countdown Cards component — 2×2 grid of parchment cards
function CountdownCards() {
  const { time, mounted } = useCountdown();
  const units = [
    { value: mounted ? time.days    : "00", label: "Days" },
    { value: mounted ? time.hours   : "00", label: "Hours" },
    { value: mounted ? time.minutes : "00", label: "Mins" },
    { value: mounted ? time.seconds : "00", label: "Secs" },
  ];

  return (
    <div className="flex flex-col items-start gap-3 w-full">
      {/* Header */}
      <p className="font-bebas text-[10px] tracking-[0.35em] text-[#ebdcb9]/60 uppercase mb-1">
        Expedition Begins In
      </p>

      {/* 2×2 Grid */}
      <div className="grid grid-cols-2 gap-2.5 w-full">
        {units.map((u, i) => (
          <motion.div
            key={u.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 130, damping: 16 }}
            className="flex flex-col items-center justify-center"
            style={{
              background: "rgba(244, 236, 200, 0.92)",
              border: "2px solid #2B1A0E",
              borderRadius: 8,
              boxShadow: "3px 3px 0px rgba(43,26,14,0.9)",
              padding: "10px 8px 8px",
            }}
          >
            <span
              className="font-bebas leading-none text-[#2B1A0E]"
              style={{ fontSize: 42, lineHeight: 1 }}
            >
              {u.value}
            </span>
            <span
              className="font-sans font-extrabold uppercase tracking-[0.1em] text-[#2B1A0E] mt-1.5"
              style={{ fontSize: 11 }}
            >
              {u.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Coordinates tagline */}
      <p className="font-mono text-[9px] text-[#ebdcb9]/50 tracking-widest uppercase mt-1">
        22.5478° N, 88.3091° E
      </p>
    </div>
  );
}

export default function Home() {
  const mapSectionRef = useRef<HTMLDivElement>(null);

  const scrollMap = () => {
    mapSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#37532A", "#ebdcb9", "#A37F3E", "#ffffff"],
    });
  };

  const PARTNERS = [
    { name: "INTEL CORE", role: "CHIPSET PARTNER",       icon: <Zap className="h-5 w-5" style={{ color: "#E53E3E" }} /> },
    { name: "RED BULL",   role: "ENERGY PARTNER",         icon: <span className="text-xl">🐂</span> },
    { name: "SPOTIFY",    role: "DIGITAL AUDIO PARTNER",  icon: <Headphones className="h-5 w-5" style={{ color: "#1DB954" }} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f0a] relative flex flex-col pb-0">
      
      <Navbar />

      <main className="flex-1 w-full flex flex-col items-center relative z-20">

        {/* ═══ HERO SECTION ══════════════════════════════════════════════════ */}
        <section className="min-h-screen w-full relative overflow-hidden bg-[#0b0f0a]">

          {/* ── Full-screen background video ── */}
          {/* Landscape video for desktop */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/hero-bg.jpg"
            className="hidden lg:block absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Portrait video for mobile */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/hero-bg.jpg"
            className="block lg:hidden absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}
          >
            <source src="/hero-bg-mobile.mp4" type="video/mp4" />
          </video>

          {/* ── Dark gradient overlay so text stays legible ── */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 1,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          {/* ── Three-column layout (Desktop only) ── */}
          <div
            className="hidden lg:flex absolute inset-0 items-center justify-between px-10 lg:px-24 xl:px-40"
            style={{ paddingTop: 80, zIndex: 2 }}
          >
            {/* ── LEFT: Countdown Cards ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 80, damping: 16 }}
              className="hidden lg:flex flex-col items-start justify-center w-[240px] shrink-0"
            >
              <CountdownCards />
            </motion.div>

            {/* ── CENTER: Logo + Title + Button ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 70, damping: 14 }}
              className="flex flex-col items-center justify-center flex-1 text-center px-4 lg:px-8"
            >
              {/* Emblem Logo — large */}
              <div
                className="relative select-none"
                style={{
                  width: "min(420px, 90vw)",
                  height: "min(420px, 90vw)",
                  filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.75))",
                }}
              >
                <Image
                  src="/logo2026.webp"
                  alt="Boscofest 2026 Emblem"
                  fill
                  priority
                  sizes="420px"
                  className="object-contain"
                />
              </div>

              {/* Sub-header */}
              <p
                className="font-sans font-black uppercase tracking-[0.3em] mt-3 mb-2"
                style={{ fontSize: 11, color: "#82C341", letterSpacing: "0.25em" }}
              >
                Don Bosco School · Kolkata
              </p>

              {/* Main Title */}
              <h1
                className="font-bebas uppercase leading-none select-none"
                style={{ fontSize: "clamp(52px, 7vw, 84px)", letterSpacing: "0.03em" }}
              >
                <span style={{ color: "#F4ECC8" }}>BOSCO FEST </span>
                <span style={{ color: "#37532A" }}>2026</span>
              </h1>

              {/* Motto banner */}
              <div
                className="flex items-center gap-3.5 my-5 px-10 py-3 relative overflow-hidden"
                style={{
                  borderTop: "2px solid #A37F3E",
                  borderBottom: "2px solid #A37F3E",
                  background: "rgba(43,26,14,0.45)",
                  backdropFilter: "blur(4px)",
                  borderRadius: 4,
                  boxShadow: "inset 0 0 15px rgba(163,127,62,0.15)",
                }}
              >
                {/* Glowing gold star markers */}
                <span className="text-[#A37F3E] text-xs">✦</span>
                <span
                  className="font-bebas uppercase tracking-[0.25em] font-extrabold text-center"
                  style={{
                    fontSize: 18,
                    background: "linear-gradient(to right, #F4ECC8, #A37F3E, #F4ECC8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 10px rgba(244,236,200,0.15)",
                  }}
                >
                  "UNTOLD. UNFAZED. UNCHARTED."
                </span>
                <span className="text-[#A37F3E] text-xs">✦</span>
              </div>

              {/* Description */}
              <p
                className="font-sans font-medium max-w-md leading-relaxed mb-6"
                style={{ fontSize: 12.5, color: "rgba(235,220,185,0.85)" }}
              >
                Embark on an unforgettable journey through competitions, culture, creativity and
                adventure. Sign the charter and begin the quest.
              </p>

              {/* CTA Button */}
              <button
                onClick={scrollMap}
                className="green-btn flex items-center justify-center gap-2.5 px-10 py-3.5"
                style={{ fontSize: 12, letterSpacing: "0.12em" }}
              >
                <Compass className="h-4 w-4" />
                <span>EXPLORE EVENTS</span>
              </button>
            </motion.div>

            {/* ── RIGHT: Expedition Partners ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, type: "spring", stiffness: 80, damping: 16 }}
              className="hidden lg:flex flex-col items-end justify-center w-[240px] shrink-0 gap-3"
            >
              <p
                className="font-bebas uppercase tracking-[0.28em] self-start"
                style={{ fontSize: 10, color: "rgba(235,220,185,0.7)" }}
              >
                Expedition Partners
              </p>

              <div className="flex flex-col gap-2.5 w-full">
                {PARTNERS.map((p, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="flex items-center gap-3 w-full"
                    style={{
                      background: "#F4ECC8",
                      border: "2px solid #2B1A0E",
                      borderRadius: 6,
                      padding: "8px 12px",
                      boxShadow: "3px 3px 0 rgba(43,26,14,1)",
                    }}
                  >
                    {/* Icon box */}
                    <div
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: 32,
                        height: 32,
                        background: "#ebdcb9",
                        border: "2px solid #2B1A0E",
                        borderRadius: 6,
                        boxShadow: "2px 2px 0 rgba(43,26,14,0.8)",
                      }}
                    >
                      {p.icon}
                    </div>
                    <div className="flex flex-col text-left">
                      <span
                        className="font-bebas uppercase tracking-wider"
                        style={{ fontSize: 14, color: "#2B1A0E", lineHeight: 1 }}
                      >
                        {p.name}
                      </span>
                      <span
                        className="font-sans font-extrabold uppercase tracking-wider"
                        style={{
                          fontSize: 10,
                          color: "#2B1A0E",
                          marginTop: 3,
                          background: "rgba(43,26,14,0.12)",
                          padding: "2px 8px",
                          borderRadius: 3,
                          border: "1px solid rgba(43,26,14,0.25)",
                          display: "inline-block",
                        }}
                      >
                        {p.role}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Vertical layout (Mobile only) ── */}
          <div
            className="flex lg:hidden flex-col items-center justify-start w-full px-5 py-24 relative z-10 gap-8"
          >
            {/* Emblem Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100, damping: 15 }}
              className="relative select-none shrink-0"
              style={{
                width: "min(220px, 55vw)",
                height: "min(220px, 55vw)",
                filter: "drop-shadow(0 12px 30px rgba(0,0,0,0.75))",
              }}
            >
              <Image
                src="/logo2026.webp"
                alt="Boscofest 2026 Emblem"
                fill
                priority
                sizes="220px"
                className="object-contain"
              />
            </motion.div>

            {/* Core Titles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 90, damping: 14 }}
              className="flex flex-col items-center text-center w-full"
            >
              {/* Sub-header */}
              <p
                className="font-sans font-black uppercase tracking-[0.25em] mb-1.5"
                style={{ fontSize: 9.5, color: "#82C341" }}
              >
                Don Bosco School · Kolkata
              </p>

              {/* Main Title */}
              <h1
                className="font-bebas uppercase leading-none select-none"
                style={{ fontSize: "44px", letterSpacing: "0.03em" }}
              >
                <span style={{ color: "#F4ECC8" }}>BOSCO FEST </span>
                <span style={{ color: "#37532A" }}>2026</span>
              </h1>

              {/* Motto banner */}
              <div
                className="flex items-center justify-center gap-2 px-4 py-2.5 w-full max-w-[320px]"
                style={{
                  borderTop: "2px solid #A37F3E",
                  borderBottom: "2px solid #A37F3E",
                  background: "rgba(43,26,14,0.45)",
                  borderRadius: 4,
                  boxShadow: "inset 0 0 12px rgba(163,127,62,0.15)",
                }}
              >
                <span className="text-[#A37F3E] text-[10px]">✦</span>
                <span
                  className="font-bebas uppercase tracking-[0.18em] font-extrabold text-center text-[13px]"
                  style={{
                    background: "linear-gradient(to right, #F4ECC8, #A37F3E, #F4ECC8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 8px rgba(244,236,200,0.15)",
                  }}
                >
                  "UNTOLD. UNFAZED. UNCHARTED."
                </span>
                <span className="text-[#A37F3E] text-[10px]">✦</span>
              </div>
            </motion.div>

            {/* Countdown Cards Wrapper */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 80, damping: 15 }}
              className="w-full max-w-[280px]"
            >
              <CountdownCards />
            </motion.div>

            {/* Description & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 80, damping: 15 }}
              className="flex flex-col items-center text-center w-full max-w-sm px-2"
            >
              <p
                className="font-sans font-medium leading-relaxed mb-5 text-center"
                style={{ fontSize: 12, color: "rgba(235,220,185,0.85)" }}
              >
                Embark on an unforgettable journey through competitions, culture, creativity and
                adventure. Sign the charter and begin the quest.
              </p>

              <button
                onClick={scrollMap}
                className="green-btn flex items-center justify-center gap-2 px-8 py-3.5 w-full max-w-[240px]"
                style={{ fontSize: 11.5, letterSpacing: "0.1em" }}
              >
                <Compass className="h-4 w-4" />
                <span>EXPLORE EVENTS</span>
              </button>
            </motion.div>

            {/* Expedition Partners */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 80, damping: 15 }}
              className="w-full max-w-[280px] flex flex-col items-center mt-4"
            >
              <p
                className="font-bebas uppercase tracking-[0.25em] mb-3"
                style={{ fontSize: 9.5, color: "rgba(235,220,185,0.7)" }}
              >
                Expedition Partners
              </p>

              <div className="flex flex-col gap-2.5 w-full">
                {PARTNERS.map((p, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="flex items-center gap-3 w-full"
                    style={{
                      background: "#F4ECC8",
                      border: "2px solid #2B1A0E",
                      borderRadius: 6,
                      padding: "8px 12px",
                      boxShadow: "3px 3px 0 rgba(43,26,14,1)",
                    }}
                  >
                    <div
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: 32,
                        height: 32,
                        background: "#ebdcb9",
                        border: "2px solid #2B1A0E",
                        borderRadius: 6,
                        boxShadow: "2px 2px 0 rgba(43,26,14,0.8)",
                      }}
                    >
                      {p.icon}
                    </div>
                    <div className="flex flex-col text-left">
                      <span
                        className="font-bebas uppercase tracking-wider"
                        style={{ fontSize: 13, color: "#2B1A0E", lineHeight: 1 }}
                      >
                        {p.name}
                      </span>
                      <span
                        className="font-sans font-extrabold uppercase tracking-wider"
                        style={{
                          fontSize: 9.5,
                          color: "#2B1A0E",
                          marginTop: 2.5,
                          background: "rgba(43,26,14,0.12)",
                          padding: "1.5px 6px",
                          borderRadius: 3,
                          border: "1px solid rgba(43,26,14,0.25)",
                          display: "inline-block",
                        }}
                      >
                        {p.role}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Bottom-left social icons ── */}
          <div className="absolute bottom-8 left-8 hidden md:flex items-center gap-3.5 z-30">
            {[
              { href: "https://instagram.com", icon: <Instagram className="h-4 w-4" /> },
              { href: "https://facebook.com",  icon: <Facebook className="h-4 w-4" /> },
              { href: "https://youtube.com",   icon: <Youtube className="h-4 w-4" /> },
              { href: "https://spotify.com",   icon: <Music className="h-4 w-4" /> },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-[#ebdcb9]/60 hover:text-[#ebdcb9] transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* ── Bottom-right scroll indicator ── */}
          <button
            onClick={scrollMap}
            className="absolute bottom-8 right-8 hidden md:flex items-center gap-2 text-[#ebdcb9]/60 hover:text-[#ebdcb9] transition-colors cursor-pointer z-30"
          >
            <span className="font-bebas text-[10px] tracking-[0.25em] uppercase">Scroll to Explore</span>
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </button>

        </section>

        {/* ═══ INTERACTIVE MAP SECTION ═══════════════════════════════════════ */}
        <section
          ref={mapSectionRef}
          className="w-full py-24 px-6 flex flex-col items-center relative border-t-2 border-ink-dark overflow-hidden bg-zinc-950"
          style={{
            backgroundImage: "url('/adventure-map-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: typeof window !== "undefined" && window.innerWidth >= 768 ? "fixed" : "scroll",
          }}
        >
          {/* Dark overlay to keep content legible */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(10,6,2,0.6) 0%, rgba(10,6,2,0.4) 50%, rgba(10,6,2,0.7) 100%)",
              zIndex: 0,
            }}
          />

          {/* Section Headers */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
            className="text-center mb-8 relative z-10 px-4 flex flex-col items-center"
          >
            <h2 className="font-bebas font-black text-4xl md:text-5xl text-[#F4ECC8] uppercase tracking-[0.06em]">
              EXPLORE THE TERRITORIES
            </h2>
            <p className="font-sans font-semibold text-xs md:text-sm text-[#ebdcb9]/85 mt-2 max-w-lg mx-auto">
              Discover events. Challenge limits. Create memories.
            </p>
            {/* Compass decorative separator */}
            <div className="flex items-center gap-3.5 mt-5 opacity-80">
              <div className="w-16 md:w-28 h-[1px] bg-gradient-to-r from-transparent to-[#A37F3E]" />
              <span className="text-[#A37F3E] text-lg select-none">🧭</span>
              <div className="w-16 md:w-28 h-[1px] bg-gradient-to-l from-transparent to-[#A37F3E]" />
            </div>
          </motion.div>

          {/* Mobile Grid Layout (visible on sm and below) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-xl md:hidden relative z-10 mt-6 px-2">
            {TERRITORIES.map((loc) => (
              <Link
                key={loc.id}
                href={`/events?category=${encodeURIComponent(loc.category)}`}
                className="parchment-card p-4.5 flex flex-col items-center text-center cursor-pointer hover:-translate-y-1 transition-all active:translate-y-0"
              >
                <div className="w-10 h-10 rounded-full bg-[#1E1208] border border-[#A37F3E] flex items-center justify-center text-lg relative z-10 shadow-md">
                  {loc.icon === "</>" ? (
                    <span className="font-mono text-xs font-black text-[#A37F3E]">&lt;/&gt;</span>
                  ) : (
                    loc.icon
                  )}
                </div>
                <h4 className="font-bebas text-base text-[#2B1A0E] uppercase tracking-wider mt-3">
                  {loc.name}
                </h4>
                <p className="text-[11.5px] leading-relaxed text-[#2B1A0E]/70 mt-1 font-semibold">
                  {loc.preview}
                </p>
                <span className="mt-3 px-4 py-1 border border-[#A37F3E] text-[#2B1A0E] text-[10px] font-bebas tracking-wider uppercase rounded hover:bg-[#A37F3E]/15 transition-all">
                  EXPLORE
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop Map Canvas Layout (visible on md and up) */}
          <div className="hidden md:block relative w-full max-w-5xl h-[580px] z-10 mt-6">
            
            {/* SVG Winding Map Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 580" fill="none">
              <path
                d="M 180,165 C 300,105 380,85 480,98 C 580,113 650,113 720,138 C 760,205 770,305 740,380 C 640,380 580,360 500,360 C 400,360 330,350 280,330 C 220,295 190,205 180,165"
                stroke="#A37F3E"
                strokeWidth="2.5"
                strokeDasharray="7 7"
                className="opacity-45"
              />
            </svg>

            {/* Absolute Positioned Map Nodes */}
            {TERRITORIES.map((loc) => (
              <motion.div
                key={loc.id}
                className="absolute flex flex-col items-center text-center group"
                style={{
                  left: loc.x,
                  top: loc.y,
                  transform: "translate(-50%, -50%)",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link href={`/events?category=${encodeURIComponent(loc.category)}`} className="flex flex-col items-center">
                  
                  {/* Teardrop map-pin marker */}
                  <div className="w-12 h-12 rounded-full bg-[#1E1208] border-2 border-[#A37F3E] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:border-[#ebdcb9] relative z-10">
                    <span className="text-xl">
                      {loc.icon === "</>" ? (
                        <span className="font-mono text-sm font-extrabold text-[#A37F3E]">&lt;/&gt;</span>
                      ) : (
                        loc.icon
                      )}
                    </span>
                    {/* Pin tail */}
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#1E1208] border-r-2 border-b-2 border-[#A37F3E] rotate-45 transition-all duration-300 group-hover:border-[#ebdcb9]" />
                  </div>

                  {/* Texts - aligned below marker with some shadow backing for legibility */}
                  <div className="mt-4 px-3 py-1.5 rounded-md bg-black/45 backdrop-blur-xs border border-[#A37F3E]/20">
                    <h4 className="font-bebas text-xs md:text-sm text-[#F4ECC8] uppercase tracking-[0.08em] leading-tight">
                      {loc.name}
                    </h4>
                    <p className="text-[10px] text-[#ebdcb9]/75 mt-0.5 whitespace-nowrap leading-none font-medium">
                      {loc.preview}
                    </p>
                    <div className="inline-block mt-2 px-2.5 py-0.5 border border-[#A37F3E]/50 text-[#F4ECC8] text-[8.5px] font-bebas tracking-wider uppercase rounded transition-all group-hover:bg-[#A37F3E]/25 group-hover:border-[#ebdcb9]">
                      EXPLORE
                    </div>
                  </div>

                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom view all events CTA */}
          <div className="mt-14 relative z-10">
            <Link
              href="/events"
              className="flex items-center gap-2.5 px-8 py-3.5 bg-[#37532A] hover:bg-[#273C1E] text-[#F4ECC8] font-bebas text-sm uppercase tracking-widest border-2 border-ink-dark shadow-[4px_4px_0px_rgba(43,26,14,0.9)] rounded-full transition-all active:translate-y-[2px]"
            >
              {/* Binoculars SVG Icon */}
              <svg className="h-4.5 w-4.5 shrink-0 text-[#F4ECC8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 8a3 3 0 100 6 3 3 0 000-6zm8 0a3 3 0 100 6 3 3 0 000-6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.01M6 14s1 2 2 2 2-2 2-2m4 0s1 2 2 2 2-2 2-2" />
              </svg>
              <span>VIEW ALL EVENTS</span>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
