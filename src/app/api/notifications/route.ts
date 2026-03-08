import { getAccessTokenFromCookies } from "@/lib/helpers/auth-cookies/cookies";
import { NextResponse } from "next/server";

export async function GET() {
  const access = await getAccessTokenFromCookies();

  if (!access) {
    return NextResponse.json(
      { detail: "Brak tokena uwierzytelniającego" },
      { status: 401 }
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications`,
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
