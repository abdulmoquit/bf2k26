"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface PreloaderContextType {
  isLoaded: boolean;
}

const PreloaderContext = createContext<PreloaderContextType>({ isLoaded: false });

export function usePreloaderDone() {
  return useContext(PreloaderContext).isLoaded;
}

// Total preloader duration = 2200ms visible + 500ms fade exit = 2700ms
const PRELOADER_TOTAL_MS = 2700;

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Already seen this session (page navigation) - skip wait immediately
    const alreadySeen = sessionStorage.getItem('bf_preloader_done');
    if (alreadySeen) {
      setIsLoaded(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoaded(true);
      sessionStorage.setItem('bf_preloader_done', '1');
    }, PRELOADER_TOTAL_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PreloaderContext.Provider value={{ isLoaded }}>
      {children}
    </PreloaderContext.Provider>
  );
}
