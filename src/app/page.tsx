"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Compass,
  ArrowDown,
  Instagram,
  Youtube
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { usePreloaderDone } from "@/components/PreloaderContext";

// Shared animation variants
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, type: "spring" as const, stiffness: 80, damping: 16 },
});

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.4 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -30 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 14 },
  },
};

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
    id: "fusion-music",
    name: "Bosco Jukebox",
    preview: "Fusion Music",
    category: "Music",
    icon: "🎸",
    x: "18%",
    y: "22%",
  },
  {
    id: "western-dance",
    name: "Bosco Tango",
    preview: "Western Dance",
    category: "Dance",
    icon: "🕺",
    x: "48%",
    y: "10%",
  },
  {
    id: "western-music",
    name: "Bosco Beat",
    preview: "Western Music",
    category: "Music",
    icon: "🎵",
    x: "72%",
    y: "18%",
  },
  {
    id: "eastern-music",
    name: "Bosco Raag",
    preview: "Eastern Music",
    category: "Music",
    icon: "🎤",
    x: "74%",
    y: "58%",
  },
  {
    id: "eastern-dance",
    name: "Bosco Nritya",
    preview: "Eastern Dance",
    category: "Dance",
    icon: "💃",
    x: "28%",
    y: "50%",
  },
];

