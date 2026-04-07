import FloatingCartHeader from './FloatingCartHeader';
import FloatingCartEmptyState from './FloatingCartEmptyState';
import FloatingCartItems from './FloatingCartItems';
import FloatingCartAddressPicker from './FloatingCartAddressPicker';
import type { Cart } from '@/stores/cartStore';
import type { Address } from '@/stores/addressStore';
import type { FloatingCartDrawerProps } from '@/features/cart/types/floating-cart.types';


export default function FloatingCartDrawer({
  isOpen,
  isLoading,
  isCheckoutLoading,
  isAddressLoading,
  isAddressPickerOpen,
  itemCount,
  cart,
  addresses,
  selectedAddressId,
  total,
  updatingItemId,
  onClose,
  onStartShopping,
  onOpenAddressPicker,
  onCloseAddressPicker,
  onSelectAddress,
  onSubmitCheckout,
  onQuantityChange,
}: FloatingCartDrawerProps) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-145 overflow-hidden border-l border-[#1737ff]/30 bg-[#ececec] text-[#1737ff] transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Shopping bag drawer"
      >
        <div className="flex h-full min-h-0 flex-col">
          <FloatingCartHeader onClose={onClose} />

          {isLoading ? (
            <div className="grid flex-1 place-items-center px-8 text-lg font-semibold uppercase tracking-wide">
              Loading bag...
            </div>
          ) : itemCount === 0 ? (
            <FloatingCartEmptyState onStartShopping={onStartShopping} />
          ) : (
            <FloatingCartItems
              items={cart?.cart_items ?? []}
              total={total}
              isLoading={isLoading}
              isCheckoutLoading={isCheckoutLoading}
              updatingItemId={updatingItemId}
              onQuantityChange={onQuantityChange}
              onCheckoutClick={onOpenAddressPicker}
            />
          )}

          <FloatingCartAddressPicker
            isOpen={isAddressPickerOpen}
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            isAddressLoading={isAddressLoading}
            isCheckoutLoading={isCheckoutLoading}
            onClose={onCloseAddressPicker}
            onSelectAddress={onSelectAddress}
            onSubmitCheckout={onSubmitCheckout}
          />
        </div>
      </aside>
    </div>
  );
}
