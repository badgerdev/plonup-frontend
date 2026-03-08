"use client";

import { useState } from "react";
import Link from "next/link";
import { Grid2X2Check, ArrowUp, ChevronsDown } from "lucide-react";
import { AnnouncementOut, AnnouncementType } from "@/lib/helpers/types";
import { TypeBadge } from "../badgesUi/TypeBadge";
import { Button } from "@/components/ui/button";
import { AnnouncementLikesBadge } from "../badgesUi/AnnouncementLikesBadge";

type Props = {
  announcements: (AnnouncementOut & { announcement_type: AnnouncementType })[];
};

const DEFAULT_VISIBLE_COUNT = 6;

export function UserAnnouncementsList({ announcements }: Props) {
  const [visibleCount, setVisibleCount] = useState(DEFAULT_VISIBLE_COUNT);

  if (announcements.length === 0) {
    return (
      <p className="text-gray-600">Ten użytkownik nie ma jeszcze ogłoszeń.</p>
    );
  }

  const visibleAnnouncements = announcements.slice(0, visibleCount);

  const scrollToTop = () => {
    const target = document.getElementById("user-announcements-top");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-3">
      {visibleAnnouncements.map((ann) => (
        <div
          key={ann.id}
          className="flex flex-col md:flex-row gap-2 justify-between border border-gray-200 rounded-lg px-2 md:px-4 py-3 bg-zinc-50 shadow-sm hover:bg-zinc-100 transition animate-announcement-in"
        >
          {/* Lewa część: klikalny tytuł + kategoria */}
          <Link
            href={`/ogloszenia/${ann.id}`}
            className="flex flex-col gap-4 flex-1"
          >
            <h3 className="font-semibold lg:text-lg flex items-center gap-2">
              {ann.title}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Grid2X2Check className="w-4.5 h-4.5" />
              Kategoria:{" "}
              <span className="font-semibold text-zinc-700">
                {ann.category}
              </span>
            </p>
          </Link>

          {/* Prawa część: badge */}
          <div className="flex items-center gap-2 mt-2">
            <TypeBadge
              type={ann.announcement_type}
              className="w-[100px] justify-center"
            />
            <AnnouncementLikesBadge
              announcementId={ann.id}
              likesCount={ann.likes_count}
            />
          </div>
        </div>
      ))}

      {/* Pokaż więcej / scroll up */}
      <div className="flex justify-center pt-4">
        {announcements.length > DEFAULT_VISIBLE_COUNT ? (
          visibleCount < announcements.length ? (
            <Button
              variant="outline"
              onClick={() =>
                setVisibleCount((prev) => prev + DEFAULT_VISIBLE_COUNT)
              }
              className="rounded-full flex items-center gap-2"
            >
              <ChevronsDown className="w-4 h-4" />
              Pokaż więcej
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={scrollToTop}
              className="rounded-full px-8 py-2 border-gray-300 text-gray-600 hover:bg-gray-100 transition font-medium shadow-sm flex items-center gap-2"
            >
              <ArrowUp className="w-4 h-4" />
              Do góry
            </Button>
          )
        ) : null}
      </div>
    </div>
  );
}
