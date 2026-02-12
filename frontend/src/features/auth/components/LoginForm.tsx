"use client";

import { useState } from "react";
import useLogin from "../hooks/useLogin";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const { submit, error, isLoading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <h1 className="text-primary-700 font-bagos font-bold text-5xl">
        SIGN IN
      </h1>
      <div className="flex flex-col gap-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(email, password);
          }}
          className="flex flex-col gap-6 justify-center items-center"
        >
          <TextField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
          />
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <Button 
            label={isLoading ? "SIGNING IN..." : "SIGN IN"} 
            type="submit" 
            size="large"
            disabled={isLoading}
          />
        </form>

        <div className="flex flex-col gap-8">
          <a href="" className="block text-left font-medium text-sm text-primary-700 underline">
            Forgot password ?
          </a>

          <hr className="w-full h-[2px] bg-black"/>

          <Button 
            label="SIGN UP" 
            type="button" 
            size="large" 
            onClick={() => router.push('/register')} 
          />
        </div>
      </div>
    </div>
  );
}
