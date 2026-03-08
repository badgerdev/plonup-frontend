"use client";

import useSWR from "swr";
import { CustomStar } from "../shared/CustomStar";
import { UserScoringLabel } from "./UserScoringLabel";
import { Review } from "@/lib/helpers/types";
import { useAuth } from "@/hooks/auth/useAuth";
import { useState } from "react";
import { AddReviewButton } from "./AddReviewButton";

type Props = {
  userId: number;
  username: string;
  isVerified: boolean;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function PublicScoreCard({ userId, username, isVerified }: Props) {
  const { user } = useAuth();
  const {
    data: reviews,
    error,
    isLoading,
    mutate,
  } = useSWR<Review[]>(userId ? `/api/reviews/${userId}` : null, fetcher);

  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  if (isLoading)
    return <div className="bg-white rounded-2xl shadow-lg p-4">Ładowanie…</div>;
  if (error)
    return (
      <div className="bg-white rounded-2xl shadow-lg p-4">Błąd ładowania</div>
    );
  if (!reviews) return null;

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  // --- required for AddReviewButton ---
  const hasReviewed =
    reviews.some((r) => r.author_id === user?.id) || alreadyReviewed;

  const isOwnProfile = user?.id === userId;

  const handleReviewAdded = (success: boolean) => {
    if (success) {
      mutate();
      setAlreadyReviewed(true);
    } else {
      setAlreadyReviewed(true);
    }
  };

  return (
    <div className="flex items-start justify-between">
      {/* LEWA STRONA */}
      <div className="pl-6 border-l-2 border-orange-100">
        <h1 className="text-lg text-zinc-700 flex flex-col">
          Profil Użytkownika:{" "}
          <span className="font-bold text-zinc-800">{username}</span>
        </h1>

        {isVerified && (
          <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-1 inline-block">
            Zweryfikowany
          </span>
        )}

        <div className="flex gap-1 mt-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <CustomStar
              key={i}
              className={i < Math.round(average) ? "" : "opacity-30"}
            />
          ))}
        </div>

        {/* CTA → WYSTAW OPINIĘ */}
        <div className="ml-">
          <AddReviewButton
            targetUserId={userId}
            hasReviewed={hasReviewed}
            isOwnProfile={isOwnProfile}
            onReviewAdded={handleReviewAdded}
          />
        </div>
      </div>

      {/* PRAWA STRONA */}
      <div className="text-right">
        <p className="text-2xl font-semibold text-gray-900">
          {average.toFixed(1)} / 5
        </p>
        <p className="pt-2 text-xs">
          Na podstawie <span className="font-bold">{reviews.length}</span>{" "}
          opinii
        </p>

        <div className="border-t pt-2">
          <UserScoringLabel avg={average} />
        </div>
      </div>
    </div>
  );
}
