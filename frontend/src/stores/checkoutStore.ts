import { create } from 'zustand';
import { api } from '@/lib/api';

interface CheckoutState {
  isLoading: boolean;
  error: string | null;
  checkout: (addressId: number) => Promise<any>;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  isLoading: false,
  error: null,

  checkout: async (addressId: number) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.post('api/checkout', {
        address_id: addressId,
      });

      set({ isLoading: false });
      return response.data.order;
    } catch (error: any) {
      set({
        isLoading: false,
        error: error?.response?.data?.message || 'Checkout failed',
      });
      throw error;
    }
  },
}));