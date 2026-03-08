import { getAccessTokenFromCookies } from "@/lib/helpers/auth-cookies/cookies";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const access = await getAccessTokenFromCookies();

  if (!access) {
    return NextResponse.json(
      { detail: "Brak tokena uwierzytelniającego" },
      { status: 401 }
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/${id}/read`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
