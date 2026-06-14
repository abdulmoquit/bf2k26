"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface LightingRigProps {
  scrollYProgress: MotionValue<number>;
}

export default function LightingRig({ scrollYProgress }: LightingRigProps) {
  // Sky blue canopy beams — sweeps slowly
  const b1X = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.65, 0.85, 1], ["-15%", "-35%", "35%", "-25%", "15%", "0%"]);
  const b1Y = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.65, 0.85, 1], ["-20%", "15%", "-15%", "25%", "5%", "15%"]);
  const b1Scale   = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1, 1.25, 0.85, 1.1]);
  const b1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.22, 0.38, 0.28, 0.44, 0.32]);

  // Deep jungle green counter-glow
  const b2X = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.65, 0.85, 1], ["18%", "38%", "-38%", "28%", "-18%", "0%"]);
  const b2Y = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.65, 0.85, 1], ["12%", "-12%", "28%", "-12%", "18%", "0%"]);
  const b2Scale   = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.85, 1.15, 1.3, 0.95]);
  const b2Opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.14, 0.28, 0.2, 0.35, 0.25]);

  // Vertical light-shaft ray (like sunbeam through canopy)
  const shaftX       = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], ["30%", "55%", "25%", "45%"]);
  const shaftOpacity = useTransform(scrollYProgress, [0, 0.1, 0.4, 0.7, 1], [0, 0.08, 0.14, 0.07, 0.1]);

  // Horizontal firefly-glow sweep (sky blue / green)
  const laserY       = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], ["15%", "80%", "20%", "70%", "30%", "85%"]);
  const laserOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.65, 0.9, 1], [0.04, 0.18, 0.08, 0.2, 0.1, 0.05]);

  // Vignette parallax
  const vigOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 0.78, 0.9]);

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden pointer-events-none"
      style={{ background: "linear-gradient(180deg, #020A02 0%, #050F05 18%, #081808 45%, #050F05 75%, #020A02 100%)" }}>

      {/* Canopy light shafts — descending sky-blue beams */}
      <div className="absolute top-0 left-0 right-0 h-[65%] pointer-events-none overflow-hidden">
        {[18, 36, 52, 70, 84].map((pct, i) => (
          <motion.div key={i}
            className="absolute top-0 bottom-0"
            style={{
              left: `${pct}%`,
              width: `${3 + (i % 3) * 2}px`,
              background: `linear-gradient(180deg,
                rgba(41,171,226,${0.06 + i * 0.01}) 0%,
                rgba(41,171,226,0.03) 40%,
                transparent 80%
              )`,
              filter: "blur(8px)",
              opacity: shaftOpacity,
              transform: `rotate(${-4 + i * 2}deg)`,
              transformOrigin: "top center",
              animation: `light-shaft ${5 + i * 0.8}s ease-in-out ${i * 0.6}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Beam 1 — Sky Blue (torch / canopy sunlight) */}
      <motion.div
        className="absolute left-1/4 top-1/4 rounded-full mix-blend-screen"
        style={{
          width: "65vw", height: "65vw",
          background: "radial-gradient(circle, rgba(41,171,226,0.18) 0%, rgba(41,171,226,0.05) 35%, transparent 68%)",
          filter: "blur(80px)",
          x: b1X, y: b1Y, scale: b1Scale, opacity: b1Opacity,
        }}
      />

      {/* Beam 2 — Deep jungle green */}
      <motion.div
        className="absolute right-1/4 bottom-1/4 rounded-full mix-blend-screen"
        style={{
          width: "55vw", height: "55vw",
          background: "radial-gradient(circle, rgba(34,102,34,0.18) 0%, rgba(34,102,34,0.05) 38%, transparent 68%)",
          filter: "blur(75px)",
          x: b2X, y: b2Y, scale: b2Scale, opacity: b2Opacity,
        }}
      />

      {/* Ground mist — soft green at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%]"
        style={{ background: "linear-gradient(to top, rgba(20,80,20,0.12) 0%, transparent 100%)", pointerEvents: "none" }} />

      {/* Firefly horizontal sweep */}
      <motion.div
        className="absolute left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(41,171,226,0.28), rgba(106,172,26,0.18), transparent)",
          boxShadow: "0 0 12px rgba(41,171,226,0.15)",
          top: laserY,
          opacity: laserOpacity,
        }}
      />

      {/* Deep jungle vignette — darkens edges like dense foliage */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 85% 70% at 50% 45%, transparent 20%, rgba(2,8,2,0.88) 95%)",
          opacity: vigOpacity,
        }}
      />
    </div>
  );
}
