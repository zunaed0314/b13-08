import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request) {
   const pathname = request.nextUrl.pathname;

   const protectedRoutes = ["/profile", "/dashboard"];

   const isProtectedRoute =
      protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`)) || /^\/products\/[^/]+(?:\/.*)?$/.test(pathname);

   if (!isProtectedRoute) {
      return NextResponse.next();
   }

   const session = await auth.api.getSession({
      headers: request.headers,
   });

   if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackURL", pathname + request.nextUrl.search);

      return NextResponse.redirect(loginUrl);
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/profile/:path*", "/dashboard/:path*", "/products/:path*"],
};
