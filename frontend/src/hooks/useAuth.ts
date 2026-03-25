import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export function useAuth() {
  const { user, isLoading, isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    // Only check if not already authenticated
    if (!isAuthenticated && !user) {
      console.log('[useAuth] Not authenticated, checking auth...');
      checkAuth();
    }
  }, [isAuthenticated, user, checkAuth]);

  return {
    user,
    isLoading,
    isAuthenticated,
  };
}