import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('[API] Response:', response.config.url, response.status, response.data);
    return response;
  },
  (error) => {
    console.error('[API] Full Error:', error);
    console.error('[API] Message:', error.message);
    console.error('[API] Status:', error.response?.status);
    console.error('[API] Data:', error.response?.data);

    if (error.response?.status === 419) {
      if (typeof window !== 'undefined') {
        console.warn('[API] CSRF mismatch, reloading...');
        window.location.reload();
      }
    }

    return Promise.reject(error);
  }
);