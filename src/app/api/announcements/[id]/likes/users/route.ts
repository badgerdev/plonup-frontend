import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "20";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/${id}/likes/users?page=${page}&limit=${limit}`,
      { method: "GET", cache: "no-store" }
    );

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json(err, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Likes users proxy error:", err);
    return NextResponse.json(
      { error: "Nie udało się pobrać polubień." },
      { status: 500 }
    );
  }
}
