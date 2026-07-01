import type { Metadata } from "next";
import { Bebas_Neue, Cinzel, Caveat, Outfit } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Preloader from "@/components/Preloader";
import Script from "next/script";
import HtmlUrlSync from "@/components/HtmlUrlSync";

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
      <head />
      <body className="text-[#2B1A0E] font-sans min-h-screen">
        <HtmlUrlSync />
        <Preloader />
        <LenisProvider>
          {children}
        </LenisProvider>
        <Script id="disable-inspect" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
              // Disable right-click context menu
              document.addEventListener('contextmenu', (e) => e.preventDefault());

              // Disable standard DevTools keyboard shortcuts
              document.addEventListener('keydown', (e) => {
                // F12
                if (e.keyCode === 123 || e.key === 'F12') {
                  e.preventDefault();
                  return false;
                }
                // Ctrl+Shift+I / Cmd+Opt+I (DevTools)
                if ((e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey) && (e.keyCode === 73 || e.key === 'i' || e.key === 'I')) {
                  e.preventDefault();
                  return false;
                }
                // Ctrl+Shift+J / Cmd+Opt+J (Console)
                if ((e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey) && (e.keyCode === 74 || e.key === 'j' || e.key === 'J')) {
                  e.preventDefault();
                  return false;
                }
                // Ctrl+Shift+C / Cmd+Opt+C (Element selector)
                if ((e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey) && (e.keyCode === 67 || e.key === 'c' || e.key === 'C')) {
                  e.preventDefault();
                  return false;
                }
                // Ctrl+U / Cmd+U (View Source)
                if ((e.ctrlKey || e.metaKey) && (e.keyCode === 85 || e.key === 'u' || e.key === 'U')) {
                  e.preventDefault();
                  return false;
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
