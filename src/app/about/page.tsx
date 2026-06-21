"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Scramble text hover component
function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const scrambleInterval = useRef<NodeJS.Timeout | null>(null);
  const glyphPool = "XX##@@&&$$//0123456789<>[]{}/\\*+=_-!?";

  const handleMouseEnter = () => {
    let revealIndex = 0;
    let internalTicks = 0;
    if (scrambleInterval.current) clearInterval(scrambleInterval.current);

    scrambleInterval.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (text[index] === " ") return " ";
            if (index < revealIndex) {
              return text[index];
            }
            return glyphPool[Math.floor(Math.random() * glyphPool.length)];
          })
          .join("")
      );

      internalTicks++;
      if (internalTicks % 2 === 0) {
        revealIndex++;
      }

      if (revealIndex > text.length) {
        if (scrambleInterval.current) clearInterval(scrambleInterval.current);
        setDisplayText(text);
      }
    }, 20);
  };

  const handleMouseLeave = () => {
    if (scrambleInterval.current) clearInterval(scrambleInterval.current);
    setDisplayText(text);
  };

  useEffect(() => {
    return () => {
      if (scrambleInterval.current) clearInterval(scrambleInterval.current);
    };
  }, []);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="scramble-text font-mono tracking-widest text-xs md:text-sm font-extrabold text-[#2B1A0E] select-none flex items-center justify-center gap-1.5 cursor-pointer"
    >
      <span className="text-[#65C466] font-bold">&gt;</span>
      <span>{displayText}</span>
    </span>
  );
}

