"use client";

import { useState } from "react";
import useRegister from "../hooks/useRegister";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const { submit, error, isLoading } = useRegister();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    // Validate password match
    if (password !== passwordConfirmation) {
      setLocalError("Passwords do not match");
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setLocalError("Password must be at least 8 characters");
      return;
    }

    await submit(name, email, password);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <h1 className="text-primary-700 font-bagos font-bold text-5xl">
        SIGN UP
      </h1>
      <div className="flex flex-col gap-8">
        {/* Error Message */}
        {(error || localError) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {localError || error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 justify-center items-center"
        >
          <TextField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
          />
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
            minLength={8}
          />
          <TextField
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirm Password"
            required
            minLength={8}
          />

          <Button 
            label={isLoading ? "SIGNING UP..." : "SIGN UP"} 
            type="submit" 
            size="large"
            disabled={isLoading}
          />
        </form>

        <div className="flex flex-col gap-8">
          <hr className="w-full h-[2px] bg-black"/>

          <div className="text-center">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="text-sm text-primary-700 underline font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}