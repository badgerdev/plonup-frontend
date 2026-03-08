import { NextResponse } from "next/server";
import { getAccessTokenFromCookies } from "@/lib/helpers/auth-cookies/cookies";

type Params = {
  params: { id: string };
};

// 🔹 Pobranie lajków i stanu użytkownika
export async function GET(req: Request, { params }: Params) {
  const { id } = await params;
  const access = await getAccessTokenFromCookies();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/${id}/likes`,
      {
        method: "GET",
        headers: {
          ...(access ? { Authorization: `Bearer ${access}` } : {}),
        },
        credentials: "include",
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("❌ Likes proxy error:", err);
    return NextResponse.json(
      { error: "Błąd pobierania lajków." },
      { status: 500 }
    );
  }
}
