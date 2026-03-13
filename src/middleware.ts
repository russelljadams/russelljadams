import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const COOKIE_NAME = "auth_token";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const path = req.nextUrl.pathname;

  // Temporarily bypass auth for Amanda's dashboard (REMOVE WHEN PASSWORD IS SET)
  if (path.startsWith("/amanda/dashboard")) {
    return NextResponse.next();
  }

  if (!token) {
    if (path.startsWith("/amanda")) {
      return NextResponse.redirect(new URL("/amanda/login", req.url));
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const role = payload.role as string;

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
