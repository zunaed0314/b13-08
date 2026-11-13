import Link from "next/link";
import { FaRegFaceFrown } from "react-icons/fa6";

export const metadata = {
   title: "Page Not Found",
   description: "Sorry, the page you're looking for doesn't exist on SunCart.",
};

const NotFound = () => {
   return (
      <div className="bg-base-100 text-base-content flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
         <FaRegFaceFrown className="text-primary mb-5 size-20" />

         <h1 className="text-primary text-7xl font-extrabold">404</h1>

         <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Oops! Page Not Found</h2>

         <p className="text-base-content/70 mt-3 max-w-md">
            The page you&apos;'re looking for might have been removed, renamed, or is temporarily unavailable.
         </p>

         <Link
            href="/"
            className="btn btn-primary mt-8"
         >
            Back to Home
         </Link>
      </div>
   );
};

export default NotFound;
