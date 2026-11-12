"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";


const emptySubscribe = () => () => {};

export function ThemeSwitch() {
   const { resolvedTheme, setTheme } = useTheme();

   const mounted = useSyncExternalStore(
      emptySubscribe,
      () => true,
      () => false,
   );

   if (!mounted) {
      return (
         <input
            type="checkbox"
            className="toggle"
            disabled
         />
      );
   }

   return (
      <div className="mr-4 flex items-center gap-2">
         <button
            className="btn"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
         >
            {resolvedTheme === "dark" ? <FaMoon className="size-5" /> : <MdLightMode className="size-6" />}
         </button>
         {/* <input
            type="checkbox"
            className="toggle transition-all duration-300"
            checked={resolvedTheme === "dark"}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
         /> */}
      </div>
   );
}
