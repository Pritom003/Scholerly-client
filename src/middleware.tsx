import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./app/Services/Authservices";

// Public routes that anyone can access (including unauthenticated users)
const publicRoutes = [
  "/sign-in",
  "/signUp",
  "/all-tutor",          // Allow access to tutor list
];

// Role-based protected route patterns
const roleBasedPrivateRoutes = {
  student: [/^\/student/],
  tutor: [/^\/tutor/],
  admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Allow all public routes
  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Get logged-in user info (from cookies or headers)
  const userInfo = await getCurrentUser();

  // If not logged in and not accessing a public route, redirect to sign-in
  if (!userInfo) {
    return NextResponse.redirect(
      new URL(
        `/sign-in?redirectPath=${pathname}`,
        request.nextUrl.origin
      )
    );
  }

  // Enforce role-based route protection
  const userRole = userInfo.role as keyof typeof roleBasedPrivateRoutes;
  const allowedRoutes = roleBasedPrivateRoutes[userRole];

  if (allowedRoutes && allowedRoutes.some((regex) => regex.test(pathname))) {
    return NextResponse.next();
  }

  // If authenticated but trying to access a protected route not matching their role
  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    // Only match routes that need protection
    "/admin/:path*",
    "/tutor/:path*",
    "/student/:path*",
    // Do NOT include /all-tutor or /sign-in here
  ],
};
