export type PersonaMode = "programmer" | "artist";

/**
 * Standard data schema for a portfolio project / case study.
 * Mirrors section 8 of the PRD. `mode: "both"` makes a project appear
 * under both the Programmer and Artist galleries.
 */
export type Project = {
  slug: string; // URL identifier (e.g., "parkir-in-app")
  title: string;
  mode: PersonaMode | "both";
  role: string;
  techStack: string[]; // e.g., ["Flutter", "Figma", "Next.js"]
  shortDescription: string;
  contentBody: string; // Detail case study (supports simple markdown-ish paragraphs)
  thumbnailUrl: string;
  repositoryUrl?: string;
  liveDemoUrl?: string;
  instagramUrl?: string; // direct link to Instagram profile / post

  // Optional structured case-study fields (PRD 5.2). Fall back to contentBody
  // when these are not provided.
  challenge?: string;
  solution?: string;
  gallery?: string[]; // additional documentation/mockup image paths
};

export type SocialLink = {
  label: string;
  href: string;
  /** icon key handled by the SocialLinks component */
  icon: "instagram" | "github" | "linkedin" | "dribbble";
};
