import { api } from '@/lib/api';
import type { OrderResponse, OrdersResponse } from '../types/order.types';

export const getOrders = async () => {
  const res = await api.get<OrdersResponse>('api/orders');
  return res.data?.data || [];
};

export const getOrderById = async (externalId: string) => {
  const res = await api.get<OrderResponse>(`api/orders/${externalId}`);
  return res.data?.data || null;
};