import { cookies } from "next/headers";
import { getUserScore } from "@/lib/helpers/users";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CustomStar } from "@/components/shared/CustomStar";
import { UserScoringLabel } from "../users-public/UserScoringLabel";

export default async function UserScoreCard() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    return null; // user niezalogowany → nic nie pokazujemy
  }

  const data = await getUserScore(access);

  if (!data || data.reviews_count === 0) {
    return (
      <Card className="rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Twoja średnia</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Brak opinii.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex flex-col gap-2">
          <div>
            Twoja średnia:{" "}
            <span className="font-bold text-2xl text-gray-900">
              {data.average_rating.toFixed(1)}/5
            </span>
          </div>
          <p className="text-xs text-gray-500">
            ( Na podstawie {data.reviews_count} opinii )
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <CustomStar
              key={i}
              className={
                i < Math.round(data.average_rating) ? "" : "opacity-30"
              }
            />
          ))}
        </div>
        <UserScoringLabel avg={data.average_rating} />
      </CardContent>
    </Card>
  );
}
