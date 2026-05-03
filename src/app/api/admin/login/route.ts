import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;
  const cookieSecret = process.env.ADMIN_COOKIE_SECRET;

  if (username === validUser && password === validPass && cookieSecret) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", cookieSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });
    return response;
  }

  return NextResponse.json(
    { success: false, message: "Invalid username or password." },
    { status: 401 }
  );
}
