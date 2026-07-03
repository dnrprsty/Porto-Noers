"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent";

/**
 * Basic contact form (PRD 5.3). No backend is wired up yet — on submit it
 * falls back to a mailto: so messages reach you immediately. Swap the
 * handleSubmit body for a fetch() to your API route / form service later.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Fallback delivery via the user's mail client.
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;

    setStatus("sent");
  };

  const inputClass =
    "w-full border-[3px] border-[var(--color-line)] bg-[var(--color-surface-2)] px-4 py-3 text-[var(--color-ink)] outline-none focus:border-[var(--color-neon)]";

  return (
    <form onSubmit={handleSubmit} className="pixel-card p-6 sm:p-8">
      <div className="mb-5">
        <label
          htmlFor="name"
          className="mb-2 block text-xs text-[var(--color-neon-3)]"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={update("name")}
          placeholder="Your name"
          className={inputClass}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="email"
          className="mb-2 block text-xs text-[var(--color-neon-3)]"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={update("email")}
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="message"
          className="mb-2 block text-xs text-[var(--color-neon-3)]"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="Tell me about your project…"
          className={`${inputClass} resize-y`}
        />
      </div>

      <button type="submit" className="pixel-btn pixel-btn--programmer is-active">
        {status === "sending" ? "Sending…" : "▸ Send Message"}
      </button>

      {status === "sent" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-[var(--color-neon-3)]"
        >
          Your mail client should have opened. If not, email {site.email}.
        </motion.p>
      )}
    </form>
  );
}
