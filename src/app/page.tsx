"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import confetti from "canvas-confetti";
import { ChevronRight, Compass, Sparkles, Star, ArrowDown, Telescope } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURED_EVENTS = [
  { id:"f1", name:"Overture",  category:"Music",       icon:"🎵", featured:true,
    shortDesc:"The ultimate battle of bands — raw energy, thunderous solos, and a stage on fire.",
    banner:"https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop" },
  { id:"f2", name:"CodeRed",   category:"Technical",   icon:"💻", featured:false,
    shortDesc:"A 24-hour sprint of coding, design, and hardware hacks. Build the future in real-time.",
    banner:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=500&auto=format&fit=crop" },
  { id:"f3", name:"Step Up",   category:"Dance",       icon:"💃", featured:false,
    shortDesc:"Synchronized choreography, high-octane beats, and explosive street-style showdowns.",
    banner:"https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=500&auto=format&fit=crop" },
  { id:"f4", name:"Snapshot",  category:"Photography", icon:"📸", featured:true,
    shortDesc:"Freeze frames capturing raw emotion — a visual journey through the pulse of the city.",
    banner:"https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=800&auto=format&fit=crop" },
];

const GALLERY_PHOTOS = [
  { id:1, src:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop", title:"Main Stage" },
  { id:2, src:"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop", title:"Crowd Energy" },
  { id:3, src:"https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop", title:"DJ Set" },
  { id:4, src:"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop", title:"Arena Night" },
  { id:5, src:"https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop", title:"EDM Lights" },
];

const SPONSORS = [
  { name:"INTEL CORE", role:"Chipset Partner",        color:"#6AAD1A" },
  { name:"RED BULL",   role:"Energy Partner",         color:"#29ABE2" },
  { name:"SPOTIFY",    role:"Digital Audio Partner",  color:"#6AAD1A" },
];

const STATS = [
  { value:"30+",  label:"Dynamic Events", icon:"🗺️" },
  { value:"50+",  label:"Schools",         icon:"🏫" },
  { value:"41st", label:"Year of Legacy",  icon:"⚡" },
  { value:"5K+",  label:"Competitors",     icon:"🌿" },
];

// ─── Deterministic firefly positions ──────────────────────────────────────────
const FIREFLIES = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: (i * 137.508) % 100,
  y: (i * 97.31 + 13.7) % 100,
  size: i % 3 === 0 ? 2 : i % 3 === 1 ? 1.5 : 1,
  delay: (i % 9) * 0.5,
  duration: 3.5 + (i % 5) * 0.8,
  colour: i % 5 === 0
    ? "rgba(41,171,226,0.9)"
    : i % 5 === 1
    ? "rgba(106,172,26,0.7)"
    : "rgba(86,199,240,0.8)",
}));

