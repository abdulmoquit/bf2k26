import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

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
  description:
    "Official website of Boscofest 2026 — Kolkata's premier youth cultural & technical festival of Don Bosco School. Untold. Unfazed. Uncharted. Step beyond the horizon.",
  keywords: ["Boscofest", "Boscofest 2026", "Don Bosco School", "Youth Fest", "Cultural Fest", "Technical Fest", "Uncharted", "Unfazed", "Untold"],
  openGraph: {
    title: "BOSCOFEST 2026 | Untold. Unfazed. Uncharted.",
    description: "Kolkata's premier youth cultural and technical festival. Step beyond the horizon at Boscofest 2026.",
    url: "https://boscofest.in",
    siteName: "Boscofest 2026",
    images: [
      {
        url: "/logo2026.png",
        width: 1080,
        height: 1080,
        alt: "Boscofest 2026 Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BOSCOFEST 2026 | Untold. Unfazed. Uncharted.",
    description: "Official site for Don Bosco's Boscofest 2026. Explore the uncharted.",
    images: ["/logo2026.png"],
  },
};

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
      <body className="bg-dark-bg text-white font-sans selection:bg-ruby/30 selection:text-white min-h-screen overflow-x-hidden">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
