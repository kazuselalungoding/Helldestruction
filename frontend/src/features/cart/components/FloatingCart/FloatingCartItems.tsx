'use client';

import type { CartItem } from '@/stores/cartStore';
import CartItemCard from '../CartItem/CartItemCard';

type FloatingCartItemsProps = {
  items: CartItem[];
  total: number;
  isLoading: boolean;
  isCheckoutLoading: boolean;
  updatingItemId: number | null;
  onQuantityChange: (
    itemId: number,
    variantId: number,
    currentQty: number,
    nextQty: number
  ) => void;
  onCheckoutClick: () => void;
};

export default function FloatingCartItems({
  items,
  total,
  isLoading,
  isCheckoutLoading,
  updatingItemId,
  onQuantityChange,
  onCheckoutClick,
}: FloatingCartItemsProps) {
  const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;

  return (
    <div className="flex min-h-0 flex-1 flex-col px-6 pb-6 sm:px-9">
      <div className="mt-2 min-h-0 flex-1 space-y-8 overflow-y-auto overscroll-contain pr-1">
        {items.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            storageUrl={STORAGE_URL}
            isLoading={isLoading}
            isUpdating={updatingItemId === item.id}
            onQuantityChange={onQuantityChange}
          />
        ))}
      </div>

      <div className="border-t border-notification-100 pt-5">
        <div className="mb-5 flex items-center justify-between text-[34px] font-bold uppercase leading-none sm:text-[40px]">
          <span className="font-bagos">Sub Total</span>
          <span className="font-bagos">
            Rp {Number(total || 0).toLocaleString('id-ID')}
          </span>
        </div>

        <button
          type="button"
          onClick={onCheckoutClick}
          disabled={isCheckoutLoading}
          className="block w-full rounded-full border border-notification-100 py-3 text-center text-[34px] font-bold uppercase leading-none transition hover:bg-[#1737ff] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:text-[38px]"
        >
          {isCheckoutLoading ? 'Processing...' : 'Checkout'}
        </button>
      </div>
    </div>
  );
}