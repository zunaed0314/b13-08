import Link from "next/link";
import React from "react";

export default function SunCartLogo() {
   return (
      <Link
         href="/"
         className="flex items-center gap-2"
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            className="size-10"
         >
            {/* Sun rays */}
            <g
               stroke="#F59E0B"
               strokeWidth="3"
               strokeLinecap="round"
            >
               <path d="M24 3v5" />
               <path d="M24 40v5" />
               <path d="M3 24h5" />
               <path d="M40 24h5" />
               <path d="m9.15 9.15 3.54 3.54" />
               <path d="m35.31 35.31 3.54 3.54" />
               <path d="m38.85 9.15-3.54 3.54" />
            </g>

            {/* Sun */}
            <circle
               cx="24"
               cy="24"
               r="10"
               fill="#FBBF24"
            />

            {/* Shopping cart */}
            <path
               d="M17 20h14l-1.5 10h-11L17 20Z"
               fill="#9333EA"
               stroke="#9333EA"
               strokeWidth="1.5"
               strokeLinejoin="round"
            />
            <path
               d="M20 20l4-5 4 5"
               stroke="#FFFFFF"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
            />
            <circle
               cx="20"
               cy="34"
               r="2"
               fill="#9333EA"
            />
            <circle
               cx="29"
               cy="34"
               r="2"
               fill="#9333EA"
            />
         </svg>

         <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-base-content">Sun</span>
            <span className="text-primary">Cart</span>
         </span>
      </Link>
   );
}
