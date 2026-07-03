import type { Metadata, Viewport } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import SocialLinks from "@/components/SocialLinks";
import SiteNav from "@/components/SiteNav";
import { site } from "@/lib/site";

// Pixel display font (headings, buttons, brand).
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

// Readable pixel font for body copy.
const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noers.std"),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Portfolio of noers.std — Software Developer and UI/UX Designer. Toggle a persona to explore code-driven builds or creative design work.",
  keywords: [
    "noers.std",
    "portfolio",
    "software developer",
    "ui ux designer",
    "pixel art",
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description:
      "Software Developer × UI/UX Designer. Choose a persona to explore.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0b0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pressStart.variable} ${vt323.variable}`}>
      <body className="relative min-h-screen antialiased">
        <SiteNav />
        <SocialLinks />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
