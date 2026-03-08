import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const access = cookieStore.get("access")?.value;

    if (!access) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    const res = await fetch(`${BACKEND_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { isAuthenticated: false },
        { status: res.status }
      );
    }

    const user = await res.json();

    return NextResponse.json({
      isAuthenticated: true,
      user,
    });
  } catch (error) {
    console.error("Błąd w /api/me:", error);
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}
