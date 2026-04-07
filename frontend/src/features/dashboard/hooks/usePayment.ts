'use client';

import { useState, useCallback, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { getPayments } from '../services/payment.services';
import type { Payment } from '../types/payment.types';

export function usePayment() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getPayments();
      setPayments(data);
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.message || 'Failed to fetch payments';
      setError(msg);
      console.error('[usePayments] Error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return {
    payments,
    isLoading,
    error,
    fetchPayments,
  };
}