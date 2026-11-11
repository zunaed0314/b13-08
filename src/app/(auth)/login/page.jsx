"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
   } = useForm();

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
      <div className="container mx-auto flex min-h-[80vh] items-center justify-center bg-base-100 mt-20">
         <div className="space-y-3 rounded-lg bg-base-200 p-10">
            <h1 className="border-b border-gray-300 pb-6 text-4xl font-bold text-black">Login your account</h1>
            <form
               className="space-y-3 rounded-lg p-6"
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
               <fieldset className="fieldset">
                  <legend className="fieldset-legend">Password</legend>
                  <input
                     type="password"
                     className="input focus:border-blue-500 focus:ring-1 focus:outline-none"
                     placeholder="Type your password"
                     {...register("password", { required: "Password is required" })}
                  />
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
               </fieldset>{" "}
               <button className="btn w-full bg-indigo-950 text-white">Login</button>
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
