"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SendEmailPage() {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (emailInput.trim().includes("@")) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [emailInput]);

  const sendMailHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/api/users/sendmail", {
        email: emailInput,
      });
      console.log("email sent successfully", response.data);
      toast.success("email sent successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col min-h-screen py-2 justify-center items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={sendMailHandler}
        className="flex  flex-col w-[60%] max-w-md  p-6 lg:p-8 shadow-xl rounded-lg ring-1 ring-slate-200 gap-4 lg:items-start "
      >
        <h1 className="text-lg font-semibold mb-2 self-center">
          {loading ? "Processing..." : "Send Mail"}
        </h1>
        <div className=" flex flex-col gap-2 text-sm lg:flex-row lg:items-center lg:gap-4 lg:w-full">
          <label htmlFor="email" className="flex-[20%]">
            email
          </label>
          <input
            className="p-2 border-2 rounded-md text-sm border-gray-300  focus:outline-none focus:border-blue-600 flex-[80%]"
            id="email"
            type="email"
            placeholder="please enter your email"
            value={emailInput}
            required
            onChange={(e) => setEmailInput(e.target.value)}
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
          Send Email
        </button>
      </form>
    </div>
  );
}
