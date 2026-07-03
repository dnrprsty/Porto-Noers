import type { PersonaMode, Project } from "./types";

/**
 * Local data source for all case studies (PRD section 7 MVP seed).
 * Add a new object here to publish a new /works/[slug] page — no UI changes
 * required. Drop matching images under /public and point the URLs at them.
 */
export const projects: Project[] = [
  // ── Programmer mode ──────────────────────────────────────────────
  {
    slug: "parkir-in-app",
    title: "Parkir-In",
    mode: "programmer",
    role: "Mobile Developer",
    techStack: ["Flutter", "Dart", "Google Maps API", "Firebase"],
    shortDescription:
      "GPS tracking & coordinate-mapping mobile app for locating and reserving parking spots.",
    thumbnailUrl: "/works/parkir-in/parkirin.png",
    repositoryUrl: "https://github.com/dnrprsty/Parkir-IN-Mobile-Apps.git",
    liveDemoUrl: "https://parkir-in-165838549527.asia-southeast2.run.app/",
    challenge:
      "Users struggle to find available parking in dense areas, wasting fuel and time circling blocks with no real-time visibility of open spots.",
    solution:
      "We built a Flutter app that streams live GPS coordinates onto an interactive map, letting users discover nearby lots, view availability, and navigate directly. Built collaboratively with Kale & Kokoy in Kelompok 9.",
    contentBody:
      "Parkir-In pairs real-time device GPS with a coordinate-mapping layer so drivers can see and reserve parking before they arrive. My focus was the mapping module and state management for live location updates.",
    gallery: [],
  },
  {
    slug: "e-library",
    title: "PinjamkanDuluLe - ELibrary",
    mode: "programmer",
    role: "Fullstack Developer",
    techStack: ["Codeigniter", "Vue JS", "Tailwind CSS", "MySQL"],
    shortDescription:
     "Digital book & comic circulation portal — features a public catalog and a dedicated administrative dashboard.",
    thumbnailUrl: "/works/e-library/elib.png", // sesuaikan path-nya
    repositoryUrl: "", // isi link repo GitHub lo
    liveDemoUrl: "https://pinjamkanbukudulule.vercel.app/",
    challenge:
      "Managing physical book rentals manually causes inefficient inventory tracking and limits visibility for readers who want to check available titles.",
    solution:
      "Built a centralized web portal that separates concerns into an accessible public catalog for readers and a secure admin dashboard for efficient circulation and inventory management.",
    contentBody:
      "This project is a digital book and comic circulation web application. I handled the front-end implementation and architecture, creating a seamless public-facing catalog for users to browse collections online, alongside a dedicated administrative dashboard to manage rentals and track inventory efficiently.",
    gallery: [],
  },
  {
    slug: "ozone",
    title: "Ozone Global Indonesia",
    mode: "programmer",
    role: "Web Developer",
    techStack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    shortDescription:
      "Professional company profile website — landing page and service showcase for an outbound & event organizer provider.",
    thumbnailUrl: "/works/ozone/ozone.png", // disesuaikan path-nya
    repositoryUrl: "", // isi link repo lo kalau ada
    liveDemoUrl: "https://ozoneglobalindonesia.netlify.app/",
    challenge:
      "The client needed an engaging, professional company profile that effectively showcases their outdoor programs and event services while ensuring smooth performance and flawless responsiveness across mobile screens.",
    solution:
      "Developed a lightweight and interactive front-end website using native technologies. Implemented a clean, modern user interface featuring intuitive service sections, structured service grids, and fluid mobile optimization.",
    contentBody:
      "Ozone Global Indonesia is an interactive company profile website built for a professional outbound and event organizer provider. I handled the entire front-end development, translating their corporate identity into a clean layout, structuring their service catalog, and ensuring highly responsive behavior across all modern devices.",
    gallery: [],
  },

  // ── Artist mode ──────────────────────────────────────────────────
  {
    slug: "traditional-art",
    title: "Hand-Drawn Art",
    mode: "artist",
    role: "Traditional Artist",
    techStack: ["Pencil", "Ink", "Watercolor", "Digital Scan"],
    shortDescription:
      "Hand-drawn illustrations — pencil sketches, ink linework, and watercolor studies.",
    thumbnailUrl: "/works/traditional-art/thumbnail.png",
    instagramUrl: "https://www.instagram.com/art.noers/",
    challenge:
      "Translating analog hand-drawn artwork into a digital showcase while preserving texture and detail.",
    solution:
      "Scanned and digitized original pencil, ink, and watercolor pieces, curated into a clean gallery format that highlights the organic quality of each medium.",
    contentBody:
      "A curated collection of traditional hand-drawn artworks: pencil portraits, ink illustrations, and watercolor studies. Each piece is scanned at high resolution to preserve every pencil stroke and wash.",
    gallery: [
      "/works/traditional-art/1.png",
      "/works/traditional-art/2.png",
      "/works/traditional-art/3.png",
    ],
  },
  {
    slug: "tegantong",
    title: "Tegantong — Keychain Art",
    mode: "artist",
    role: "Product Artist",
    techStack: ["Illustration", "Acrylic", "Keychain Production", "Packaging"],
    shortDescription:
      "Hand-painted acrylic keychain designs — original character art turned into wearable merch.",
    thumbnailUrl: "/works/tegantong/thumbnail.png",
    instagramUrl: "https://www.instagram.com/tegantong/",
    challenge:
      "Creating durable, pocket-sized keychain art that retains visual clarity and charm at a small scale.",
    solution:
      "Designed original character illustrations optimized for mini-format, hand-painted on acrylic blanks, and packaged as collectible keychains.",
    contentBody:
      "Tegantong is a small-batch keychain line featuring hand-painted acrylic charms. From character sketch to final sealed product, each piece is crafted to be a portable mini canvas.",
    gallery: [],
  },
];

export function getProjectsByMode(mode: PersonaMode): Project[] {
  return projects.filter((p) => p.mode === mode || p.mode === "both");
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
