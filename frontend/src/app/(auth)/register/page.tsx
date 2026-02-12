"use client";

import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import LoginForm from "@/features/auth/components/LoginForm";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { useState } from "react";

export default function RegisterPage() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <Navbar fixed={true} margin="m-8"/>
      <div className="grid grid-cols-2 min-h-screen">
        <div>
          <img
            src="/assets/image/authSide.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* <LoginForm/> */}
        {/* <TextField name="Username" type="text" size="large"   />
                <TextField name="Password" type="password" size="large" />
                <Button label="Login" type="submit" onClick={() => setCounter(counter + 1)} />
                    <p className="text-red-500">{counter}</p> */}
        <RegisterForm />
      </div>
    </>
  );
}
    