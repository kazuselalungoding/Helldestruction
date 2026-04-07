'use client';

import { usePayment } from '../../hooks/usePayment';
import PaymentHistoryCard from './PaymentHistoryCard';
import PaymentHistoryEmptyState from './PaymentHistoryEmptyState';

export default function PaymentHistory() {
  const { payments, isLoading, error } = usePayment();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
          Payment
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-primary-900">
          Payment History
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-primary-500">
          Review your recent transactions, payment status, and checkout records in one place.
        </p>
      </div>

      {isLoading && (
        <div className="rounded-[28px] bg-primary-50/50 px-6 py-12 text-sm text-primary-500">
          Loading payment history...
        </div>
      )}

      {error && (
        <div className="rounded-[20px] bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!isLoading && !error && payments.length === 0 && <PaymentHistoryEmptyState />}

      {!isLoading && !error && payments.length > 0 && (
        <div className="space-y-4">
          {payments.map((payment) => (
            <PaymentHistoryCard key={payment.id} payment={payment} />
          ))}
        </div>
      )}
    </div>
  );
}