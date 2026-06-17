"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock scrolling on initial load
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setLoading(false);
      // Restore scrolling
      document.body.style.overflow = "";
    }, 2200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  const taglineWords = ["UNTOLD.", "UNFAZED.", "UNCHARTED."];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F7F1D5] bg-[url('/preloader-bg.png')] bg-cover"
        >
          {/* Central Compass Animation */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center"
          >
            {/* Spinning Compass Ring */}
            <svg className="w-full h-full text-[#2B1A0E] animate-compass-spin" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <circle cx="50" cy="50" r="45" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="38" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="1.5" fill="currentColor" />
              <path d="M 50,12 L 53,42 L 50,45 L 47,42 Z" fill="currentColor" />
              <path d="M 50,88 L 53,58 L 50,55 L 47,58 Z" fill="currentColor" />
              <path d="M 88,50 L 58,53 L 55,50 L 58,47 Z" fill="currentColor" />
              <path d="M 12,50 L 42,53 L 45,50 L 42,47 Z" fill="currentColor" />
              <path d="M 23,23 L 45,45 L 43,47 Z" fill="currentColor" opacity="0.6" />
              <path d="M 77,77 L 55,55 L 57,53 Z" fill="currentColor" opacity="0.6" />
              <path d="M 77,23 L 55,45 L 57,47 Z" fill="currentColor" opacity="0.6" />
              <path d="M 23,77 L 45,55 L 43,53 Z" fill="currentColor" opacity="0.6" />
            </svg>
            
            {/* Compass Pointer Needle (Swings into position) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ rotate: -45 }}
                animate={{ rotate: 135 }}
                transition={{ duration: 1.2, ease: "backOut", delay: 0.2 }}
                className="w-full h-full"
              >
                <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100">
                  <path d="M 50,16 L 53,50 L 50,48 Z" fill="#E53E3E" />
                  <path d="M 50,16 L 47,50 L 50,48 Z" fill="#C53030" />
                  <path d="M 50,84 L 53,50 L 50,52 Z" fill="#6EC6FF" />
                  <path d="M 50,84 L 47,50 L 50,52 Z" fill="#4299E1" />
                  <circle cx="50" cy="50" r="3.5" fill="#D9B24C" stroke="#2B1A0E" strokeWidth="0.75" />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Staggered Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 px-6 text-center select-none">
            {taglineWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + index * 0.3,
                  ease: "easeOut",
                }}
                className="font-display font-bold text-sm md:text-base tracking-[0.3em] text-[#2B1A0E] uppercase"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Preloader Loading Bar Outline */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "140px" }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.1 }}
            className="h-[1.5px] bg-[#2B1A0E]/15 mt-6 rounded-full overflow-hidden relative"
          >
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#D9B24C] to-transparent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
