"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeRemaining { days: string; hours: string; minutes: string; seconds: string; }
interface Particle { width: number; height: number; top: string; left: string; duration: number; delay: number; color: string; }

// Sky-blue / green / gold particles for the timer
const PARTICLE_COLOURS = ["41, 171, 226", "34, 197, 94", "212, 168, 67"];

export default function CountdownTimer({ size = "default" }: { size?: "default" | "small" }) {
  const [mounted, setMounted]   = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [time, setTime]          = useState<TimeRemaining>({ days: "00", hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    // BoscoFest 2026 target date
    const target = new Date("2026-08-15T09:00:00").getTime();

    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setTime({ days: "00", hours: "00", minutes: "00", seconds: "00" }); return; }
      setTime({
        days:    Math.floor(diff / 86_400_000).toString().padStart(2, "0"),
        hours:   Math.floor((diff % 86_400_000) / 3_600_000).toString().padStart(2, "0"),
        minutes: Math.floor((diff % 3_600_000) / 60_000).toString().padStart(2, "0"),
        seconds: Math.floor((diff % 60_000) / 1000).toString().padStart(2, "0"),
      });
    };

    tick();
    const id = setInterval(tick, 1000);

    const frame = requestAnimationFrame(() => {
      if (typeof window !== "undefined" && window.innerWidth >= 768) {
        setParticles(
          Array.from({ length: 8 }, (_, i) => ({
            width:    Math.random() * 4 + 2,
            height:   Math.random() * 4 + 2,
            top:      `${Math.random() * 100}%`,
            left:     `${Math.random() * 100}%`,
            duration: 5 + Math.random() * 5,
            delay:    Math.random() * 2,
            color:    PARTICLE_COLOURS[i % PARTICLE_COLOURS.length],
          }))
        );
      }
      setMounted(true);
    });

    return () => { clearInterval(id); cancelAnimationFrame(frame); };
  }, []);

  if (!mounted) return null;

  const items = [
    { value: time.days,    label: "Days" },
    { value: time.hours,   label: "Hours" },
    { value: time.minutes, label: "Min" },
    { value: time.seconds, label: "Sec" },
  ];

  /* ── Compact / hero-embedded variant ── */
  if (size === "small") {
    return (
      <div className="relative w-full max-w-sm mx-auto px-4 py-2">
        <div className="absolute inset-0 blur-lg pointer-events-none"
          style={{ background: "radial-gradient(circle at center, rgba(41,171,226,0.06) 0%, transparent 60%)" }} />
        <div className="relative z-10 text-center">
          <span className="text-[11px] font-display font-extrabold tracking-[0.2em] block mb-3 animate-[pulse-sky_3s_ease-in-out_infinite]"
            style={{ color: "#29ABE2" }}>
            COUNTDOWN TO DEPARTURE
          </span>
          <div className="flex items-center justify-center gap-2 md:gap-3">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center">
                <div
                  className="relative p-2.5 rounded-xl flex flex-col items-center justify-center min-w-[55px] md:min-w-[65px] transition-all duration-300"
                  style={{
                    background: "rgba(2,11,26,0.75)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(41,171,226,0.2)",
                  }}
                >
                  <motion.span
                    key={item.value}
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="font-display text-lg md:text-xl font-bold tabular-nums text-white"
                    style={{ textShadow: "0 0 8px rgba(41,171,226,0.35)" }}
                  >
                    {item.value}
                  </motion.span>
                  <span className="text-gray-300 text-[10px] font-bold uppercase tracking-wider mt-0.5">{item.label}</span>
                </div>
                {idx < 3 && (
                  <span className="font-bold text-lg md:text-xl ml-2 animate-pulse" style={{ color: "#22C55E" }}>:</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Full-size variant ── */
  return (
    <div className="relative w-full max-w-4xl mx-auto px-6 py-12">
      {/* Floating particles - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 hidden md:block">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.width, height: p.height,
              top: p.top, left: p.left,
              backgroundColor: `rgb(${p.color})`,
              boxShadow: `0 0 ${p.width * 3}px rgba(${p.color}, 0.6)`,
            }}
            animate={{ y: [0, -32, 0], opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <h3 className="font-display text-sm font-bold uppercase tracking-[0.25em] mb-8"
          style={{ color: "#29ABE2", animation: "pulse-sky 3s ease-in-out infinite" }}>
          COUNTDOWN TO BOSCOFEST 2026
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="relative group flex flex-col items-center justify-center p-6 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 cursor-default"
              style={{
                background: "rgba(2,11,26,0.8)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(41,171,226,0.15)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  idx % 2 === 0
                    ? "0 0 30px rgba(41,171,226,0.14), inset 0 0 20px rgba(41,171,226,0.05)"
                    : "0 0 30px rgba(34,197,94,0.12), inset 0 0 20px rgba(34,197,94,0.04)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  idx % 2 === 0 ? "rgba(41,171,226,0.45)" : "rgba(34,197,94,0.4)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(41,171,226,0.15)";
              }}
            >
              {/* Pulsing corner dot */}
              <div
                className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full animate-ping"
                style={{ backgroundColor: idx % 2 === 0 ? "#29ABE2" : "#22C55E" }}
              />

              <motion.span
                key={item.value}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white tabular-nums"
                style={{ textShadow: idx % 2 === 0 ? "0 0 14px rgba(41,171,226,0.35)" : "0 0 14px rgba(34,197,94,0.3)" }}
              >
                {item.value}
              </motion.span>
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest mt-3">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
