import { AnnouncementDetail } from "@/lib/helpers/types";

import { ImageSlider } from "./ImageSlider";
import { ContactSection } from "./ContactSection";

import { AnnouncementDetailsSection } from "./AnnouncementDetailsSection";
import { AnnouncementDescription } from "./AnnouncementDescription";
import { AnnouncementSafetySection } from "@/components/announcements/AnnouoncementSafetySection";

import RelatedAnnouncements from "./RelatedAnnouncements";

import { AnnouncementLikeSection } from "./AnnouncementLikeSection";

interface Props {
  announcement: AnnouncementDetail;
}

export const AnnouncementDetailLayout = ({ announcement }: Props) => {
  console.log(announcement);
  console.log(announcement.is_liked);
  return (
    <div className="w-full max-w-[1400px] mx-auto py-16 md:px-6 space-y-8 animate-fade-in">
      {/* Header z tytułem i typem */}
      <div className="flex gap-2 justify-between border-b border-[var(--border)] pb-2">
        <h1 className="text-2xl lg:text-2xl font-bold text-foreground">
          {announcement.title}
        </h1>
        <AnnouncementLikeSection
          announcementId={announcement.id}
          initialCount={announcement.likes_count}
          initialLiked={announcement.is_liked}
        />
      </div>

      {/* Grid: slider + detale */}
      <div className="grid md:grid-cols-1 lg:grid-cols-[2fr_2fr] xl:grid-cols-[5fr_4fr] gap-6 lg:gap-4">
        {/* LEWA: slider (CLIENT) */}
        <div className="pt-6 overflow-hidden">
          <ImageSlider images={announcement.images} />
        </div>
        <div className="flex flex-col gap-6 lg:px-6">
          <AnnouncementDetailsSection announcement={announcement} />
          <ContactSection
            phone={announcement.phone}
            email={announcement.email}
            user={announcement.user}
            userId={announcement.user_id}
            createdAt={announcement.created_at}
          />
        </div>
      </div>

      <AnnouncementDescription description={announcement.description} />
      <div className="flex justify-center">
        <AnnouncementSafetySection />
      </div>

      <RelatedAnnouncements announcementId={announcement.id} />
    </div>
  );
};
