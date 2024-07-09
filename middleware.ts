import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/site")
  ) {
    return NextResponse.next();
  }
  const user = request.cookies.get("user");

  if (pathname.startsWith("/") && !user) {
    return NextResponse.rewrite(new URL("/site", request.url));
  }
  if (!user) {
    return NextResponse.redirect(new URL("/site", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|login|signup|site).*)",
  ],
};
