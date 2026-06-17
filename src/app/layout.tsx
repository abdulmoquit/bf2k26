import type { Metadata } from "next";
import { Bebas_Neue, Cinzel, Caveat, Outfit } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Preloader from "@/components/Preloader";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const caveat = Caveat({
  variable: "--font-caveat",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${cinzel.variable} ${caveat.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="text-[#2B1A0E] font-sans min-h-screen">
        <Preloader />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
