import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Brak e-maila w żądaniu." },
        { status: 400 }
      );
    }

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/public-resend-verification`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await backendRes.json();

    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
    console.error("❌ PUBLIC RESEND ERROR:", err);
    return NextResponse.json(
      { status: "error", message: "Błąd po stronie frontendu." },
      { status: 500 }
    );
  }
}
