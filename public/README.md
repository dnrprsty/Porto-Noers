# Assets — drop your files here

The site renders placeholders until you add these files. Keep the exact paths.

## Mascot GIFs (Home hero — click to interact)
- `public/mascot/noers-idle.gif`      (default, loops)
- `public/mascot/noers-interact.gif`  (plays once on click, then back to idle after 1s)

Rename/adjust in `components/Mascot.tsx` → `IDLE` / `INTERACT`.

## Project thumbnails / case-study visuals
Each project's `thumbnailUrl` in `lib/projects.ts` points here:

- `public/works/parkir-in/thumbnail.png`
- `public/works/distributed-systems/thumbnail.png`
- `public/works/bgp-catalog/thumbnail.png`
- `public/works/shopee-redesign/thumbnail.png`
- `public/works/pixel-rpg/thumbnail.png`

For extra case-study images, add file paths to a project's `gallery: []` array.

Recommended thumbnail size: 1200×750 (16:10). PNG or WebP. Pixel art is
rendered crisp (`image-rendering: pixelated`).
