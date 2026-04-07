'use client';

import type { OrderItem } from '../../types/order.types';
import { formatRupiah } from '../../utils/order.utils';

interface OrderDetailItemProps {
  item: OrderItem;
}

export default function OrderDetailItem({ item }: OrderDetailItemProps) {
  const product = item.product_variant?.products;
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;

  return (
    <div className="flex gap-4 rounded-[24px] bg-primary-50/30 p-4">
      <div className="relative h-24 w-20 overflow-hidden rounded-[18px] bg-white">
        {product?.image_url ? (
          <img
            src={`${storageUrl}/${product.image_url}`}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-primary-400">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="text-base font-semibold text-primary-900">{product?.name}</p>
          <p className="mt-2 text-sm text-primary-500">
            Size: {item.product_variant?.size}
          </p>
          <p className="mt-1 text-sm text-primary-500">Qty: {item.quantity}</p>
          <p className="mt-1 text-sm text-primary-500">
            Price: {formatRupiah(item.price)}
          </p>
        </div>

        <p className="mt-3 text-sm font-semibold text-neutral-600">
          {formatRupiah(Number(item.price) * item.quantity)}
        </p>
      </div>
    </div>
  );
}