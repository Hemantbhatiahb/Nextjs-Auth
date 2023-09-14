"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (user.email.trim().includes("@") && user.password.trim().length > 4) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login successful", response.data);
      toast.success("Successfully logged in!");
      router.push("/profile");
    } catch (err: any) {
      toast.error(err.message);
      console.log("Login Failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={onLogin}
        className="flex  flex-col w-[60%] max-w-md  p-6 lg:p-8 shadow-xl rounded-lg ring-1 ring-slate-200 gap-4 lg:items-start "
      >
        <h1 className="text-lg font-semibold mb-2 self-center">
          {loading ? "Processing.." : "Login"}
        </h1>
        <div className=" flex flex-col gap-2 text-sm lg:flex-row lg:items-center lg:gap-4 lg:w-full">
          <label htmlFor="email" className="flex-[20%]">
            email
          </label>
          <input
            className="p-2 border-2 rounded-md text-sm border-gray-300  focus:outline-none focus:border-blue-600 flex-[80%]"
            id="email"
            type="email"
            placeholder="email"
            value={user.email}
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className=" flex flex-col gap-2 text-sm lg:flex-row lg:items-center lg:gap-4 lg:w-full">
          <label htmlFor="password" className="flex-[20%]">
            password
          </label>
          <input
            className="p-2 border-2 rounded-md text-sm border-gray-300  focus:outline-none focus:border-blue-600 flex-[80%]"
            id="password"
            type="password"
            placeholder="password"
            value={user.password}
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="self-end">
          <Link href='/sendmail' className="text-xs cursor-pointer text-blue-500 hover:text-blue-700">Forgot Password?</Link>
        </div>
        <button
          type="submit"
          className={`mt-2 self-center px-3 py-2 border-2 rounded-md bg-gray-100 font-medium text-[14px] hover:scale-110 hover:bg-gray-200 transition ease-in-out active:opacity-75 focus:outline-none ${
            buttonDisabled
              ? "cursor-not-allowed hover:scale-100"
              : "cursor-pointer"
          }`}
        >
          Login here
        </button>

        <div className="self-center mt-2 text-sm text-gray-700">
          You don&apos;t have an account?
          <Link
            href="/signup"
            className="ml-2 no-underlin hover:underline text-blue-700"
          >
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
