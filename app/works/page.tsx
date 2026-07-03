import type { Metadata } from "next";
import Link from "next/link";
import { getProjectsByMode } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Works",
  description: "Browse all projects — code and creative work.",
};

export default function WorksPage() {
  const programmerProjects = getProjectsByMode("programmer");
  const artistProjects = getProjectsByMode("artist");

  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 pt-24 pb-20">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-[var(--color-muted)] hover:text-[var(--color-neon-3)]"
        >
          ← back to home
        </Link>

        <h1 className="mb-3 text-2xl text-[var(--color-ink)] sm:text-4xl">
          All Works
        </h1>
        <p className="mb-12 max-w-xl text-[var(--color-muted)]">
          Browse code-driven builds and creative design work.
        </p>

        {/* Programmer section */}
        <section className="mb-16">
          <div className="mb-6 border-l-4 border-[var(--color-neon)] pl-4">
            <h2 className="mb-2 text-lg text-[var(--color-neon)]">
              // Programmer Mode
            </h2>
            <p className="text-[var(--color-muted)]">
              Logic, systems & shipped code — mobile apps, infrastructure, and front-end builds.
            </p>
          </div>

          {programmerProjects.length === 0 ? (
            <p className="text-[var(--color-muted)]">No projects yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programmerProjects.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* Artist section */}
        <section>
          <div className="mb-6 border-l-4 border-[var(--color-neon-2)] pl-4">
            <h2 className="mb-2 text-lg text-[var(--color-neon-2)]">
              ~ Artist Mode
            </h2>
            <p className="text-[var(--color-muted)]">
              Visual & creative work — UI/UX redesigns, pixel art, and game assets.
            </p>
          </div>

          {artistProjects.length === 0 ? (
            <p className="text-[var(--color-muted)]">No projects yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {artistProjects.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}