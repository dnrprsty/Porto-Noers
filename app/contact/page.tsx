import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SiteFooter from "@/components/SiteFooter";
import { site, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — ${site.tagline}.`,
};

export default function ContactPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-4xl px-4 pt-28 pb-20">
        <h1 className="mb-3 text-2xl text-[var(--color-ink)] sm:text-4xl">
          Let&apos;s build something
        </h1>
        <p className="mb-10 max-w-xl text-[var(--color-muted)]">
          Have a project, a role, or a collaboration in mind? Drop a message or
          reach me on any platform below.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <ContactForm />
          </div>

          <aside className="md:col-span-2">
            <div className="pixel-card h-full p-6">
              <h2 className="mb-5 text-sm text-[var(--color-neon-3)]">
                ◆ Find me
              </h2>
              <ul className="flex flex-col gap-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border-2 border-[var(--color-line)] bg-[var(--color-surface-2)] px-4 py-3 text-[var(--color-muted)] transition-colors hover:border-[var(--color-neon)] hover:text-[var(--color-ink)]"
                    >
                      <span>{s.label}</span>
                      <span aria-hidden>→</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center justify-between border-2 border-[var(--color-line)] bg-[var(--color-surface-2)] px-4 py-3 text-[var(--color-muted)] transition-colors hover:border-[var(--color-neon)] hover:text-[var(--color-ink)]"
                  >
                    <span>Email</span>
                    <span aria-hidden>→</span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
