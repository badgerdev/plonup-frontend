import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromCookies } from "@/lib/helpers/auth-cookies/cookies";

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const access = await getAccessTokenFromCookies();

  if (!access) {
    return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
  }

  try {
    const rawBody = await request.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/my/${id}/edit`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rawBody),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("❌ Błąd podczas edycji ogłoszenia:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd po stronie serwera." },
      { status: 500 }
    );
  }
}
