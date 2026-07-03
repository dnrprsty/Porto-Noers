# noers.std — Portfolio Website

Website portofolio interaktif *multi-page* untuk **noers.std** — menyoroti keahlian ganda di bidang **Software Development** dan **UI/UX Design**, dengan gimmick *persona toggle* (Programmer / Artist) dan estetika **pixel-art**.

Dibangun dengan **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion**.

---

## ✨ Fitur

- **Interactive Hero** — maskot "NOERS" bisa diklik untuk mengganti animasi/GIF (variasi berputar).
- **Persona Toggle** — tombol `[Programmer]` dan `[Artist]` yang mengubah konten galeri secara dinamis. Default hanya menampilkan **About Me**.
- **Dynamic Routing** — tiap proyek otomatis punya halaman `/works/[slug]` (di-*generate* dari data lokal, tanpa ubah UI).
- **Case Study Page** — Role, Tech Stack, The Challenge, The Solution, dokumentasi visual, dan tautan repo/demo.
- **Contact Page** — form kontak (fallback `mailto:`) + tautan sosial media.
- **Pixel Font** — `Press Start 2P` (heading) & `VT323` (body).
- **3 Tombol Sosial Media** — fixed di pojok kanan atas (Instagram, GitHub, LinkedIn).
- **Animasi** — *page transitions*, *fade-in/out* antar persona (`AnimatePresence`), dan **parallax** (otomatis nonaktif di mobile / `prefers-reduced-motion`).
- **SEO-ready** — SSG, metadata, Open Graph.

---

## 🚀 Menjalankan Proyek

```bash
# 1. Install dependencies
npm install

# 2. Mode development (http://localhost:3000)
npm run dev

# 3. Build untuk produksi
npm run build

# 4. Jalankan hasil build
npm start
```

> **Catatan:** `npm install` dan `npm run build` butuh koneksi internet — `next/font` mengunduh Google Fonts saat build.

---

## 📁 Struktur Folder

```
noers/
├── app/                      # Routing (App Router)
│   ├── layout.tsx            # Root layout: font, nav, tombol sosmed
│   ├── template.tsx          # Animasi transisi antar halaman
│   ├── page.tsx              # Halaman Home
│   ├── globals.css           # Tema warna, font, style pixel
│   ├── not-found.tsx         # Halaman 404
│   ├── contact/page.tsx      # Halaman /contact
│   └── works/[slug]/page.tsx # Halaman detail proyek (dinamis)
│
├── components/               # Komponen UI
│   ├── SocialLinks.tsx       # 3 tombol sosmed (pojok kanan atas)
│   ├── SiteNav.tsx           # Brand + nav (pojok kiri atas)
│   ├── SiteFooter.tsx        # Footer
│   ├── HomeExperience.tsx    # Hero + logika persona toggle + About Me
│   ├── Mascot.tsx            # Maskot GIF interaktif
│   ├── PersonaGallery.tsx    # Galeri proyek per persona
│   ├── ProjectCard.tsx       # Kartu proyek
│   ├── Parallax.tsx          # Wrapper efek parallax
│   ├── ContactForm.tsx       # Form kontak
│   └── useIsMobile.ts        # Hook deteksi mobile (untuk nonaktifkan parallax)
│
├── lib/                      # Data & konfigurasi
│   ├── types.ts              # Tipe Project & SocialLink
│   ├── site.ts               # Identitas + link sosmed  ← EDIT DI SINI
│   └── projects.ts           # Data semua proyek         ← EDIT DI SINI
│
└── public/                   # Aset (gambar, GIF)        ← TARO ASET DI SINI
    ├── mascot/
    └── works/
```

---

## 🎨 Kustomisasi

### 1. Identitas & Sosial Media → `lib/site.ts`

Ganti nama, tagline, email, dan **URL sosmed** (masih placeholder):

```ts
export const site = {
  name: "NOERS",
  handle: "noers.std",
  tagline: "Software Developer × UI/UX Designer",
  email: "hello@noers.std",           // ← ganti email asli
};

export const socials: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com/USERNAME_LU", icon: "instagram" },
  { label: "GitHub",    href: "https://github.com/USERNAME_LU",    icon: "github" },
  { label: "LinkedIn",  href: "https://linkedin.com/in/USERNAME_LU", icon: "linkedin" },
];
```

