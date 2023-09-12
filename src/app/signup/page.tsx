"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.username.trim().length > 0 &&
      user.password.trim().length > 4 &&
      user.email.includes("@")
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", await response.data);
      toast.success("Signup successful");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message);
      console.log("Signup failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={onSignup}
        className="flex  flex-col w-[60%] max-w-md  p-6 lg:p-8 shadow-xl rounded-lg ring-1 ring-slate-200 gap-4 lg:items-start "
      >
        <h1 className="text-lg font-semibold mb-2 self-center">
          {loading ? "Processing..." : "Signup"}
        </h1>
        <div className=" flex flex-col gap-2 text-sm lg:flex-row lg:items-center lg:gap-4 lg:w-full">
          <label htmlFor="username" className="flex-[20%]">
            {" "}
            Username
          </label>
          <input
            className="p-2 border-2 rounded-md text-sm border-gray-300  focus:outline-none focus:border-blue-600 flex-[80%]"
            id="username"
            type="text"
            placeholder="Username"
            value={user.username}
            required
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
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

        <button
          type="submit"
          className={`mt-4 self-center px-3 py-2 border-2 rounded-md bg-gray-100 font-medium text-[14px] hover:scale-110 hover:bg-gray-200 transition ease-in-out active:opacity-75 focus:outline-none ${
            buttonDisabled
              ? "cursor-not-allowed hover:scale-100"
              : "cursor-pointer"
          }`}
        >
          Signup here
        </button>

        <div className="self-center mt-2 text-sm text-gray-700">
          You have an account?
          <Link
            href="/login"
            className="ml-2 no-underlin hover:underline text-blue-700"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
