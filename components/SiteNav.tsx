import Link from "next/link";
import { site } from "@/lib/site";

/** Minimal top-left brand + primary nav, fixed on every page. */
export default function SiteNav() {
  return (
    <header className="fixed left-3 top-3 z-50 flex flex-col items-start gap-1 sm:left-5 sm:top-5 sm:flex-row sm:items-center sm:gap-4">
      <Link
        href="/"
        className="pixel-btn !bg-[var(--color-surface)] !text-xs sm:!text-base"
        aria-label="Home"
      >
        {site.name}
      </Link>
      <nav className="flex gap-3 text-sm text-[var(--color-muted)] sm:gap-4 sm:text-base">
        <Link href="/" className="hover:text-[var(--color-neon-3)]">
          Home
        </Link>
        <Link href="/works" className="hover:text-[var(--color-neon-3)]">
          Works
        </Link>
        <Link href="/contact" className="hover:text-[var(--color-neon-3)]">
          Contact
        </Link>
      </nav>
    </header>
  );
}
