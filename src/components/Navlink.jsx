"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = ({ href, children }) => {
   const path = usePathname();
   const isActive = path === href;

   return (
      <Link
         href={href}
         className={`btn border border-transparent transition-all duration-200 ${
            isActive
               ? "bg-primary text-primary-content shadow-sm"
               : "text-hero-content1 hover:border-hero-content1/15 hover:bg-hero-content1/10 bg-base-100"
         }`}
      >
         {children}
      </Link>
   );
};

export default Navlink;
