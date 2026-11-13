"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const router = useRouter();
   const [eyeOpen, setEyeOpen] = useState(false);

   const handleRegisterFunc = async (userData) => {
      console.log("These are data: ", userData);

      const { data, error } = await authClient.signUp.email({
         name: userData.name,
         email: userData.email,
         image: userData.photo,
         password: userData.password,
         callbackURL: "/login",
      });

      if (error) {
         console.error("Registration failed:", error);
         alert(error.message);
         return;
      }

      console.log("Registration successful:", data);
      router.push("/login");
   };

   const handleGoogleRegister = async () => {
      const { data, error } = await authClient.signIn.social({
         provider: "google",
         callbackURL: "/login",
      });

      if (error) {
         console.error("Google sign-in error:", error);
         alert(error.message);
      }
   };

   return (
      <div className="container mx-auto mt-10 flex min-h-[80vh] items-center justify-center px-5 py-10">
         <div className="bg-base-300 w-full max-w-2xl space-y-6 rounded-xl border p-6 shadow-lg sm:p-8">
            <div className="border-base-content/15 border-b pb-5">
               <h1 className="text-3xl font-bold">Create Your Account</h1>
               <p className="text-base-content/60 mt-2 text-sm">Register to get started with SunCart.</p>
            </div>

            <form
               className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2"
               onSubmit={handleSubmit(handleRegisterFunc)}
            >
               <fieldset className="fieldset">
                  <legend className="fieldset-legend">Name</legend>
                  <input
                     type="text"
                     className="input w-full focus:border-blue-500 focus:ring-1 focus:outline-none"
                     placeholder="Enter your name"
                     {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
               </fieldset>

               <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                     type="url"
                     className="input w-full focus:border-blue-500 focus:ring-1 focus:outline-none"
                     placeholder="Enter your photo URL"
                     {...register("photo", { required: "Photo URL is required" })}
                  />
                  {errors.photo && <p className="text-sm text-red-500">{errors.photo.message}</p>}
               </fieldset>

               <fieldset className="fieldset">
                  <legend className="fieldset-legend">Email</legend>
                  <input
                     type="email"
                     className="input w-full focus:border-blue-500 focus:ring-1 focus:outline-none"
                     placeholder="Enter your email"
                     {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
               </fieldset>

               <fieldset className="fieldset">
                  <legend className="fieldset-legend">Password</legend>
                  <div className="relative">
                     <input
                        type={eyeOpen ? "text" : "password"}
                        className="input w-full focus:border-blue-500 focus:ring-1 focus:outline-none"
                        placeholder="Enter your password"
                        {...register("password", { required: "Password is required" })}
                     />

                     <button
                        type="button"
                        onClick={() => setEyeOpen(!eyeOpen)}
                        className="btn btn-xs absolute top-1/2 right-2 -translate-y-1/2 border-none bg-transparent"
                     >
                        {eyeOpen ? <RxEyeOpen className="size-6 text-gray-700" /> : <GoEyeClosed className="size-6 text-gray-700" />}
                     </button>
                  </div>

                  {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
               </fieldset>

               <button
                  type="submit"
                  className="btn bg-base-100 mt-4 w-full sm:col-span-2"
               >
                  Register
               </button>

               <p className="text-center text-sm sm:col-span-2">
                  Already have an account?{" "}
                  <Link
                     className="font-semibold text-pink-500 hover:underline"
                     href="/login"
                  >
                     Login
                  </Link>
               </p>
            </form>

            <div className="flex items-center gap-4">
               <div className="bg-base-content/20 h-px flex-1"></div>
               <span className="text-base-content/50 text-sm">OR</span>
               <div className="bg-base-content/20 h-px flex-1"></div>
            </div>

            <button
               type="button"
               className="btn w-full"
               onClick={handleGoogleRegister}
            >
               <FcGoogle className="size-5" />
               Sign up with Google
            </button>
         </div>
      </div>
   );
};

export default RegisterPage;
