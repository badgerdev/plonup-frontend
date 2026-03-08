"use client";

import useSWR from "swr";
import { ReviewsSheet } from "./ReviewsSheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CustomStar } from "../../shared/CustomStar";
import { Review } from "@/lib/helpers/types";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { PublicUserReviewsSkeleton } from "../skeletons/PublicUserReviewsSkeleton";
import { truncateAtWord } from "@/lib/helpers/truncate";

import { ReviewReportTrigger } from "@/components/report/ReviewReportTrigger";

type Props = {
  userId: number;
  username: string;
  isVerified: boolean;
};

const NUMBER_OF_REVIEWS_TO_DISPLAY = 3;
const NUMBER_OF_CHARS_IN_REVIEW = 100;

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function PublicUserReviews({ userId }: Props) {
  const {
    data: reviews,
    error,
    isLoading,
  } = useSWR<Review[]>(userId ? `/api/reviews/${userId}` : null, fetcher);

  if (isLoading) return <PublicUserReviewsSkeleton />;
  if (error) return <p>Błąd ładowania profilu</p>;
  if (!reviews) return null;

  const lastReviews = reviews.slice(0, NUMBER_OF_REVIEWS_TO_DISPLAY);

  return (
    <div className="space-y-4">
      {/* Opinie */}
      <div className="bg-white rounded-2xl shadow-lg p-4 lg:px-5 border border-zinc-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-700">Ostatnie opinie</h2>
        </div>

        {lastReviews.length > 0 ? (
          <ul className="space-y-4">
            {lastReviews.map((r) => (
              <li
                key={r.id}
                className="bg-zinc-100 rounded-xl border border-gray-200 p-4"
              >
                <div className="flex flex-col items-start mb-2">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <CustomStar
                        key={i}
                        className={i < r.rating ? "" : "opacity-30"}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    od{" "}
                    <Link href={`/uzytkownicy/${r.author_id}`}>
                      <span className="font-medium text-gray-800">
                        {r.author_username}
                      </span>
                    </Link>
                    <span className="ml-2 font-light">
                      • dodano: {new Date(r.created_at).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                {r.comment && (
                  <Collapsible className="group">
                    <p className="text-sm text-gray-700 leading-relaxed group-data-[state=open]:hidden">
                      {truncateAtWord(r.comment, NUMBER_OF_CHARS_IN_REVIEW)}
                    </p>

                    <CollapsibleContent>
                      <p className="text-sm text-gray-700 leading-relaxed mt-1">
                        {r.comment}
                      </p>
                    </CollapsibleContent>

                    {r.comment.length > NUMBER_OF_CHARS_IN_REVIEW && (
                      <CollapsibleTrigger className="flex items-center gap-1 text-sm text-gray-600 font-semibold mt-2 hover:underline">
                        <span className="group-data-[state=open]:hidden flex items-center gap-1">
                          <ChevronDown className="w-5 h-5" />
                          Czytaj dalej...
                        </span>
                        <span className="hidden group-data-[state=open]:flex items-center gap-1">
                          <ChevronDown className="w-5 h-5 rotate-180" />
                          Zwiń
                        </span>
                      </CollapsibleTrigger>
                    )}
                  </Collapsible>
                )}

                {/* 🔥 REPORT REVIEW */}
                <div className="flex justify-end mt-2">
                  <ReviewReportTrigger reviewId={r.id} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mb-6">Brak opinii.</p>
        )}

        {reviews.length > 4 && (
          <div className="mt-4">
            <ReviewsSheet reviews={reviews} userId={userId} />
          </div>
        )}
      </div>
    </div>
  );
}
