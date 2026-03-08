import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromCookies } from "@/lib/helpers/auth-cookies/cookies";

// GET – pojedyncze ogłoszenie użytkownika
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const access = await getAccessTokenFromCookies();

  if (!access) {
    return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/my/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

// PATCH – ONLY STATUS CHANGE
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

    const rawBody = await request.json();

    const status = String(rawBody?.status || "").trim();

    if (!status) {
      return NextResponse.json({ error: "Brak statusu" }, { status: 400 });
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/my/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("❌ Błąd PATCH ogłoszenia:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera podczas edycji ogłoszenia." },
      { status: 500 }
    );
  }
}

// DELETE – usuwanie ogłoszenia
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  try {
    const access = await getAccessTokenFromCookies();
    if (!access) {
      return NextResponse.json({ error: "Brak autoryzacji." }, { status: 401 });
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/my/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );

    const text = await res.text();

    if (!res.ok) {
      return NextResponse.json({ error: text }, { status: res.status });
    }

    return NextResponse.json({ message: "Ogłoszenie usunięte" });
  } catch (error) {
    console.error("❌ Błąd DELETE ogłoszenia:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera podczas usuwania ogłoszenia." },
      { status: 500 }
    );
  }
}
