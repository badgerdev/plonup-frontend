import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromCookies } from "@/lib/helpers/auth-cookies/cookies";

export async function POST(req: NextRequest) {
  const access = await getAccessTokenFromCookies();

  if (!access) {
    return NextResponse.json({ detail: "Brak autoryzacji." }, { status: 401 });
  }

  try {
    const body = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/moderation/reports`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ detail: "Server error" }, { status: 500 });
  }
}
