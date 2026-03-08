import { NextResponse } from "next/server";
import { getAccessTokenFromCookies } from "@/lib/helpers/auth-cookies/cookies";
import { clearAuthCookies } from "@/lib/helpers/auth-cookies/cookies";

export async function POST(req: Request) {
  const body = await req.json();

  const access = await getAccessTokenFromCookies();
  if (!access) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Nieprawidłowe hasło" },
      { status: res.status }
    );
  }

  // 🔥 wyloguj WSZYSTKO po zmianie hasła
  const response = NextResponse.json({ ok: true });
  clearAuthCookies(response);
  return response;
}
