import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/lib/api';
import { getCsrfCookie } from '@/lib/csrfHelper';
import type { User, AuthResponse } from '@/features/auth/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,

      setUser: (user) => {
        console.log('[authStore] setUser:', user);
        set({ 
          user, 
          isAuthenticated: !!user,
          isLoading: false,
          error: null
        });
      },

      setError: (error) => {
        console.log('[authStore] setError:', error);
        set({ error });
      },

      checkAuth: async () => {
        console.log('[authStore] checkAuth started');
        
        // Don't check if already authenticated and have user data
        const currentState = get();
        if (currentState.isAuthenticated && currentState.user) {
          console.log('[authStore] Already authenticated, skipping check');
          return;
        }
        
        try {
          set({ isLoading: true, error: null });
          const response = await api.get<AuthResponse>('/api/user');
          
          console.log('[authStore] checkAuth response:', response.data);
          
          if (response.data.status && response.data.user) {
            set({ 
              user: response.data.user, 
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
          } else {
            set({ 
              user: null, 
              isAuthenticated: false,
              isLoading: false
            });
          }
        } catch (error: any) {
          console.error('[authStore] checkAuth error:', error);
          set({ 
            user: null, 
            isAuthenticated: false,
            isLoading: false,
            error: error.response?.data?.message || 'Failed to verify authentication'
          });
        }
      },

      login: async (email: string, password: string) => {
        console.log('[authStore] login started');
        try {
          set({ error: null });
          
          console.log('[authStore] Getting CSRF token...');
          await getCsrfCookie();
          
          console.log('[authStore] Sending login request...');
          const response = await api.post<AuthResponse>('/api/login', { 
            email, 
            password 
          });
          
          console.log('[authStore] Login response:', response.data);
          
          if (response.data.status && response.data.user) {
            set({ 
              user: response.data.user, 
              isAuthenticated: true,
              error: null
            });
            return true;
          }
          
          set({ 
            error: response.data.message 
          });
          return false;
        } catch (error: any) {
          console.error('[authStore] login error:', error);
          const errorMessage = error.response?.data?.message || 'Login failed';
          set({ 
            user: null,
            isAuthenticated: false,
            error: errorMessage
          });
          return false;
        }
      },

      register: async (name: string, email: string, password: string) => {
        console.log('[authStore] register started');
        try {
          set({ error: null });
          
          await getCsrfCookie();
          
          const response = await api.post<AuthResponse>('/api/register', { 
            name,
            email, 
            password 
          });
          
          console.log('[authStore] register response:', response.data);
          
          if (response.data.status && response.data.user) {
            set({ 
              user: response.data.user, 
              isAuthenticated: true,
              error: null
            });
            return true;
          }
          
          set({ 
            error: response.data.message 
          });
          return false;
        } catch (error: any) {
          console.error('[authStore] register error:', error);
          const errorMessage = error.response?.data?.message || 'Registration failed';
          set({ 
            user: null,
            isAuthenticated: false,
            error: errorMessage
          });
          return false;
        }
      },

      logout: async () => {
        console.log('[authStore] logout started');
        try {
          await api.post('/api/logout');
        } catch (error) {
          console.error('[authStore] Logout error:', error);
        } finally {
          set({ 
            user: null, 
            isAuthenticated: false,
            error: null
          });
          
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth-storage');
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);