"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the viewport is below `breakpoint` (default 768px).
 * Used to disable parallax on mobile to protect frame rate (PRD 6.2).
 * Also treats users with prefers-reduced-motion as "mobile" (no parallax).
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(true); // safe default: no parallax until measured

  useEffect(() => {
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqWidth = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const update = () => setIsMobile(mqWidth.matches || mqReduced.matches);
    update();

    mqWidth.addEventListener("change", update);
    mqReduced.addEventListener("change", update);
    return () => {
      mqWidth.removeEventListener("change", update);
      mqReduced.removeEventListener("change", update);
    };
  }, [breakpoint]);

  return isMobile;
}
