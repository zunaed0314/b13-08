import Link from "next/link";
import SunCartLogo from "./Logo/SunCartLogo";
import { ThemeSwitch } from "./ThemeSwitch";
import Navlink from "./Navlink";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import userAvatar from "@/assets/user.png";
import Image from "next/image";
import LogOutButton from "./LogOutButton";
import { RxAvatar } from "react-icons/rx";
import NavDropdown from "./Navdropdown";

const Navbar = async () => {
   const linkPages = (
      <>
         <Navlink href="/">Home</Navlink>
         <Navlink href="/products">Products</Navlink>
         <Navlink href="/profile">Profile</Navlink>
      </>
   );

   const session = await auth.api.getSession({
      headers: await headers(),
   });

   const user = session?.user;

   const imageSrc = user?.image?.startsWith("http://") || user?.image?.startsWith("https://") ? user.image : userAvatar;

   return (
      <header className="fixed inset-x-0 top-0 z-50">
         <div className="navbar border-hero-content1/15 bg-hero text-hero-content1 border-b px-3 shadow-md sm:px-6 lg:px-10">
            <div className="navbar-start w-auto min-w-0 flex-1 gap-1 sm:gap-2">
               <div className="lg:hidden">
                  <NavDropdown
                     label="Open menu"
                     triggerClassName="btn btn-ghost btn-square hover:bg-hero-content1/10"
                     menuClassName="border-hero-content1/15 bg-hero text-hero-content1 z-10 mt-3 w-72 max-w-[calc(100vw-1.5rem)] rounded-xl border p-3 shadow-xl"
                     trigger={
                        <svg
                           aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-5 w-5"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 6h16M4 12h8m-8 6h16"
                           />
                        </svg>
                     }
                  >
                     <ul className="menu w-full gap-1 p-0 [&_a]:min-h-11 [&_a]:items-center">{linkPages}</ul>

                     {!user && (
                        <ul className="menu border-hero-content1/15 mt-2 w-full gap-1 border-t p-0 pt-2 sm:hidden [&_a]:min-h-11 [&_a]:items-center">
                           <Navlink href="/login">Login</Navlink>
                           <Navlink href="/register">Register</Navlink>
                        </ul>
                     )}

                     <div
                        data-keep-open
                        className="border-hero-content1/15 mt-2 flex items-center justify-between border border-t px-1 sm:hidden"
                     >
                        <span className="text-sm font-semibold">Theme</span>
                        <ThemeSwitch />
                     </div>
                  </NavDropdown>
               </div>

               <div className="min-w-0 shrink overflow-hidden">
                  <SunCartLogo />
               </div>
            </div>

            {/* Navbar Center */}
            <nav
               aria-label="Main"
               className="navbar-center hidden lg:flex"
            >
               <ul className="menu menu-horizontal items-center gap-3 px-1">{linkPages}</ul>
            </nav>

            {/* Navbar End */}
            <div className="navbar-end w-auto shrink-0 gap-2 sm:gap-4 lg:flex-1 lg:gap-5">
               <div className="hidden sm:block">
                  <ThemeSwitch />
               </div>

               {user ? (
                  <NavDropdown
                     label="Open account menu"
                     align="end"
                     triggerClassName="bg-base-100/80 text-base-content ring-hero-content1/20 hover:ring-primary flex cursor-pointer items-center gap-2 rounded-full py-1 pr-1 pl-1 ring-1 transition-all sm:pr-3"
                     menuClassName="bg-base-100 text-base-content border-base-content/10 rounded-box z-1 mt-2 w-56 max-w-[calc(100vw-1.5rem)] border p-2 shadow-xl"
                     trigger={
                        <>
                           <Image
                              src={imageSrc}
                              alt={user.name || "User avatar"}
                              width={40}
                              height={40}
                              className="ring-primary size-9 rounded-full object-cover ring-2"
                           />
                           <span className="hidden max-w-32 truncate text-sm font-semibold sm:inline">{user.name}</span>
                        </>
                     }
                  >
                     <ul className="menu w-full gap-1 p-0 [&_a]:min-h-11 [&_a]:items-center [&_button]:min-h-11">
                        <li>
                           <Link
                              href="/profile"
                              className="hover:bg-primary/10 gap-2 font-semibold"
                           >
                              <RxAvatar className="text-primary size-5" />
                              Profile
                           </Link>
                        </li>
                        <li>
                           <LogOutButton />
                        </li>
                     </ul>
                  </NavDropdown>
               ) : (
                  <div className="hidden items-center gap-2 sm:flex sm:gap-3">
                     <Navlink href="/login">Login</Navlink>
                     <Navlink href="/register">Register</Navlink>
                  </div>
               )}
            </div>
         </div>
      </header>
   );
};

export default Navbar;
