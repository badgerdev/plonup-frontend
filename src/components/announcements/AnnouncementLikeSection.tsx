"use client";

import { HeartButton } from "../shared/HeartButton";

type Props = {
  announcementId: number;
  initialCount: number;
  initialLiked: boolean;
};

export function AnnouncementLikeSection({
  announcementId,
  initialCount,
  initialLiked,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      <HeartButton
        announcementId={announcementId}
        initialCount={initialCount}
        initialLiked={initialLiked}
      />
      {/* <span className="text-xs text-[var(--muted-foreground)] mt-1 text-center">
        {initialLiked ? "Polubiono" : "Polub ogłoszenie"}
      </span> */}
    </div>
  );
}
