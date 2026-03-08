"use client";

import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRequireActiveAndVerified } from "@/hooks/guards/useRequireActiveAndVerified";

type Props = {
  onClick?: () => void;
  className?: string;
};

export function ReportReviewButton({ onClick, className }: Props) {
  const requireVerified = useRequireActiveAndVerified();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        requireVerified(() => onClick?.());
      }}
      className={cn(
        "flex items-center gap-1 text-gray-500 hover:text-gray-800 text-xs",
        className
      )}
    >
      <Flag className="size-4 shrink-0" />
      Zgłoś opinię
    </Button>
  );
}
