import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  ADMIN_ROUTE_PREFIX,
  AUTH_ROUTES,
  getHomeRouteForRole,
  isAdminRole,
  ROLE_COOKIE,
  TOKEN_COOKIE,
  USER_ROUTE_PREFIX,
} from "@/constants";

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isUserRoute(pathname: string) {
  return (
    pathname === USER_ROUTE_PREFIX || pathname.startsWith(`${USER_ROUTE_PREFIX}/`)
  );
}

function isAdminRoute(pathname: string) {
  return (
    pathname === ADMIN_ROUTE_PREFIX || pathname.startsWith(`${ADMIN_ROUTE_PREFIX}/`)
  );
}

function isProtectedRoute(pathname: string) {
  return isUserRoute(pathname) || isAdminRoute(pathname);
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const role = request.cookies.get(ROLE_COOKIE)?.value;
  const { pathname } = request.nextUrl;
  const isAuthenticated = Boolean(token);

  if (isAuthenticated && isAuthRoute(pathname)) {
    return NextResponse.redirect(
      new URL(getHomeRouteForRole(role ?? "user"), request.url),
    );
  }

  if (!isAuthenticated && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isAuthenticated && isAdminRole(role) && isUserRoute(pathname)) {
    return NextResponse.redirect(new URL(ADMIN_ROUTE_PREFIX, request.url));
  }

  if (isAuthenticated && !isAdminRole(role) && isAdminRoute(pathname)) {
    return NextResponse.redirect(new URL(USER_ROUTE_PREFIX, request.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(
        isAuthenticated ? getHomeRouteForRole(role ?? "user") : "/auth/login",
        request.url,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/admin",
    "/admin/:path*",
  ],
};
