import Link from "next/link";
import SunCartLogo from "./Logo/SunCartLogo";
import { ThemeSwitch } from "./ThemeSwitch";
import Navlink from "./Navlink";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import userAvatar from "@/assets/user.png";
import Image from "next/image";
import LogOutButton from "./LogOutButton";
import { IoIosLogOut } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";


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
   console.log("Navbar image:", user?.image);

   const imageSrc = user?.image?.startsWith("http://") || user?.image?.startsWith("https://") ? user.image : userAvatar;

   return (
      <div className="fixed top-0 left-0 z-50 w-full">
         <div className="navbar border-hero-content1/15 bg-hero text-hero-content1 relative border-b px-4 shadow-md sm:px-6 lg:px-10">
            {/* Navbar Start */}
            <div className="navbar-start gap-2">
               <div className="dropdown">
                  <div
                     tabIndex={0}
                     role="button"
                     className="btn btn-ghost hover:bg-hero-content1/10 lg:hidden"
                  >
                     <svg
                        aria-label="Menu"
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
                  </div>

                  <ul
                     tabIndex={-1}
                     className="menu menu-sm dropdown-content border-hero-content1/15 bg-hero text-hero-content1 z-10 mt-3 w-52 space-y-3 rounded-xl border p-3 shadow-xl"
                  >
                     {linkPages}
                  </ul>
               </div>

               <SunCartLogo />
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
               <ul className="menu menu-horizontal items-center gap-3 px-1">{linkPages}</ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end gap-3 sm:gap-5">
               <ThemeSwitch/>

               {user ? (
                  <div className="flex items-center gap-3">
                     <div className="dropdown dropdown-end">
                        <div
                           tabIndex={0}
                           role="button"
                           className="m-1"
                        >
                           <div className="bg-hero-content1/10 flex items-center gap-2 rounded-full py-1 pr-3 pl-1 hover:cursor-pointer">
                              <Image
                                 src={imageSrc}
                                 alt={user.name || "User avatar"}
                                 width={40}
                                 height={40}
                                 className="size-9 rounded-full object-cover"
                              />
                              <span className="hidden text-sm font-semibold sm:inline">{user.name}</span>
                           </div>
                        </div>
                        <ul
                           tabIndex={-1}
                           className="dropdown-content menu bg-base-100 rounded-box z-1 w-max shadow-sm"
                        >
                           <li>
                              <Link href="/profile">
                                 <button className="btn">
                                    <RxAvatar className="size-5" />
                                    Profile
                                 </button>
                              </Link>
                           </li>
                           <li className="flex">
                              <span>
                                 <LogOutButton />
                              </span>
                           </li>
                        </ul>
                     </div>
                  </div>
               ) : (
                  <div className="flex items-center gap-2 sm:gap-3">
                     <Navlink href="/login">Login</Navlink>

                     <Navlink href="/register">Register</Navlink>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default Navbar;
