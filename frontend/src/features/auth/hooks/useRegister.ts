import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function useRegister() {
  const router = useRouter();
  const { register, error: storeError, isLoading: storeLoading } = useAuthStore();
  const [localError, setLocalError] = useState<string | null>(null);

  const submit = async (name: string, email: string, password: string) => {
    try {
      setLocalError(null);
      
      // Validate inputs
      if (!name || !email || !password) {
        setLocalError('All fields are required');
        return;
      }

      if (password.length < 8) {
        setLocalError('Password must be at least 8 characters');
        return;
      }
      
      const success = await register(name, email, password);
      
      if (success) {
        // Redirect to dashboard after successful registration
        router.push('/dashboard');
      } else {
        setLocalError(storeError || 'Registration failed');
      }
    } catch (err: any) {
      setLocalError(err.message || 'An error occurred during registration');
    }
  };

  return {
    submit,
    error: localError || storeError,
    isLoading: storeLoading,
  };
}