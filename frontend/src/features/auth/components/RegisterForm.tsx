"use client";

import { useState } from "react";
import useRegister from "../hooks/useRegister";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const { submit, isLoading, error, errors } = useRegister();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submit({ name, email, password });
    
    if (result.success) {
      console.log("Registration successful!", result.data);
      // User will be redirected automatically by the hook
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <h1 className="text-primary-700 font-bagos font-bold text-5xl">
        SIGN UP
      </h1>
      <div className="flex flex-col gap-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 justify-center items-center"
        >
          <div className="w-full">
            <TextField
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
            />
            {errors?.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name[0]}</p>
            )}
          </div>

          <div className="w-full">
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
            {errors?.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email[0]}</p>
            )}
          </div>

          <div className="w-full">
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              minLength={8}
            />
            {errors?.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password[0]}</p>
            )}
          </div>

          <Button 
            label={isLoading ? "SIGNING UP..." : "SIGN UP"} 
            type="submit" 
            size="large"
            disabled={isLoading}
          />
        </form>

        <div className="flex flex-col gap-8">

          <hr className="w-full h-[2px] bg-pink-700"/>

          <Button 
            label="SIGN IN" 
            type="button" 
            size="large" 
            onClick={() => router.push('/login')} 
          />
        </div>
      </div>
    </div>
  );
}