// ─── Glass Panel (Subtle border glow mask) ───────────────────────────────────
function GlassPanel({
  children,
  className = "",
  innerStyle = {},
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  innerStyle?: React.CSSProperties;
  style?: React.CSSProperties;
}) {
  return (
    <div 
      className={`relative rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 ${className}`}
      style={{
        background: "rgba(13, 47, 71, 0.45)",
        border: "1px solid rgba(41, 171, 226, 0.14)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.45), inset 0 0 20px rgba(41, 171, 226, 0.04)",
        ...style,
      }}
    >
      {/* Light border glow mask */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl border border-transparent"
        style={{
          background: "linear-gradient(135deg, rgba(41,171,226,0.22) 0%, rgba(106,172,26,0.06) 50%, transparent 100%)",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
        }} />
        
      <div className="h-full w-full relative z-10" style={innerStyle}>
        {children}
      </div>
    </div>
  );
}

// ─── Countdown timer hook ─────────────────────────────────────────────────────
function useCountdown() {
  const [m, setM] = useState(false);
  const [t, setT] = useState({ days:"00", hours:"00", minutes:"00", seconds:"00" });

  useEffect(() => {
    const target = new Date("2026-08-15T09:00:00").getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setT({ days:"00", hours:"00", minutes:"00", seconds:"00" });
        return;
      }
      setT({
        days:    Math.floor(diff / 86_400_000).toString().padStart(2, "0"),
        hours:   Math.floor((diff % 86_400_000) / 3_600_000).toString().padStart(2, "0"),
        minutes: Math.floor((diff % 3_600_000) / 60_000).toString().padStart(2, "0"),
        seconds: Math.floor((diff % 60_000) / 1000).toString().padStart(2, "0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    setM(true);
    return () => clearInterval(id);
  }, []);
  return { time:t, mounted:m };
}

// ─── Jungle timer box ─────────────────────────────────────────────────────────
function JungleTimerBox({ value, label, isSky }: { value:string; label:string; isSky:boolean }) {
  const accent = isSky ? "#29ABE2" : "#6AAD1A";
  return (
    <div style={{
      background: "rgba(4,12,4,0.85)",
      padding: 5,
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.06)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    }}>
      <div className="relative flex flex-col items-center justify-center py-3 px-2"
        style={{ background:"rgba(2,6,2,0.9)", borderRadius:8 }}>
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full animate-ping"
          style={{ backgroundColor:accent, opacity:0.7 }} />
        <motion.span key={value}
          initial={{ y:6, opacity:0 }} animate={{ y:0, opacity:1 }}
          className="font-display font-black tabular-nums leading-none"
          style={{ fontSize:"clamp(1.4rem,2.5vw,2rem)", color:accent,
            textShadow:`0 0 16px ${accent}90` }}>
          {value}
        </motion.span>
        <span className="text-[8px] uppercase tracking-widest mt-1"
          style={{ color:`${accent}80` }}>{label}</span>
      </div>
    </div>
  );
}

// ─── Particle type ────────────────────────────────────────────────────────────
interface FlyPart { id:number; x:number; y:number; size:number; color:string; delay:number; duration:number; }

// ═════════════════════════════════════════════════════════════════════════════
//  PAGE
// ═════════════════════════════════════════════════════════════════════════════
export default function Home() {
  const pageRef    = useRef<HTMLDivElement>(null);
  const heroRef    = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [isMobile,    setIsMobile]    = useState(false);
  const [flyParts,    setFlyParts]    = useState<FlyPart[]>([]);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [logoLoaded,  setLogoLoaded]  = useState(false);

  const { time, mounted:timerMounted } = useCountdown();

  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness:70, damping:16 });
  const springY = useSpring(mouseY, { stiffness:70, damping:16 });
  const rotateX = useTransform(springY, [-350,350], [14,-14]);
  const rotateY = useTransform(springX, [-350,350], [-14,14]);

  const { scrollYProgress } = useScroll({ target:pageRef });
  const heroY = useTransform(scrollYProgress, [0,0.25], [0,-45]);

  const { scrollYProgress:galleryProg } = useScroll({ target:galleryRef });
  const galleryX = useTransform(galleryProg, [0.1,0.9], ["0%","-55%"]);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    resize();
    window.addEventListener("resize", resize);
    setFlyParts(Array.from({ length:20 }, (_,i) => ({
      id:i, x:Math.random()*100, y:Math.random()*100,
      size:Math.random()*2.5+0.8,
      color:i%3===0?"#29ABE2":i%3===1?"#6AAD1A":"#56C7F0",
      delay:Math.random()*5, duration:5+Math.random()*7,
    })));
    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleMouseMove = useCallback((e:React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - r.left - r.width/2);
    mouseY.set(e.clientY - r.top  - r.height/2);
  }, [isMobile, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => { mouseX.set(0); mouseY.set(0); }, [mouseX, mouseY]);

  const handleRegister = (e:React.MouseEvent) => {
    e.preventDefault();
    confetti({ particleCount:200, spread:100, origin:{ y:0.65 },
      colors:["#29ABE2","#6AAD1A","#56C7F0","#8BC34A","#ffffff"] });
  };

  return (
    <div ref={pageRef} className="relative min-h-screen overflow-x-hidden" style={{ background:"#020c12" }}>

      {/* ── Jungle atmosphere ─────────────────────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0"
          style={{ background:"linear-gradient(180deg,#01060c 0%,#03131f 18%,#092233 45%,#03131f 78%,#01060c 100%)" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[55%]"
          style={{ background:"radial-gradient(ellipse at 50% 0%,rgba(41,171,226,0.12) 0%,rgba(41,171,226,0.04) 40%,transparent 68%)" }} />
        <div className="absolute top-0 left-0 w-[55%] h-[70%]"
          style={{ background:"radial-gradient(ellipse at 0% 15%,rgba(41,171,226,0.12) 0%,transparent 55%)" }} />
        <div className="absolute top-0 right-0 w-[55%] h-[70%]"
          style={{ background:"radial-gradient(ellipse at 100% 15%,rgba(13,47,71,0.25) 0%,transparent 55%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-[25%]"
          style={{ background:"linear-gradient(to top,rgba(13,47,71,0.1) 0%,transparent 100%)" }} />
        {/* Fireflies */}
        {FIREFLIES.map((f) => (
          <motion.div key={f.id} className="absolute rounded-full"
            style={{ left:`${f.x}%`, top:`${f.y}%`, width:f.size, height:f.size,
              background:f.colour,
              boxShadow:`0 0 ${f.size*6}px ${f.colour}` }}
            animate={{ opacity:[0,1,0.3,0.9,0], y:[0,-18,-8,-26,-35], scale:[0.5,1,0.7,1,0.3] }}
            transition={{ duration:f.duration, delay:f.delay, repeat:Infinity, ease:"easeInOut" }}
          />
        ))}
        {/* Light shafts */}
        {[18,36,52,68,84].map((pct,i) => (
          <div key={i} className="absolute top-0 h-[60%] pointer-events-none"
            style={{ left:`${pct}%`, width:`${2+(i%3)}px`,
              background:`linear-gradient(180deg,rgba(41,171,226,${0.05+i*0.008}) 0%,rgba(41,171,226,0.02) 50%,transparent 100%)`,
              filter:"blur(6px)", transform:`rotate(${-5+i*2.5}deg)`,
              transformOrigin:"top center",
              animation:`light-shaft ${5+i}s ease-in-out ${i*0.7}s infinite` }} />
        ))}
      </div>

      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 w-full">

        {/* ═══════════════════════════════════════════════════════════════════
            HERO — 3-column: [Countdown] [Logo] [Sponsors]
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-screen w-full overflow-hidden flex flex-col"
        >
          {/* Floating firefly particles */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {flyParts.map((p) => (
              <motion.div key={p.id} className="absolute rounded-full"
                style={{ left:`${p.x}%`, top:`${p.y}%`, width:p.size, height:p.size,
                  background:p.color, boxShadow:`0 0 ${p.size*5}px ${p.color}80` }}
                animate={{ y:[0,-70,0], opacity:[0,0.9,0], scale:[0.5,1,0.3] }}
                transition={{ duration:p.duration, delay:p.delay, repeat:Infinity, ease:"easeInOut" }}
              />
            ))}
          </div>

          {/* Vine horizon glow */}
          <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none z-10"
            style={{ background:"linear-gradient(90deg,transparent,rgba(45,100,20,0.4),rgba(41,171,226,0.25),rgba(45,100,20,0.4),transparent)" }} />

          <div className="h-20 md:h-24 shrink-0" />

          {/* School badge */}
          <motion.div initial={{ opacity:0, y:-14 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.1 }}
            className="relative z-20 flex items-center gap-3 justify-center mb-3 md:mb-4">
            <div className="h-px w-10 md:w-16"
              style={{ background:"linear-gradient(90deg,transparent,rgba(41,171,226,0.5))" }} />
            <span className="font-display text-[9px] md:text-[11px] font-bold tracking-[0.35em] uppercase"
              style={{ color:"rgba(41,171,226,0.65)" }}>Don Bosco School • Kolkata</span>
            <div className="h-px w-10 md:w-16"
              style={{ background:"linear-gradient(270deg,transparent,rgba(106,172,26,0.5))" }} />
          </motion.div>

          {/* ── 3-COLUMN GRID ── */}
          <div className="relative z-20 flex-1 w-full max-w-[92rem] mx-auto px-4 md:px-8
                          grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center pb-4">

            {/* ═══ LEFT: Countdown ═══ */}
            <motion.div initial={{ opacity:0, x:-42 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.8, delay:0.35 }}
              className="lg:col-span-3 flex flex-col gap-4 order-3 lg:order-1">

              <div className="flex items-center gap-2">
                <span className="text-sm">🕐</span>
                <span className="font-display text-[9px] font-bold tracking-[0.28em] uppercase"
                  style={{ color:"rgba(41,171,226,0.65)" }}>Time to Departure</span>
              </div>

              {/* GlassPanel countdown */}
              <GlassPanel innerStyle={{ padding:"16px" }}>
                <p className="font-display text-[8px] tracking-[0.25em] uppercase text-center mb-3"
                  style={{ color:"rgba(41,171,226,0.55)" }}>COUNTDOWN TO BOSCOFEST 2026</p>
                {timerMounted ? (
                  <div className="grid grid-cols-2 gap-2.5">
                    <JungleTimerBox value={time.days}    label="Days"  isSky={true}  />
                    <JungleTimerBox value={time.hours}   label="Hours" isSky={false} />
                    <JungleTimerBox value={time.minutes} label="Min"   isSky={false} />
                    <JungleTimerBox value={time.seconds} label="Sec"   isSky={true}  />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2.5 opacity-25">
                    {["Days","Hours","Min","Sec"].map(l => (
                      <div key={l} className="rounded-lg p-3 text-center"
                        style={{ background:"rgba(4,14,4,0.8)" }}>
                        <span className="font-display text-2xl font-black" style={{ color:"#29ABE2" }}>--</span>
                        <span className="text-[8px] uppercase tracking-widest block mt-1" style={{ color:"rgba(41,171,226,0.4)" }}>{l}</span>
                      </div>
                    ))}
                  </div>
                )}
              </GlassPanel>

              {/* Mini stats — glass panels */}
              <div className="grid grid-cols-2 gap-3">
                {[{v:"30+",l:"Events",c:"#6AAD1A"},{v:"50+",l:"Schools",c:"#29ABE2"}].map((s,i) => (
                  <GlassPanel key={i} innerStyle={{ padding:"12px", textAlign:"center" }}>
                    <span className="font-display text-xl font-black block" style={{ color:s.c }}>{s.v}</span>
                    <span className="text-[8px] uppercase tracking-wider" style={{ color:"rgba(240,230,200,0.45)" }}>{s.l}</span>
                  </GlassPanel>
                ))}
              </div>
            </motion.div>

            {/* ═══ CENTER: Logo ═══ */}
            <motion.div style={isMobile ? {} : { y:heroY }}
              className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
              <motion.div
                style={isMobile ? {} : { rotateX, rotateY, transformStyle:"preserve-3d" }}
                className="relative flex items-center justify-center">

                {/* Sky blue sun-glow halo */}
                <motion.div className="absolute rounded-full pointer-events-none"
                  style={{ width:"clamp(260px,40vw,500px)", height:"clamp(260px,40vw,500px)",
                    background:"radial-gradient(circle,rgba(41,171,226,0.12) 0%,rgba(106,172,26,0.06) 45%,transparent 70%)",
                    filter:"blur(30px)" }}
                  animate={{ scale:[1,1.08,1], opacity:[0.5,1,0.5] }}
                  transition={{ duration:5, repeat:Infinity, ease:"easeInOut" }}
                />

                {/* Dashed outer orbit ring */}
                <div className="absolute rounded-full pointer-events-none"
                  style={{ width:"clamp(235px,37vw,468px)", height:"clamp(235px,37vw,468px)",
                    border:"1.5px dashed rgba(45,100,20,0.4)",
                    animation:"compass-outer 60s linear infinite" }} />
                {/* Solid inner orbit ring */}
                <div className="absolute rounded-full pointer-events-none"
                  style={{ width:"clamp(206px,32vw,416px)", height:"clamp(206px,32vw,416px)",
                    border:"1.5px solid rgba(34,102,34,0.35)",
                    animation:"compass-inner 40s linear infinite reverse" }} />
                {/* Sky Blue dot ring */}
                <motion.div className="absolute rounded-full pointer-events-none"
                  style={{ width:"clamp(180px,28vw,365px)", height:"clamp(180px,28vw,365px)",
                    backgroundImage:"radial-gradient(circle at 50% 0%,#29ABE2 3px,transparent 3px),radial-gradient(circle at 50% 100%,#29ABE2 3px,transparent 3px),radial-gradient(circle at 0% 50%,#29ABE2 3px,transparent 3px),radial-gradient(circle at 100% 50%,#29ABE2 3px,transparent 3px)",
                    backgroundRepeat:"no-repeat" }}
                  animate={{ rotate:360 }} transition={{ duration:65, repeat:Infinity, ease:"linear" }}
                />

                {/* THE LOGO */}
                <motion.div animate={{ y:[0,-14,0] }}
                  transition={{ duration:7, repeat:Infinity, ease:"easeInOut" }}
                  className="relative z-10"
                  style={{ filter:"drop-shadow(0 0 40px rgba(41,171,226,0.28)) drop-shadow(0 0 80px rgba(106,172,26,0.15))" }}>
                  <div className="relative overflow-hidden rounded-full"
                    style={{ width:"clamp(155px,22vw,310px)", height:"clamp(155px,22vw,310px)" }}>
                    <Image src="/logo2026.png" alt="Boscofest 2026 – Untold. Unfazed. Uncharted."
                      fill priority sizes="(max-width:768px) 155px,(max-width:1280px) 22vw,310px"
                      className="object-contain" onLoad={() => setLogoLoaded(true)} />
                    <div className="absolute top-0 -left-full w-1/2 h-full skew-x-12 animate-[shimmer_4s_2s_infinite]"
                      style={{ background:"linear-gradient(90deg,transparent,rgba(41,171,226,0.12),transparent)" }} />
                  </div>
                </motion.div>
              </motion.div>

              {/* Title */}
              <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:logoLoaded?1:0, y:logoLoaded?0:18 }}
                transition={{ duration:0.8, delay:0.5 }} className="text-center mt-5 px-4">
                <h1 className="font-display font-black uppercase leading-none tracking-tighter select-none"
                  style={{ fontSize:"clamp(1.8rem,5vw,4rem)", color:"#F0EDD8", textShadow:"0 0 40px rgba(41,171,226,0.2)" }}>
                  <span style={{ color:"#29ABE2", textShadow:"0 0 20px rgba(41,171,226,0.65)" }}>BOSCO</span>
                  <span>FEST</span>
                  <span className="ml-3" style={{ color:"#6AAD1A", textShadow:"0 0 18px rgba(106,172,26,0.6)" }}>2026</span>
                </h1>
                <div className="flex items-center justify-center gap-2 md:gap-3 mt-2">
                  {(["UNTOLD","UNFAZED","UNCHARTED"] as const).map((w,i) => (
                    <span key={w} className="flex items-center gap-2 md:gap-3">
                      <span className="font-display text-[9px] md:text-[11px] font-semibold tracking-[0.2em] uppercase"
                        style={{ color:i===0?"#29ABE2":i===1?"#6AAD1A":"#56C7F0" }}>{w}</span>
                      {i<2 && <span style={{ color:"rgba(240,237,216,0.18)" }}>·</span>}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <motion.div initial={{ opacity:0 }} animate={{ opacity:logoLoaded?1:0 }}
                  transition={{ delay:0.95 }}
                  className="flex flex-col sm:flex-row gap-3 mt-5 justify-center">
                  <button onClick={handleRegister}
                    className="group relative px-6 md:px-8 py-3 rounded-full overflow-hidden font-display text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-white cursor-pointer"
                    style={{ background:"rgba(255,255,255,0.03)",
                      border:"1.5px solid rgba(255,255,255,0.08)",
                      boxShadow:"0 6px 16px rgba(0,0,0,0.65), 0 0 20px rgba(41,171,226,0.22)" }}>
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background:"linear-gradient(135deg,#29ABE2 0%,#6AAD1A 100%)" }} />
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" /> Register Now
                    </span>
                  </button>
                  <Link href="/events"
                    className="group px-6 md:px-8 py-3 rounded-full font-display text-[10px] md:text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all duration-300"
                    style={{ color:"rgba(240,237,216,0.7)",
                      background:"rgba(255,255,255,0.03)",
                      border:"1.5px solid rgba(255,255,255,0.08)",
                      boxShadow:"0 4px 10px rgba(0,0,0,0.5)" }}>
                    Explore Events <ChevronRight className="h-3.5 w-3.5" style={{ color:"#29ABE2" }} />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* ═══ RIGHT: Sponsors ═══ */}
            <motion.div initial={{ opacity:0, x:42 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.8, delay:0.5 }}
              className="lg:col-span-3 flex flex-col gap-4 order-2 lg:order-3">

              <div className="flex items-center gap-2">
                <span className="text-sm">🌿</span>
                <span className="font-display text-[9px] font-bold tracking-[0.28em] uppercase"
                  style={{ color:"rgba(106,172,26,0.65)" }}>Official Partners</span>
              </div>

              {/* GlassPanel sponsors */}
              <GlassPanel innerStyle={{ padding:"16px" }}>
                <div className="flex items-center justify-between mb-3 pb-2"
                  style={{ borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                  <span className="font-display text-[8px] font-bold tracking-[0.25em] uppercase"
                    style={{ color:"#29ABE2" }}>OFFICIAL SPONSORS</span>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor:"#6AAD1A" }} />
                </div>
                <div className="flex flex-col gap-2.5">
                  {SPONSORS.map((s,idx) => (
                    <div key={idx}
                      className="flex items-center gap-3 p-2.5 rounded-xl transition-all duration-300 cursor-default"
                      style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.04)" }}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background=`${s.color}10`;(e.currentTarget as HTMLElement).style.borderColor=`${s.color}30`;}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.03)";(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.04)";}}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background:`${s.color}18`, border:`1.5px solid ${s.color}35` }}>
                        <Star className="h-4 w-4" style={{ color:s.color }} />
                      </div>
                      <div>
                        <span className="font-display text-xs font-bold tracking-wider block" style={{ color:s.color }}>{s.name}</span>
                        <span className="text-[7px] uppercase tracking-widest" style={{ color:"rgba(240,237,216,0.3)" }}>{s.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-3">
                {[{v:"41st",l:"Year",c:"#29ABE2"},{v:"5K+",l:"Youth",c:"#6AAD1A"}].map((s,i) => (
                  <GlassPanel key={i} innerStyle={{ padding:"12px", textAlign:"center" }}>
                    <span className="font-display text-xl font-black block" style={{ color:s.c }}>{s.v}</span>
                    <span className="text-[8px] uppercase tracking-wider" style={{ color:"rgba(240,230,200,0.45)" }}>{s.l}</span>
                  </GlassPanel>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Scroll arrow */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:logoLoaded?1:0 }}
            transition={{ delay:1.5 }}
            className="relative z-20 flex flex-col items-center gap-1 pb-4 shrink-0"
            style={{ color:"rgba(41,171,226,0.35)" }}>
            <span className="font-display text-[8px] tracking-[0.3em] uppercase">Scroll</span>
            <motion.div animate={{ y:[0,6,0] }} transition={{ duration:1.6, repeat:Infinity }}>
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2: ABOUT
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative z-20 py-20 md:py-28"
          style={{ background:"linear-gradient(180deg,transparent 0%,rgba(4,20,4,0.5) 50%,transparent 100%)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ duration:0.8 }}>
                <div className="flex items-center gap-2 mb-4">
                  <Telescope className="h-4 w-4" style={{ color:"#6AAD1A" }} />
                  <span className="font-display text-xs font-bold uppercase tracking-[0.25em]" style={{ color:"#6AAD1A" }}>The Legacy</span>
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-extrabold uppercase leading-tight tracking-wider mb-6"
                  style={{ color:"#F0EDD8" }}>
                  ABOUT <span style={{ color:"#29ABE2", textShadow:"0 0 20px rgba(41,171,226,0.5)" }}>BOSCOFEST</span>
                </h2>
                <p className="leading-relaxed text-base md:text-lg mb-5" style={{ color:"rgba(240,237,216,0.72)" }}>
                  For four decades, Boscofest has stood as Kolkata&apos;s ultimate school festival arena — an electric colosseum of art, rhythm, intellect, and mastery.
                </p>
                <p className="leading-relaxed text-sm md:text-base mb-8" style={{ color:"rgba(240,237,216,0.52)" }}>
                  Boscofest 2026 charts{" "}
                  <em className="not-italic font-semibold" style={{ color:"#29ABE2" }}>Untold. Unfazed. Uncharted.</em>{" "}
                  — the 41st year of a living legacy.
                </p>
                <Link href="#register" onClick={handleRegister}
                  className="inline-flex items-center gap-2 pb-1 text-sm uppercase tracking-wider font-semibold transition-all group"
                  style={{ color:"#6AAD1A", borderBottom:"1px solid rgba(106,172,26,0.4)" }}>
                  Begin Your Journey <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* Stats — glass frames */}
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {STATS.map((stat, idx) => (
                  <motion.div key={idx}
                    initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }} transition={{ delay:idx*0.1 }}>
                    <GlassPanel innerStyle={{ padding:"20px 16px" }}
                       className="hover:scale-105 transition-transform duration-400 cursor-default h-full">
                      <span className="text-2xl mb-2 block">{stat.icon}</span>
                      <span className="font-display text-3xl md:text-5xl font-extrabold tracking-tight block mb-1"
                        style={{ color:idx%2===0?"#29ABE2":"#6AAD1A",
                          textShadow:idx%2===0?"0 0 16px rgba(41,171,226,0.4)":"0 0 16px rgba(106,172,26,0.4)" }}>
                        {stat.value}
                      </span>
                      <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider"
                        style={{ color:"rgba(240,237,216,0.45)" }}>{stat.label}</span>
                    </GlassPanel>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3: FEATURED EVENTS
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative z-20 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} className="mb-14">
              <span className="font-display text-xs font-bold uppercase tracking-[0.25em] mb-2 block" style={{ color:"#6AAD1A" }}>Main Shows</span>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none" style={{ color:"#F0EDD8" }}>
                FEATURED <span style={{ color:"#29ABE2", textShadow:"0 0 20px rgba(41,171,226,0.4)" }}>SPECTACLES</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
              {FEATURED_EVENTS.map((event, idx) => (
                <motion.div key={event.id}
                  initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true, margin:"-50px" }} transition={{ delay:idx*0.1 }}
                  className={event.featured?"md:col-span-2":""}>
                  <GlassPanel
                    className={`hover:-translate-y-2 transition-transform duration-500 cursor-pointer ${event.featured?"min-h-[380px]":"min-h-[280px]"}`}
                    innerStyle={{ position:"relative", padding:"0", overflow:"hidden",
                      minHeight: event.featured ? 360 : 260, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
                    <div style={{ position:"absolute", inset:0 }}>
                      <Image src={event.banner} alt={event.name} fill
                        className="object-cover opacity-15 hover:opacity-25 transition-all duration-700" sizes="800px" />
                      <div style={{ position:"absolute", inset:0,
                        background:"linear-gradient(to top,rgba(2,8,2,0.97),rgba(4,14,4,0.75),transparent)" }} />
                    </div>
                    <div style={{ position:"relative", zIndex:2, padding:"20px 20px 20px" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">{event.icon}</span>
                        <span className="px-3 py-1 rounded-full text-[9px] font-semibold uppercase tracking-wider"
                          style={{ background:"rgba(45,100,20,0.2)", border:"1px solid rgba(106,172,26,0.3)", color:"#8BC34A" }}>
                          {event.category}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-bold uppercase tracking-wide mb-2"
                        style={{ color:"#F0EDD8" }}>{event.name}</h3>
                      <p className="text-sm leading-relaxed mb-5" style={{ color:"rgba(240,237,216,0.55)" }}>{event.shortDesc}</p>
                      <Link href="/events"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider pb-0.5 transition-colors"
                        style={{ color:"rgba(240,237,216,0.7)", borderBottom:"1px solid rgba(240,237,216,0.2)" }}>
                        Explore <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </GlassPanel>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4: GALLERY
        ═══════════════════════════════════════════════════════════════════ */}
        <section ref={galleryRef} className="relative z-20 h-[220vh] md:h-[300vh]">
          <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
            <div className="max-w-7xl mx-auto px-6 w-full mb-8 md:mb-12">
              <span className="font-display text-xs font-bold uppercase tracking-[0.25em] mb-2 block animate-[pulse-sky_3s_ease-in-out_infinite]"
                style={{ color:"#29ABE2" }}>Memories</span>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold uppercase tracking-wider" style={{ color:"#F0EDD8" }}>
                FESTIVAL <span style={{ color:"#6AAD1A", textShadow:"0 0 16px rgba(106,172,26,0.4)" }}>HIGHLIGHTS</span>
              </h2>
              <p className="text-xs md:text-sm mt-1" style={{ color:"rgba(240,237,216,0.35)" }}>
                {isMobile?"Swipe to explore":"Scroll down to travel through the gallery"}
              </p>
            </div>
            <div className="flex items-center w-full overflow-visible">
              <motion.div style={isMobile?{}:{ x:galleryX }}
                className={`flex gap-5 px-6 md:px-24 w-full ${isMobile?"overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none flex-nowrap":"overflow-visible"}`}>
                {GALLERY_PHOTOS.map((photo) => (
                  <div key={photo.id} onClick={() => setActivePhoto(photo.src)}
                    className="shrink-0 snap-center cursor-pointer"
                    style={{ width:isMobile?"280px":"460px" }}>
                    <GlassPanel innerStyle={{ position:"relative", overflow:"hidden",
                        height:isMobile?180:300, borderRadius:12 }}>
                      <Image src={photo.src} alt={photo.title} fill
                        className="object-cover hover:scale-105 transition-transform duration-700" sizes="460px" />
                      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5"
                        style={{ background:"rgba(2,8,2,0.72)" }}>
                        <span className="font-display text-[9px] uppercase font-bold tracking-[0.2em] mb-1" style={{ color:"#29ABE2" }}>Boscofest Arena</span>
                        <h4 className="font-bold text-base" style={{ color:"#F0EDD8" }}>{photo.title}</h4>
                      </div>
                    </GlassPanel>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 5: SPONSORS
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative z-20 py-20 md:py-24" id="sponsors">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} className="text-center mb-14">
              <span className="font-display text-xs font-bold uppercase tracking-[0.25em] mb-2 block" style={{ color:"#29ABE2" }}>Expedition Backed By</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold uppercase" style={{ color:"#F0EDD8" }}>
                OUR <span style={{ color:"#29ABE2", textShadow:"0 0 18px rgba(41,171,226,0.5)" }}>SPONSORS</span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SPONSORS.map((s, idx) => (
                <motion.div key={idx}
                  initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }}
                  viewport={{ once:true }} transition={{ delay:idx*0.12 }}>
                  <GlassPanel
                    className="hover:scale-105 transition-transform duration-400"
                    innerStyle={{ padding:"32px 24px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ background:`${s.color}15`, border:`1.5px solid ${s.color}35` }}>
                      <Star className="h-6 w-6" style={{ color:s.color }} />
                    </div>
                    <span className="font-display font-black text-xl tracking-wider mb-1" style={{ color:s.color }}>{s.name}</span>
                    <span className="text-[9px] tracking-widest uppercase" style={{ color:"rgba(240,237,216,0.3)" }}>{s.role}</span>
                  </GlassPanel>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 6: CTA
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative z-20 py-28 md:py-36 overflow-hidden" id="register">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0"
              style={{ background:"linear-gradient(180deg,transparent,rgba(41,171,226,0.03),rgba(45,100,20,0.04),transparent)" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{ border:"1px solid rgba(45,100,20,0.08)", animation:"compass-outer 60s linear infinite" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
              style={{ border:"1px solid rgba(41,171,226,0.06)", animation:"compass-inner 40s linear infinite reverse" }} />
          </div>
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.8 }}>
              <motion.div animate={{ rotate:360 }} transition={{ duration:20, repeat:Infinity, ease:"linear" }}
                className="inline-block mb-6 opacity-30">
                <Compass className="h-10 w-10" style={{ color:"#29ABE2" }} />
              </motion.div>
              <span className="font-display text-xs font-bold uppercase tracking-[0.3em] mb-4 block animate-[pulse-sky_3s_ease-in-out_infinite]"
                style={{ color:"#29ABE2" }}>Enter the Expedition</span>
              <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-wider mb-6 leading-tight" style={{ color:"#F0EDD8" }}>
                ARE YOU READY TO GO <br />
                <span style={{ WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                  backgroundImage:"linear-gradient(90deg,#1A6FA8 0%,#29ABE2 40%,#6AAD1A 100%)",
                  backgroundClip:"text" }}>UNCHARTED?</span>
              </h2>
              <p className="text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10" style={{ color:"rgba(240,237,216,0.55)" }}>
                Registration is now open for all affiliated institutions. Assemble your squads, tune your instruments, and step beyond the horizon.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button onClick={handleRegister}
                  className="group relative w-full sm:w-auto px-10 py-4 font-display text-sm font-extrabold uppercase tracking-wider rounded-full text-white overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{ background:"linear-gradient(135deg, #1C0E06 0%, #2D180B 100%)",
                    border:"1.5px solid rgba(255,255,255,0.08)",
                    boxShadow:"0 8px 20px rgba(0,0,0,0.75), 0 0 15px rgba(41,171,226,0.25)" }}>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-full"
                    style={{ background:"linear-gradient(135deg,#29ABE2 0%,#6AAD1A 100%)" }} />
                  <span className="relative z-10">Register Institute</span>
                </button>
                <Link href="/events"
                  className="w-full sm:w-auto px-10 py-4 font-display text-sm font-extrabold uppercase tracking-wider rounded-full flex items-center justify-center gap-1.5 transition-all duration-300"
                  style={{ color:"rgba(240,237,216,0.65)",
                    background:"rgba(255,255,255,0.03)",
                    border:"1.5px solid rgba(255,255,255,0.08)",
                    boxShadow:"0 5px 12px rgba(0,0,0,0.6)" }}>
                  Explore Catalog <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 cursor-zoom-out"
            style={{ background:"rgba(2,8,2,0.96)", backdropFilter:"blur(14px)" }}>
            <motion.div initial={{ scale:0.88, opacity:0 }} animate={{ scale:1, opacity:1 }}
              exit={{ scale:0.88, opacity:0 }} transition={{ type:"spring", damping:25, stiffness:350 }}
              className="relative max-w-5xl w-full" onClick={e=>e.stopPropagation()}>
              <GlassPanel innerStyle={{ position:"relative", height:"70vh", overflow:"hidden" }}>
                <Image src={activePhoto} alt="Preview" fill className="object-contain" sizes="100vw" />
                <button onClick={() => setActivePhoto(null)}
                  className="absolute top-3 right-3 h-9 w-9 rounded-full flex items-center justify-center text-xl transition-all"
                  style={{ background:"rgba(4,14,4,0.85)", color:"#F0EDD8",
                    border:"1px solid rgba(45,100,20,0.4)" }}>
                  &times;
                </button>
              </GlassPanel>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
