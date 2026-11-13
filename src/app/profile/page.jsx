"use client";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const shellClass = "bg-base-200 flex min-h-dvh w-full items-start justify-center px-4 pt-24 pb-10 sm:px-6 sm:pt-28";

const cardClass =
   "bg-base-300 border-base-content/15 flex min-h-[28rem] w-full max-w-md flex-col items-center rounded-2xl border p-5 shadow-lg sm:p-8";

const inputClass = "input focus:border-primary focus:ring-primary w-full focus:ring-1 focus:outline-none";

const ProfilePage = () => {
   const [edit, setEdit] = useState(false);
   const { data, error, isPending, refetch } = useSession();
   const router = useRouter();
   const confirmRef = useRef(null);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      defaultValues: {
         photo: "",
         name: "",
      },
   });

   const profile = data?.user;

   const [img, setImage] = useState("");

   if (isPending) {
      return (
         <div className={shellClass}>
            <p className="text-lg">Loading profile...</p>
         </div>
      );
   }

   if (error || !profile) {
      return (
         <div className={shellClass}>
            <p className="text-center text-lg">Unable to load profile. Please log in.</p>
         </div>
      );
   }

   const handleUpdateFunc = async (userData) => {
      const { data, error } = await authClient.updateUser({
         image: userData.photo,
         name: userData.name,
      });

      if (error) {
         console.error("Profile update failed:", error);
         alert(error.message);
         return;
      }

      await authClient.getSession({
         query: {
            disableCookieCache: true,
         },
      });

      await refetch();

      setEdit(false);

      router.refresh();
   };

   const confirmUpdate = () => {
      confirmRef.current?.close();
      handleSubmit(handleUpdateFunc)();
   };

   const resetToProfile = () => {
      reset({
         photo: profile.image || "",
         name: profile.name || "",
      });
   };

   return (
      <div className={shellClass}>
         {edit ? (
            <form
               onSubmit={handleSubmit(handleUpdateFunc)}
               className={cardClass}
            >
               <div className="avatar bg-base-100 ring-base-content/20 mb-6 rounded-full p-1 ring-1">
                  <div className="size-32 rounded-full sm:size-40">
                     <Image
                        src={img || "/default-avatar.png"}
                        alt="user image"
                        width={200}
                        height={200}
                        className="size-full rounded-full object-cover"
                     />
                  </div>
               </div>

               <div className="flex w-full flex-col gap-3">
                  <fieldset className="fieldset w-full">
                     <legend className="fieldset-legend">Photo</legend>
                     <input
                        type="url"
                        className={inputClass}
                        placeholder="Enter your photo URL"
                        {...register("photo", {
                           required: "Photo URL is required",
                           onChange: (e) => setImage(e.target.value),
                        })}
                     />
                     {errors.photo && <p className="text-error text-sm">{errors.photo.message}</p>}
                  </fieldset>

                  <fieldset className="fieldset w-full">
                     <legend className="fieldset-legend">Name</legend>
                     <input
                        type="text"
                        className={inputClass}
                        placeholder="Enter your name"
                        {...register("name", { required: "Name is required" })}
                     />
                     {errors.name && <p className="text-error text-sm">{errors.name.message}</p>}
                  </fieldset>
               </div>

               <div className="mt-auto flex w-full flex-wrap justify-end gap-2 pt-6 sm:gap-3">
                  <button
                     className="btn btn-primary max-sm:flex-1"
                     type="button"
                     onClick={() => confirmRef.current?.showModal()}
                  >
                     Ok
                  </button>
                  <button
                     type="button"
                     className="btn max-sm:flex-1"
                     onClick={() => {
                        resetToProfile();
                        setImage(profile.image || "");
                     }}
                  >
                     Reset
                  </button>
                  <button
                     type="button"
                     className="btn bg-base-100 max-sm:flex-1"
                     onClick={() => {
                        resetToProfile();
                        setEdit(false);
                     }}
                  >
                     Cancel
                  </button>
               </div>
            </form>
         ) : (
            <div className={cardClass}>
               <div className="avatar bg-base-100 ring-base-content/20 mb-6 rounded-full p-1 ring-1">
                  <div className="size-32 rounded-full sm:size-40">
                     <Image
                        src={profile.image || "/default-avatar.png"}
                        alt="user image"
                        width={200}
                        height={200}
                        className="size-full rounded-full object-cover"
                     />
                  </div>
               </div>

               <div className="w-full min-w-0 space-y-2 sm:px-4">
                  <p className="text-lg break-words sm:text-xl">
                     <span className="font-bold">Name: </span>
                     <span>{profile.name}</span>
                  </p>
                  <p className="text-lg break-words sm:text-xl">
                     <span className="font-bold">Email: </span>
                     <span>{profile.email}</span>
                  </p>
               </div>

               <div className="mt-auto flex w-full justify-end pt-6">
                  <button
                     className="btn border max-sm:w-full"
                     onClick={() => {
                        resetToProfile();
                        setImage(profile.image || "");
                        setEdit(true);
                     }}
                  >
                     <FaEdit />
                     Edit profile
                  </button>
               </div>
            </div>
         )}

         {/* Kept outside the edit <form> so forms aren't nested */}
         <dialog
            ref={confirmRef}
            className="modal modal-bottom sm:modal-middle"
         >
            <div className="modal-box">
               <p className="py-4">Are you sure to make these changes?</p>
               <div className="modal-action">
                  <form
                     method="dialog"
                     className="flex gap-3 sm:gap-5"
                  >
                     <button
                        className="btn"
                        type="submit"
                     >
                        No
                     </button>
                     <button
                        type="button"
                        className="btn btn-success"
                        onClick={confirmUpdate}
                     >
                        Confirm
                     </button>
                  </form>
               </div>
            </div>
            <form
               method="dialog"
               className="modal-backdrop"
            >
               <button aria-label="Close">close</button>
            </form>
         </dialog>
      </div>
   );
};

export default ProfilePage;
