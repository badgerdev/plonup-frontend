import { cookies } from "next/headers";
import { getMyReviews } from "@/lib/helpers/users";
import { Review } from "@/lib/helpers/types";
import AllReviews from "@/components/panel/reviews/AllReviews";
import { ScrollToTopButton } from "@/components/shared/ScrollToTopButton";

export default async function UserReviewsPage() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    return (
      <p className="text-gray-500">
        Musisz być zalogowany, aby zobaczyć opinie.
      </p>
    );
  }

  const reviews: Review[] = await getMyReviews(access);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Twoje opinie <span className="font-light">({reviews.length})</span>
      </h1>
      <AllReviews reviews={reviews} />
      <ScrollToTopButton />
    </div>
  );
}