// ─── Countdown timer logic ────────────────────────────────────────────────────
function useCountdown() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    const target = new Date("2026-07-10T07:15:00").getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTime({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }
      setTime({
        days: Math.floor(diff / 86_400_000).toString().padStart(2, "0"),
        hours: Math.floor((diff % 86_400_000) / 3_600_000).toString().padStart(2, "0"),
        minutes: Math.floor((diff % 3_600_000) / 60_000).toString().padStart(2, "0"),
        seconds: Math.floor((diff % 60_000) / 1000).toString().padStart(2, "0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  return { time, mounted };
}

// Countdown Cards component — 2×2 grid of parchment cards
function CountdownCards({ isLoaded = true }: { isLoaded?: boolean }) {
  const { time, mounted } = useCountdown();
  const units = [
    { value: mounted ? time.days : "00", label: "Days", color: "#2B1A0E" },
    { value: mounted ? time.hours : "00", label: "Hours", color: "#2B1A0E" },
    { value: mounted ? time.minutes : "00", label: "Mins", color: "#2B1A0E" },
    { value: mounted ? time.seconds : "00", label: "Secs", color: "#37532A" }, // Highlight seconds with forest green
  ];

  return (
    <div className="flex flex-col items-start gap-4 w-full select-none">
      {/* Header */}
      <div className="flex items-center gap-2 mb-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#82C341] animate-pulse" />
        <p className="font-bebas text-[10px] tracking-[0.35em] text-[#ebdcb9]/60 uppercase">
          Expedition Begins In
        </p>
      </div>

      {/* 2×2 Grid */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {units.map((u, i) => (
          <motion.div
            key={u.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            whileHover={{ 
              y: -4, 
              rotate: i % 2 === 0 ? 1.5 : -1.5,
              boxShadow: "5px 5px 0px rgba(43,26,14,1)",
              backgroundColor: "rgba(249, 244, 218, 0.98)"
            }}
            transition={{ 
              default: { type: "spring", stiffness: 130, damping: 16 },
              scale: { delay: 0.15 + i * 0.08, type: "spring" }
            }}
            className="flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
            style={{
              backgroundColor: "rgba(244, 236, 200, 0.93)",
              backgroundImage: "radial-gradient(rgba(43, 26, 14, 0.06) 1px, transparent 1px)",
              backgroundSize: "6px 6px",
              border: "2px solid #2B1A0E",
              borderRadius: 10,
              boxShadow: "3px 3px 0px rgba(43,26,14,0.9)",
              padding: "12px 8px 10px",
              willChange: "transform, box-shadow"
            }}
          >
            {/* Blueprint corner markings */}
            <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-[#2B1A0E]/30" />
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-[#2B1A0E]/30" />
            <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b border-l border-[#2B1A0E]/30" />
            <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-[#2B1A0E]/30" />

            <span
              className="font-bebas leading-none font-black"
              style={{ 
                fontSize: "clamp(38px, 2.8vw, 44px)", 
                lineHeight: 1,
                color: u.color,
                textShadow: u.label === "Secs" ? "0 0 10px rgba(130,195,65,0.1)" : "none"
              }}
            >
              {u.value}
            </span>
            <span
              className="font-bebas font-bold uppercase tracking-[0.15em] mt-1 text-[#2B1A0E]/50 text-[10px]"
            >
              {u.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TerritoryLogo({ id, icon, name, isMobile }: { id: string; icon: string; name: string; isMobile?: boolean }) {
  const [imgFailed, setImgFailed] = useState(false);
  const logoPath = `/event-logos/${id}.avif`;

  if (!imgFailed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoPath}
        alt={name}
        onError={() => setImgFailed(true)}
        className="w-full h-full object-cover rounded-full"
      />
    );
  }

  return (
    <span className={isMobile ? "text-lg select-none" : "text-xl select-none"}>
      {icon}
    </span>
  );
}

export default function Home() {
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoAutoplayFailed, setVideoAutoplayFailed] = useState(false);
  // Gate hero entry animations behind the preloader finishing
  const isLoaded = usePreloaderDone();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try to autoplay
    video.muted = true;
    video.play().catch((err) => {
      console.warn("Autoplay was prevented:", err);
      setVideoAutoplayFailed(true);

      // Listen for first user interaction to start play and fade in
      const resumeVideo = () => {
        video.play()
          .then(() => {
            setVideoAutoplayFailed(false);
            cleanup();
          })
          .catch((e) => console.log("Play failed on interaction:", e));
      };

      const cleanup = () => {
        window.removeEventListener("click", resumeVideo);
        window.removeEventListener("touchstart", resumeVideo);
        window.removeEventListener("keydown", resumeVideo);
        window.removeEventListener("scroll", resumeVideo);
      };

      window.addEventListener("click", resumeVideo, { passive: true });
      window.addEventListener("touchstart", resumeVideo, { passive: true });
      window.addEventListener("keydown", resumeVideo, { passive: true });
      window.addEventListener("scroll", resumeVideo, { passive: true });

      return cleanup;
    });
  }, []);

  const scrollMap = () => {
    mapSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#0b0f0a] relative flex flex-col pb-0">

      <Navbar />

      <main className="flex-1 w-full flex flex-col items-center relative z-20">

        {/* ═══ HERO SECTION ══════════════════════════════════════════════════ */}
        <section
          className="min-h-screen w-full relative overflow-hidden bg-[#0b0f0a]"
          style={{
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >

          {/* ── Full-screen background video ── */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover hero-bg-video select-none pointer-events-none transition-opacity duration-700 ${
              videoAutoplayFailed ? "opacity-0" : "opacity-100"
            }`}
            style={{ zIndex: 0 }}
          >
            <source src="/hero-bg-new.mp4" type="video/mp4" />
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
            className="hidden lg:flex relative min-h-screen items-center justify-between px-10 lg:px-24 xl:px-40 w-full gap-6 pb-10"
            style={{ paddingTop: 80, zIndex: 2 }}
          >
            {/* ── LEFT: Countdown Cards ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 80, damping: 16 }}
              className="hidden lg:flex flex-col items-start justify-center w-[240px] shrink-0"
            >
              <CountdownCards isLoaded={isLoaded} />
            </motion.div>

            {/* ── CENTER: Logo + Title + Button ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 70, damping: 14 }}
              className="flex flex-col items-center justify-center flex-1 text-center px-4 lg:px-8"
            >
              {/* Emblem Logo — large, floating */}
              <motion.div
                className="relative select-none"
                style={{
                  width: "min(460px, 32vw, 40vh)",
                  height: "min(460px, 32vw, 40vh)",
                  filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.75))",
                }}
                initial={{ opacity: 0, scale: 0.75, rotate: -6 }}
                animate={isLoaded ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.75, rotate: -6 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 60, damping: 12 }}
              >
                {/* Slow breathing float */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full relative"
                  style={{ willChange: "transform" }}
                >
                  <Image
                    src="/logo2026.webp"
                    alt="Boscofest 2026 Emblem"
                    fill
                    priority
                    sizes="460px"
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>

              {/* Main Title — staggered letter reveal */}
              <motion.h1
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "show" : "hidden"}
                className="font-bebas uppercase leading-none select-none flex flex-wrap justify-center"
                style={{ 
                  fontSize: "clamp(52px, 7vw, 84px)", 
                  letterSpacing: "0.03em",
                  textShadow: "0 4px 20px rgba(0,0,0,0.65), 0 2px 4px rgba(0,0,0,0.4)"
                }}
              >
                {"BOSCO FEST ".split("").map((ch, i) => (
                  <motion.span key={i} variants={letterVariants} style={{ color: "#F4ECC8", display: "inline-block" }}>
                    {ch === " " ? "\u00A0" : ch}
                  </motion.span>
                ))}
                <span className="inline-block whitespace-nowrap">
                  {"2026".split("").map((ch, i) => (
                    <motion.span 
                      key={"y" + i} 
                      variants={letterVariants} 
                      style={{ 
                        color: "#82C341", 
                        display: "inline-block"
                      }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>

              {/* Motto banner — auto-shimmer scan + hover */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0.7 }}
                animate={isLoaded ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.7 }}
                transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                whileHover="hover"
                className="flex items-center gap-3.5 mt-2.5 mb-2.5 px-10 py-3 relative overflow-hidden cursor-pointer"
                style={{
                  borderTop: "2px solid #A37F3E",
                  borderBottom: "2px solid #A37F3E",
                  background: "rgba(43,26,14,0.45)",
                  backdropFilter: "blur(4px)",
                  borderRadius: 4,
                  boxShadow: "inset 0 0 15px rgba(163,127,62,0.15)",
                }}
                variants={{
                  hover: {
                    borderTopColor: "#ebdcb9",
                    borderBottomColor: "#ebdcb9",
                    boxShadow: "inset 0 0 25px rgba(163,127,62,0.3), 0 0 10px rgba(163,127,62,0.2)",
                    transition: { duration: 0.3, ease: "easeOut" }
                  }
                }}
              >
                {/* Auto shimmer scan line that plays once on load */}
                <motion.div
                  initial={{ x: "-100%", opacity: 0.9 }}
                  animate={isLoaded ? { x: "200%", opacity: 0 } : { x: "-100%", opacity: 0.9 }}
                  transition={{ delay: 1.0, duration: 0.9, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-1/3 pointer-events-none"
                  style={{
                    background: "linear-gradient(to right, transparent, rgba(244,236,200,0.35), transparent)",
                    willChange: "transform",
                  }}
                />
                <motion.span
                  variants={{ hover: { scale: 1.15, color: "#ebdcb9", rotate: 90 } }}
                  transition={{ duration: 0.3 }}
                  className="text-[#A37F3E] text-xs select-none"
                >✦</motion.span>
                <motion.span
                  variants={{
                    hover: {
                      backgroundPosition: ["200% 0%", "0% 0%"],
                      textShadow: "0 0 15px rgba(244,236,200,0.45)",
                      transition: { repeat: Infinity, duration: 1.6, ease: "linear" }
                    }
                  }}
                  className="font-bebas uppercase tracking-[0.25em] font-extrabold text-center cursor-pointer"
                  style={{
                    fontSize: "clamp(14px, 1.2vw, 18px)",
                    backgroundImage: "linear-gradient(to right, #F4ECC8 0%, #A37F3E 25%, #ffffff 50%, #A37F3E 75%, #F4ECC8 100%)",
                    backgroundPosition: "200% 0%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  &quot;UNTOLD. UNFAZED. UNCHARTED.&quot;
                </motion.span>
                <motion.span
                  variants={{ hover: { scale: 1.15, color: "#ebdcb9", rotate: -90 } }}
                  transition={{ duration: 0.3 }}
                  className="text-[#A37F3E] text-xs select-none"
                >✦</motion.span>
              </motion.div>

              {/* Sub-header — fade up */}
              <div className="mt-1.5 mb-8">
                <motion.p
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ delay: 1.05, duration: 0.6, ease: "easeOut" }}
                  className="font-sans font-black uppercase tracking-[0.2em] px-5 py-2 bg-black/30 backdrop-blur-md border border-[#ebdcb9]/15 rounded-full inline-flex items-center gap-2.5 shadow-lg"
                  style={{ fontSize: 10, color: "#82C341" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#82C341] animate-pulse" />
                  <span>Don Bosco School · Park Circus</span>
                </motion.p>
              </div>

              {/* CTA Button — glow pulse ring + hover lift */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: 1.15, type: "spring", stiffness: 90, damping: 14 }}
                className="relative"
              >
                {/* Pulsing ring behind the button */}
                <motion.span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  animate={{ scale: [1, 1.55, 1], opacity: [0.55, 0, 0.55] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    background: "radial-gradient(circle, rgba(130,195,65,0.35) 0%, transparent 70%)",
                    willChange: "transform, opacity",
                  }}
                />
                <motion.button
                  onClick={scrollMap}
                  whileHover={{ y: -3, scale: 1.04, boxShadow: "0 8px 24px rgba(130,195,65,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="green-btn flex items-center justify-center gap-2.5 px-10 py-3.5 relative"
                  style={{ fontSize: 12, letterSpacing: "0.12em" }}
                >
                  <Compass className="h-4 w-4" />
                  <span>EXPLORE EVENTS</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Core Sponsor ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ delay: 0.45, type: "spring", stiffness: 80, damping: 16 }}
              className="hidden lg:flex flex-col items-start justify-center w-[240px] shrink-0 gap-3"
            >
              <p
                className="font-bebas uppercase tracking-[0.28em]"
                style={{ fontSize: 10, color: "rgba(235,220,185,0.7)" }}
              >
                Core Sponsor
              </p>

              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="flex flex-col items-center justify-center w-full p-4 animate-glow"
                style={{
                  background: "#F4ECC8",
                  border: "2px solid #2B1A0E",
                  borderRadius: 8,
                  boxShadow: "3px 3px 0 rgba(43,26,14,1)",
                }}
              >
                <div className="relative w-full h-[60px]">
                  <Image
                    src="/peerless-logo.png"
                    alt="Peerless Logo"
                    fill
                    priority
                    sizes="200px"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </motion.div>

          </div>

          {/* ── Vertical layout (Mobile only) ── */}
          <div
            className="flex lg:hidden flex-col items-center justify-center min-h-screen w-full px-6 py-24 relative z-10 gap-7"
          >
            {/* Emblem Logo — floating on mobile too */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75, rotate: -5 }}
              animate={isLoaded ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.75, rotate: -5 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 80, damping: 13 }}
              className="relative select-none shrink-0"
              style={{
                width: "min(200px, 50vw)",
                height: "min(200px, 50vw)",
                filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.65))",
              }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full relative"
                style={{ willChange: "transform" }}
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
            </motion.div>

            {/* Core Titles */}
            <div className="flex flex-col items-center text-center w-full">
              {/* Main Title — staggered on mobile */}
              <motion.h1
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "show" : "hidden"}
                className="font-bebas uppercase leading-none select-none flex flex-wrap justify-center"
                style={{ 
                  fontSize: "clamp(38px, 10vw, 48px)", 
                  letterSpacing: "0.03em",
                  textShadow: "0 4px 16px rgba(0,0,0,0.65), 0 2px 4px rgba(0,0,0,0.4)"
                }}
              >
                {"BOSCO FEST ".split("").map((ch, i) => (
                  <motion.span key={i} variants={letterVariants} style={{ color: "#F4ECC8", display: "inline-block" }}>
                    {ch === " " ? "\u00A0" : ch}
                  </motion.span>
                ))}
                <span className="inline-block whitespace-nowrap">
                  {"2026".split("").map((ch, i) => (
                    <motion.span 
                      key={"y" + i} 
                      variants={letterVariants} 
                      style={{ 
                        color: "#82C341", 
                        display: "inline-block"
                      }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>

              {/* Motto banner */}
              <motion.div
                whileHover="hover"
                whileTap="hover"
                className="flex items-center justify-center gap-2 px-4 py-2.5 w-full max-w-[320px] cursor-pointer mt-2"
                style={{
                  borderTop: "2px solid #A37F3E",
                  borderBottom: "2px solid #A37F3E",
                  background: "rgba(43,26,14,0.45)",
                  borderRadius: 4,
                  boxShadow: "inset 0 0 12px rgba(163,127,62,0.15)",
                }}
                variants={{
                  hover: {
                    borderTopColor: "#ebdcb9",
                    borderBottomColor: "#ebdcb9",
                    boxShadow: "inset 0 0 20px rgba(163,127,62,0.3), 0 0 8px rgba(163,127,62,0.15)",
                    transition: { duration: 0.3, ease: "easeOut" }
                  }
                }}
              >
                <motion.span
                  variants={{
                    hover: { scale: 1.15, color: "#ebdcb9", rotate: 90 }
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-[#A37F3E] text-[10px] select-none"
                >
                  ✦
                </motion.span>
                <motion.span
                  variants={{
                    hover: {
                      backgroundPosition: ["200% 0%", "0% 0%"],
                      textShadow: "0 0 12px rgba(244,236,200,0.45)",
                      transition: { repeat: Infinity, duration: 1.6, ease: "linear" }
                    }
                  }}
                  className="font-bebas uppercase tracking-[0.18em] font-extrabold text-center text-[13px] cursor-pointer"
                  style={{
                    backgroundImage: "linear-gradient(to right, #F4ECC8 0%, #A37F3E 25%, #ffffff 50%, #A37F3E 75%, #F4ECC8 100%)",
                    backgroundSize: "200% 100%",
                    backgroundPosition: "200% 0%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  &quot;UNTOLD. UNFAZED. UNCHARTED.&quot;
                </motion.span>
                <motion.span
                  variants={{
                    hover: { scale: 1.15, color: "#ebdcb9", rotate: -90 }
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-[#A37F3E] text-[10px] select-none"
                >
                  ✦
                </motion.span>
              </motion.div>

              {/* Sub-header */}
              <div className="mt-2.5 mb-2">
                <motion.p
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ delay: 1.05, duration: 0.6 }}
                  className="font-sans font-black uppercase tracking-[0.18em] px-4.5 py-1.5 bg-black/30 backdrop-blur-md border border-[#ebdcb9]/15 rounded-full inline-flex items-center gap-2 shadow-md"
                  style={{ fontSize: 9, color: "#82C341" }}
                >
                  <span className="w-1.2 h-1.2 rounded-full bg-[#82C341] animate-pulse" />
                  <span>Don Bosco School · Park Circus</span>
                </motion.p>
              </div>
            </div>

            {/* Countdown Cards Wrapper */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 80, damping: 15 }}
              className="w-full max-w-[280px]"
            >
              <CountdownCards isLoaded={isLoaded} />
            </motion.div>

            {/* Description & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 80, damping: 15 }}
              className="flex flex-col items-center text-center w-full max-w-sm px-2"
            >
              {/* CTA — glow pulse on mobile */}
              <div className="relative">
                <motion.span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    background: "radial-gradient(circle, rgba(130,195,65,0.35) 0%, transparent 70%)",
                    willChange: "transform, opacity",
                  }}
                />
                <motion.button
                  onClick={scrollMap}
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ y: -2, scale: 1.03 }}
                  className="green-btn flex items-center justify-center gap-2 px-8 py-3.5 w-full max-w-[240px] relative"
                  style={{ fontSize: 11.5, letterSpacing: "0.1em" }}
                >
                  <Compass className="h-4 w-4" />
                  <span>EXPLORE EVENTS</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Core Sponsor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 80, damping: 15 }}
              className="w-full max-w-[280px] flex flex-col items-center mt-4"
            >
              <p
                className="font-bebas uppercase tracking-[0.25em] mb-3"
                style={{ fontSize: 9.5, color: "rgba(235,220,185,0.7)" }}
              >
                Core Sponsor
              </p>

              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="flex flex-col items-center justify-center w-full p-4"
                style={{
                  background: "#F4ECC8",
                  border: "2px solid #2B1A0E",
                  borderRadius: 8,
                  boxShadow: "3px 3px 0 rgba(43,26,14,1)",
                }}
              >
                <div className="relative w-full h-[60px]">
                  <Image
                    src="/peerless-logo.png"
                    alt="Peerless Logo"
                    fill
                    priority
                    sizes="200px"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </motion.div>


          </div>

          {/* ── Bottom-left social icons — spring stagger pop-in ── */}
          <div className="absolute bottom-8 left-8 hidden md:flex items-center gap-3.5 z-30">
            {[
              { href: "https://www.instagram.com/boscofest26?igsh=eW14dnphMGltdDEz", icon: <Instagram className="h-4 w-4" /> },
              { href: "https://youtube.com/@donboscoschoolparkcircus1452?si=-cOPtOWFAypyTlL2", icon: <Youtube className="h-4 w-4" /> },
            ].map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 14 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ delay: 1.2 + i * 0.12, type: "spring", stiffness: 150, damping: 16 }}
                whileHover={{ scale: 1.25, color: "#ebdcb9" }}
                className="text-[#ebdcb9]/60 hover:text-[#ebdcb9] transition-colors"
                style={{ willChange: "transform" }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          {/* ── Bottom-right scroll indicator — wave arrows ── */}
          <motion.button
            onClick={scrollMap}
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            whileHover={{ scale: 1.08 }}
            className="absolute bottom-8 right-8 hidden md:flex items-center gap-2 text-[#ebdcb9]/60 hover:text-[#ebdcb9] transition-colors cursor-pointer z-30"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="font-bebas text-[10px] tracking-[0.25em] uppercase"
            >
              Scroll to Explore
            </motion.span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ willChange: "transform" }}
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.div>
          </motion.button>

        </section>

        {/* ═══ INTERACTIVE MAP SECTION ═══════════════════════════════════════ */}
        <section
          ref={mapSectionRef}
          className="w-full py-24 px-6 flex flex-col items-center relative border-t-2 border-ink-dark overflow-hidden bg-zinc-950 bg-scroll md:bg-fixed"
          style={{
            backgroundImage: "url('/adventure-map-bg.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
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
          </motion.div>

          {/* Mobile Grid Layout (visible on sm and below) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-xl md:hidden relative z-10 mt-6 px-2">
            {TERRITORIES.map((loc) => (
              <Link
                key={loc.id}
                href={`/events?event=${encodeURIComponent(loc.id)}`}
                className="parchment-card p-4.5 flex flex-col items-center text-center cursor-pointer hover:-translate-y-1 transition-all active:translate-y-0"
              >
                <div className="w-16 h-16 rounded-full bg-[#1E1208] border border-[#A37F3E] flex items-center justify-center overflow-hidden relative z-10 shadow-md">
                  <TerritoryLogo id={loc.id} icon={loc.icon} name={loc.name} isMobile />
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
              <motion.path
                d="M 180,165 C 300,105 380,85 480,98 C 580,113 650,113 720,138 C 760,205 770,305 740,380 C 640,380 580,360 500,360 C 400,360 330,350 280,330 C 220,295 190,205 180,165"
                stroke="#A37F3E"
                strokeWidth="2.5"
                strokeDasharray="7 7"
                className="opacity-45"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              />
            </svg>

            {/* Absolute Positioned Map Nodes */}
            {TERRITORIES.map((loc, idx) => (
              <div
                key={loc.id}
                className="absolute"
                style={{
                  left: loc.x,
                  top: loc.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.div
                  className="flex flex-col items-center text-center group"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 120, 
                    damping: 14, 
                    delay: 0.3 + idx * 0.15 
                  }}
                  whileHover={{ scale: 1.06 }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <Link href={`/events?event=${encodeURIComponent(loc.id)}`} className="flex flex-col items-center">

                    {/* Teardrop map-pin marker */}
                    <div className="w-20 h-20 rounded-full bg-[#1E1208] border-2 border-[#A37F3E] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:border-[#ebdcb9] relative z-10">
                      <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center z-10">
                        <TerritoryLogo id={loc.id} icon={loc.icon} name={loc.name} />
                      </div>
                      {/* Pin tail */}
                      <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4.5 h-4.5 bg-[#1E1208] border-r-2 border-b-2 border-[#A37F3E] rotate-45 transition-all duration-300 group-hover:border-[#ebdcb9] z-0" />
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
              </div>
            ))}
          </div>

          {/* Bottom view all events CTA */}
          <div className="mt-4 md:-mt-10 relative z-10">
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
    </div>
  );
}
