import { csrf, login } from "../services";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

export default function useLogin() {
  const SetUser = useAuthStore((state) => state.SetUser);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      await csrf();
      const response = await login({ email, password });
      
      if (response?.data?.user) {
        SetUser(response.data.user);
        router.push("/dashboard");
        return { success: true, data: response.data };
      }
      
      return { success: false, error: "Login failed" };
    } catch (error) {
      if(axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Login failed";
        setError(message);
        return { success: false, error: message };
      } else {
        const message = "An unexpected error occurred";
        setError(message);
        return { success: false, error: message };
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return { 
    submit,
    error,
    isLoading,
  };
}