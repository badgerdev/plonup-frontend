"use client";

import { useState } from "react";
import { AnnouncementLikesModal } from "../panel/my-announcements/AnnouncementLikesModal";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export function AnnouncementLikesBadge({
  likesCount,
  announcementId,
  className,
}: {
  likesCount: number;
  announcementId: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Badge
        data-no-card-click
        onClick={(e) => {
          e.stopPropagation(); // ⛔ zatrzymujemy Linka
          setOpen(true);
        }}
        className={cn(
          "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 transition hover:cursor-pointer",
          className
        )}
      >
        {likesCount} osób lubi to.
      </Badge>

      <AnnouncementLikesModal
        open={open}
        onClose={() => setOpen(false)}
        announcementId={announcementId}
      />
    </>
  );
}
