"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const SCHOOLS = [
  { name: "Assembly Of God Church School Tollygunge", logo: "agcs.png" },
  { name: "Ballygunge Shiksha Sadan", logo: "bss.png" },
  { name: "Don Bosco Bandel", logo: "dbb.png" },
  { name: "Don Bosco Liluah", logo: "dbl.png" },
  { name: "Don Bosco School Krishnanagar", logo: "dbk.png" },
  { name: "Garden High School", logo: "ghs.png" },
  { name: "Loreto Day School", logo: "lh.png" },
  { name: "Loreto House", logo: "lh.png" },
  { name: "Mahadevi Birla World Academy", logo: "mbwa.png" },
  { name: "Modern High School", logo: "mhs.png" },
  { name: "Modern High School International", logo: "mhs.png" },
  { name: "National Gems H.S. School", logo: "nghs.png" },
  { name: "Pratt Memorial School Calcutta", logo: "pms.png" },
  { name: "Shri Shikshayatan School", logo: "ssy.png" },
  { name: "St. James' School", logo: "sjs.png" },
  { name: "St. Paul's Boarding and Day School", logo: "spbds.webp" },
  { name: "Our Lady Queen Of The Missions School Salt Lake", logo: "qms.png" },
  { name: "The Newtown School", logo: "nts2.png" },
  { name: "Our Lady Queen Of The Missions School Park Circus", logo: "qms.png" },
  { name: "Don Bosco School Park Circus", logo: "dbpc.png" },
];

export default function Schools() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } },
    hover: {
      scale: 1.05,
      y: -3,
      transition: { type: "spring" as const, stiffness: 300, damping: 20 }
    }
  };

  const stampVariants = {
    hover: { 
      rotate: [0, -3.5, 3, -1.5, 1, 0],
      transition: { duration: 0.5, ease: "easeInOut" as const }
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col pb-0">
      {/* Fixed Background Texture to prevent mobile stretching and layout glitches */}
      <div className="fixed inset-0 bg-rest-texture z-0 pointer-events-none" />
      
      <Navbar />

      {/* Global SVG Stamp Defs */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="stamp-distort">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <path id="stamp-text-path" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
        </defs>
      </svg>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-32 pb-20 relative z-20">
        
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <h1 className="font-bebas font-black text-4xl md:text-5xl lg:text-6xl text-[#F4ECC8] uppercase tracking-wide">
            Participating Schools
          </h1>
          <div className="w-16 h-[2px] bg-gold-accent mx-auto mt-4" />
        </div>

        {/* Schools Grid (5 columns matching mockup) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5.5 w-full"
        >
          {SCHOOLS.map((school, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              style={{ willChange: "transform, opacity" }}
              className="parchment-card flex flex-col items-center justify-center p-4 h-60 cursor-default shadow-[3px_3px_0px_rgba(43,26,14,1)] hover:shadow-[5px_5px_0px_rgba(43,26,14,1)] gap-1.5 w-full"
            >
              {/* Stamp-like Circular Logo Container */}
              <motion.div 
                variants={stampVariants} 
                style={{ willChange: "transform" }}
                className="relative w-28 h-28 flex items-center justify-center flex-shrink-0 select-none"
              >
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none text-ink-dark/75 fill-none stroke-current">
                  <g filter="url(#stamp-distort)">
                    {/* Outer wavy/dashed circle */}
                    <circle cx="50" cy="50" r="46" strokeWidth="2" strokeDasharray="3.5 2" className="opacity-90" />
                    {/* Middle solid circle */}
                    <circle cx="50" cy="50" r="42" strokeWidth="0.8" className="opacity-75" />
                    {/* Inner solid circle */}
                    <circle cx="50" cy="50" r="31" strokeWidth="1.2" className="opacity-90" />
                    {/* Text around the logo */}
                    <text className="fill-ink-dark font-bebas text-[7px] tracking-[0.14em] opacity-80">
                      <textPath href="#stamp-text-path" textLength="220" startOffset="0%">
                        • BOSCO FEST 2026 • EXPEDITION ALLIANCE •
                      </textPath>
                    </text>
                  </g>
                </svg>

                {/* Logo Image with blend styling */}
                <div className="relative w-14 h-14 flex items-center justify-center z-10 transition-transform duration-300 hover:scale-110">
                  <Image
                    src={`/school-logos/${school.logo}`}
                    alt={`${school.name} logo`}
                    fill
                    sizes="56px"
                    className="object-contain mix-blend-multiply opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </motion.div>

              {/* School Name */}
              <p className="font-bebas text-center text-[15.5px] font-black text-ink-dark tracking-wide uppercase leading-tight min-h-[38px] flex items-center justify-center px-1">
                {school.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </main>
    </div>
  );
}
