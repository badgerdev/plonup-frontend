import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromCookies } from "@/lib/helpers/auth-cookies/cookies";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const access = await getAccessTokenFromCookies();
    if (!access) {
      return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
    }

    const body = await request.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/${params.id}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("❌ Błąd podczas aktualizacji statusu:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera podczas zmiany statusu." },
      { status: 500 }
    );
  }
}
