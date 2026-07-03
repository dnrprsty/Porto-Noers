import type { SocialLink } from "./types";

/**
 * Central place for identity + external links.
 * Replace the placeholder handles/URLs with your real profiles.
 */
export const site = {
  name: "NOERS",
  handle: "noers.std",
  tagline: "Software Developer × UI/UX Designer",
  email: "danurwp70@gmail.com", // update to your real email
};

export const socials: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://instagram.com/dnrprsty", // TODO: replace
    icon: "instagram",
  },
  {
    label: "GitHub",
    href: "https://github.com/dnrprsty", // TODO: replace
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/dnrprsty", // TODO: replace
    icon: "linkedin",
  },
];
