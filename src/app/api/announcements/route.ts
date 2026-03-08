import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("access")?.value;

  try {
    const formData = await req.formData();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
        body: formData,
      }
    );

    const rawText = await res.text();

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      console.error("❌ Backend zwrócił nie-JSON:", rawText);
      return NextResponse.json(
        { detail: "Błąd serwera (niepoprawny JSON)", raw: rawText },
        { status: 500 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Błąd proxy:", err);
    return NextResponse.json(
      { detail: "Nie udało się połączyć z serwerem." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const location = searchParams.get("location");
    const announcement_type = searchParams.get("type");

    const backendUrl = new URL(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/`
    );

    if (category) backendUrl.searchParams.set("category", category);
    if (location) backendUrl.searchParams.set("location", location);
    if (announcement_type)
      backendUrl.searchParams.set("type", announcement_type);

    const cookieStore = await cookies();
    const access = cookieStore.get("access")?.value;

    const res = await fetch(backendUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(access ? { Cookie: `access=${access}` } : {}), // ręczne przekazanie
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json(err, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Błąd proxy GET /announcements:", err);
    return NextResponse.json(
      { detail: "Nie udało się pobrać ogłoszeń." },
      { status: 500 }
    );
  }
}
