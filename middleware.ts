import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { routes } from "./lib/routes"

// Define public routes that don't require authentication
const publicRoutes = [
  "/welcome",
  "/onboarding",
  "/auth/signin",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/reset-success",
  "/auth/verify-phone",
  "/auth/verify",
  "/auth/pin",
  "/auth/success",
  "/auth/logout",
]

// Static file extensions to ignore
const staticFileExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".ico",
  ".svg",
  ".css",
  ".js",
  ".json",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    staticFileExtensions.some((ext) => pathname.endsWith(ext))
  ) {
    return NextResponse.next()
  }

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  // Get auth token from cookies
  const authToken = request.cookies.get("auth-token")?.value

  // Get onboarding status
  const hasCompletedOnboarding = request.cookies.get("onboarding-complete")?.value

  // If user is authenticated and tries to access auth pages, redirect to home
  if (authToken && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL(routes.app.home, request.url))
  }

  // If user is not authenticated and tries to access protected routes
  if (!authToken && !isPublicRoute) {
    // Store the original URL to redirect back after login
    const url = new URL(routes.auth.signIn, request.url)
    url.searchParams.set("callbackUrl", encodeURIComponent(request.url))
    return NextResponse.redirect(url)
  }

  // If user has not completed onboarding and is authenticated
  if (
    authToken &&
    !hasCompletedOnboarding &&
    !pathname.startsWith("/onboarding") &&
    !pathname.startsWith("/welcome") &&
    !isPublicRoute
  ) {
    return NextResponse.redirect(new URL(routes.onboarding.welcome, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}

