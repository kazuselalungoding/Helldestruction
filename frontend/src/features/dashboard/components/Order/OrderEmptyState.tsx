'use client';

export default function OrderEmptyState() {
  return (
    <div className="rounded-[28px] bg-primary-50/50 px-6 py-14 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
        Order
      </p>

      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-primary-900">
        No orders yet
      </h3>

      <p className="mt-3 text-sm leading-7 text-primary-500">
        Your order history will appear here after you complete a checkout.
      </p>
    </div>
  );
}