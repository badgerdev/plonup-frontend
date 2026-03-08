import { HeroSection } from "@/components/home/HeroSection";
import HomeAnnouncementsPreview from "@/components/home/HomeAnnouncementsPreview";
import { HomeCTASection } from "@/components/home/HomeCtaSection";
import { HomeInfoSection } from "@/components/home/HomeInfoSection";
import { HomeMissionSection } from "@/components/home/HomeMissionSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HomeInfoSection />
      <HomeCTASection />
      <HomeMissionSection />
      <HomeAnnouncementsPreview />
    </>
  );
}
