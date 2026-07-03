"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

type ImageSliderProps = {
  images: string[];
  alt: string;
  accent: string;
};

export default function ImageSlider({ images, alt, accent }: ImageSliderProps) {
  const [idx, setIdx] = useState(0);
  const len = images.length;
  const hasMultiple = len > 1;

  const prev = useCallback(() => setIdx((i) => (i - 1 + len) % len), [len]);
  const next = useCallback(() => setIdx((i) => (i + 1) % len), [len]);

  if (len === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="mb-4 text-lg" style={{ color: accent }}>
        Gallery
      </h2>

      <div className="pixel-card relative overflow-hidden bg-[var(--color-surface-2)]">
        {/* image container */}
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={images[idx]}
            alt={`${alt} ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-contain [image-rendering:pixelated]"
            priority={idx === 0}
          />
        </div>

        {/* nav arrows */}
        {hasMultiple && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded border-2 border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded border-2 border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
              aria-label="Next image"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* dot indicators */}
      {hasMultiple && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2.5 w-2.5 rounded-full border-2 border-[var(--color-line)] transition-colors ${
                i === idx ? "bg-[var(--color-neon-3)]" : "bg-[var(--color-surface-2)]"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}