"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HtmlUrlSync() {
  const pathname = usePathname();
  const router = useRouter();

  // Intercept all link clicks to *.html to perform client-side transitions
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor) {
        // Skip if modifier keys are pressed or middle-clicked
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) {
          return;
        }

        // Check if same origin
        if (anchor.origin !== window.location.origin) {
          return;
        }

        const path = anchor.pathname;
        if (path && path.startsWith("/") && path.endsWith(".html")) {
          e.preventDefault();
          const cleanPath = path.replace(/\.html$/, "");
          const search = anchor.search || "";
          const hash = anchor.hash || "";
          router.push(cleanPath + search + hash);
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [router]);

  return null;
}
