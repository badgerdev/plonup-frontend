import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const city = searchParams.get("city") ?? "";
  const lat = searchParams.get("lat") ?? "";
  const lng = searchParams.get("lng") ?? "";
  const radius_km = searchParams.get("radius_km") ?? "";
  const category = searchParams.get("category") ?? "";
  const type = searchParams.get("type") ?? "";

  const params = new URLSearchParams();
  if (city) params.set("city", city);
  if (lat) params.set("lat", lat);
  if (lng) params.set("lng", lng);
  if (radius_km) params.set("radius_km", radius_km);
  if (category) params.set("category", category);
  if (type) params.set("type", type);

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const headers: HeadersInit = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/nearby?${params.toString()}`,
      { headers }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Błąd serwera", in_city: [], nearby: [] }, { status: 500 });
  }
}
