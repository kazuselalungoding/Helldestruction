import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { useCartStore } from '@/stores/cartStore';

export interface CartItem {
  id: number;
  cart_id: number;
  product_variant_id: number;
  quantity: number;
  price: number;
  product_variant: {
    id: number;
    product_id: number;
    quantity: number;
    products: {
      id: number;
      name: string;
      price: number;
      image_url?: string;
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

export interface CartResponse {
  cart: Cart;
  total: number;
}

export function useCart() {
  const { isAuthenticated } = useAuth();
  const cart = useCartStore((state) => state.cart);
  const total = useCartStore((state) => state.total);
  const isLoading = useCartStore((state) => state.isLoading);
  const error = useCartStore((state) => state.error);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const addToCartStore = useCartStore((state) => state.addToCart);
  const removeFromCartStore = useCartStore((state) => state.removeFromCart);

  // GET CART
  const getCart = useCallback(async () => {
    if (!isAuthenticated) {
      console.log('[useCart] User not authenticated, skip getCart');
      return;
    }

    await fetchCart();
  }, [isAuthenticated, fetchCart]);

  // ADD TO CART
  const addToCart = useCallback(
    async (productVariantId: number, quantity: number) => {
      if (!isAuthenticated) {
        throw new Error('Please login first');
      }

      try {
        await addToCartStore(productVariantId, quantity);
      } catch (error) {
        console.error('[useCart] Add to cart error:', error);
        throw error;
      }
    },
    [isAuthenticated, addToCartStore]
  );

  // REMOVE ITEM
  const removeFromCart = useCallback(
    async (cartItemId: number) => {
      if (!isAuthenticated) {
        throw new Error('Please login first');
      }

      try {
        await removeFromCartStore(cartItemId);
      } catch (error) {
        console.error('[useCart] Remove cart item error:', error);
        throw error;
      }
    },
    [isAuthenticated, removeFromCartStore]
  );

  return {
    cart,
    total,
    isLoading,
    error,
    getCart,
    addToCart,
    removeFromCart,
  };
}