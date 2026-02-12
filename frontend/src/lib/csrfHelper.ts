import { csrf } from "@/features/auth/services";

let csrfPromise: Promise<void> | null = null;
let lastCsrfFetch = 0;
const CSRF_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

/**
 * Ensure CSRF token is available and fresh
 * This prevents multiple simultaneous CSRF requests
 */
export async function ensureCsrfToken(): Promise<void> {
  const now = Date.now();
  
  // If CSRF was fetched recently, skip
  if (now - lastCsrfFetch < CSRF_REFRESH_INTERVAL && lastCsrfFetch > 0) {
    return;
  }

  // If there's already a pending CSRF request, wait for it
  if (csrfPromise) {
    return csrfPromise;
  }

  // Create new CSRF request
  csrfPromise = csrf()
    .then(() => {
      lastCsrfFetch = Date.now();
      csrfPromise = null;
    })
    .catch((error) => {
      csrfPromise = null;
      throw error;
    });

  return csrfPromise;
}

/**
 * Force refresh CSRF token
 */
export async function refreshCsrfToken(): Promise<void> {
  lastCsrfFetch = 0;
  csrfPromise = null;
  return ensureCsrfToken();
}

/**
 * Check if CSRF token should be refreshed
 */
export function shouldRefreshCsrf(): boolean {
  const now = Date.now();
  return now - lastCsrfFetch >= CSRF_REFRESH_INTERVAL;
}
