'use client';

import type { Payment } from '@/features/dashboard/types/payment.types';
import {
  formatDateTime,
  formatRupiah,
  getPaymentStatusClasses,
  getPaymentStatusLabel,
} from '@/features/dashboard/utils/payment.utils';

interface PaymentHistoryCardProps {
  payment: Payment;
}

export default function PaymentHistoryCard({
  payment,
}: PaymentHistoryCardProps) {
  return (
    <div className="rounded-[28px] bg-primary-50/30 p-6 transition hover:bg-primary-50/50">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
              Payment Record
            </p>

            <span
              className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${getPaymentStatusClasses(
                payment.status
              )}`}
            >
              {getPaymentStatusLabel(payment.status)}
            </span>
          </div>

          <h3 className="text-2xl font-semibold tracking-tight text-primary-900">
            {payment.order.external_id}
          </h3>

          <div className="mt-8 grid gap-y-6 sm:grid-cols-2 sm:gap-x-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
                Payment Method
              </p>
              <p className="mt-2 text-base leading-8 text-primary-700">
                {payment.payment_method || 'Unknown'}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
                Total
              </p>
              <p className="mt-2 text-base font-medium leading-8 text-neutral-600">
                {formatRupiah(payment.order.total_price)}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
                Created At
              </p>
              <p className="mt-2 text-base leading-8 text-primary-700">
                {formatDateTime(payment.created_at)}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
                Paid At
              </p>
              <p className="mt-2 text-base leading-8 text-primary-700">
                {payment.paid_at ? formatDateTime(payment.paid_at) : 'Not paid yet'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex lg:justify-end">
          <a
            href={payment.checkout_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-neutral-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-600"
          >
            View Payment
          </a>
        </div>
      </div>
    </div>
  );
}