"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Sparkles, Star, Compass, MapPin, Landmark, ArrowDown, ChevronRight, X, Calendar, Trophy, Users, ShieldAlert } from "lucide-react";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SPONSORS = [
  { name: "INTEL CORE", role: "Chipset Partner",        icon: "⚡", color: "#6EC6FF" },
  { name: "RED BULL",   role: "Energy Partner",         icon: "🐂", color: "#D9B24C" },
  { name: "SPOTIFY",    role: "Digital Audio Partner",  icon: "🎧", color: "#65C466" },
];

interface Location {
  id: string;
  name: string;
  preview: string;
  detail: string;
  icon: string;
  markerColor: string;
  tags: string[];
  bounty: string;
}

const MAP_LOCATIONS: Location[] = [
  {
    id: "camp",
    name: "Explorer Camp",
    preview: "Welcome to basecamp. Get your bearing and learn about the legacy of Boscofest.",
    detail: "Step into the wild. Founded in 1985, Boscofest stands as Don Bosco School, Park Circus's premier youth colosseum. Over 40 top schools will travel to our coordinates to pitch their camps and lock horns in the ultimate test of creativity and teamwork.",
    icon: "🏕️",
    markerColor: "#65C466",
    tags: ["Legacy", "Don Bosco", "Kolkata"],
    bounty: "The Scroll of Honor",
  },
  {
    id: "summit",
    name: "Summit Arena",
    preview: "The highest peaks of the island where the ultimate cultural champions clash.",
    detail: "Climb the heights. Summit Arena hosts the most prestigious onstage showdowns, including Overture (Battle of the Bands), Step Up (Group Choreography), and Snapshot (Spot Photography). Only the most daring artists will conquer these peaks and make their voices echo.",
    icon: "🏔️",
    markerColor: "#6EC6FF",
    tags: ["Music", "Dance", "Main Stage"],
    bounty: "Trophies of Triumph",
  },
  {
    id: "cavern",
    name: "Gaming Cavern",
    preview: "Venture deep into the dark caves where esports legends forge their paths.",
    detail: "Enter the abyss. Gaming Cavern is home to intense multiplayer showdowns, featuring tournaments in FC24, BGMI, and Valorant. Steel your reflexes, form your squads, and prepare to navigate the labyrinth of competitive esports.",
    icon: "🎮",
    markerColor: "#D9B24C",
    tags: ["Esports", "FC24", "Squad Battle"],
    bounty: "Champion Loot Boxes",
  },
  {
    id: "cove",
    name: "Artist Cove",
    preview: "A serene lagoon of art, sketching, digital editing, and visual styling.",
    detail: "Paint your trail. Artist Cove brings together designers, spot-sketch artists, and creative layout wizards to illustrate their visions of the uncharted world. Events include canvas painting, digital manipulation, and creative ad design.",
    icon: "🎨",
    markerColor: "#65C466",
    tags: ["Fine Arts", "Digital Design", "Sketching"],
    bounty: "Masterpiece Medals",
  },
  {
    id: "valley",
    name: "Echo Valley",
    preview: "Let your voice ring across the valleys of debating, quizzing, and drama.",
    detail: "Make some noise. Echo Valley hosts classical and Western vocal showcases, stand-up comedy trials, national-level quizzing, and street plays. Here, your voice carries across the canopy, echo by echo, to win over the tribal judges.",
    icon: "🎤",
    markerColor: "#6EC6FF",
    tags: ["Drama", "Quiz", "Vocal Duels"],
    bounty: "The Laurel Wreath",
  },
  {
    id: "vault",
    name: "Treasure Vault",
    preview: "The final hoard of gold and glory waiting for the conquerors.",
    detail: "Claim your bounty. Over ₹1,00,000 in prizes, custom-crafted trophies, medals, certificates of triumph, and the legendary Boscofest Overall Championship Ledge await the school crew that successfully maps and conquers the entire island.",
    icon: "🏆",
    markerColor: "#D9B24C",
    tags: ["Cash Prizes", "Championship Trophy", "Glory"],
    bounty: "₹100,000+ Gold Hoard",
  },
  {
    id: "dock",
    name: "Registration Dock",
    preview: "Sign the crew charter, prepare your coordinates, and board the ship.",
    detail: "X marks the spot. Secure your team's passage before the chronometer runs out. All schools must register their candidates, assign event keys, and upload signatures to clear customs and begin the quest.",
    icon: "📜",
    markerColor: "#E53E3E",
    tags: ["Sign-up", "Tickets", "Expedition Log"],
    bounty: "Official Boarding Pass",
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

export default function Home() {
  const { time, mounted: timerMounted } = useCountdown();
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
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
      colors: ["#6EC6FF", "#65C466", "#D9B24C", "#E8D7A5"],
    });
  };

  // Scroll linked values for hero background compass
  const { scrollY } = useScroll();
  const compassRotate = useTransform(scrollY, [0, 1500], [0, 90]);

  // Framer Motion variants for stagger entrance
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      }
    }
  } as const;

  const heroItemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 14
      }
    }
  } as const;

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { type: "spring" as const, stiffness: 150, damping: 15 } 
    }
  } as const;

  return (
    <div className="min-h-screen bg-parchment-texture relative flex flex-col pb-0">
      

      <Navbar />

      <main className="flex-1 w-full flex flex-col items-center relative z-20">

        {/* ═══════════════════════════════════════════════════════════════════
            1. HERO SECTION: Beginning of the Expedition (Merged Layout)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center px-5 pt-28 pb-16 relative">
          
          {/* Faded background compass illustration with scroll linked rotation */}
          <motion.div 
            style={{ 
              rotate: compassRotate,
              x: "-50%",
              y: "-50%"
            }}
            className="absolute top-1/2 left-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] opacity-[0.035] pointer-events-none"
          >
            <svg className="w-full h-full text-[#2B1A0E]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="50" cy="50" r="45" />
              <path d="M 50,5 L 50,95 M 5,50 L 95,50 M 18,18 L 82,82 M 18,82 L 82,18" />
            </svg>
          </motion.div>

          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">
            
            {/* LEFT SIDE: Compass Countdown (lg:col-span-3, lg:order-1) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.35, type: "spring", stiffness: 80, damping: 15 }}
              className="lg:col-span-3 order-2 lg:order-1 flex flex-col items-center text-center gap-4 w-full"
            >
              <span className="font-display font-black text-[10px] tracking-[0.25em] text-[#5C4331] uppercase block">
                Expedition Begins In
              </span>
              
              {/* Outer Brass Rim */}
              <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-[#5C4331] via-[#D9B24C] to-[#F7F1D5] border-2 border-[#2B1A0E] shadow-[6px_6px_0px_rgba(43,26,14,1)]">
                
                {/* Circular Compass Chronometer */}
                <div className="relative w-56 h-56 md:w-60 md:h-60 rounded-full bg-gradient-to-b from-[#F2EAC4] to-[#E5D295] overflow-hidden border border-[#2B1A0E]/30 flex items-center justify-center">
                  
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/20 z-20" />
                  
                  {/* Compass Rose Star Background */}
                  <svg className="absolute w-32 h-32 text-[#2B1A0E]/5 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M 50,5 L 53,47 L 95,50 L 53,53 L 50,95 L 47,53 L 5,50 L 47,47 Z" />
                    <path d="M 50,5 L 50,50 L 53,47 Z" fill="black" opacity="0.1" />
                    <path d="M 95,50 L 50,50 L 53,53 Z" fill="black" opacity="0.1" />
                    <path d="M 50,95 L 50,50 L 47,53 Z" fill="black" opacity="0.1" />
                    <path d="M 5,50 L 50,50 L 47,47 Z" fill="black" opacity="0.1" />
                    <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
                  </svg>

                  {/* Outer degree ticks (SVG) */}
                  <svg className="absolute inset-0 w-full h-full text-[#2B1A0E]/20" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="1.5" strokeDasharray="0.7 2.3" fill="none" />
                    <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 6" fill="none" />
                    <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  </svg>

                  {/* Cardinal Directions */}
                  <div className="absolute inset-0 pointer-events-none p-3.5 flex flex-col justify-between items-center text-[10px] font-display font-black text-[#2B1A0E]">
                    <span className="text-[#A72A2A] font-extrabold tracking-wider">N</span>
                    <div className="w-full flex justify-between items-center px-1.5">
                      <span className="font-extrabold tracking-wider">W</span>
                      <span className="font-extrabold tracking-wider">E</span>
                    </div>
                    <span className="font-extrabold tracking-wider">S</span>
                  </div>

                  {/* Ordinal directions */}
                  <div className="absolute inset-0 pointer-events-none p-6.5 flex flex-col justify-between items-center text-[7px] font-sans font-bold text-[#2B1A0E]/55">
                    <div className="w-full flex justify-between items-center">
                      <span>NW</span>
                      <span>NE</span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <span>SW</span>
                      <span>SE</span>
                    </div>
                  </div>

                  {/* Rotating vintage detailed needle */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-compass-spin z-10">
                    <svg className="w-full h-full drop-shadow-[1px_2px_1.5px_rgba(43,26,14,0.35)]" viewBox="0 0 100 100">
                      {/* North point (red) */}
                      <path d="M 50,14 L 53,50 L 50,47 Z" fill="#E53E3E" />
                      <path d="M 50,14 L 47,50 L 50,47 Z" fill="#C53030" />
                      {/* South point (blue) */}
                      <path d="M 50,86 L 53,50 L 50,53 Z" fill="#6EC6FF" />
                      <path d="M 50,86 L 47,50 L 50,53 Z" fill="#4299E1" />
                      {/* Central brass cap */}
                      <circle cx="50" cy="50" r="4" fill="#D9B24C" stroke="#2B1A0E" strokeWidth="0.75" />
                      <circle cx="50" cy="50" r="1.5" fill="#F7F1D5" />
                    </svg>
                  </div>

                  {/* Internal Time Boxes (floating transparent glass cards) */}
                  {timerMounted ? (
                    <div className="relative z-15 grid grid-cols-2 gap-2 p-3">
                      {[
                        { v: time.days,    l: "Days" },
                        { v: time.hours,   l: "Hrs"  },
                        { v: time.minutes, l: "Min"  },
                        { v: time.seconds, l: "Sec"  },
                      ].map((item, idx) => (
                        <div key={idx} className="bg-[#E8D7A5]/80 backdrop-blur-[1.5px] border border-[#2B1A0E]/70 px-2.5 py-1.5 flex flex-col items-center min-w-[52px] rounded-lg shadow-sm">
                          <span className="font-display font-black text-sm text-[#2B1A0E] tabular-nums tracking-tight leading-none">
                            {item.v}
                          </span>
                          <span className="text-[6px] uppercase tracking-wider font-bold text-[#5C4331] mt-0.5">{item.l}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="relative z-15 font-display font-black text-xs text-[#2B1A0E] opacity-50 bg-[#E8D7A5]/80 px-4 py-2 rounded-lg border border-[#2B1A0E]/30">
                      TIMING...
                    </div>
                  )}
                  
                  {/* Real Coordinates of the School at DBPC */}
                  <div className="absolute bottom-6.5 pointer-events-none text-[6.5px] font-mono tracking-widest text-[#2B1A0E]/50 font-bold">
                    22.541°N 88.390°E
                  </div>
                  
                </div>
              </div>
            </motion.div>

            {/* CENTER COLUMN: Main Brand / Logo / Title / CTAs (lg:col-span-6, lg:order-2) */}
            <motion.div 
              variants={heroContainerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center text-center gap-6 w-full"
            >
              
              {/* Logo wrapper (Bigger and main attraction!) */}
              <motion.div 
                variants={logoVariants}
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden rounded-full border-2 border-[#2B1A0E] shadow-[8px_8px_0px_rgba(43,26,14,1)] bg-[#E8D7A5] p-2.5"
              >
                <Image 
                  src="/logo2026.png" 
                  alt="Boscofest 2026 Logo"
                  fill
                  priority
                  sizes="(max-width: 768px) 256px, 384px"
                  className="object-contain p-1.5"
                />
              </motion.div>

              {/* Title / Taglines */}
              <motion.div variants={heroItemVariants} className="flex flex-col gap-2.5">
                <span className="font-display font-black text-[10px] tracking-[0.3em] text-[#65C466] uppercase block">
                  Don Bosco School · Kolkata
                </span>
                <h1 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-wide uppercase text-[#2B1A0E] leading-none">
                  BOSCO FEST <span className="text-[#6EC6FF]">2026</span>
                </h1>
                <p className="font-display font-black text-xs md:text-sm tracking-[0.2em] text-[#A07722] uppercase bg-[#E8D7A5]/40 px-3.5 py-1 border-sketch-thin max-w-max mx-auto">
                  &ldquo;UNTOLD. UNFAZED. UNCHARTED.&rdquo;
                </p>
              </motion.div>

              {/* Description */}
              <motion.p variants={heroItemVariants} className="text-xs text-[#5C4331] font-medium max-w-md leading-relaxed">
                Embark on an unforgettable journey through competitions, culture, creativity and adventure. Sign the charter and begin the quest.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={heroItemVariants} className="flex justify-center items-center mt-1 w-full">
                <Link
                  href="/events"
                  className="w-full sm:w-auto px-8 py-3 flex items-center justify-center gap-2 font-display text-xs font-black tracking-widest uppercase text-[#2B1A0E] bg-[#6EC6FF] border-2 border-[#2B1A0E] shadow-[3px_3px_0px_rgba(43,26,14,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_rgba(43,26,14,1)] transition-all text-center"
                  style={{ borderRadius: "20px 8px 18px 10px / 10px 18px 10px 14px" }}
                >
                  Explore Events
                </Link>
              </motion.div>

            </motion.div>

            {/* RIGHT SIDE: Expedition Partners (lg:col-span-3, lg:order-3) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, type: "spring", stiffness: 80, damping: 15 }}
              id="sponsors" 
              className="lg:col-span-3 order-3 lg:order-3 w-full flex flex-col items-center gap-5"
            >
              <h3 className="font-display font-black text-[10px] tracking-[0.25em] text-[#2B1A0E] uppercase text-center bg-[#E8D7A5]/50 px-3.5 py-1.5 border border-[#2B1A0E]/15 rounded-full">
                Expedition Partners
              </h3>

              {/* Vertical stacked/scroll layout for right side */}
              <div className="w-full flex flex-row lg:flex-col items-center justify-center gap-4.5 overflow-x-auto lg:overflow-visible pb-2.5 lg:pb-0 scrollbar-none">
                {SPONSORS.map((s, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -3, x: -1, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="shrink-0 flex items-center gap-4 px-4 py-3.5 rounded-2xl border-2 border-[#2B1A0E] bg-[#F7F1D5] min-w-[195px] lg:w-full max-w-[210px] lg:max-w-none cursor-default shadow-[3.5px_3.5px_0px_rgba(43,26,14,1)] hover:shadow-[5px_5px_0px_rgba(43,26,14,1)] hover:border-[#6EC6FF] transition-all duration-200"
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border-2 border-[#2B1A0E] shadow-[1px_1px_0px_rgba(43,26,14,1)] shrink-0 transition-transform duration-300"
                      style={{ 
                        backgroundColor: `${s.color}15`,
                        borderColor: '#2B1A0E'
                      }}
                    >
                      {s.icon}
                    </div>
                    <div className="flex flex-col text-left leading-tight">
                      <span className="font-display font-black text-[10.5px] text-[#2B1A0E] uppercase tracking-wider">{s.name}</span>
                      <span className="text-[7.5px] font-black text-[#5C4331] uppercase tracking-widest mt-1 bg-[#E8D7A5]/40 px-2 py-0.5 border border-[#2B1A0E]/10 rounded-md max-w-max">
                        {s.role}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            3. INTERACTIVE MAP SECTION: Scrollable Vertical Trail
            ═══════════════════════════════════════════════════════════════════ */}
        <section 
          ref={mapSectionRef}
          className="w-full py-20 px-5 max-w-md mx-auto flex flex-col items-center relative"
        >
          {/* Section Headers */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
            className="text-center mb-16 relative z-10 px-4"
          >
            <span className="font-display font-black text-[10px] tracking-[0.3em] text-[#65C466] uppercase block mb-2">
              Unexplored Territories
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl text-[#2B1A0E] uppercase">
              THE ADVENTURE MAP
            </h2>
            <p className="text-[10px] text-[#5C4331] font-bold uppercase tracking-wider mt-2.5 max-w-xs mx-auto leading-relaxed">
              Scroll down the trail to discover coordinates & details of each landmark point.
            </p>
          </motion.div>

          {/* Vertical Trail Nodes Container */}
          <div className="relative w-full flex flex-col items-center z-10">
            
            {MAP_LOCATIONS.map((loc, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={loc.id} className="w-full flex flex-col items-center">
                  
                  {/* Landmark Node Card wrapper */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -45 : 45 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ type: "spring", stiffness: 80, damping: 14 }}
                    className={`w-full flex ${
                      isEven ? "justify-start" : "justify-end"
                    } px-4 relative`}
                  >
                    
                    {/* Location Card Node */}
                    <motion.div 
                      onClick={() => setActiveLocation(loc)}
                      whileHover={{ scale: 1.025 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="group flex flex-col p-4 w-[75%] rounded-2xl border-2 border-[#2B1A0E] bg-[#F7F1D5] shadow-[4px_4px_0px_rgba(43,26,14,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_rgba(43,26,14,1)] hover:border-[#6EC6FF] hover:shadow-[4px_4px_0px_rgba(101,196,102,1)] transition-[border-color,box-shadow] duration-200 cursor-pointer relative"
                    >
                      {/* Bouncing Map Marker Pin */}
                      <div 
                        className="absolute -top-3.5 left-4 w-7 h-7 rounded-full flex items-center justify-center border-2 border-[#2B1A0E] shadow-sm text-sm animate-marker-bounce"
                        style={{ backgroundColor: loc.markerColor }}
                      >
                        {loc.icon}
                      </div>

                      {/* Content */}
                      <div className="pt-2">
                        <h4 className="font-display font-black text-sm text-[#2B1A0E] uppercase tracking-wide flex items-center gap-1.5">
                          {loc.name}
                        </h4>
                        <p className="text-[10.5px] leading-relaxed text-[#5C4331] mt-2 group-hover:text-[#2B1A0E] transition-colors">
                          {loc.preview}
                        </p>
                        <div className="flex items-center gap-1 mt-3.5 text-[9px] font-black uppercase text-[#6EC6FF] tracking-widest">
                          <span>Map Coordinates</span>
                          <ChevronRight className="h-3 w-3 mt-0.5" />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* SVG Trail Connector Dotted line (between nodes, skipped at bottom) */}
                  {idx < MAP_LOCATIONS.length - 1 && (
                    <div className="h-20 w-full relative flex justify-center py-2">
                      <svg className="w-40 h-full opacity-80" viewBox="0 0 100 60" fill="none">
                        <motion.path 
                          d={isEven ? "M 35,0 C 35,30 65,30 65,60" : "M 65,0 C 65,30 35,30 35,60"} 
                          stroke={idx % 2 === 0 ? "#65C466" : "#6EC6FF"} 
                          strokeWidth="3" 
                          strokeDasharray="6 6" 
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true, margin: "-30px" }}
                          transition={{ duration: 0.85, ease: "easeInOut" }}
                        />
                      </svg>
                    </div>
                  )}

                </div>
              );
            })}

          </div>
        </section>

      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE BOTTOM SHEET DRAWER MODAL
          ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeLocation && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            
            {/* Dark glass backing cover */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLocation(null)}
              className="absolute inset-0 bg-[#2B1A0E]/40 backdrop-blur-sm"
            />

            {/* Bottom sheet dialog panel */}
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 22, stiffness: 220 }}
              className="relative w-full max-w-md bg-[#F7F1D5] rounded-t-3xl border-t-2 border-x-2 border-[#2B1A0E] px-6 pt-5 pb-8 shadow-[0_-8px_30px_rgba(43,26,14,0.15)] z-10"
            >
              {/* Handlebar drag indicator */}
              <div className="w-12 h-1 bg-[#2B1A0E]/15 rounded-full mx-auto mb-5" />

              {/* Close button (large tap target) */}
              <button 
                onClick={() => setActiveLocation(null)}
                className="absolute top-4 right-4 h-11 w-11 flex items-center justify-center text-[#2B1A0E] hover:text-[#6EC6FF] transition-colors"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Landmark info layout */}
              <div className="flex flex-col gap-4">
                
                {/* Header title */}
                <div className="flex items-center gap-3.5">
                  <span className="text-3xl">{activeLocation.icon}</span>
                  <div>
                    <h3 className="font-display font-black text-lg text-[#2B1A0E] uppercase tracking-wide">
                      {activeLocation.name}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {activeLocation.tags.map((t, i) => (
                        <span key={i} className="text-[7.5px] font-extrabold uppercase tracking-widest px-2 py-0.5 border border-[#2B1A0E]/30 rounded-full text-[#5C4331]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <hr className="border-[#2B1A0E]/12 my-1" />

                {/* Detail text */}
                <p className="text-xs md:text-sm text-[#5C4331] font-medium leading-relaxed">
                  {activeLocation.detail}
                </p>

                {/* Bounty / Reward info */}
                <div className="flex items-center gap-2.5 p-3 rounded-xl border border-[#2B1A0E]/20 bg-[#E8D7A5]/25">
                  <Trophy className="h-5 w-5 text-[#D9B24C] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[7.5px] font-black uppercase text-[#5C4331] tracking-wider">Discovered Bounty</span>
                    <span className="text-xs font-black text-[#2B1A0E] uppercase tracking-wide mt-0.5">{activeLocation.bounty}</span>
                  </div>
                </div>

                {/* Primary Action Button (Sign Charter) */}
                <div className="flex flex-col gap-2.5 mt-2">
                  {activeLocation.id === "dock" ? (
                    <button
                      onClick={handleRegister}
                      className="w-full py-3.5 flex items-center justify-center gap-2 font-display text-xs font-black tracking-widest uppercase text-[#2B1A0E] bg-[#6EC6FF] border-2 border-[#2B1A0E] shadow-[3px_3px_0px_rgba(43,26,14,1)] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[2px_2px_0px_rgba(43,26,14,1)] transition-all cursor-pointer"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Sign Expedition Pass</span>
                    </button>
                  ) : (
                    <Link
                      href="/events"
                      onClick={() => setActiveLocation(null)}
                      className="w-full py-3.5 flex items-center justify-center gap-2 font-display text-xs font-black tracking-widest uppercase text-[#2B1A0E] bg-[#65C466] border-2 border-[#2B1A0E] shadow-[3px_3px_0px_rgba(43,26,14,1)] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[2px_2px_0px_rgba(43,26,14,1)] transition-all text-center"
                    >
                      <Compass className="h-4 w-4" />
                      <span>Explore Area Events</span>
                    </Link>
                  )}
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
