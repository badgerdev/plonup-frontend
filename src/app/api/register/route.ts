import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();

    // 🔹 Register (BEZ AUTO-LOGINu!) konto utworzone ale wymuszone potwierdzenie maila przed loginem (lub z ograniczonym dostępem).
    // Dlaczego ?
    // użytkownik NIE ma być logowany
    // ma trafić na /potwierdz
    // ma dostać e-mail aktywacyjny
    // dopiero po kliknięciu linku w mailu będzie mógł NORMALNIE się zalogować
    // aż do tego momentu i tak miałby ograniczenia, ale my nie chcemy go logować z automat
    const registerRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    );

    const registerData = await registerRes.json();

    if (!registerRes.ok) {
      return NextResponse.json(
        { error: registerData.detail || "Błąd rejestracji" },
        { status: registerRes.status }
      );
    }

    // 🔹 Sukces rejestracji
    return NextResponse.json(
      {
        success: true,
        message:
          "Rejestracja udana. Sprawdź skrzynkę e-mail i potwierdź konto.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Błąd w rejestracji:", error);
    return NextResponse.json(
      { error: "Nie udało się połączyć z serwerem" },
      { status: 500 }
    );
  }
}
