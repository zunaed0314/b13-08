"use client";

import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";

const LogOutButton = () => {
   const router = useRouter();
   const pathname = usePathname();

   const protectedRoutes = ["/profile", "/dashboard"];

   const isProtectedRoute =
      protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`)) || /^\/products\/[^/]+(?:\/.*)?$/.test(pathname);

   const handleLogout = async () => {
      const { error } = await authClient.signOut();

      if (error) {
         console.error("Logout failed:", error);
         return;
      }

      if (isProtectedRoute) {
         router.replace("/login");
      }

      router.refresh();
   };

   return (
      <button
         onClick={handleLogout}
         className="btn bg-red-700 text-white"
      >
         LOGOUT
      </button>
   );
};

export default LogOutButton;
