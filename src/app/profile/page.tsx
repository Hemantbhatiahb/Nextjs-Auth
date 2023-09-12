"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from "next/link";

function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function getUserDetails() {
      try {
        const response = await axios.get("/api/users/me");
        console.log(response.data);
        setUserId(response.data.data._id);
      } catch (error) {
        console.log(error);
      }
    }

    getUserDetails();
  }, []);

  const logoutHandler = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
      console.log("Logout Failed ", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <p>Profile Page</p>
      <h1 className="p-1 bg-orange-400 rounded">
        {userId ? (
          <Link href={`/profile/${userId}`}>{userId}</Link>
        ) : (
          <p>Loading user data</p>
        )}
      </h1>
      <button
        className="bg-blue-500 px-4 py-2 hover:bg-blue-700 cursor-pointer mt-4 rounded-md text-white font-bold"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
