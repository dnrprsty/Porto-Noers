"use client";

import { useEffect, useRef, useState } from "react";
import type { PersonaMode } from "@/lib/types";

/**
 * Interactive mascot (PRD 5.1).
 * Two MP4 videos per character:
 *   - idle:     loops by default
 *   - interact: played once when the mascot is clicked, then it returns to
 *               idle after 8 seconds. Never navigates / changes page.
 *
 * Characters change based on mode:
 *   - default: noer_idle.mp4 / noer.mp4
 *   - programmer: it_idle.mp4 / it_inter.mp4
 *   - artist: artist_idle.mp4 / artist_inter.mp4
 */
const CHARACTERS = {
  default: {
    idle: "/mascot/noer_idle.mp4",
    interact: "/mascot/noer.mp4",
    label: "NOERS",
  },
  programmer: {
    idle: "/mascot/it_idle.mp4",
    interact: "/mascot/it_inter.mp4",
    label: "IT MODE",
  },
  artist: {
    idle: "/mascot/artist_idle.mp4",
    interact: "/mascot/artist_inter.mp4",
    label: "ARTIST MODE",
  },
};

const INTERACT_DURATION_MS = 8000; // 8 seconds

export default function Mascot({ mode }: { mode?: PersonaMode | null }) {
  const [active, setActive] = useState(false); // false = idle, true = interact
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Get current character based on mode
  const character = mode ? CHARACTERS[mode] : CHARACTERS.default;
  const currentSrc = active ? character.interact : character.idle;

  const handleClick = () => {
    setActive(true);
    
    // Return to idle after 8 seconds
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setActive(false);
    }, INTERACT_DURATION_MS);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // Restart video when switching between idle/interact or when mode changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();
    video.play().catch(() => {
      // Autoplay might be blocked, that's okay
    });
  }, [active, currentSrc]);

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={handleClick}
        aria-label="Interact with the NOERS mascot"
        className="pixel-card group relative w-full max-w-[280px] overflow-hidden bg-transparent p-0"
        style={{ aspectRatio: "9/16" }}
      >
        <div className="absolute inset-0">
          {!broken[currentSrc] ? (
            <video
              ref={videoRef}
              src={currentSrc}
              autoPlay
              muted
              playsInline
              loop={!active} // loop idle, play once for interact
              className="h-full w-full object-contain [image-rendering:pixelated]"
              onError={() =>
                setBroken((b) => ({ ...b, [currentSrc]: true }))
              }
            />
          ) : (
            // Placeholder frame until you add /public/mascot/*.mp4
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[repeating-linear-gradient(45deg,#211c2b,#211c2b_16px,#1a1622_16px,#1a1622_32px)]">
              <span
                className="font-[family-name:var(--font-press-start)] text-4xl"
                style={{
                  color: active
                    ? "var(--color-neon-2)"
                    : "var(--color-neon)",
                }}
              >
                {active ? "◕‿◕" : "▲"}
              </span>
              <span className="font-[family-name:var(--font-press-start)] text-[10px] text-[var(--color-muted)]">
                {character.label}
              </span>
            </div>
          )}
        </div>

        {/* click hint */}
        <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-[family-name:var(--font-press-start)] text-[9px] text-[var(--color-muted)] opacity-80 group-hover:text-[var(--color-neon-3)]">
          ► CLICK ME
        </span>
      </button>
    </div>
  );
}
