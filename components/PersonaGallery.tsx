"use client";

import { motion } from "framer-motion";
import type { PersonaMode, Project } from "@/lib/types";
import ProjectCard from "./ProjectCard";

const COPY: Record<
  PersonaMode,
  { title: string; blurb: string; accent: string }
> = {
  programmer: {
    title: "// Programmer Mode",
    blurb:
      "Logic, systems & shipped code — mobile apps, infrastructure, and front-end builds.",
    accent: "var(--color-neon)",
  },
  artist: {
    title: "~ Artist Mode",
    blurb:
      "Visual & creative work — UI/UX redesigns, pixel art, and game assets.",
    accent: "var(--color-neon-2)",
  },
};

/** Gallery shown when a persona is active. Animated by AnimatePresence in parent. */
export default function PersonaGallery({
  mode,
  projects,
}: {
  mode: PersonaMode;
  projects: Project[];
}) {
  const copy = COPY[mode];

  return (
    <motion.section
      key={mode}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto w-full max-w-6xl px-4 pb-24"
      aria-label={`${mode} projects`}
    >
      <div className="mb-8 border-l-4 pl-4" style={{ borderColor: copy.accent }}>
        <h2 className="mb-2 text-lg" style={{ color: copy.accent }}>
          {copy.title}
        </h2>
        <p className="text-[var(--color-muted)]">{copy.blurb}</p>
      </div>

      {projects.length === 0 ? (
        <p className="text-[var(--color-muted)]">No projects yet — check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      )}
    </motion.section>
  );
}
