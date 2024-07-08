import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
    return NextResponse.next();
  }
  const user = request.cookies.get("user");
  if (!user) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|login|signup).*)"],
};
