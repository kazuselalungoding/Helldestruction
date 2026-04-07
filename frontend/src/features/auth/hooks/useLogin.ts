import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function useLogin() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (email: string, password: string) => {
    try {
      console.log('[useLogin] Starting login...');
      setIsLoading(true);
      setError(null);
      
      const success = await login(email, password);
      console.log('[useLogin] Login result:', success);
      
      if (success) {
        console.log('[useLogin] Login successful, redirecting to dashboard...');
        
        // Force redirect using window.location for immediate effect
        if (typeof window !== 'undefined') {
          window.location.href = '/dashboard';
        } else {
          router.push('/dashboard');
        }
      } else {
        console.log('[useLogin] Login failed');
        const storeError = useAuthStore.getState().error;
        setError(storeError || 'Login failed. Please check your credentials.');
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error('[useLogin] Error:', err);
      const storeError = useAuthStore.getState().error;
      setError(err?.response?.data?.message || storeError || 'An error occurred during login');
      setIsLoading(false);
    }
  };

  return {
    submit,
    error,
    isLoading,
  };
}