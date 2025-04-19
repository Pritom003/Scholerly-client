// Import Next.js middleware helpers.
import { NextRequest, NextResponse } from "next/server";
// Import the helper function that retrieves the current user (via cookies, JWT, etc.).
import { getCurrentUser } from "./app/Services/Authservices";


const roleBasedPrivateRoutes = {
  student: [/^\/student/, /^\/all-tutor/],
  tutor: [/^\/tutor/, /^\/all-tutor/],
  // Admins are allowed to access any route beginning with '/admin'
  admin: [/^\/admin/],
};


const authRoutes = ["/sign-in", "/signUp"];

// --------------------------------------------------------------------
// The main middleware function that runs before your route handlers.
export const middleware = async (request: NextRequest) => {
  // Extract the pathname from the current URL (e.g., '/all-tutor/123').
  const { pathname } = request.nextUrl;

  // Get user information by decoding the token stored in cookies.
  // This could include the user's role and other info.
  const userInfo = await getCurrentUser();

  // If the user is NOT logged in...
  if (!userInfo) {
    // ...but they are trying to access a public auth route, allow them.
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {

      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/sign-in?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as keyof typeof roleBasedPrivateRoutes]) {

    const routes = roleBasedPrivateRoutes[userInfo.role as keyof typeof roleBasedPrivateRoutes];

    if (routes.some((route) => pathname.match(route))) {
      
      return NextResponse.next();
    }
  }

  
  return NextResponse.redirect(new URL("/", request.url));
};


export const config = {
  matcher: [
    "/all-tutor/:page*",  // Protect dynamic /all-tutor routes (e.g., /all-tutor/123)      // Protect shop creation page (e.g., for tutors)
    "/admin/:page*",      // Protect all admin pages
    "/tutor/:page*",      // Protect pages meant for tutors
    "/student/:page*",    // Protect pages meant for students
  ],
};
