import { api } from './api';

let csrfPromise: Promise<void> | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5000; // 5 seconds

export async function getCsrfCookie(): Promise<void> {
  const now = Date.now();

  // Check if we recently fetched
  if (now - lastFetchTime < CACHE_DURATION) {
    console.log('[CSRF] Using cached token');
    return;
  }

  // Check if cookie already exists
  if (typeof document !== 'undefined') {
    const hasXsrfToken = document.cookie.includes('XSRF-TOKEN');
    if (hasXsrfToken && now - lastFetchTime < 60000) {
      console.log('[CSRF] Token already exists');
      lastFetchTime = now;
      return;
    }
  }

  // If already fetching, return same promise
  if (csrfPromise) {
    console.log('[CSRF] Reusing existing request');
    return csrfPromise;
  }

  try {
    console.log('[CSRF] Fetching new token...');
    csrfPromise = api.get('/sanctum/csrf-cookie').then(() => {
      lastFetchTime = Date.now();
      console.log('[CSRF] Token fetched successfully');
      setTimeout(() => {
        csrfPromise = null;
      }, 100);
    });

    await csrfPromise;
  } catch (error) {
    console.error('[CSRF] Failed to fetch token:', error);
    csrfPromise = null;
    throw error;
  }
}