import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/lib/helpers/auth-cookies/cookies";

export async function POST() {
  const response = NextResponse.json({ success: true });
  clearAuthCookies(response);
  return response;
}
