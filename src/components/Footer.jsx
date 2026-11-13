import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaInstagramSquare, FaSun } from "react-icons/fa";
import { FiArrowUpRight, FiMail, FiPhone } from "react-icons/fi";
import SunCartLogo from "./Logo/SunCartLogo";

const Footer = () => {
   return (
      <footer className="bg-hero text-hero-content1 relative mt-24 w-full overflow-hidden">
         {/* Decorative background */}
         <div className="bg-primary/10 pointer-events-none absolute -top-32 right-10 size-72 rounded-full blur-3xl" />

         <div className="relative container mx-auto px-6 pt-14 pb-10">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
               {/* Brand */}
               <div className="flex flex-col gap-5 md:col-span-2">
                  <SunCartLogo />

                  <p className="max-w-sm text-md leading-7 opacity-80">
                     Your one-stop shop for summer essentials — sunglasses, outfits, skincare, and beach accessories. Bring sunshine to your everyday
                     style.
                  </p>

                  <div className="text-primary flex items-center gap-2 text-lg font-medium tracking-widest uppercase">
                     <span className="bg-primary h-px w-8" />
                     Shop the sunshine
                  </div>
               </div>

               {/* Contact */}
               <div className="flex flex-col gap-5">
                  <h3 className="text-hero-content2 text-lg font-bold tracking-widest uppercase">Get in touch</h3>

                  <div className="flex flex-col gap-4">
                     <a
                        href="mailto:zunaedaman@gmail.com"
                        className="group hover:text-primary flex items-center gap-3 text-md transition-colors"
                     >
                        <span className="bg-hero-content1/10 group-hover:bg-primary/15 flex size-9 items-center justify-center rounded-lg transition-colors">
                           <FiMail className="size-4" />
                        </span>
                        zunaedaman@gmail.com
                     </a>

                     <a
                        href="tel:+8801774664377"
                        className="group hover:text-primary flex items-center gap-3 text-md transition-colors"
                     >
                        <span className="bg-hero-content1/10 group-hover:bg-primary/15 flex size-9 items-center justify-center rounded-lg transition-colors">
                           <FiPhone className="size-4" />
                        </span>
                        +880 1774 664377
                     </a>
                  </div>
               </div>

               {/* Legal */}
               <div className="flex flex-col gap-5">
                  <h3 className="text-hero-content2 text-lg font-bold tracking-widest uppercase">Information</h3>

                  <div className="flex flex-col items-start gap-4">
                     <Link
                        href="/privacy"
                        className="group hover:text-primary flex items-center gap-1 text-md opacity-80 transition-all hover:translate-x-1 hover:opacity-100"
                     >
                        Privacy Policy
                        <FiArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                     </Link>

                     <Link
                        href="/terms"
                        className="group hover:text-primary flex items-center gap-1 text-md opacity-80 transition-all hover:translate-x-1 hover:opacity-100"
                     >
                        Terms of Service
                        <FiArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                     </Link>
                  </div>
               </div>
            </div>

            {/* Bottom bar */}
            <div className="border-hero-content1/15 mt-14 flex flex-col items-center justify-between gap-5 border-t pt-7 sm:flex-row">
               <p className="text-center text-md opacity-65 sm:text-left">© {new Date().getFullYear()} SunCart. All rights reserved.</p>

               <div className="flex items-center gap-3">
                  <span className="mr-1 text-md opacity-65">Follow us</span>

                  <a
                     href="https://instagram.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label="Instagram"
                     className="bg-hero-content1/10 hover:bg-primary hover:text-primary-content flex size-9 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1"
                  >
                     <FaInstagramSquare className="size-4" />
                  </a>

                  <a
                     href="https://x.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label="X (Twitter)"
                     className="bg-hero-content1/10 hover:bg-primary hover:text-primary-content flex size-9 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1"
                  >
                     <BsTwitterX className="size-4" />
                  </a>

                  <a
                     href="https://facebook.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label="Facebook"
                     className="bg-hero-content1/10 hover:bg-primary hover:text-primary-content flex size-9 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1"
                  >
                     <FaFacebook className="size-4" />
                  </a>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
