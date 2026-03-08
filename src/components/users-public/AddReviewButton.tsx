"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import { useRequireActiveAndVerified } from "@/hooks/guards/useRequireActiveAndVerified";
import Link from "next/link";
import { MessageCircleHeart } from "lucide-react";
import { ReviewDialog } from "./reviews/ReviewDialog";

type Props = {
  targetUserId: number;
  hasReviewed: boolean;
  isOwnProfile: boolean;
  onReviewAdded: (success: boolean) => void; // required
};

export function AddReviewButton({
  targetUserId,
  hasReviewed,
  isOwnProfile,
  onReviewAdded,
}: Props) {
  const { isAuthenticated } = useAuth(); // używamy obydwu → brak warningów
  const requireVerified = useRequireActiveAndVerified();

  const [open, setOpen] = useState(false);

  // ----------------------------------------
  // 1) WŁASNY PROFIL → nie pokazujemy nic
  // ----------------------------------------
  if (isOwnProfile) return null;

  // ----------------------------------------
  // 2) Użytkownik już ocenił → informacja
  // ----------------------------------------
  if (hasReviewed) {
    return (
      <p className="text-sm text-gray-500">Już oceniłeś tego użytkownika.</p>
    );
  }

  // ----------------------------------------
  // 3) Użytkownik niezalogowany
  // ----------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col mt-2 bg-zinc-100 px-2 py-1 rounded-md">
        <Link
          href="/login"
          className="text-[var(--accent-main)] font-semibold hover:underline text-xs"
        >
          Zaloguj się
        </Link>
        <span className="text-gray-700 text-xs">aby wystawić opinię</span>
      </div>
    );
  }

  // ----------------------------------------
  // 4) Kliknięcie przycisku
  // ----------------------------------------
  const handleClick = () => {
    const allowed = requireVerified(() => setOpen(true));

    // jeśli hook zwróci false i user niezalogowany → nic nie rób
    // jeśli user niezweryfikowany → modal otwarty automatycznie
    if (!allowed) return;
  };

  // ----------------------------------------
  // 5) Render guzika + ReviewDialog
  // ----------------------------------------
  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-1 text-xs mt-3 border border-[var(--accent-light-green)] p-2 rounded-md hover:bg-[var(--accent-light)] hover:cursor-pointer"
      >
        Wystaw opinię
        <MessageCircleHeart className="w-4 h-4 text-[var(--accent-light-green)]" />
      </button>

      <ReviewDialog
        userId={targetUserId}
        open={open}
        onOpenChange={setOpen}
        onReviewAdded={onReviewAdded}
      />
    </>
  );
}
