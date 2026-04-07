'use client';

import type { Order } from '../../types/order.types';
import {
  formatDateTime,
  formatRupiah,
  getStatusBadge,
} from '../../utils/order.utils';
import OrderDetailItem from './OrderDetailItem';

interface OrderDetailProps {
  order: Order | null;
  isLoading: boolean;
  onBack: () => void;
}

export default function OrderDetail({
  order,
  isLoading,
  onBack,
}: OrderDetailProps) {
  if (isLoading) {
    return (
      <div className="rounded-[28px] bg-primary-50/50 px-6 py-12 text-sm text-primary-500">
        Loading order detail...
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
            Order Detail
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-primary-900">
            {order.external_id}
          </h2>
          <p className="mt-3 text-sm leading-7 text-primary-500">
            Created at {formatDateTime(order.created_at)}
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-primary-200 bg-white px-5 py-2.5 text-sm font-medium text-primary-800 transition hover:bg-primary-50"
        >
          Back to Orders
        </button>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-[28px] bg-primary-50/30 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
            Order Status
          </p>
          <div className="mt-4">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${getStatusBadge(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>
        </div>

        <div className="rounded-[28px] bg-primary-50/30 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
            Payment Status
          </p>
          <div className="mt-4">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${getStatusBadge(
                order.payment?.status
              )}`}
            >
              {order.payment?.status || 'unpaid'}
            </span>
          </div>
        </div>

        <div className="rounded-[28px] bg-neutral-50/70 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
            Total
          </p>
          <p className="mt-4 text-3xl font-bold tracking-tight text-primary-900">
            {formatRupiah(order.total_price)}
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-[28px] bg-white p-6">
          <h3 className="text-xl font-semibold text-primary-900">Items</h3>

          <div className="mt-6 space-y-4">
            {order.order_items.map((item) => (
              <OrderDetailItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] bg-primary-50/30 p-6">
            <h3 className="text-xl font-semibold text-primary-900">
              Shipping Address
            </h3>

            <div className="mt-5 space-y-2 text-sm leading-7 text-primary-700">
              <p className="font-semibold text-primary-900">
                {order.address.recipient_name}
              </p>
              <p>{order.address.phone}</p>
              <p>{order.address.street}</p>
              <p>
                {order.address.city}, {order.address.province},{' '}
                {order.address.postal_code}
              </p>
              <p>{order.address.country}</p>
            </div>
          </div>

          {order.payment && (
            <div className="rounded-[28px] bg-neutral-50/70 p-6">
              <h3 className="text-xl font-semibold text-primary-900">
                Payment Info
              </h3>

              <div className="mt-5 space-y-3 text-sm leading-7 text-primary-700">
                <p>
                  <span className="font-medium text-primary-900">Method:</span>{' '}
                  {order.payment.payment_method || '-'}
                </p>
                <p>
                  <span className="font-medium text-primary-900">Status:</span>{' '}
                  {order.payment.status}
                </p>
                <p>
                  <span className="font-medium text-primary-900">Paid At:</span>{' '}
                  {order.payment.paid_at
                    ? formatDateTime(order.payment.paid_at)
                    : 'Not paid yet'}
                </p>
              </div>

              {order.payment.status === 'pending' &&
                order.payment.checkout_url && (
                  <a
                    href={order.payment.checkout_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex rounded-full bg-neutral-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-600"
                  >
                    Continue Payment
                  </a>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}