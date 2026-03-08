import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromCookies } from "@/lib/helpers/auth-cookies/cookies";

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  try {
    const access = await getAccessTokenFromCookies();
    if (!access) {
      return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
    }

    const body = await request.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/panel/${id}/resubmit`,
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
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("❌ Błąd ponownego wysłania ogłoszenia:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas wysyłania ogłoszenia do moderacji." },
      { status: 500 }
    );
  }
}
