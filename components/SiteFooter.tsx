import Link from "next/link";
import { site, socials } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t-[3px] border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="text-[var(--color-muted)]">
          <span className="font-[family-name:var(--font-press-start)] text-[10px] text-[var(--color-ink)]">
            {site.name}
          </span>{" "}
          — {site.tagline}
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="text-[var(--color-neon-3)] hover:underline"
          >
            Contact
          </Link>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
