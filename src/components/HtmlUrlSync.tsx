"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function HtmlUrlSync() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && pathname !== "/" && !pathname.endsWith(".html")) {
      const targetUrl = `${pathname}.html`;
      if (typeof window !== "undefined" && window.location.pathname !== targetUrl) {
        window.history.replaceState(
          null,
          "",
          targetUrl + window.location.search + window.location.hash
        );
      }
    }
  }, [pathname]);

  return null;
}
