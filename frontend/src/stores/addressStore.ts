import { create } from 'zustand';
import { api } from '@/lib/api';

export interface Address {
  id: number;
  user_id: number;
  recipient_name: string;
  street: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

interface AddressState {
  addresses: Address[];
  isLoading: boolean;
  error: string | null;

  fetchAddresses: () => Promise<void>;
  createAddress: (data: Omit<Address, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateAddress: (id: number, data: Omit<Address, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  deleteAddress: (id: number) => Promise<void>;
}

export const useAddressStore = create<AddressState>((set, get) => ({
  addresses: [],
  isLoading: false,
  error: null,

  fetchAddresses: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/api/address');
      set({
        addresses: response.data.addresses,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch addresses',
        isLoading: false,
      });
    }
  },

  createAddress: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await api.post('/api/address', data);
      await get().fetchAddresses();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create address',
        isLoading: false,
      });
    }
  },

  updateAddress: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      await api.put(`/api/address/${id}`, data);
      await get().fetchAddresses();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update address',
        isLoading: false,
      });
    }
  },

  deleteAddress: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/api/address/${id}`);
      await get().fetchAddresses();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete address',
        isLoading: false,
      });
    }
  },
}));
