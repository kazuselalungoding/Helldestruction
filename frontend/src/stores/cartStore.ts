import { create } from 'zustand';
import { api } from '@/lib/api';

export interface CartItem {
  id: number;
  cart_id: number;
  product_variant_id: number;
  quantity: number;
  price: number;
  product_variant: {
    id: number;
    size: string;
    product_id: number;
    quantity: number;
    products: {
      id: number;
      name: string;
      slug: string;
      image_url?: string;
      price: number;
    };
  };
}

export interface Cart {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  cart_items: CartItem[];
}

interface CartState {
  cart: Cart | null;
  total: number;
  isLoading: boolean;
  error: string | null;

  fetchCart: () => Promise<void>;
  addToCart: (productVariantId: number, quantity: number) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
}

const getErrorMessage = (error: unknown, fallback: string) => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error
  ) {
    const axiosError = error as {
      response?: {
        data?: {
          message?: string;
        };
      };
    };

    return axiosError.response?.data?.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  total: 0,
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.get('api/cart');

      set({
        cart: response.data.cart,
        total: response.data.total,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const message = getErrorMessage(error, 'Failed to fetch cart');

      set({
        error: message,
        isLoading: false,
      });

      throw new Error(message);
    }
  },

  addToCart: async (productVariantId: number, quantity: number) => {
    set({ isLoading: true, error: null });

    try {
      await api.post('api/cart/add', {
        product_variant_id: productVariantId,
        quantity,
      });

      await get().fetchCart();

      set({
        error: null,
      });
    } catch (error) {
      const message = getErrorMessage(error, 'Failed to add to cart');

      set({
        error: message,
        isLoading: false,
      });

      throw new Error(message);
    }
  },

  removeFromCart: async (id: number) => {
    set({ isLoading: true, error: null });

    try {
      await api.delete(`api/cart/remove/${id}`);

      await get().fetchCart();

      set({
        error: null,
      });
    } catch (error) {
      const message = getErrorMessage(error, 'Failed to remove from cart');

      set({
        error: message,
        isLoading: false,
      });

      throw new Error(message);
    }
  },
}));