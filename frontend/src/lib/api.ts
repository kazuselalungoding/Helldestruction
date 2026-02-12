import axios from "axios";
import { ensureCsrfToken, refreshCsrfToken } from "./csrfHelper";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
})

export const apiAuth = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Request interceptor: ensure CSRF token before authenticated requests
apiAuth.interceptors.request.use(
  async (config) => {
    // Skip CSRF for GET requests or if it's the CSRF endpoint itself
    if (config.method === "get" || config.url?.includes("/sanctum/csrf-cookie")) {
      return config;
    }

    // Ensure CSRF token is available for state-changing requests
    try {
      await ensureCsrfToken();
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: handle 419 (CSRF token mismatch) errors
apiAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 419 (CSRF token mismatch) and haven't retried yet
    if (error.response?.status === 419 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh CSRF token and retry the request
        await refreshCsrfToken();
        return apiAuth(originalRequest);
      } catch (csrfError) {
        return Promise.reject(csrfError);
      }
    }

    // If 401 (Unauthenticated), could redirect to login
    if (error.response?.status === 401) {
      // You can dispatch a logout action or redirect here if needed
      console.error("Unauthenticated request");
    }

    return Promise.reject(error);
  }
);