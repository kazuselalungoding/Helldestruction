import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, csrf } from "../services";
import { RegisterPayload, AuthResponse } from "../types";

export default function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const router = useRouter();

  const submit = async (payload: RegisterPayload) => {
    setIsLoading(true);
    setError(null);
    setErrors(null);

    try {
      // Get CSRF token first
      await csrf();

      // Make register request
      const response = await register(payload);
      const data: AuthResponse = response.data;

      if (data.status) {
        // Registration successful
        router.push("/"); // Redirect to home or dashboard
        return { success: true, data };
      } else {
        setError(data.message || "Registration failed");
        if (data.errors) {
          setErrors(data.errors);
        }
        return { success: false, error: data.message };
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      const validationErrors = err.response?.data?.errors || null;

      setError(errorMessage);
      if (validationErrors) {
        setErrors(validationErrors);
      }

      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submit,
    isLoading,
    error,
    errors,
  };
}