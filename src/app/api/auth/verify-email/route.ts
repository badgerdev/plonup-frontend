import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { status: "invalid", message: "Brak tokena." },
        { status: 400 }
      );
    }

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-email`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      }
    );

    const data = await backendRes.json();

    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
    console.error("❌ FRONTEND VERIFY ERROR:", err);
    return NextResponse.json(
      { status: "error", message: "Błąd po stronie frontendu." },
      { status: 500 }
    );
  }
}
