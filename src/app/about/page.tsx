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
      className="scramble-text font-mono tracking-widest text-xs md:text-sm font-semibold select-none flex items-center justify-center gap-1.5"
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
    "VATSAL NEWAR",
    "RISHIK ROY",
    "DHRUV ARORA",
    "AAYANSH BHALOTIA",
    "RUDRA DAS",
    "NAMAN AGARWAL",
    "AAMIR JAVED",
    "AARAV DAGA",
  ];

  const videoTeam = [
    "ARYAVEER AGARWAL",
    "FARZAN RAZA",
    "SOUMITRO SAMANTA",
    "RUDRA DAS",
    "SAMBIT ROY",
    "SWARNAVA PRAMANIK",
    "VIVAAN GUPTA",
    "ADVAY KOLEY",
  ];

  const websiteTeam = [
    "ABDUL MOQUIT",
    "SUMEDH GADIA",
    "VANSH BOTHRA",
    "RISHIT VARMA",
    "AHMED ANSARI",
    "SAKSHAM SINGHI",
  ];

  const teacherCommittee = [
    "MR. MATHEW SAM",
    "MRS. ANANNYA DASGUPTA",
    "MR. SUMIT SENGUPTA",
    "MRS. GILLIAN CULPEPER",
    "MRS. SWAGATA DUTTA",
    "MR. THOMAS ANTHONY",
    "MRS. SHARMILEE ACHARYYA",
  ];

  return (
    <div className="min-h-screen bg-parchment-texture relative flex flex-col pb-0">
      


      <Navbar />

      {/* Cursor Glow effect */}
      <div 
        style={{ left: glowPos.x, top: glowPos.y }}
        className="fixed w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(110,198,255,0.06)_0%,_transparent_70%)] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 hidden md:block"
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-20">
        
        {/* About Us Title */}
        <div className="text-center mb-10 relative">
          <span className="font-display font-black text-[10px] tracking-[0.3em] text-[#65C466] uppercase block mb-2">
            The Chronicle
          </span>
          <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-[#2B1A0E] uppercase tracking-wide">
            About Us
          </h1>
          <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-[#D9B24C] to-transparent mx-auto mt-4" />
        </div>

        {/* Orbit System (Desktop only / Stacks in mobile) */}
        <div className="relative w-full min-h-[50vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden mb-16 select-none">
          <div className="relative w-full max-w-[320px] md:max-w-[500px] lg:max-w-none lg:w-[700px] lg:h-[700px] flex flex-col lg:block gap-6">
            
            {/* Desktop Orbit Ring System */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              {/* Rotating background lines */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
                className="w-full h-full relative"
              >
                {/* Concentric Rings */}
                <div className="absolute top-1/2 left-1/2 w-[320px] h-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#2B1A0E]/30" />
                <div className="absolute top-1/2 left-1/2 w-[470px] h-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#2B1A0E]/30" />
                <div className="absolute top-1/2 left-1/2 w-[620px] h-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#2B1A0E]/30" />
                
                {/* Radial Lines */}
                {[15, 105, 195, 285].map((angle, idx) => (
                  <div 
                    key={idx}
                    style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
                    className="absolute top-1/2 left-1/2 w-[220px] h-[1.5px] transform-origin-left bg-gradient-to-r from-[#2B1A0E]/60 to-transparent"
                  />
                ))}
              </motion.div>

              {/* Central Core Star */}
              <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-[#2B1A0E] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(43,26,14,0.6)] z-50" />
            </div>

            {/* Orbit Stat Box 1: Edition */}
            <div className="relative lg:absolute lg:top-1/2 lg:right-[70px] lg:-translate-y-1/2 w-full lg:w-[220px] z-20">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-6 lg:p-8 bg-[#F7F1D5] border-[2.5px] border-[#2B1A0E] rounded-3xl shadow-[4px_5px_0px_rgba(43,26,14,0.15)] flex flex-col items-center cursor-default"
              >
                <span className="font-display font-black text-5xl md:text-6xl text-[#2B1A0E]">41<sup>st</sup></span>
                <span className="font-sans font-bold text-xs tracking-[0.3em] text-[#5C4331] uppercase mt-2">Edition</span>
              </motion.div>
            </div>

            {/* Orbit Stat Box 2: Events */}
            <div className="relative lg:absolute lg:top-1/2 lg:left-[70px] lg:-translate-y-1/2 w-full lg:w-[220px] z-20">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-6 lg:p-8 bg-[#F7F1D5] border-[2.5px] border-[#2B1A0E] rounded-3xl shadow-[4px_5px_0px_rgba(43,26,14,0.15)] flex flex-col items-center cursor-default"
              >
                <span className="font-display font-black text-5xl md:text-6xl text-[#2B1A0E]">36</span>
                <span className="font-sans font-bold text-xs tracking-[0.3em] text-[#5C4331] uppercase mt-2">Events</span>
              </motion.div>
            </div>

            {/* Orbit Stat Box 3: Days */}
            <div className="relative lg:absolute lg:bottom-[40px] lg:left-1/2 lg:-translate-x-1/2 w-full lg:w-[220px] z-20">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-6 lg:p-8 bg-[#F7F1D5] border-[2.5px] border-[#2B1A0E] rounded-3xl shadow-[4px_5px_0px_rgba(43,26,14,0.15)] flex flex-col items-center cursor-default"
              >
                <span className="font-display font-black text-5xl md:text-6xl text-[#2B1A0E]">2</span>
                <span className="font-sans font-bold text-xs tracking-[0.3em] text-[#5C4331] uppercase mt-2">Days</span>
              </motion.div>
            </div>

            {/* Orbit Stat Box 4: Talents */}
            <div className="relative lg:absolute lg:top-[40px] lg:left-1/2 lg:-translate-x-1/2 w-full lg:w-[220px] z-20">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-6 lg:p-8 bg-[#F7F1D5] border-[2.5px] border-[#2B1A0E] rounded-3xl shadow-[4px_5px_0px_rgba(43,26,14,0.15)] flex flex-col items-center cursor-default"
              >
                <span className="font-sans font-bold text-5xl md:text-6xl text-[#2B1A0E]">∞</span>
                <span className="font-sans font-bold text-xs tracking-[0.3em] text-[#5C4331] uppercase mt-2">Talents</span>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Narrative / About Text */}
        <div className="max-w-4xl mx-auto mb-28 text-center px-4 leading-relaxed font-sans font-medium text-sm md:text-base text-[#5C4331] space-y-6">
          <p className="text-lg font-bold text-[#2B1A0E]">Ever noticed how the best stories start with a bad decision?</p>
          <p>The wrong turn. The missed train. The message that begins with &ldquo;I've got an idea...&rdquo; at 2 a.m. Most people call them mistakes. Adventurers call them beginnings.</p>
          <p>Adventure isn't hidden at the summit of Everest. It isn't buried beneath ancient ruins. It isn't waiting at the end of a treasure map marked with a giant red X.</p>
          <p className="font-display font-black text-lg text-[#2B1A0E] tracking-wider uppercase">Adventure is choosing the unknown.</p>
          <p>It's taking the longer route home just to see where it leads. It's clicking &ldquo;Accept Quest&rdquo; before reading the difficulty level. It's every side quest that somehow becomes more memorable than the main storyline. It's every impulsive decision, every wrong turn, every &ldquo;trust me, bro&rdquo; that somehow evolves into a legendary tale.</p>
          <p className="font-display font-black text-[#65C466] tracking-widest uppercase">Adventure isn't found. It's created.</p>
          <p className="text-[#2B1A0E] font-bold">And this year, it's breaking free.</p>
          <p>Introducing the 41st Edition of Bosco Fest, where curiosity outruns caution, where comfort zones become archaeological artifacts, and where every ordinary moment has the potential to become an unforgettable story. No maps. No cheat codes. No save files. Just possibilities.</p>
          <p>Imagine the unpredictability of a Marvel post-credit scene, the thrill of discovering a hidden Minecraft biome nobody has ever seen before, the determination of Luffy chasing the impossible, the curiosity of Doraemon opening a gadget with absolutely zero instructions, the survival instincts of Bear Grylls, and the confidence of somebody walking into an exam with &ldquo;it is what it is&rdquo; energy.</p>
          <p className="text-[#A07722] font-semibold">If that sounds reckless, good. The greatest adventures usually are.</p>
          <p>Some adventures will test your mind. Others your instincts. A few might test your sanity. But every single one will leave a story worth telling. Waiting beyond the horizon lie 36 gateways into the extraordinary.</p>
          <p>So gather your crew. Charge your energy. Forget the rulebook. The compass is spinning. The horizon is calling. And somewhere beyond it lies the adventure you've been waiting for.</p>
          <p className="font-display font-black text-lg tracking-widest text-[#D9B24C] uppercase">36 Events. 2 Days. One Extraordinary Journey.</p>
          <p>Some will play it safe. Some will stay behind. And some will venture where nobody else dares to go.</p>
          <p className="text-lg font-bold text-[#2B1A0E]">Be one of them.</p>
          <p className="font-display font-black text-2xl tracking-widest text-[#6EC6FF] uppercase">Untold. Unfazed. Uncharted.</p>
          <p className="font-display font-black text-base tracking-widest text-[#2B1A0E] uppercase">This is us. Bosco Fest 2026.</p>
        </div>

        {/* ── Committee / Teams sections ── */}
        
        {/* Student Committee */}
        <div className="mb-20">
          <h2 className="font-display font-black text-2xl md:text-3xl text-center text-[#2B1A0E] uppercase tracking-wider mb-8">
            Core Committee - Students
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {studentCommittee.slice(0, 3).map((name, idx) => (
              <div 
                key={idx} 
                className="md:col-span-2 p-5 bg-[#F7F1D5] border-[2.5px] border-[#2B1A0E] rounded-3xl shadow-[3px_4px_0px_rgba(43,26,14,0.12)] hover:translate-y-[-3px] transition-transform duration-200 text-center flex items-center justify-center min-h-[70px]"
              >
                <ScrambleText text={name} />
              </div>
            ))}
            {studentCommittee.slice(3).map((name, idx) => (
              <div 
                key={idx} 
                className={`p-5 bg-[#F7F1D5] border-[2.5px] border-[#2B1A0E] rounded-3xl shadow-[3px_4px_0px_rgba(43,26,14,0.12)] hover:translate-y-[-3px] transition-transform duration-200 text-center flex items-center justify-center min-h-[70px] ${
                  idx === 0 ? "md:col-span-2 md:col-start-2" : "md:col-span-2"
                }`}
              >
                <ScrambleText text={name} />
              </div>
            ))}
          </div>
        </div>

        {/* Graphics Team */}
        <div className="mb-20">
          <h2 className="font-display font-black text-2xl md:text-3xl text-center text-[#2B1A0E] uppercase tracking-wider mb-8">
            Graphics Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {graphicsTeam.map((name, idx) => (
              <div 
                key={idx} 
                className="p-5 bg-[#F7F1D5] border-[2.5px] border-[#2B1A0E] rounded-3xl shadow-[3px_4px_0px_rgba(43,26,14,0.12)] hover:translate-y-[-3px] transition-transform duration-200 text-center flex items-center justify-center min-h-[70px]"
              >
                <ScrambleText text={name} />
              </div>
            ))}
          </div>
        </div>

        {/* Video Team */}
        <div className="mb-20">
          <h2 className="font-display font-black text-2xl md:text-3xl text-center text-[#2B1A0E] uppercase tracking-wider mb-8">
            Video Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {videoTeam.map((name, idx) => (
              <div 
                key={idx} 
                className="p-5 bg-[#F7F1D5] border-[2.5px] border-[#2B1A0E] rounded-3xl shadow-[3px_4px_0px_rgba(43,26,14,0.12)] hover:translate-y-[-3px] transition-transform duration-200 text-center flex items-center justify-center min-h-[70px]"
              >
                <ScrambleText text={name} />
              </div>
            ))}
          </div>
        </div>

        {/* Website Team */}
        <div className="mb-20">
          <h2 className="font-display font-black text-2xl md:text-3xl text-center text-[#2B1A0E] uppercase tracking-wider mb-8">
            Website Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {websiteTeam.map((name, idx) => (
              <div 
                key={idx} 
                className="p-5 bg-[#F7F1D5] border-[2.5px] border-[#2B1A0E] rounded-3xl shadow-[3px_4px_0px_rgba(43,26,14,0.12)] hover:translate-y-[-3px] transition-transform duration-200 text-center flex items-center justify-center min-h-[70px]"
              >
                <ScrambleText text={name} />
              </div>
            ))}
          </div>
        </div>

        {/* Teacher Committee */}
        <div className="mb-10">
          <h2 className="font-display font-black text-2xl md:text-3xl text-center text-[#2B1A0E] uppercase tracking-wider mb-8">
            Core Committee - Teachers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-8 gap-6 max-w-6xl mx-auto">
            {teacherCommittee.slice(0, 4).map((name, idx) => (
              <div 
                key={idx} 
                className="md:col-span-2 p-5 bg-[#F7F1D5] border-[2.5px] border-[#2B1A0E] rounded-3xl shadow-[3px_4px_0px_rgba(43,26,14,0.12)] hover:translate-y-[-3px] transition-transform duration-200 text-center flex items-center justify-center min-h-[70px]"
              >
                <ScrambleText text={name} />
              </div>
            ))}
            {teacherCommittee.slice(4).map((name, idx) => (
              <div 
                key={idx} 
                className={`p-5 bg-[#F7F1D5] border-[2.5px] border-[#2B1A0E] rounded-3xl shadow-[3px_4px_0px_rgba(43,26,14,0.12)] hover:translate-y-[-3px] transition-transform duration-200 text-center flex items-center justify-center min-h-[70px] ${
                  idx === 0 ? "md:col-span-2 md:col-start-2" : "md:col-span-2"
                }`}
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
