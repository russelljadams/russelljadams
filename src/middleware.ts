import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const COOKIE_NAME = "auth_token";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const path = req.nextUrl.pathname;

  if (!token) {
    // Redirect to the appropriate login page
    if (path.startsWith("/amanda")) {
      return NextResponse.redirect(new URL("/amanda/login", req.url));
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const role = payload.role as string;

    // Amanda routes: only viewer role
    if (path.startsWith("/amanda/dashboard") && role !== "viewer") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Admin routes: redirect Amanda to her dashboard
    if (path.startsWith("/dashboard") && !path.startsWith("/amanda") && role === "viewer") {
      return NextResponse.redirect(new URL("/amanda/dashboard", req.url));
    }

    return NextResponse.next();
  } catch {
    if (path.startsWith("/amanda")) {
      return NextResponse.redirect(new URL("/amanda/login", req.url));
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/amanda/dashboard/:path*"],
};