> Mau nambah Dribbble? Tambahkan objek baru dengan `icon: "dribbble"` (ikonnya sudah tersedia).

### 2. Menambah / Mengedit Proyek → `lib/projects.ts`

Cukup tambahkan satu objek ke array `projects`. Halaman `/works/[slug]` otomatis dibuat — **tanpa ubah UI**.

```ts
{
  slug: "nama-proyek-baru",        // jadi URL: /works/nama-proyek-baru
  title: "Judul Proyek",
  mode: "programmer",              // "programmer" | "artist" | "both"
  role: "Peran lu di proyek ini",
  techStack: ["Next.js", "Figma"],
  shortDescription: "Deskripsi singkat untuk kartu.",
  thumbnailUrl: "/works/nama-proyek-baru/thumbnail.png",
  repositoryUrl: "https://github.com/...",  // opsional
  liveDemoUrl: "https://...",               // opsional
  challenge: "Masalah yang diselesaikan.",
  solution: "Solusi yang lu bangun.",
  contentBody: "Penjelasan detail case study.",
  gallery: ["/works/nama-proyek-baru/1.png"], // opsional, gambar tambahan
}
```

- `mode: "both"` → proyek muncul di galeri Programmer **dan** Artist.
- Field opsional (`repositoryUrl`, `liveDemoUrl`, `challenge`, `solution`, `gallery`) boleh dikosongkan/dihapus.

### 3. Menaruh Aset (Gambar & GIF) → folder `public/`

Sampai file asli ditaruh, web menampilkan **placeholder**. Path harus persis:

**Maskot (Home — klik untuk interaksi):**
```
public/mascot/noers-idle.gif       (default, looping)
public/mascot/noers-interact.gif   (main sekali pas diklik, balik ke idle setelah 1 detik)
```
Ganti nama/atur di `components/Mascot.tsx` → `IDLE` / `INTERACT`.

**Thumbnail proyek:**
```
public/works/<slug>/thumbnail.png
```
Ukuran rekomendasi: **1200×750 (16:10)**, format PNG/WebP. Pixel art dirender tajam (`image-rendering: pixelated`).

### 4. Warna & Font → `app/globals.css`

Semua warna ada di blok `@theme inline` sebagai CSS variable:

```css
--color-bg:      #0d0b0f;   /* background */
--color-neon:    #7c5cff;   /* aksen Programmer (ungu) */
--color-neon-2:  #ff5c8a;   /* aksen Artist (pink) */
--color-neon-3:  #38e8c8;   /* highlight (toska) */
```

Ganti font di `app/layout.tsx` (impor dari `next/font/google`) — cukup ubah `Press_Start_2P` / `VT323` ke font pixel lain lalu sesuaikan `variable`-nya di `globals.css`.

### 5. Teks About Me & Core Values → `components/HomeExperience.tsx`

Edit fungsi `AboutSection` (paragraf bio) dan array `values` (3 kartu *core values*).

---

## 🛠️ Tech Stack

| Kategori   | Teknologi                        |
| ---------- | -------------------------------- |
| Framework  | Next.js 15 (App Router)          |
| Bahasa     | TypeScript                       |
| Styling    | Tailwind CSS v4                  |
| Animasi    | Framer Motion                    |
| Font       | Press Start 2P, VT323            |
| Data       | File lokal TypeScript (`lib/`)   |

---

## ☁️ Deploy

### Vercel (paling cepat)
1. Push repo ke GitHub.
2. Import di [vercel.com](https://vercel.com) → auto-detect Next.js → **Deploy**.

### VPS mandiri (Nginx)
```bash
npm run build
npm start            # jalan di port 3000
```
Lalu arahkan Nginx sebagai reverse proxy ke `http://localhost:3000`.

---

## ✅ Checklist Sebelum Rilis

- [ ] Ganti URL sosmed & email di `lib/site.ts`
- [ ] Isi/edit proyek di `lib/projects.ts`
- [ ] Taruh GIF maskot di `public/mascot/`
- [ ] Taruh thumbnail proyek di `public/works/<slug>/`
- [ ] Update bio & core values di `HomeExperience.tsx`
- [ ] Jalankan `npm run build` untuk pastikan tidak ada error

---

Dibuat untuk **noers.std** — *Software Developer × UI/UX Designer*.
