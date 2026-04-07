'use client';

import { useAuthStore } from '@/stores/authStore';
import FloatingCartTrigger from './FloatingCartTrigger';
import FloatingCartDrawer from './FloatingCartDrawer';
import useFloatingCart from '@/features/cart/hooks/useFloatingCart';
import { useRouter } from 'next/navigation';

export default function FloatingCartContainer() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  const {
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
    toggleCart,
    closeCart,
    openAddressPicker,
    closeAddressPicker,
    setSelectedAddressId,
    handleQuantityChange,
    handleSubmitCheckout,
  } = useFloatingCart();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <FloatingCartTrigger
        isOpen={isOpen}
        itemCount={itemCount}
        onToggle={toggleCart}
      />

      <FloatingCartDrawer
        isOpen={isOpen}
        isLoading={isLoading}
        isCheckoutLoading={isCheckoutLoading}
        isAddressLoading={isAddressLoading}
        isAddressPickerOpen={isAddressPickerOpen}
        itemCount={itemCount}
        cart={cart}
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        total={total}
        updatingItemId={updatingItemId}
        onClose={closeCart}
        onStartShopping={()=> {
          closeCart();
          router.push('/products');
        }}
        onOpenAddressPicker={openAddressPicker}
        onCloseAddressPicker={closeAddressPicker}
        onSelectAddress={setSelectedAddressId}
        onSubmitCheckout={handleSubmitCheckout}
        onQuantityChange={handleQuantityChange}
      />
    </>
  );
}