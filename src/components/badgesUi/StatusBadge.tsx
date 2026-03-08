"use client";

import { CircleCheckBig, OctagonPause, ArchiveX } from "lucide-react";
import { ANNOUNCEMENT_STATUS_COLORS } from "@/lib/constants/statusColors";
import { cn } from "@/lib/utils";
import { AnnouncementStatus } from "@/lib/helpers/types";

type Props = {
  status: AnnouncementStatus;
  label?: string;
  className?: string;
};

export const StatusBadge = ({ status, label, className }: Props) => {
  const icons = {
    active: <CircleCheckBig className="w-4.5 h-4.5 text-green-500" />,
    paused: <OctagonPause className="w-4.5 h-4.5 text-yellow-600" />,
    archived: <ArchiveX className="w-4.5 h-4.5 text-orange-700" />,
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 py-1 text-xs md:text-sm font-medium rounded-full",
        ANNOUNCEMENT_STATUS_COLORS[status],
        className
      )}
    >
      {icons[status]}
      {label ?? status}
    </span>
  );
};
