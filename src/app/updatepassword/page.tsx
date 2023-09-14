"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (password.trim().length > 4 && confirmPassword.trim().length > 4) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password, confirmPassword]);

  const onUpdatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tokenData = window.location.search.split("=")[1];

    if (!tokenData) {
      throw new Error("No token found");
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/updatepassword", {
        token: tokenData,
        password,
        confirmPassword,
      });
      toast.success("Password updated successfully");
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={onUpdatePassword}
        className="flex  flex-col w-[60%] max-w-md  p-6 lg:p-8 shadow-xl rounded-lg ring-1 ring-slate-200 gap-4 lg:items-start "
      >
        <h1 className="text-lg font-semibold mb-2 self-center">
          {loading ? "Processing..." : "Update Password"}
        </h1>
        <div className=" flex flex-col gap-2 text-sm lg:flex-row lg:items-center lg:gap-4 lg:w-full">
          <label htmlFor="password" className="flex-[20%]">
            password
          </label>
          <input
            className="p-2 border-2 rounded-md text-sm border-gray-300  focus:outline-none focus:border-blue-600 flex-[80%]"
            id="password"
            type="password"
            placeholder="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className=" flex flex-col gap-2 text-sm lg:flex-row lg:items-center lg:gap-4 lg:w-full">
          <label htmlFor="cpassword" className="flex-[20%]">
            Confirm Password
          </label>
          <input
            className="p-2 border-2 rounded-md text-sm border-gray-300  focus:outline-none focus:border-blue-600 flex-[80%]"
            id="cpassword"
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={`mt-4 self-center px-3 py-2 border-2 rounded-md bg-gray-100 font-medium text-[14px] hover:scale-110 hover:bg-gray-200 transition ease-in-out active:opacity-75 focus:outline-none ${
            buttonDisabled
              ? "cursor-not-allowed hover:scale-100"
              : "cursor-pointer"
          }`}
        >
          Update
        </button>
      </form>
    </div>
  );
}
