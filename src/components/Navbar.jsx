import Link from "next/link";
import React from "react";
import { RxAvatar } from "react-icons/rx";
import SunCartLogo from "./Logo/SunCartLogo";
import { ThemeSwitch } from "./ThemeSwitch";
import { CiLight } from "react-icons/ci";
import Navlink from "./Navlink";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import userAvatar from "@/assets/user.png";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";
import LogOutButton from "./LogOutButton";

const Navbar = async () => {
   const linkPages = (
      <>
         <Navlink href={"/"}>Home</Navlink>
         <Navlink href={"/products"}>Products</Navlink>
         <Navlink href={"/profile"}>Profile</Navlink>
      </>
   );

   let loggedIn = false;

   const session = await auth.api.getSession({
      headers: await headers(),
   });

   if (session) {
      console.log("Egula session details: ", session);
   }

   const user = session?.user;

   const imageSrc = user?.image?.startsWith("http://") || user?.image?.startsWith("https://") ? user.image : userAvatar;

   return (
      <div className="fixed top-0 left-0 z-50 w-full">
         <div className="navbar bg-base-100 shadow-lg">
            <div className="navbar-start">
               <div className="dropdown">
                  <div
                     tabIndex={0}
                     role="button"
                     className="btn btn-ghost lg:hidden"
                  >
                     <svg
                        aria-label="Menu"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        {" "}
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M4 6h16M4 12h8m-8 6h16"
                        />{" "}
                     </svg>
                  </div>
                  <ul
                     tabIndex={-1}
                     className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 space-y-3 p-2 shadow"
                  >
                     {linkPages}
                  </ul>
               </div>
               <div className="">
                  <SunCartLogo></SunCartLogo>
               </div>
            </div>
            <div className="navbar-center hidden lg:flex">
               <ul className="menu menu-horizontal flex gap-5 px-1">{linkPages}</ul>
            </div>
            <div className="navbar-end flex gap-4">
               <ul className="flex gap-1 md:gap-6 lg:gap-10">
                  <li className="flex items-center gap-2">
                     <ThemeSwitch />
                  </li>
                  {user ? (
                     <>
                        <li className="flex items-center gap-2">
                           <Image
                              src={imageSrc}
                              alt={user.name}
                              width={50}
                              height={50}
                              className="size-8 rounded-full"
                           ></Image>
                           <span>{user.name}</span>
                        </li>
                        <li>
                           <LogOutButton></LogOutButton>
                        </li>
                     </>
                  ) : (
                     <ul className="flex gap-3">
                        <Link href="/login">
                           <button className="btn border [border-color:var(--color-border-custom)]">Login</button>
                        </Link>
                        <li>
                           <Link href="/register">
                              <button className="btn border [border-color:var(--color-border-custom)]">Register</button>
                           </Link>
                        </li>
                     </ul>
                  )}
                  {/* {user ? (
                     <></>
                  ) : (
                     <>
                        <Link href="/login">
                           <button className="btn border [border-color:var(--color-border-custom)]">Login</button>
                        </Link>
                     </>
                  )} */}
               </ul>
               {/* <ThemeSwitch /> */}
            </div>
         </div>
      </div>
   );
};

export default Navbar;
