import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";

  // 1. Static asset and internal file bypass
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin")) {
    const adminCookie = request.cookies.get("watech_admin_session");
    const isAuthenticated = Boolean(adminCookie && adminCookie.value.startsWith("valid_"));

    if (pathname === "/admin/login") {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Multi-Tenant Subdomain Routing
  // Checks if accessed via subdomains (e.g. realestate.waseemabbas.online or realestate.localhost:3000)
  if (host.startsWith("realestate.") && pathname === "/") {
    return NextResponse.rewrite(new URL("/real-estate", request.url));
  }

  if (host.startsWith("furniture.") && pathname === "/") {
    return NextResponse.rewrite(new URL("/furniture", request.url));
  }

  if (host.startsWith("agency.") && pathname === "/") {
    return NextResponse.rewrite(new URL("/agency", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
