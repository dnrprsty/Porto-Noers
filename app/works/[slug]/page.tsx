import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getProjectBySlug } from "@/lib/projects";
import SiteFooter from "@/components/SiteFooter";
import ImageSlider from "@/components/ImageSlider";

type Params = { slug: string };

// Pre-render every case study at build time (SSG) for SEO + performance.
export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.thumbnailUrl ? [project.thumbnailUrl] : undefined,
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const accent =
    project.mode === "artist" ? "var(--color-neon-2)" : "var(--color-neon)";

  return (
    <>
      <main className="mx-auto w-full max-w-4xl px-4 pt-28 pb-20">
        <Link
          href="/"
          className="mb-8 inline-block text-[var(--color-muted)] hover:text-[var(--color-neon-3)]"
        >
          ← back to home
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span
            className="mb-4 inline-block border-2 border-[var(--color-line)] px-2 py-1 font-[family-name:var(--font-press-start)] text-[9px] uppercase"
            style={{ color: accent }}
          >
            {project.mode}
          </span>
          <h1 className="mb-4 text-2xl leading-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-[var(--color-muted)]">
            {project.shortDescription}
          </p>
        </div>

        {/* Hero image */}
        <div
          className={`pixel-card relative mb-10 w-full overflow-hidden bg-[var(--color-surface-2)] ${
            project.mode === "artist" ? "aspect-[4/3]" : "aspect-[16/9]"
          }`}
        >
          {project.thumbnailUrl ? (
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover [image-rendering:pixelated]"
              priority
            />
          ) : (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[repeating-linear-gradient(45deg,#211c2b,#211c2b_16px,#1a1622_16px,#1a1622_32px)]">
              <span className="font-[family-name:var(--font-press-start)] text-xs text-[var(--color-muted)]">
                PROJECT VISUAL
              </span>
            </div>
          )}
        </div>

        {/* Meta grid: Role + Tech Stack */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="pixel-card p-5">
            <h2 className="mb-3 text-xs" style={{ color: accent }}>
              Role
            </h2>
            <p className="text-[var(--color-muted)]">{project.role}</p>
          </div>
          <div className="pixel-card p-5">
            <h2 className="mb-3 text-xs" style={{ color: accent }}>
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="bg-[var(--color-surface-2)] px-2 py-1 text-base text-[var(--color-neon-3)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* The Challenge */}
        {project.challenge && (
          <Section title="The Challenge" accent={accent}>
            {project.challenge}
          </Section>
        )}

        {/* The Solution */}
        {project.solution && (
          <Section title="The Solution" accent={accent}>
            {project.solution}
          </Section>
        )}

        {/* Detail body */}
        {project.contentBody && (
          <Section title="Overview" accent={accent}>
            {project.contentBody}
          </Section>
        )}

        {/* Image gallery slider — used by artist projects */}
        {project.gallery && project.gallery.length > 0 && (
          <ImageSlider
            images={project.gallery}
            alt={project.title}
            accent={accent}
          />
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-4">
          {project.repositoryUrl ? (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn"
            >
              ◆ Repository
            </a>
          ) : null}
          {project.liveDemoUrl ? (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn"
            >
              ▸ Live Demo
            </a>
          ) : null}
          {project.instagramUrl ? (
            <a
              href={project.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn"
              style={{
                borderColor: "var(--color-neon-2)",
                color: "var(--color-neon-2)",
              }}
            >
              ◈ Instagram
            </a>
          ) : null}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function Section({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10 border-l-4 pl-5" style={{ borderColor: accent }}>
      <h2 className="mb-3 text-lg">{title}</h2>
      <p className="leading-relaxed text-[var(--color-muted)]">{children}</p>
    </section>
  );
}
