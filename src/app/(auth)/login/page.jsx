"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";

const LoginPage = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
   } = useForm();

   const [eyeOpen, setEyeOpen] = useState(false);

   const handleLoginFunc = async (userData) => {
      console.log("These are data: ", userData);
      const { data, error } = await authClient.signIn.email({
         email: userData.email,
         password: userData.password,
         rememberMe: true,
         callbackURL: "/",
      });

      console.log("Sign in response: ", { data, error });
      if (error) {
         alert("Signed in ERROR ALERT!!!!!!!!!", error.message);
      }
      if (data) {
         alert("Sign in successful:", data);
      }
   };

   return (
      <div className="bg-base-100 container mx-auto mt-20 flex min-h-[80vh] items-center justify-center">
         <div className="bg-base-300 space-y-3 rounded-lg p-10">
            <h1 className="text-base-content border-b border-gray-300 pb-6 text-4xl font-bold">Login your account</h1>
            <form
               className="space-y-1 rounded-lg p-6"
               onSubmit={handleSubmit(handleLoginFunc)}
            >
               <fieldset className="fieldset">
                  <legend className="fieldset-legend">Email</legend>
                  <input
                     type="email"
                     className="input focus:border-blue-500 focus:ring-1 focus:outline-none"
                     placeholder="Type your email"
                     {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
               </fieldset>{" "}
               <fieldset className="fieldset mb-4">
                  <legend className="fieldset-legend">Password</legend>
                  <div className="relative">
                     <input
                        type={eyeOpen ? "text" : "password"}
                        className="input focus:border-blue-500 focus:ring-1 focus:outline-none"
                        placeholder="Type your password"
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
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
               </fieldset>{" "}
               <button className="btn text-base-content bg-base-100 w-full">Login</button>
               <p>
                  Don&apos;t have an account?{" "}
                  <Link
                     className="font-semibold text-pink-500 hover:underline"
                     href="/register"
                  >
                     Register
                  </Link>
               </p>
            </form>
         </div>
      </div>
   );
};

export default LoginPage;
