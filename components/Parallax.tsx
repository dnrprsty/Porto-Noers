"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "./useIsMobile";

/**
 * Wraps children and translates them on the Y axis as the element scrolls
 * through the viewport, creating a 2.5D depth effect (PRD 6.2).
 *
 * Optimisation guarantees:
 *  - only animates `transform` (translateY) + `opacity` — no layout thrashing
 *  - disabled entirely on mobile / reduced-motion (renders a plain div)
 *
 * `speed` controls depth: negative moves opposite to scroll (background),
 * positive moves with scroll (foreground). Range roughly -1..1.
 */
export default function Parallax({
  children,
  speed = -0.3,
  fade = false,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  fade?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map scroll progress (0..1) to a pixel offset.
  const distance = 160 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    fade ? [0.2, 1, 1, 0.2] : [1, 1, 1, 1]
  );

  if (isMobile) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
