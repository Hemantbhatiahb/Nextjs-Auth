"use client"
import axios from "axios";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);

  const verifyUserEmail = useCallback(async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      console.log(error.response.data);
      setError(true);
    }
  }, [token]);

  useEffect(() => {
    const tokenData = window.location.search.split("=")[1];
    setToken(tokenData || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail]);

  return (
    <div className="flex flex-col justify-center items-center py-2 min-h-screen gap-3">
      <h1 className="text-3xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "No Token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && <h2 className="text-2xl bg-red-500">Error</h2>}
    </div>
  );
}
