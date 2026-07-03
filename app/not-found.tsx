import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-4xl text-[var(--color-neon)]">404</h1>
      <p className="text-[var(--color-muted)]">
        This screen doesn&apos;t exist in the cartridge.
      </p>
      <Link href="/" className="pixel-btn">
        ◄ Return Home
      </Link>
    </main>
  );
}
