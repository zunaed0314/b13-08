"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = ({ href, children }) => {
   const path = usePathname();
   const isActive = path === href;

   return (
      <Link
         href={href}
         className={`btn border [border-color:var(--color-border-custom)] ${
            isActive ? "bg-selected text-selected-content" : "bg-base-100 text-base-content"
         }`}
      >
         {children}
      </Link>
   );
};

export default Navlink;
