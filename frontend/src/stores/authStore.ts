import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api } from "@/lib/api";
import { getCsrfCookie } from "@/lib/csrfHelper";
import type { User, AuthResponse } from "@/features/auth/types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasCheckedAuth: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  checkAuth: (force?: boolean) => Promise<void>;
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
      hasCheckedAuth: false,
      error: null,

      setUser: (user) => {
        console.log("[authStore] setUser:", user);
        set({
          user,
          isAuthenticated: !!user,
          hasCheckedAuth: true,
          isLoading: false,
          error: null,
        });
      },

      setError: (error) => {
        console.log("[authStore] setError:", error);
        set({ error });
      },

      checkAuth: async (force = false) => {
        console.log("[authStore] checkAuth started");

        const currentState = get();
        if (!force && (currentState.isLoading || currentState.hasCheckedAuth)) {
          console.log("[authStore] Skip checkAuth");
          return;
        }

        try {
          set({ isLoading: true, error: null });

          const response = await api.get<AuthResponse>("api/user");

          if (response.data.status && response.data.user) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              hasCheckedAuth: true,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
              hasCheckedAuth: true,
              isLoading: false,
              error: null,
            });
          }
        } catch (error: any) {
          const status = error?.response?.status;

          if (status === 401) {
            set({
              user: null,
              isAuthenticated: false,
              hasCheckedAuth: true,
              isLoading: false,
              error: null,
            });
            return;
          }

          console.error("[authStore] checkAuth error:", error);

          set({
            user: null,
            isAuthenticated: false,
            hasCheckedAuth: true,
            isLoading: false,
            error:
              error.response?.data?.message ||
              "Failed to verify authentication",
          });
        }
      },

      login: async (email: string, password: string) => {
        console.log("[authStore] login started");

        try {
          set({ error: null });

          await getCsrfCookie();

          const response = await api.post<AuthResponse>("api/login", {
            email,
            password,
          });

          if (response.data.status && response.data.user) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              hasCheckedAuth: true,
              error: null,
            });
            return true;
          }

          set({
            error: response.data.message,
          });

          return false;
        } catch (error: any) {
          console.error("[authStore] login error:", error);

          const errorMessage =
            error.response?.data?.message || "Login failed";

          set({
            user: null,
            isAuthenticated: false,
            hasCheckedAuth: true,
            error: errorMessage,
          });

          return false;
        }
      },

      register: async (name: string, email: string, password: string) => {
        console.log("[authStore] register started");

        try {
          set({ error: null });

          await getCsrfCookie();

          const response = await api.post<AuthResponse>("api/register", {
            name,
            email,
            password,
          });

          if (response.data.status && response.data.user) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              hasCheckedAuth: true,
              error: null,
            });
            return true;
          }

          set({
            error: response.data.message || "Registration failed",
          });

          return false;
        } catch (error: any) {
          console.error("[authStore] register error:", error);

          const backendErrors = error?.response?.data?.errors;
          const backendMessage = error?.response?.data?.message;

          let errorMessage = "Registration failed";

          if (backendErrors?.email?.[0]) {
            errorMessage = backendErrors.email[0];
          } else if (backendErrors?.password?.[0]) {
            errorMessage = backendErrors.password[0];
          } else if (backendErrors?.name?.[0]) {
            errorMessage = backendErrors.name[0];
          } else if (backendMessage) {
            errorMessage = backendMessage;
          }

          set({
            user: null,
            isAuthenticated: false,
            hasCheckedAuth: true,
            error: errorMessage,
          });

          return false;
        }
      },

      logout: async () => {
        console.log("[authStore] logout started");

        try {
          await api.post("api/logout");
        } catch (error) {
          console.error("[authStore] logout error:", error);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            hasCheckedAuth: true,
            error: null,
          });

          if (typeof window !== "undefined") {
            localStorage.removeItem("auth-storage");
          }
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : undefined
      ),

      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);