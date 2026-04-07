'use client';

import { useState, useCallback, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { getOrders, getOrderById } from '../services/order.services';
import type { Order } from '../types/order.types';

export function useOrder() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!isAuthenticated) {
      setOrders([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.message || 'Failed to fetch orders';
      setError(msg);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const fetchOrderDetail = useCallback(
    async (externalId: string) => {
      if (!isAuthenticated || !externalId) {
        setSelectedOrder(null);
        return;
      }

      setIsDetailLoading(true);
      setError(null);

      try {
        const data = await getOrderById(externalId);
        setSelectedOrder(data);
      } catch (err: any) {
        const msg =
          err.response?.data?.message ||
          err.message ||
          'Failed to fetch order detail';
        setError(msg);
        setSelectedOrder(null);
      } finally {
        setIsDetailLoading(false);
      }
    },
    [isAuthenticated]
  );

  const clearSelectedOrder = () => {
    setSelectedOrder(null);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, fetchOrders]);

  return {
    orders,
    selectedOrder,
    isLoading,
    isDetailLoading,
    error,
    fetchOrders,
    fetchOrderDetail,
    clearSelectedOrder,
  };
}