import { useState, useCallback } from 'react';
import { api } from '@/lib/api';
import { useAuth } from './useAuth';

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

  const [cart, setCart] = useState<Cart | null>(null);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // GET CART
  const getCart = useCallback(async () => {
    if (!isAuthenticated) {
      console.log('[useCart] User not authenticated, skip getCart');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await api.get<CartResponse>('api/cart');

      setCart(res.data.cart);
      setTotal(res.data.total);

      console.log('[useCart] Cart loaded:', res.data);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch cart';
      setError(msg);
      console.error('[useCart] Get cart error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // ADD TO CART
  const addToCart = useCallback(
    async (productVariantId: number, quantity: number) => {
      if (!isAuthenticated) {
        const msg = 'Please login first';
        setError(msg);
        throw new Error(msg);
      }

      try {
        setError(null);

        const res = await api.post<CartResponse>('api/cart/add', {
          product_variant_id: productVariantId,
          quantity,
        });

        setCart(res.data.cart);
        setTotal(res.data.total);

        console.log('[useCart] Added to cart:', res.data);

        return res.data;
      } catch (err: any) {
        const msg = err.response?.data?.message || err.message || 'Failed to add to cart';
        setError(msg);
        console.error('[useCart] Add to cart error:', err);
        throw err;
      }
    },
    [isAuthenticated]
  );

  // REMOVE ITEM
  const removeFromCart = useCallback(
    async (cartItemId: number) => {
      if (!isAuthenticated) {
        const msg = 'Please login first';
        setError(msg);
        throw new Error(msg);
      }

      try {
        setError(null);

        await api.delete(`api/cart/remove/${cartItemId}`);
        await getCart();
      } catch (err: any) {
        const msg = err.response?.data?.message || err.message || 'Failed to remove item';
        setError(msg);
        console.error('[useCart] Remove cart item error:', err);
        throw err;
      }
    },
    [getCart, isAuthenticated]
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