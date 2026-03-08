import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/locations`
    );

    if (!res.ok) {
      return NextResponse.json(
        { detail: "Błąd pobierania lokalizacji" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Proxy error /locations:", err);
    return NextResponse.json(
      { detail: "Nie udało się pobrać lokalizacji." },
      { status: 500 }
    );
  }
}
