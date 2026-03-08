"use client";

import { Review } from "@/lib/helpers/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CustomStar } from "../../shared/CustomStar";
import { UserScoringLabel } from "../UserScoringLabel";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";
import { toast } from "sonner";
import useSWR from "swr";
import Link from "next/link";
import { truncateAtWord } from "@/lib/helpers/truncate";
import { ReviewReportTrigger } from "@/components/report/ReviewReportTrigger";
import { AddReviewButton } from "../AddReviewButton";

type Props = { reviews: Review[]; userId: number };
const NUMBER_OF_CHARS_IN_REVIEW = 150;

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function ReviewsSheet({ reviews, userId }: Props) {
  const [open, setOpen] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  // REPORT REVIEW – MODAL STATE

  const { user } = useAuth();

  // SWR hook do mutacji
  const { mutate } = useSWR<Review[]>(
    userId ? `/api/reviews/${userId}` : null,
    fetcher
  );

  const total = reviews.length || 1;

  const percentByRating = [1, 2, 3, 4, 5].reduce((acc, rating) => {
    const count = reviews.filter((r) => r.rating === rating).length;
    acc[rating] = Math.round((count / total) * 100);
    return acc;
  }, {} as Record<number, number>);

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const hasReviewed =
    reviews?.some((r) => r.author_id === user?.id) || alreadyReviewed;
  const isOwnProfile = user?.id === userId;

  const handleReviewAdded = (success: boolean) => {
    if (success) {
      mutate(); // odśwież dane z backendu
      toast.success("Twoja opinia zostanie wkrótce dodana, dziękujemy!");
      setOpen(false); // zamknij sheet
      setAlreadyReviewed(true);
    } else {
      toast.error("Już oceniłeś tego użytkownika.");
      setAlreadyReviewed(true);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="mt-6 w-full rounded-full font-medium shadow-sm border-[var(--accent-main)]"
      >
        Zobacz wszystkie
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-full min-w-3/4 lg:min-w-1/3 flex flex-col px-4 pt-10 pb-6"
        >
          {/* Sticky Header */}
          <SheetHeader className="sticky top-0 z-10 bg-white border-b px-2 pt-2 pb-4">
            <SheetTitle className="sr-only">Opinie użytkownika</SheetTitle>

            <div className="flex items-start">
              {/* CTA lewa strona */}
              <div className="flex-1/3">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 pl-3">
                  {user?.username}
                </h2>
                <AddReviewButton
                  targetUserId={userId}
                  hasReviewed={hasReviewed}
                  isOwnProfile={isOwnProfile}
                  onReviewAdded={handleReviewAdded}
                />
              </div>

              {/* Prawa strona: średnia + label + gwiazdki */}
              <div className="text-right ml-auto">
                <p className="text-gray-700 flex items-center gap-1 mb-1">
                  Średnia:
                  <span className="text-lg font-semibold text-gray-900">
                    {average.toFixed(1)} / 5
                  </span>
                </p>
                <UserScoringLabel avg={average} />
                <div className="flex justify-end mt-2 gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <CustomStar
                      key={i}
                      className={i < Math.round(average) ? "" : "opacity-30"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </SheetHeader>

          {/* Body */}
          <div className="overflow-y-auto px-2 py-6">
            {/* Oceny użytkownika */}
            <div>
              <h3 className="font-semibold mb-4 text-gray-800">
                Oceny użytkownika ({reviews.length})
              </h3>
              <ul className="space-y-3">
                {[5, 4, 3, 2, 1].map((s) => (
                  <li key={s} className="flex items-center gap-3 text-sm">
                    <span className="w-20 flex gap-0.5 items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <CustomStar
                          key={i}
                          className={i < s ? "" : "opacity-30"}
                        />
                      ))}
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-[var(--accent-main)] rounded-full transition-all"
                        style={{ width: `${percentByRating[s]}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-gray-600">
                      {percentByRating[s]}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lista opinii */}
            <ul className="divide-y divide-gray-200 mt-6">
              {reviews.map((r) => (
                <li key={r.id} className="py-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <CustomStar
                          key={i}
                          className={i < r.rating ? "" : "opacity-30"}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-zinc-500">
                      od{" "}
                      <Link href={`/uzytkownicy/${r.author_id}`}>
                        <span className="font-bold text-zinc-600">
                          {r.author_username}
                        </span>
                      </Link>{" "}
                      <span className="ml-1 pl-1 border-l">
                        {new Date(r.created_at).toLocaleDateString()}
                      </span>
                    </span>
                  </div>

                  {r.comment && (
                    <Collapsible className="group">
                      {/* Preview widoczne tylko gdy zamknięte */}
                      <p className="text-sm text-gray-700 leading-relaxed group-data-[state=open]:hidden">
                        {truncateAtWord(r.comment, NUMBER_OF_CHARS_IN_REVIEW)}
                      </p>

                      {/* Full text widoczny tylko gdy otwarte */}
                      <CollapsibleContent>
                        <p className="text-sm text-gray-700 leading-relaxed mt-1">
                          {r.comment}
                        </p>
                      </CollapsibleContent>

                      {r.comment.length > NUMBER_OF_CHARS_IN_REVIEW && (
                        <CollapsibleTrigger className="flex items-center gap-1 text-sm text-gray-600 font-semibold mt-2 hover:underline">
                          <span className="group-data-[state=open]:hidden flex items-center gap-1">
                            Czytaj dalej...
                            <ChevronDown className="w-5 h-5" />
                          </span>
                          <span className="hidden group-data-[state=open]:flex items-center gap-1">
                            Zwiń
                            <ChevronDown className="w-5 h-5 rotate-180" />
                          </span>
                        </CollapsibleTrigger>
                      )}
                    </Collapsible>
                  )}
                  <div className="mt-2 flex justify-end">
                    <ReviewReportTrigger reviewId={r.id} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
