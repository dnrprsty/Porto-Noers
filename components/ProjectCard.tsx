"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";

/** A single project tile used inside the persona galleries. */
export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Link
        href={`/works/${project.slug}`}
        className="pixel-card group block h-full overflow-hidden transition-transform duration-100 hover:-translate-x-[3px] hover:-translate-y-[3px]"
      >
        <div
          className={`relative w-full overflow-hidden border-b-[3px] border-[var(--color-line)] bg-[var(--color-surface-2)] ${
            project.mode === "artist" ? "aspect-[4/3]" : "aspect-[16/10]"
          }`}
        >
          {project.thumbnailUrl ? (
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover [image-rendering:pixelated] transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            /* Placeholder shown until you drop real assets in /public */
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[repeating-linear-gradient(45deg,#211c2b,#211c2b_12px,#1a1622_12px,#1a1622_24px)] text-[var(--color-muted)] opacity-100 group-hover:opacity-90">
              <span className="font-[family-name:var(--font-press-start)] text-[10px]">
                IMG
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className="border-2 border-[var(--color-line)] px-2 py-0.5 font-[family-name:var(--font-press-start)] text-[9px] uppercase"
              style={{
                color:
                  project.mode === "artist"
                    ? "var(--color-neon-2)"
                    : "var(--color-neon)",
              }}
            >
              {project.mode}
            </span>
            <span className="text-[var(--color-muted)]">{project.role}</span>
          </div>

          <h3 className="mb-2 text-sm text-[var(--color-ink)]">
            {project.title}
          </h3>

          <p className="mb-3 line-clamp-3 text-[var(--color-muted)]">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((t) => (
              <span
                key={t}
                className="bg-[var(--color-surface-2)] px-2 py-0.5 text-sm text-[var(--color-neon-3)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
