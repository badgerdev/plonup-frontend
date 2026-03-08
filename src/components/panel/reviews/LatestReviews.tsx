import { cookies } from "next/headers";
import { getMyReviews } from "@/lib/helpers/users";
import { CustomStar } from "../../shared/CustomStar";
import Link from "next/link";
import { Review } from "@/lib/helpers/types";
import { truncateAtWord } from "@/lib/helpers/truncate";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, MessageCircleHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewReportTrigger } from "@/components/report/ReviewReportTrigger";

const NUMBER_OF_CHARS_IN_REVIEW = 125;

export default async function LatestReviews() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  if (!access) return null;

  const reviews = await getMyReviews(access);
  const latest = reviews.slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-lg text-zinc-600 font-bold">
          <MessageCircleHeart className="w-8 h-8 text-[var(--accent-main)]" />
          Ostatnie Opinie
        </h3>
      </div>

      {latest.length > 0 ? (
        <ul className="space-y-3">
          {latest.map((r: Review) => (
            <li key={r.id} className="bg-zinc-100 rounded-lg p-3 flex flex-col">
              <div className="flex gap-1 mb-1">
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

              {r.comment && (
                <Collapsible className="group">
                  {/* Preview */}
                  <p className="text-sm text-gray-700 leading-relaxed group-data-[state=open]:hidden">
                    {truncateAtWord(r.comment, NUMBER_OF_CHARS_IN_REVIEW)}
                  </p>

                  {/* Full text */}
                  <CollapsibleContent>
                    <p className="text-sm text-gray-700 leading-relaxed mt-1">
                      {r.comment}
                    </p>
                  </CollapsibleContent>

                  {/* Trigger tylko dla długich komentarzy */}
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

              <div className="flex justify-end mt-2">
                <ReviewReportTrigger reviewId={r.id} />
              </div>
            </li>
          ))}

          {/* Stylizowany przycisk CTA */}
          <div className="flex justify-center mt-4">
            <Link href="/panel/twoje-opinie" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto rounded-full font-medium shadow-sm border-[var(--accent-main)] text-zinc-700 transition"
              >
                Zobacz wszystkie opinie
              </Button>
            </Link>
          </div>
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">Nie masz jeszcze opinii.</p>
      )}
    </div>
  );
}
