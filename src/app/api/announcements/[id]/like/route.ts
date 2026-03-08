import { NextResponse } from "next/server";
import { getAccessTokenFromCookies } from "@/lib/helpers/auth-cookies/cookies";

type Params = {
  params: { id: string };
};

export async function POST(req: Request, { params }: Params) {
  const { id } = await params;
  const access = await getAccessTokenFromCookies();

  if (!access) {
    return NextResponse.json(
      { error: "Musisz być zalogowany, aby polubić ogłoszenie." },
      { status: 401 }
    );
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/${id}/like`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
        },
        credentials: "include",
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("❌ Like proxy error:", err);
    return NextResponse.json(
      { error: "Błąd połączenia z backendem." },
      { status: 500 }
    );
  }
}
