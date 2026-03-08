"use client";

import { useState } from "react";
import { ReportModal } from "./ReportModal";
import { ReportReviewButton } from "./ReportReviewButton";
import { useRequireActiveAndVerified } from "@/hooks/guards/useRequireActiveAndVerified";

type Props = {
  reviewId: number;
};

export function ReviewReportTrigger({ reviewId }: Props) {
  const [open, setOpen] = useState(false);
  const requireVerified = useRequireActiveAndVerified();

  const handleOpen = () => {
    // Jeśli user zweryfikowany → otwórz modal
    // Jeśli niezweryfikowany → pokaż modal weryfikacyjny
    requireVerified(() => setOpen(true));
  };

  return (
    <>
      <ReportReviewButton onClick={handleOpen} />

      <ReportModal
        isOpen={open}
        onClose={() => setOpen(false)}
        targetType="review"
        targetId={reviewId}
      />
    </>
  );
}
