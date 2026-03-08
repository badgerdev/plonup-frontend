// app/api/my-announcements/images/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const token = req.cookies.get("access")?.value;
  const formData = await req.formData();
  const { id } = await context.params;
  const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/my/${id}/images`;

  try {
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ POST /images error:", err);
    return NextResponse.json(
      { detail: "Błąd połączenia z backendem" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const token = req.cookies.get("access")?.value;
  const { id } = await context.params;
  const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/announcements/images/${id}`;

  try {
    const res = await fetch(backendUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ DELETE /images error:", err);
    return NextResponse.json(
      { detail: "Błąd połączenia z backendem" },
      { status: 500 }
    );
  }
}
