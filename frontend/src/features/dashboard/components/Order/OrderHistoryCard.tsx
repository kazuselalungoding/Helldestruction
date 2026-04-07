'use client';

import type { Order } from '../../types/order.types';
import {
  formatDateTime,
  formatRupiah,
  getStatusBadge,
} from '../../utils/order.utils';

interface OrderHistoryCardProps {
  order: Order;
  onViewDetail: (externalId: string) => void;
}

export default function OrderHistoryCard({
  order,
  onViewDetail,
}: OrderHistoryCardProps) {
  const firstItem = order.order_items?.[0];
  const firstProduct = firstItem?.product_variant?.products;
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

  return (
    <div className="rounded-[28px] bg-primary-50/30 p-6 transition hover:bg-primary-50/50">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative h-24 w-20 overflow-hidden rounded-[20px] bg-white">
            {firstProduct?.image_url ? (
              <img
                src={`${storageUrl}/${firstProduct.image_url}`}
                alt={firstProduct.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-primary-400">
                No Image
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
                {formatDateTime(order.created_at)}
              </p>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${getStatusBadge(
                  order.status
                )}`}
              >
                {order.status}
              </span>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${getStatusBadge(
                  order.payment?.status
                )}`}
              >
                {order.payment?.status || 'unpaid'}
              </span>
            </div>

            <h3 className="text-xl font-semibold tracking-tight text-primary-900">
              {order.external_id}
            </h3>

            <p className="mt-2 text-sm leading-7 text-primary-500">
              {firstProduct?.name || 'Unknown Product'}
              {order.order_items.length > 1 &&
                ` +${order.order_items.length - 1} item lainnya`}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
                  Payment Method
                </p>
                <p className="mt-2 text-sm font-medium text-primary-800">
                  {order.payment?.payment_method || '-'}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
                  Total
                </p>
                <p className="mt-2 text-sm font-semibold text-neutral-600">
                  {formatRupiah(order.total_price)}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
                  Items
                </p>
                <p className="mt-2 text-sm font-medium text-primary-800">
                  {order.order_items.length} item
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onViewDetail(order.external_id)}
            className="rounded-full bg-neutral-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-600"
          >
            View Detail
          </button>

          {order.payment?.status === 'pending' && order.payment?.checkout_url && (
            <a
              href={order.payment.checkout_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-primary-200 bg-white px-5 py-2.5 text-sm font-medium text-primary-800 transition hover:bg-primary-50"
            >
              Continue Payment
            </a>
          )}
        </div>
      </div>
    </div>
  );
}