"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import type { PersonaMode, Project } from "@/lib/types";
import { site } from "@/lib/site";
import Mascot from "./Mascot";
import PersonaGallery from "./PersonaGallery";
import Parallax from "./Parallax";
import { useIsMobile } from "./useIsMobile";

/**
 * The full interactive Home experience (PRD 5.1).
 * Holds the persona-toggle state shared by the hero buttons and the
 * section below (About Me by default → gallery once a persona is chosen).
 */
export default function HomeExperience({
  programmerProjects,
  artistProjects,
}: {
  programmerProjects: Project[];
  artistProjects: Project[];
}) {
  const [persona, setPersona] = useState<PersonaMode | null>(null);
  const isMobile = useIsMobile();

  const toggle = (mode: PersonaMode) =>
    setPersona((prev) => (prev === mode ? null : mode));

  return (
    <main className="relative">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="mx-auto grid min-h-[100dvh] w-full max-w-6xl grid-cols-1 items-center gap-6 px-4 pt-24 pb-12 md:grid-cols-2 md:gap-10 md:pt-20 md:pb-16">
        {/* Kolom Kiri — branding & persona CTA */}
        <div className="order-1 flex flex-col items-start">
          <p className="mb-4 text-[var(--color-muted)]">{site.handle}</p>
          <h1 className="mb-4 text-4xl leading-tight text-[var(--color-ink)] sm:text-6xl">
            NOERS
          </h1>
          <p className="mb-2 text-xl text-[var(--color-neon-3)]">
            {site.tagline}
          </p>
          <p className="mb-8 max-w-md text-[var(--color-muted)]">
            Choose my persona to explore the work — or just poke the mascot.
          </p>

          {/* Two horizontal action buttons (PRD 5.1) */}
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => toggle("programmer")}
              aria-pressed={persona === "programmer"}
              className={`pixel-btn pixel-btn--programmer ${
                persona === "programmer" ? "is-active" : ""
              }`}
            >
              ▸ Programmer
            </button>
            <button
              type="button"
              onClick={() => toggle("artist")}
              aria-pressed={persona === "artist"}
              className={`pixel-btn pixel-btn--artist ${
                persona === "artist" ? "is-active" : ""
              }`}
            >
              ✦ Artist
            </button>
          </div>

          {persona && (
            <button
              type="button"
              onClick={() => setPersona(null)}
              className="mt-4 text-sm text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-ink)] hover:underline"
            >
              ← back to About
            </button>
          )}
        </div>

        {/* Kolom Kanan — interactive mascot */}
        <Parallax speed={-0.2} className="order-2">
          <Mascot mode={persona} />
        </Parallax>
      </section>

      {/* ─── Toggle target: About Me (default) OR persona gallery ─── */}
      <AnimatePresence mode="wait">
        {persona === null ? (
          <AboutSection key="about" />
        ) : isMobile ? (
          <MobileBrowseSection key={persona} mode={persona} />
        ) : (
          <PersonaGallery
            key={persona}
            mode={persona}
            projects={
              persona === "programmer" ? programmerProjects : artistProjects
            }
          />
        )}
      </AnimatePresence>
    </main>
  );
}

/** Mobile CTA to browse works on dedicated page instead of inline gallery. */
function MobileBrowseSection({ mode }: { mode: PersonaMode }) {
  const accent = mode === "artist" ? "var(--color-neon-2)" : "var(--color-neon)";
  const icon = mode === "artist" ? "✦" : "▸";

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto w-full max-w-4xl px-4 pb-24"
    >
      <div className="pixel-card p-6 text-center">
        <h2 className="mb-4 text-lg" style={{ color: accent }}>
          {icon} {mode === "artist" ? "Artist" : "Programmer"} Mode
        </h2>
        <p className="mb-6 text-[var(--color-muted)]">
          Browse all projects on a dedicated page.
        </p>
        <Link
          href="/works"
          className="pixel-btn"
          style={{
            backgroundColor: accent,
            borderColor: "#fff",
            color: "#fff",
          }}
        >
          {icon} Browse Works
        </Link>
      </div>
    </motion.section>
  );
}

/** About Me — the exclusive default-state content (PRD 5.1). */
function AboutSection() {
  const values = [
    {
      title: "Dual-Stack",
      body: "I move between code and canvas — building the logic and designing how it feels.",
    },
    {
      title: "Systems Thinker",
      body: "From load balancers to component libraries, I like scalable, maintainable structure.",
    },
    {
      title: "Craft & Play",
      body: "Pixel art, gamified UX, and clean engineering — work should be fun to build.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto w-full max-w-4xl px-4 pb-24"
      aria-label="About me"
    >
      <div className="pixel-card p-6 sm:p-10">
        <h2 className="mb-6 text-xl text-[var(--color-neon-3)]">◆ About Me</h2>
        <p className="mb-4 text-[var(--color-muted)]">
          I&apos;m <span className="text-[var(--color-ink)]">noers.std</span> — a
          developer and designer who refuses to pick a lane. On the code side I
          build mobile apps, distributed infrastructure, and front-ends. On the
          design side I craft UI/UX flows, pixel art, and game assets.
        </p>
        <p className="mb-8 text-[var(--color-muted)]">
          Pick a persona above to see the two halves of my work — or reach out if
          you want to build something together.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="border-2 border-[var(--color-line)] bg-[var(--color-surface-2)] p-4"
            >
              <h3 className="mb-2 text-xs text-[var(--color-neon)]">
                {v.title}
              </h3>
              <p className="text-base text-[var(--color-muted)]">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
