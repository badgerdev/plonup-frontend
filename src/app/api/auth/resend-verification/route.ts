import { NextResponse } from "next/server";
import { getAccessTokenFromCookies } from "@/lib/helpers/auth-cookies/cookies";

export async function POST() {
  try {
    // helper do cookies
    const access = await getAccessTokenFromCookies();

    if (!access) {
      return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
    }

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/resend-verification`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: data.detail || "Nie udało się wysłać ponownie" },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ status: "sent" }, { status: 200 });
  } catch (err) {
    console.error("❌ resend-verification ERROR:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
