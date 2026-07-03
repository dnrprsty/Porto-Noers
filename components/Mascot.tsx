"use client";

import { useEffect, useRef, useState } from "react";
import type { PersonaMode } from "@/lib/types";

/**
 * Interactive mascot (PRD 5.1).
 * Two MP4 videos per character:
 *   - idle:     loops continuously in background
 *   - interact: played once when clicked, crossfades with idle
 *
 * Seamless transitions: both videos are preloaded and playing,
 * we just crossfade opacity between them for smooth transitions.
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
  const [active, setActive] = useState(false); // false = idle visible, true = interact visible
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const [transitioning, setTransitioning] = useState(false);
  
  const idleVideoRef = useRef<HTMLVideoElement>(null);
  const interactVideoRef = useRef<HTMLVideoElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevModeRef = useRef(mode);

  // Get current character based on mode
  const character = mode ? CHARACTERS[mode] : CHARACTERS.default;

  // Handle smooth character transition when mode changes
  useEffect(() => {
    if (prevModeRef.current !== mode) {
      setTransitioning(true);
      setActive(false); // Reset to idle when changing character
      
      // Longer fade duration for smoother transition
      const fadeTimer = setTimeout(() => {
        setTransitioning(false);
        prevModeRef.current = mode;
      }, 800);

      return () => clearTimeout(fadeTimer);
    }
  }, [mode]);

  const handleClick = () => {
    const interactVideo = interactVideoRef.current;
    if (!interactVideo || broken[character.interact]) return;

    // Start interact video from beginning
    interactVideo.currentTime = 0;
    interactVideo.play().catch(() => {
      // Autoplay blocked
    });

    setActive(true);

    // Return to idle after interact video finishes or after 8 seconds
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

  // Start idle video when component mounts or mode changes
  // Skip loading during transition to avoid stutter
  useEffect(() => {
    if (transitioning) return;
    
    const idleVideo = idleVideoRef.current;
    if (idleVideo && !broken[character.idle]) {
      idleVideo.load();
      idleVideo.play().catch(() => {
        // Autoplay might be blocked
      });
    }
  }, [character.idle, broken, transitioning]);

  // Preload interact video when mode changes
  // Skip loading during transition
  useEffect(() => {
    if (transitioning) return;
    
    const interactVideo = interactVideoRef.current;
    if (interactVideo && !broken[character.interact]) {
      interactVideo.load();
    }
  }, [character.interact, broken, transitioning]);

  const allBroken = broken[character.idle] && broken[character.interact];

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={handleClick}
        aria-label="Interact with the NOERS mascot"
        className="pixel-card group relative w-full max-w-[280px] overflow-hidden bg-transparent p-0"
        style={{ aspectRatio: "9/16" }}
      >
        <div
          className="absolute inset-0 transition-opacity duration-[800ms] ease-in-out"
          style={{ opacity: transitioning ? 0 : 1 }}
        >
          {!allBroken ? (
            <>
              {/* Idle video - always looping in background */}
              <video
                ref={idleVideoRef}
                src={character.idle}
                autoPlay
                muted
                playsInline
                loop
                className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500 [image-rendering:pixelated]"
                style={{ opacity: active ? 0 : 1 }}
                onError={() =>
                  setBroken((b) => ({ ...b, [character.idle]: true }))
                }
              />

              {/* Interact video - plays once when triggered */}
              <video
                ref={interactVideoRef}
                src={character.interact}
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500 [image-rendering:pixelated]"
                style={{ opacity: active ? 1 : 0 }}
                onError={() =>
                  setBroken((b) => ({ ...b, [character.interact]: true }))
                }
              />
            </>
          ) : (
            // Placeholder frame when videos fail to load
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