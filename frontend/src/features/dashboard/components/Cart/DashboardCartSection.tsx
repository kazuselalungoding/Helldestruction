'use client';

import CartReview from '@/features/dashboard/components/Cart/CartReview';

interface DashboardCartSectionProps {
  selectedAddressId: number | null;
  cartCount: number;
}

export default function DashboardCartSection({
  selectedAddressId,
  cartCount,
}: DashboardCartSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
          Checkout Review
        </p>
        <h3 className="text-2xl font-semibold tracking-tight text-primary-900">
          Review Your Cart
        </h3>

        <div className="flex flex-wrap items-center gap-3 pt-2">

          <span className="rounded-full bg-neutral-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-700">
            {cartCount} item(s) in cart
          </span>
        </div>
      </div>

      <div className="rounded-[32px] bg-white">
        <CartReview selectedAddressId={selectedAddressId} />
      </div>
    </div>
  );
}