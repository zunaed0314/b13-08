"use client";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
   const [edit, setEdit] = useState(false);
   const { data, error, isPending, refetch } = useSession();
   const router = useRouter();

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
      return <p>Loading profile...</p>;
   }

   if (error || !profile) {
      return <p>Unable to load profile. Please log in.</p>;
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
      document.getElementById("my_modal_5").close();
      handleSubmit(handleUpdateFunc)();
   };
   // const router = useRouter();

   return (
      <div className="bg-base-200 mt-15 flex w-full flex-col items-center p-15">
         {edit ? (
            <form
               onSubmit={handleSubmit(handleUpdateFunc)}
               className="bg-base-300 relative container mx-auto flex h-120 w-100 flex-col items-center rounded-2xl border border-black p-8 shadow-lg"
            >
               <div className="avatar mb-5 flex h-max w-max items-center justify-center rounded-full border border-black bg-white p-1">
                  <div className="w-40 rounded-full">
                     <Image
                        src={img || "/default-avatar.png"}
                        alt="user image"
                        width={200}
                        height={200}
                     />
                  </div>
               </div>

               <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo</legend>
                  <input
                     type="url"
                     className="input w-full focus:border-blue-500 focus:ring-1 focus:outline-none"
                     placeholder="Enter your photo URL"
                     {...register("photo", {
                        required: "Photo URL is required",
                        onChange: (e) => setImage(e.target.value),
                     })}
                  />
                  {errors.photo && <p className="text-sm text-red-500">{errors.photo.message}</p>}
               </fieldset>
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
               <div className="absolute right-4 bottom-4 flex gap-3">
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                     className="btn"
                     type="button"
                     onClick={() => document.getElementById("my_modal_5").showModal()}
                  >
                     Ok
                  </button>
                  <dialog
                     id="my_modal_5"
                     className="modal modal-bottom sm:modal-middle"
                  >
                     <div className="modal-box">
                        <p className="py-4">Are you sure to make these changes?</p>
                        <div className="modal-action">
                           <form
                              method="dialog"
                              className="flex gap-5"
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
                  </dialog>

                  <button
                     type="button"
                     className="btn"
                     onClick={() => {
                        reset({
                           photo: profile.image || "",
                           name: profile.name || "",
                        });
                        setImage(profile.image || "");
                     }}
                  >
                     Reset
                  </button>
                  <button
                     type="button"
                     className="btn bg-base-100"
                     onClick={() => {
                        reset({
                           photo: profile.image || "",
                           name: profile.name || "",
                        });
                        setEdit(false);
                     }}
                  >
                     Cancel
                  </button>
               </div>
            </form>
         ) : (
            <div className="bg-base-300 relative container mx-auto flex h-100 w-100 flex-col items-center rounded-2xl border p-8 shadow-lg">
               <div className="avatar mb-8 flex h-max w-max items-center justify-center rounded-full bg-white p-1">
                  <div className="w-40 rounded-full">
                     <Image
                        src={profile.image || "/default-avatar.png"}
                        alt="user image"
                        width={200}
                        height={200}
                     ></Image>
                  </div>
               </div>
               <div className="flex w-3/5 flex-col">
                  <p>
                     <span className="text-xl font-bold">Name: </span>
                     <span className="text-xl">{profile.name}</span>
                  </p>
                  <p>
                     <span className="text-xl font-bold">Email: </span>
                     <span className="text-xl">{profile.email}</span>
                  </p>
               </div>
               <div className="absolute right-4 bottom-4">
                  <button
                     className="btn border"
                     onClick={() => {
                        reset({
                           photo: profile.image || "",
                           name: profile.name || "",
                        });
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
      </div>
   );
};

export default ProfilePage;
