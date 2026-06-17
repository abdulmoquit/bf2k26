"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SCHOOLS = [
  { name: "Assembly of God Church School", logo: "agcs.png" },
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
  { name: "St. Lawrence High School", logo: "slhs.png" },
  { name: "St. Pauls Boarding & Day School", logo: "spbds.webp" },
  { name: "The Newton School", logo: "nts2.png" },
  { name: "Queen Of The Mission School Park Circus", logo: "qms.png" },
  { name: "Queen Of The Mission School Salt Lake", logo: "qms.png" },
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
  };

  return (
    <div className="min-h-screen bg-rest-texture relative flex flex-col pb-0">
      
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-32 pb-20 relative z-20">
        
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <span className="font-sans font-bold text-[10px] tracking-[0.3em] text-forest-green uppercase block mb-2">
            Expedition Alliance
          </span>
          <h1 className="font-bebas font-black text-4xl md:text-5xl lg:text-6xl text-ink-dark uppercase tracking-wide">
            Participating Schools
          </h1>
          <div className="w-16 h-[2px] bg-gold-accent mx-auto mt-4" />
          <p className="font-caveat text-xl text-ink-light mt-3 max-w-sm mx-auto">
            Uniting minds. Igniting spirit. Together we embark on an unforgettable journey.
          </p>
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
              whileHover={{ 
                scale: 1.05, 
                translateY: -3,
              }}
              className="parchment-card flex flex-col items-center justify-between p-5.5 h-60 cursor-default shadow-[3px_3px_0px_rgba(43,26,14,1)] hover:shadow-[5px_5px_0px_rgba(43,26,14,1)]"
            >
              {/* Logo Wrapper */}
              <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0 bg-transparent">
                <Image
                  src={`/school-logos/${school.logo}`}
                  alt={`${school.name} logo`}
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>

              {/* School Name */}
              <p className="font-bebas text-center text-[11px] text-ink-dark tracking-wide uppercase leading-snug mt-3.5 min-h-[36px] flex items-center justify-center">
                {school.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}
