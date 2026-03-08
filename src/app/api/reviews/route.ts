import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("access")?.value;

  try {
    const body = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Błąd proxy POST /reviews:", err);
    return NextResponse.json(
      { detail: "Nie udało się dodać opinii." },
      { status: 500 }
    );
  }
}
