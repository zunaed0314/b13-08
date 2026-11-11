"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";

const RegisterPage = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
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

   return (
      <div className="container mx-auto flex min-h-[80vh] items-center justify-center bg-state-100 p-5 mt-15">
         <div className="space-y-3 rounded-lg bg-state p-7 bg-base-300">
            <h1 className="border-b border-gray-300 pb-6 text-3xl font-bold">Resgister your account</h1>
            <form
               className="space-y-1 rounded-lg bg-state-100"
               onSubmit={handleSubmit(handleRegisterFunc)}
            >
               <fieldset className="fieldset">
                  <legend className="fieldset-legend">Name</legend>
                  <input
                     type="text"
                     className="input w-full focus:border-blue-500 focus:ring-1 focus:outline-none"
                     placeholder="Type your email"
                     {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
               </fieldset>{" "}
               <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                     type="url"
                     className="input w-full focus:border-blue-500 focus:ring-1 focus:outline-none"
                     placeholder="Give your photo URL"
                     {...register("photo", { required: "Photo URL is required" })}
                  />
                  {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
               </fieldset>{" "}
               <fieldset className="fieldset">
                  <legend className="fieldset-legend">Email</legend>
                  <input
                     type="email"
                     className="input w-full focus:border-blue-500 focus:ring-1 focus:outline-none"
                     placeholder="Type your email"
                     {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
               </fieldset>{" "}
               <fieldset className="fieldset">
                  <legend className="fieldset-legend">Password</legend>
                  <div className="relative">
                     <input
                        type={eyeOpen ? "text" : "password"}
                        className="input w-full focus:border-blue-500 focus:ring-1 focus:outline-none"
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
               <button className="btn mt-4 min-w-[10vw] bg-state-300">Register</button>
               <p className="">
                  Already have an account?{" "}
                  <Link
                     className="font-semibold text-pink-500 hover:underline"
                     href="/login"  
                  >
                     Login
                  </Link>
               </p>
            </form>
         </div>
      </div>
   );
};

export default RegisterPage;
