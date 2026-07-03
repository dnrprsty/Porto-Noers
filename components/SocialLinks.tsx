import type { SocialLink } from "@/lib/types";
import { socials } from "@/lib/site";

/* Inline pixel-friendly SVG icons (no external icon deps). */
function Icon({ name }: { name: SocialLink["icon"] }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "instagram":
      return (
        <svg {...common}>
          <path d="M12 2c2.7 0 3 0 4.1.1 1 0 1.7.2 2.3.4.6.3 1.1.6 1.6 1.1s.8 1 1.1 1.6c.2.6.4 1.3.4 2.3.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1-.2 1.7-.4 2.3-.3.6-.6 1.1-1.1 1.6s-1 .8-1.6 1.1c-.6.2-1.3.4-2.3.4-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.7-.2-2.3-.4-.6-.3-1.1-.6-1.6-1.1s-.8-1-1.1-1.6c-.2-.6-.4-1.3-.4-2.3C2 15 2 14.7 2 12s0-3 .1-4.1c0-1 .2-1.7.4-2.3.3-.6.6-1.1 1.1-1.6s1-.8 1.6-1.1c.6-.2 1.3-.4 2.3-.4C8.6 2 9 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-8.4a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z" />
        </svg>
      );
    case "github":
      return (
        <svg {...common}>
          <path d="M12 1.5a10.5 10.5 0 0 0-3.3 20.5c.5.1.7-.2.7-.5v-2c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.2-1.5-1.2-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.3-.3-4.7-1.1-4.7-5.1 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 4-2.4 4.8-4.7 5.1.4.3.7 1 .7 2v3c0 .3.2.6.7.5A10.5 10.5 0 0 0 12 1.5Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 5.9V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4V9Z" />
        </svg>
      );
    case "dribbble":
      return (
        <svg {...common}>
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.6 4.6a8.2 8.2 0 0 1 1.9 5.1c-.3 0-3-.6-5.7-.3-.1-.3-.2-.5-.4-.9 3-1.2 4.2-3 4.2-3.9ZM12 3.8c2.1 0 4 .8 5.4 2.1-.1.2-1.2 1.8-4 2.9A28 28 0 0 0 9.6 4 8 8 0 0 1 12 3.8ZM7.7 4.7A32 32 0 0 1 11.2 9c-3.5 1-6.6 1-6.9 1a8.2 8.2 0 0 1 3.4-5.3ZM3.8 12v-.3c.4 0 4-0 7.9-1.2.2.4.4.9.6 1.3-3.6 1-5.6 4.3-5.8 4.6A8.2 8.2 0 0 1 3.8 12Zm8.2 8.2c-1.9 0-3.6-.6-5-1.7.1-.3 1.6-3.1 5.5-4.4 1.2 3.2 1.7 5.8 1.8 6a8 8 0 0 1-2.3.1Zm4-.9c-.1-.7-.6-3.1-1.7-6.2 2.5-.4 4.7.3 5 .4a8.2 8.2 0 0 1-3.3 5.8Z" />
        </svg>
      );
  }
}

/**
 * Fixed cluster of social buttons pinned to the top-right corner of every
 * page (PRD: "di pojok kanan website ada 3 tombol").
 */
export default function SocialLinks() {
  return (
    <nav
      aria-label="Social links"
      className="fixed right-3 top-3 z-50 flex flex-row gap-2 sm:right-5 sm:top-5 sm:flex-col"
    >
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          title={s.label}
          className="pixel-btn !p-2.5 hover:!bg-[var(--color-neon)]"
        >
          <Icon name={s.icon} />
        </a>
      ))}
    </nav>
  );
}
