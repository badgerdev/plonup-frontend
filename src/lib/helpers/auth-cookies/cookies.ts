import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const cookieOptions = {
  httpOnly: true,
  secure: true, // 🔒 HTTPS tylko (działa na prod)
  sameSite: "lax" as const,
  path: "/",
  maxAge: 3600,
};

export async function getAccessTokenFromCookies() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access");
  return access?.value || null;
}

export function setAuthCookies(
  res: NextResponse,
  access: string,
  refresh: string
) {
  res.cookies.set("access", access, cookieOptions);
  res.cookies.set("refresh", refresh, {
    ...cookieOptions,
    maxAge: 3600 * 24,
  });
}

export function clearAuthCookies(res: NextResponse) {
  res.cookies.set("access", "", { ...cookieOptions, maxAge: 0 });
  res.cookies.set("refresh", "", { ...cookieOptions, maxAge: 0 });
}
