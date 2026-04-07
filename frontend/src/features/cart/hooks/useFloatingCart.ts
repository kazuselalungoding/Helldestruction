'use client';

import { useEffect, useMemo, useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import { useAddressStore } from '@/stores/addressStore';
import { useCheckoutStore } from '@/stores/checkoutStore';
import type { UseFloatingCartReturn } from '../types/floating-cart.types';
import {
  createCheckoutPayment,
  handleCartQuantityChange,
} from '@/features/cart/services/floating-cart.services';

export default function useFloatingCart(): UseFloatingCartReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddressPickerOpen, setIsAddressPickerOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [updatingItemId, setUpdatingItemId] = useState<number | null>(null);

  const cart = useCartStore((state) => state.cart);
  const total = useCartStore((state) => state.total);
  const isLoading = useCartStore((state) => state.isLoading);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const addresses = useAddressStore((state) => state.addresses);
  const isAddressLoading = useAddressStore((state) => state.isLoading);
  const fetchAddresses = useAddressStore((state) => state.fetchAddresses);

  const checkout = useCheckoutStore((state) => state.checkout);
  const isCheckoutLoading = useCheckoutStore((state) => state.isLoading);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsOpen(false);
      setIsAddressPickerOpen(false);
      return;
    }

    fetchCart();
  }, [isAuthenticated, fetchCart]);

  useEffect(() => {
    if (!isOpen || !isAuthenticated) return;
    fetchAddresses();
  }, [isOpen, isAuthenticated, fetchAddresses]);

  useEffect(() => {
    if (!addresses.length) return;

    const hasSelectedAddress = selectedAddressId
      ? addresses.some((address) => address.id === selectedAddressId)
      : false;

    if (!hasSelectedAddress) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const itemCount = useMemo(() => {
    if (!cart?.cart_items?.length) return 0;

    return cart.cart_items.reduce((count, item) => count + (item.quantity || 0), 0);
  }, [cart]);

  const handleQuantityChange = async (
    itemId: number,
    variantId: number,
    currentQty: number,
    nextQty: number
  ) => {
    setUpdatingItemId(itemId);

    try {
      await handleCartQuantityChange({
        itemId,
        variantId,
        currentQty,
        nextQty,
        addToCart,
        removeFromCart,
      });
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleSubmitCheckout = async () => {
    if (!selectedAddressId) {
      alert('Please select an address first');
      return;
    }

    try {
      const { invoiceUrl } = await createCheckoutPayment({
        selectedAddressId,
        checkout,
      });

      setIsOpen(false);
      setIsAddressPickerOpen(false);
      window.location.href = invoiceUrl;
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed');
    }
  };

  return {
    isOpen,
    isAddressPickerOpen,
    selectedAddressId,
    updatingItemId,
    itemCount,

    cart,
    total,
    isLoading,

    addresses,
    isAddressLoading,

    isCheckoutLoading,

    openCart: () => setIsOpen(true),
    closeCart: () => {
      setIsAddressPickerOpen(false);
      setIsOpen(false);
    },
    toggleCart: () => setIsOpen((prev) => !prev),

    openAddressPicker: () => setIsAddressPickerOpen(true),
    closeAddressPicker: () => setIsAddressPickerOpen(false),

    setSelectedAddressId,

    handleQuantityChange,
    handleSubmitCheckout,
  };
}