"use client";

import { useEffect, useRef } from "react";

// Firefly + leaf particles — Jungle Book feel
const FIREFLY_COLOUR = "245, 200, 26";    // warm gold
const LEAF_COLOUR    = "106, 172, 26";    // bright leaf
const MIST_COLOUR    = "110, 179, 204";   // sky mist

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 28 : 55;

    const mouse = { x: null as number | null, y: null as number | null, r: 100 };

    class Particle {
      x: number; y: number;
      size: number;
      speedX: number; speedY: number;
      type: "firefly" | "leaf" | "mist";
      color: string;
      alpha: number; alphaDir: number;
      phase: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        const r = Math.random();
        if (r < 0.55) {
          this.type = "firefly";
          this.color = FIREFLY_COLOUR;
          this.size  = Math.random() * 1.8 + 0.6;
          this.alpha = 0;
        } else if (r < 0.82) {
          this.type = "leaf";
          this.color = LEAF_COLOUR;
          this.size  = Math.random() * 2.5 + 1.2;
          this.alpha = Math.random() * 0.35 + 0.1;
        } else {
          this.type = "mist";
          this.color = MIST_COLOUR;
          this.size  = Math.random() * 3.5 + 1.5;
          this.alpha = Math.random() * 0.1 + 0.03;
        }
        this.speedX    = (Math.random() - 0.5) * (this.type === "leaf" ? 0.35 : 0.18);
        this.speedY    = this.type === "firefly" ? -Math.random() * 0.45 : (Math.random() - 0.5) * 0.15;
        this.alphaDir  = Math.random() * 0.006 + 0.003;
        this.phase     = Math.random() * Math.PI * 2;
      }

      update(w: number, h: number, t: number) {
        this.phase += 0.018;
        if (this.type === "firefly") {
          // Fireflies drift up and flicker
          this.x += this.speedX + Math.sin(this.phase * 0.7) * 0.22;
          this.y += this.speedY;
          this.alpha += this.alphaDir;
          if (this.alpha > 0.9 || this.alpha < 0) {
            this.alphaDir = -this.alphaDir;
            if (this.alpha < 0) this.alpha = 0;
          }
          if (this.y < -10) this.y = h + 5;
        } else if (this.type === "leaf") {
          // Leaves drift sideways and down slowly
          this.x += this.speedX + Math.sin(this.phase * 0.5) * 0.15;
          this.y += Math.abs(this.speedY) * 0.4 + 0.08;
          this.alpha += this.alphaDir * 0.4;
          if (this.alpha > 0.5 || this.alpha < 0.05) this.alphaDir = -this.alphaDir;
          if (this.y > h + 10) { this.y = -10; this.x = Math.random() * w; }
        } else {
          // Mist drifts slowly
          this.x += this.speedX * 0.5;
          this.y += this.speedY * 0.3;
          this.alpha += this.alphaDir * 0.25;
          if (this.alpha > 0.15 || this.alpha < 0.01) this.alphaDir = -this.alphaDir;
        }

        // Wrap x
        if (this.x < -5) this.x = w + 5;
        if (this.x > w + 5) this.x = -5;

        // Mouse repel
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x, dy = this.y - mouse.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < mouse.r) {
            const f = (mouse.r - d) / mouse.r;
            this.x += (dx / d) * f * 1.5;
            this.y += (dy / d) * f * 1.5;
          }
        }
      }

      draw(c: CanvasRenderingContext2D) {
        if (this.type === "firefly") {
          // Glow halo
          const grad = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
          grad.addColorStop(0, `rgba(${this.color}, ${this.alpha})`);
          grad.addColorStop(1, `rgba(${this.color}, 0)`);
          c.beginPath();
          c.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
          c.fillStyle = grad;
          c.fill();
          // Bright core
          c.beginPath();
          c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          c.fillStyle = `rgba(255, 240, 180, ${Math.min(1, this.alpha * 1.4)})`;
          c.fill();
        } else {
          c.beginPath();
          c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          c.fillStyle = `rgba(${this.color}, ${this.alpha})`;
          c.fill();
        }
      }
    }

    let particles: Particle[] = [];
    let t = 0;

    const init = () => {
      const w = (canvas.width  = window.innerWidth);
      const h = (canvas.height = window.innerHeight);
      particles = Array.from({ length: COUNT }, () => new Particle(w, h));
    };

    const animate = () => {
      const w = canvas.width, h = canvas.height;
      t++;
      ctx.clearRect(0, 0, w, h);

      // Draw subtle firefly connections
      const fireflies = particles.filter(p => p.type === "firefly" && p.alpha > 0.3);
      for (let i = 0; i < fireflies.length; i++) {
        for (let j = i + 1; j < fireflies.length; j++) {
          const dx = fireflies[i].x - fireflies[j].x;
          const dy = fireflies[i].y - fireflies[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(fireflies[i].x, fireflies[i].y);
            ctx.lineTo(fireflies[j].x, fireflies[j].y);
            ctx.strokeStyle = `rgba(245, 200, 26, ${((90 - d) / 90) * 0.04})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => { p.update(w, h, t); p.draw(ctx); });
      animId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const onMove  = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener("resize",   init);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize",    init);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 h-full w-full"
      style={{ opacity: 0.7 }}
    />
  );
}
