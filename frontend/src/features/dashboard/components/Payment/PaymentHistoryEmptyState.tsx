'use client';

export default function PaymentHistoryEmptyState() {
  return (
    <div className="rounded-[28px] bg-primary-50/50 px-6 py-14 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
        Payment History
      </p>

      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-primary-900">
        No payments yet
      </h3>

      <p className="mt-3 text-sm leading-7 text-primary-500">
        Your completed and pending payment records will appear here once you
        start ordering.
      </p>
    </div>
  );
}