export default function About() {
  const [glowPos, setGlowPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setGlowPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const studentCommittee = [
    "HARSHVARDHAN SARAF",
    "AARAV CHANDAK",
    "ARYAVEER AGARWAL",
    "VATSAL NEWAR",
    "DIVYAM SEKSARIA",
  ];

  const graphicsTeam = [
    "RISHIK ROY",
    "RUDRA DAS",
    "NAMAN AGARWAL",
    "AAMIR JAVED",
    "AARAV DAGA",
    "AAYANSH BHALOTIA",
    "DHRUV ARORA",
  ];

  const videoTeam = [
    "FARZAN RAZA",
    "SAMBIT ROY",
    "RUDRA DAS",
    "SOUMITRO SAMANTA",
    "ADVAY KOLEY",
    "VIVAAN GUPTA",
  ];

  const websiteTeam = [
    "SUMEDH GADIA",
    "ABDUL MOQUIT",
    "RISHIT VARMA",
    "VANSH BOTHRA",
    "AHMED ANSARI",
    "SAKSHAM SINGHI",
  ];

  const teacherCommittee = [
    "MR. MATHEW SAM",
    "MRS. ANANNYA DASGUPTA",
    "MRS. GILLIAN CULPEPER",
    "MRS. SHARMILEE ACHARYYA",
    "MR. SUMIT SENGUPTA",
    "MRS. SWAGATA ROY",
    "MR. THOMAS ANTONY",
  ];

  return (
    <div className="min-h-screen relative flex flex-col pb-0">
      {/* Fixed Background Texture to prevent mobile stretching and layout glitches */}
      <div className="fixed inset-0 bg-rest-texture z-0 pointer-events-none" />
      
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-32 pb-20 relative z-20">
        
        {/* About Us Title */}
        <div className="text-center mb-10 relative">
          <h1 className="font-bebas font-black text-4xl md:text-5xl lg:text-6xl text-[#F4ECC8] uppercase tracking-wide">
            About Us
          </h1>
          <div className="w-16 h-[2px] bg-gold-accent mx-auto mt-4" />
        </div>

        {/* Orbit System (Cross Constellation layout matching Mockup) */}
        <div className="relative w-full h-[380px] md:h-[500px] flex items-center justify-center mb-10 select-none overflow-hidden">
          
          {/* Compass/Chakra Background Lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <svg viewBox="0 0 100 100" className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] text-ink-dark/75 fill-none stroke-current absolute">
              {/* Horizontal and Vertical Crosshair lines */}
              <line x1="50" y1="2" x2="50" y2="98" strokeWidth="0.75" />
              <line x1="2" y1="50" x2="98" y2="50" strokeWidth="0.75" />
              
              {/* Concentric Circles */}
              <circle cx="50" cy="50" r="44" strokeWidth="0.8" />
              <circle cx="50" cy="50" r="34" strokeWidth="0.65" className="stroke-dashed opacity-90" />
              <circle cx="50" cy="50" r="22" strokeWidth="0.65" />
              <circle cx="50" cy="50" r="10" strokeWidth="0.65" />
              
              {/* Globe Meridians and Parallels */}
              <path d="M 50 6 A 56 56 0 0 0 50 94" strokeWidth="0.7" />
              <path d="M 50 6 A 56 56 0 0 1 50 94" strokeWidth="0.7" />
              <path d="M 6 50 A 56 56 0 0 1 94 50" strokeWidth="0.7" />
              <path d="M 6 50 A 56 56 0 0 0 94 50" strokeWidth="0.7" />
              
              {/* Center Dot */}
              <circle cx="50" cy="50" r="1.5" className="fill-ink-dark opacity-90" />
            </svg>
          </div>

          {/* Rotating orbit container */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="relative w-[200px] h-[200px] md:w-[288px] md:h-[288px] flex items-center justify-center pointer-events-none"
          >
            {/* Top: Talents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                whileHover={{ scale: 1.08, zIndex: 10 }}
                className="px-3 py-3 md:px-6 md:py-4.5 bg-parchment-light border-2 border-ink-dark rounded-xl md:rounded-2xl shadow-[3px_3px_0px_rgba(43,26,14,1)] flex flex-col items-center cursor-default w-[105px] md:w-[140px] text-center"
              >
                <span className="text-3xl md:text-5xl text-ink-dark leading-none">∞</span>
                <span className="font-bebas text-base md:text-2xl text-ink-dark mt-1">TALENTS</span>
              </motion.div>
            </div>

            {/* Right: Edition */}
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                whileHover={{ scale: 1.08, zIndex: 10 }}
                className="px-3 py-3 md:px-6 md:py-4.5 bg-parchment-light border-2 border-ink-dark rounded-xl md:rounded-2xl shadow-[3px_3px_0px_rgba(43,26,14,1)] flex flex-col items-center cursor-default w-[105px] md:w-[140px] text-center"
              >
                <span className="font-bebas text-2xl md:text-4xl text-ink-dark">41<sup className="text-[0.55em] uppercase ml-0.5">st</sup></span>
                <span className="font-bebas text-[10px] md:text-xs tracking-wider text-ink-dark font-black uppercase mt-1">EDITION</span>
              </motion.div>
            </div>

            {/* Bottom: Days */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-auto">
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                whileHover={{ scale: 1.08, zIndex: 10 }}
                className="px-3 py-3 md:px-6 md:py-4.5 bg-parchment-light border-2 border-ink-dark rounded-xl md:rounded-2xl shadow-[3px_3px_0px_rgba(43,26,14,1)] flex flex-col items-center cursor-default w-[105px] md:w-[140px] text-center"
              >
                <span className="font-bebas text-2xl md:text-4xl text-ink-dark">2</span>
                <span className="font-bebas text-[10px] md:text-xs tracking-wider text-ink-dark uppercase mt-1">DAYS</span>
              </motion.div>
            </div>

            {/* Left: Events */}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                whileHover={{ scale: 1.08, zIndex: 10 }}
                className="px-3 py-3 md:px-6 md:py-4.5 bg-parchment-light border-2 border-ink-dark rounded-xl md:rounded-2xl shadow-[3px_3px_0px_rgba(43,26,14,1)] flex flex-col items-center cursor-default w-[105px] md:w-[140px] text-center"
              >
                <span className="font-bebas text-2xl md:text-4xl text-ink-dark">36</span>
                <span className="font-bebas text-[10px] md:text-xs tracking-wider text-ink-dark font-black uppercase mt-1">EVENTS</span>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Narrative text scroll */}
        <div className="max-w-2xl mx-auto mb-28 text-center px-4 leading-relaxed font-sans font-semibold text-base md:text-lg text-[#ebdcb9]/90 space-y-6">
          <p className="text-lg md:text-xl font-bold text-[#F4ECC8]">Ever noticed how the best stories start with a bad decision?</p>
          <p>The wrong turn. The missed train. The message that begins with &ldquo;I've got an idea...&rdquo; at 2 a.m. Most people call them mistakes. Adventurers call them beginnings.</p>
          <p className="font-bebas text-xl md:text-2xl text-[#F4ECC8] tracking-wider uppercase">Adventure is choosing the unknown.</p>
          <p>It's taking the longer route home just to see where it leads. It's clicking &ldquo;Accept Quest&rdquo; before reading the difficulty level. It's every side quest that somehow becomes more memorable than the main storyline.</p>
          <p className="font-caveat text-2xl md:text-3xl text-[#65C466] tracking-wide">Adventure isn't found. It's created.</p>
          <p className="font-bold text-[#ebdcb9]">And this year, it's breaking free.</p>
          <p>Introducing the 41st Edition of Bosco Fest, where curiosity outruns caution, where comfort zones become archaeological artifacts, and where every ordinary moment has the potential to become an unforgettable story. No maps. No cheat codes. No save files. Just possibilities.</p>
          <p className="text-[#E8D7A5] font-bold">If that sounds reckless, good. The greatest adventures usually are.</p>
          <p className="font-bebas text-xl md:text-2xl tracking-widest text-[#F4ECC8] uppercase">36 Events. 2 Days. One Extraordinary Journey.</p>
          <p className="font-bebas text-3xl md:text-4xl tracking-widest text-[#6EC6FF] uppercase">Untold. Unfazed. Uncharted.</p>
          <p className="font-bebas text-base md:text-lg tracking-widest text-[#F4ECC8] uppercase">This is us. Bosco Fest 2026.</p>
        </div>

        {/* ── Committee / Teams sections (styled as parchment panels) ── */}
        
        {/* Student Committee */}
        <div className="mb-20">
          <h2 className="font-bebas font-black text-2xl text-center text-[#F4ECC8] uppercase tracking-wider mb-8">
            Core Committee - Students
          </h2>
          <div className="flex flex-wrap justify-center gap-5 max-w-3xl mx-auto">
            {studentCommittee.map((name, idx) => (
              <div 
                key={idx} 
                className="w-full sm:w-[220px] p-4 parchment-card shadow-[3px_3px_0px_rgba(43,26,14,1)] hover:translate-y-[-2px] transition-transform duration-200 text-center flex items-center justify-center min-h-[60px]"
              >
                <ScrambleText text={name} />
              </div>
            ))}
          </div>
        </div>

        {/* Graphics Team */}
        <div className="mb-20">
          <h2 className="font-bebas font-black text-2xl text-center text-[#F4ECC8] uppercase tracking-wider mb-8">
            Graphics Team
          </h2>
          <div className="flex flex-wrap justify-center gap-5 max-w-4xl mx-auto">
            {graphicsTeam.map((name, idx) => (
              <div 
                key={idx} 
                className="w-full sm:w-[200px] p-4 parchment-card shadow-[3px_3px_0px_rgba(43,26,14,1)] hover:translate-y-[-2px] transition-transform duration-200 text-center flex items-center justify-center min-h-[60px]"
              >
                <ScrambleText text={name} />
              </div>
            ))}
          </div>
        </div>

        {/* Video Team */}
        <div className="mb-20">
          <h2 className="font-bebas font-black text-2xl text-center text-[#F4ECC8] uppercase tracking-wider mb-8">
            Video Team
          </h2>
          <div className="flex flex-wrap justify-center gap-5 max-w-4xl mx-auto">
            {videoTeam.map((name, idx) => (
              <div 
                key={idx} 
                className="w-full sm:w-[200px] p-4 parchment-card shadow-[3px_3px_0px_rgba(43,26,14,1)] hover:translate-y-[-2px] transition-transform duration-200 text-center flex items-center justify-center min-h-[60px]"
              >
                <ScrambleText text={name} />
              </div>
            ))}
          </div>
        </div>

        {/* Website Team */}
        <div className="mb-20">
          <h2 className="font-bebas font-black text-2xl text-center text-[#F4ECC8] uppercase tracking-wider mb-8">
            Website Team
          </h2>
          <div className="flex flex-wrap justify-center gap-5 max-w-3xl mx-auto">
            {websiteTeam.map((name, idx) => (
              <div 
                key={idx} 
                className="w-full sm:w-[220px] p-4 parchment-card shadow-[3px_3px_0px_rgba(43,26,14,1)] hover:translate-y-[-2px] transition-transform duration-200 text-center flex items-center justify-center min-h-[60px]"
              >
                <ScrambleText text={name} />
              </div>
            ))}
          </div>
        </div>

        {/* Teacher Committee */}
        <div className="mb-10">
          <h2 className="font-bebas font-black text-2xl text-center text-[#F4ECC8] uppercase tracking-wider mb-8">
            Core Committee - Teachers
          </h2>
          <div className="flex flex-wrap justify-center gap-5 max-w-4xl mx-auto">
            {teacherCommittee.map((name, idx) => (
              <div 
                key={idx} 
                className="w-full sm:w-[200px] p-4 parchment-card shadow-[3px_3px_0px_rgba(43,26,14,1)] hover:translate-y-[-2px] transition-transform duration-200 text-center flex items-center justify-center min-h-[60px]"
              >
                <ScrambleText text={name} />
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
