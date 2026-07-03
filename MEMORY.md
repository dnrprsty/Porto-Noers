# MEMORY — noers.std Portfolio

> Catatan lanjutan projek biar gampang diterusin di sesi lain. Update file ini
> kalau ada perubahan penting.

**Lokasi:** `/home/noer/Projects/WEBSITE/noers`
**Status:** MVP jalan, `npm run build` ✅ lolos (10 route, 5 case study SSG). Aset masih placeholder.

---

## Ringkasan
Portfolio multi-page untuk **noers.std** (Software Developer × UI/UX Designer).
Estetika **pixel-art**, ada **persona toggle** (Programmer / Artist).

## Tech Stack
- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** — pakai `@tailwindcss/postcss`, konfigurasi ada di
  `app/globals.css` blok `@theme inline` (TIDAK ada `tailwind.config`)
- **Framer Motion** — transisi & parallax
- **Font pixel** via `next/font/google`: `Press_Start_2P` (heading/tombol) + `VT323` (body)
- Node 26, npm

> ⚠️ `npm install` & `npm run build` butuh **internet** (next/font unduh Google Fonts).

## Perintah
```bash
npm install       # sekali di awal
npm run dev       # http://localhost:3000
npm run build     # build produksi
npm start         # jalankan hasil build
```

---

## Struktur Penting
```
app/
  layout.tsx            # root: font, nav, tombol sosmed
  template.tsx          # animasi transisi antar halaman
  page.tsx              # Home
  globals.css           # WARNA & style pixel (@theme inline)
  contact/page.tsx      # /contact
  works/[slug]/page.tsx # detail proyek (SSG dinamis)
  not-found.tsx         # 404
components/
  HomeExperience.tsx    # hero + logika persona toggle + About Me
  Mascot.tsx            # maskot interaktif (2 GIF)
  SocialLinks.tsx       # 3 tombol sosmed (pojok kanan atas)
  SiteNav.tsx           # brand + nav (pojok kiri atas)
  SiteFooter.tsx        # footer
  PersonaGallery.tsx    # galeri proyek per persona
  ProjectCard.tsx       # kartu proyek
  Parallax.tsx          # efek parallax (auto-off di mobile)
  ContactForm.tsx       # form kontak (fallback mailto)
  useIsMobile.ts        # deteksi mobile / reduced-motion
lib/
  site.ts               # ← identitas + URL sosmed
  projects.ts           # ← data semua proyek
  types.ts              # tipe Project & SocialLink
public/
  mascot/               # noers-idle.gif, noers-interact.gif
  works/<slug>/         # thumbnail.png tiap proyek
```

## Keputusan Desain / Kustomisasi
- **Layout hero:** teks/branding di KIRI, maskot di KANAN.
- **Maskot:** 2 GIF saja — `noers-idle.gif` (loop default) & `noers-interact.gif`.
  Klik → main interact 1x (cache-bust `?v=` biar replay dari awal) → balik idle
  setelah **1 detik** (`INTERACT_MS` di `components/Mascot.tsx`). Tidak pindah halaman.
- **Warna** (`app/globals.css`): `--color-neon` ungu = Programmer,
  `--color-neon-2` pink = Artist, `--color-neon-3` toska = highlight.
- **Persona toggle:** default cuma render About Me; klik persona → galeri muncul
  (fade via `AnimatePresence`). Klik lagi / "back to About" → kembali.

---

## TODO (Lanjutan)
- [ ] Ganti URL sosmed asli (IG/GitHub/LinkedIn) + email di **`lib/site.ts`**
      (sekarang masih placeholder `your_handle` / `hello@noers.std`).
- [ ] Taro **GIF maskot** di `public/mascot/` (`noers-idle.gif`, `noers-interact.gif`).
- [ ] Taro **thumbnail proyek** di `public/works/<slug>/thumbnail.png` (rekomendasi 1200×750).
- [ ] Isi **repositoryUrl / liveDemoUrl** asli di **`lib/projects.ts`** (5 proyek MVP).
- [ ] Edit bio & core values di **`components/HomeExperience.tsx`** (fungsi `AboutSection`).
- [ ] (Opsional) Sambungkan `ContactForm` ke backend/form service (kini `mailto:`).
- [ ] Deploy: Vercel (import repo) atau VPS + Nginx reverse proxy ke port 3000.

## Data Proyek (seed MVP di lib/projects.ts)
Programmer: `parkir-in-app`, `distributed-systems-setup`, `bgp-catalog`
Artist: `shopee-interface-redesign`, `2d-pixel-art-rpg`
(`mode: "both"` = muncul di kedua galeri. Tambah objek baru = halaman `/works/[slug]` otomatis.)
