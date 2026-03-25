import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('[API] Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('[API] Error:', error.response?.status, error.response?.data);
    
    // Don't auto-redirect on 401, let the component handle it
    if (error.response?.status === 419) {
      // CSRF token mismatch - reload page
      if (typeof window !== 'undefined') {
        console.warn('[API] CSRF mismatch, reloading...');
        window.location.reload();
      }
    }
    
    return Promise.reject(error);
  }
);