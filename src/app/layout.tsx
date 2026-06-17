import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Preloader from "@/components/Preloader";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BOSCOFEST 2026 | Untold. Unfazed. Uncharted.",
  description: "Official website of Boscofest 2026 — Embark on an unforgettable journey through competitions, culture, creativity and adventure.",
};

function LeftPaperBorder() {
  return (
    <div 
      style={{ transform: "translateZ(0)", willChange: "transform" }}
      className="fixed top-0 bottom-0 left-0 w-3.5 md:w-7 pointer-events-none z-50 select-none"
    >
      <svg className="h-full w-full text-[#E8D7A5]" fill="currentColor" viewBox="0 0 100 1000" preserveAspectRatio="none">
        {/* Shadow */}
        <path 
          d="M 0,0 L 85,0 Q 60,50 80,100 Q 55,150 75,200 Q 50,250 70,300 Q 45,350 65,400 Q 40,450 60,500 Q 35,550 55,600 Q 30,650 50,700 Q 25,750 45,800 Q 20,850 40,900 Q 15,950 35,1000 L 0,1000 Z" 
          fill="#2B1A0E" 
          opacity="0.15"
          transform="translate(4, 0)"
        />
        {/* Main paper */}
        <path 
          d="M 0,0 L 80,0 Q 55,50 75,100 Q 50,150 70,200 Q 45,250 65,300 Q 40,350 60,400 Q 35,450 55,500 Q 30,550 50,600 Q 25,650 45,700 Q 20,750 40,800 Q 15,850 35,900 Q 10,950 30,1000 L 0,1000 Z" 
          fill="#E8D7A5"
        />
        {/* Fold curls */}
        <path 
          d="M 0,120 Q 40,150 60,200 Q 35,220 0,270 Z M 0,520 Q 30,550 50,600 Q 25,620 0,670 Z" 
          fill="#F7F1D5"
          opacity="0.4"
        />
        {/* Ink outline */}
        <path 
          d="M 80,0 Q 55,50 75,100 Q 50,150 70,200 Q 45,250 65,300 Q 40,350 60,400 Q 35,450 55,500 Q 30,550 50,600 Q 25,650 45,700 Q 20,750 40,800 Q 15,850 35,900 Q 10,950 30,1000" 
          fill="none" 
          stroke="#2B1A0E" 
          strokeWidth="3.5"
        />
      </svg>
    </div>
  );
}

function RightPaperBorder() {
  return (
    <div 
      style={{ transform: "translateZ(0)", willChange: "transform" }}
      className="fixed top-0 bottom-0 right-0 w-3.5 md:w-7 pointer-events-none z-50 select-none"
    >
      <svg className="h-full w-full text-[#E8D7A5]" fill="currentColor" viewBox="0 0 100 1000" preserveAspectRatio="none">
        {/* Shadow */}
        <path 
          d="M 100,0 L 15,0 Q 40,50 20,100 Q 45,150 25,200 Q 50,250 30,300 Q 55,350 35,400 Q 60,450 40,500 Q 65,550 45,600 Q 70,650 50,700 Q 75,750 55,800 Q 80,850 60,900 Q 85,950 65,1000 L 100,1000 Z" 
          fill="#2B1A0E" 
          opacity="0.15"
          transform="translate(-4, 0)"
        />
        {/* Main paper */}
        <path 
          d="M 100,0 L 20,0 Q 45,50 25,100 Q 50,150 30,200 Q 55,250 35,300 Q 60,350 40,400 Q 65,450 45,500 Q 70,550 50,600 Q 75,650 55,700 Q 80,750 60,800 Q 85,850 65,900 Q 90,950 70,1000 L 100,1000 Z" 
          fill="#E8D7A5"
        />
        {/* Fold curls */}
        <path 
          d="M 100,220 Q 60,250 40,300 Q 65,320 100,370 Z M 100,620 Q 70,650 50,700 Q 75,720 100,770 Z" 
          fill="#F7F1D5"
          opacity="0.4"
        />
        {/* Ink outline */}
        <path 
          d="M 20,0 Q 45,50 25,100 Q 50,150 30,200 Q 55,250 35,300 Q 60,350 40,400 Q 65,450 45,500 Q 70,550 50,600 Q 75,650 55,700 Q 80,750 60,800 Q 85,850 65,900 Q 90,950 70,1000" 
          fill="none" 
          stroke="#2B1A0E" 
          strokeWidth="3.5"
        />
      </svg>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="text-[#2B1A0E] font-sans min-h-screen">
        <Preloader />
        <LeftPaperBorder />
        <RightPaperBorder />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
