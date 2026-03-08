import { Review } from "@/lib/helpers/types";
import { CustomStar } from "@/components/shared/CustomStar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { truncateAtWord } from "@/lib/helpers/truncate";
import Link from "next/link";
import { ReviewReportTrigger } from "@/components/report/ReviewReportTrigger";

type AllReviewsProps = {
  reviews: Review[];
};

const CHARS_TO_DISPLAY = 187;

export default function AllReviews({ reviews }: AllReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-600 mb-6">Brak opinii.</p>;
  }

  return (
    <ul className="space-y-4">
      {reviews.map((r) => (
        <li
          key={r.id}
          className="bg-zinc-100 rounded-xl border border-gray-200 p-4"
        >
          {/* Header (gwiazdki + autor + data) */}
          <div className="flex flex-col items-start mb-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <CustomStar
                  key={i}
                  className={i < r.rating ? "" : "opacity-30"}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 mb-4">
              od{" "}
              <Link href={`/uzytkownicy/${r.author_id}`}>
                <span className="font-medium">{r.author_username}</span> •{" "}
              </Link>
              {new Date(r.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Komentarz z Collapsible */}
          {r.comment && (
            <Collapsible className="group">
              {/* Preview — widoczny tylko, gdy Collapsible zamknięty */}
              <p className="text-sm text-gray-700 leading-relaxed group-data-[state=open]:hidden">
                {truncateAtWord(r.comment, CHARS_TO_DISPLAY)}
              </p>

              {/* Pełny tekst */}
              <CollapsibleContent>
                <p className="text-sm text-gray-700 leading-relaxed mt-1">
                  {r.comment}
                </p>
              </CollapsibleContent>

              {/* Trigger */}
              {r.comment.length > CHARS_TO_DISPLAY && (
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

          {/* Report button */}
          <div className="flex justify-end mt-2">
            <ReviewReportTrigger reviewId={r.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}
