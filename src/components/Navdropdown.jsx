"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";


const NavDropdown = ({ label, trigger, triggerClassName = "", menuClassName = "", align = "start", children }) => {
   const ref = useRef(null);
   const pathname = usePathname();

   const close = useCallback(() => {
      if (ref.current) ref.current.open = false;
   }, []);

   useEffect(() => {
      close();
   }, [pathname, close]);

   useEffect(() => {
      const onPointerDown = (event) => {
         if (ref.current?.open && !ref.current.contains(event.target)) close();
      };
      const onKeyDown = (event) => {
         if (event.key === "Escape") close();
      };

      document.addEventListener("pointerdown", onPointerDown);
      document.addEventListener("keydown", onKeyDown);
      return () => {
         document.removeEventListener("pointerdown", onPointerDown);
         document.removeEventListener("keydown", onKeyDown);
      };
   }, [close]);

   return (
      <details
         ref={ref}
         className={`dropdown ${align === "end" ? "dropdown-end" : ""}`}
      >
         <summary
            aria-label={label}
            className={`list-none [&::-webkit-details-marker]:hidden ${triggerClassName}`}
         >
            {trigger}
         </summary>
         <div
            className={`dropdown-content ${menuClassName}`}
            onClick={(event) => {
               const target = event.target;
               if (target.closest("[data-keep-open]")) return;
               if (target.closest("a, button")) close();
            }}
         >
            {children}
         </div>
      </details>
   );
};

export default NavDropdown;
