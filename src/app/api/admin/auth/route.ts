import { NextRequest, NextResponse } from "next/server";

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || "watech2026";
const COOKIE_NAME = "watech_admin_session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { passkey } = body;

    if (!passkey || passkey !== ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, error: "Incorrect admin passkey. Access denied." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful",
    });

    // Set HTTP-only secure session cookie (valid for 7 days)
    response.cookies.set({
      name: COOKIE_NAME,
      value: `valid_${Date.now()}`,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Authentication processing failed" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Admin logged out successfully",
  });

  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get(COOKIE_NAME);
  if (session && session.value.startsWith("valid_")) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
