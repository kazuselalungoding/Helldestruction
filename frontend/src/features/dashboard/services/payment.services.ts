import { api } from '@/lib/api';
import type { PaymentResponse } from '../types/payment.types';

export const getPayments = async () => {
  const res = await api.get<PaymentResponse>('/api/payment');
  return res.data.data;
};