import HomeExperience from "@/components/HomeExperience";
import SiteFooter from "@/components/SiteFooter";
import { getProjectsByMode } from "@/lib/projects";

export default function HomePage() {
  const programmerProjects = getProjectsByMode("programmer");
  const artistProjects = getProjectsByMode("artist");

  return (
    <>
      <HomeExperience
        programmerProjects={programmerProjects}
        artistProjects={artistProjects}
      />
      <SiteFooter />
    </>
  );
}
