import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromCookies } from "@/lib/helpers/auth-cookies/cookies";

export async function GET(req: NextRequest) {
  try {
    const access = await getAccessTokenFromCookies();
    if (!access) {
      return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const moderation_status = searchParams.get("moderation_status"); // ✅ nowy parametr

    const query = new URLSearchParams();
    if (status) query.append("status", status);
    if (type) query.append("type", type);
    if (moderation_status) query.append("moderation_status", moderation_status); // ✅ dodane

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/announcements/my-announcements?${query.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("❌ route.ts GET /my-announcements error:", error);
    return NextResponse.json({ error: "Błąd serwera proxy" }, { status: 500 });
  }
}
