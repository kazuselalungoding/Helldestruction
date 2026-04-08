'use client';

import type { CartItem } from '@/stores/cartStore';
import CartQuantityControl from '@/components/ui/CartQuantityControl';

interface CartItemCardProps {
  item: CartItem;
  storageUrl?: string;
  isLoading?: boolean;
  isUpdating?: boolean;
  onQuantityChange: (
    itemId: number,
    variantId: number,
    currentQty: number,
    nextQty: number
  ) => void;
}

export default function CartItemCard({
  item,
  storageUrl,
  isLoading = false,
  isUpdating = false,
  onQuantityChange,
}: CartItemCardProps) {
  const product = item.product_variant.products;

  return (
    <article className="border-b border-notification-100 pb-8">
      <img
        src={
          product?.image_url
            ? `${storageUrl}/${product.image_url}`
            : '/assets/image/contoh.png'
        }
        alt={product?.name || 'Product image'}
        className="h-80 w-full object-contain"
      />

      <div className="mt-4 grid grid-cols-3 gap-3 text-[28px] font-bold uppercase leading-none sm:text-[32px]">
        <p className="col-span-2 line-clamp-2 font-bagos">
          {product?.name || 'Product'}
        </p>
        <p className="text-right font-bagos">
          RP {Number(item.price).toLocaleString('id-ID')}
        </p>
      </div>

      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide">Size</p>
          <p className="font-semibold uppercase">{item.product_variant.size}</p>
        </div>

        <div className="text-right">
          <p className="mb-2 text-sm uppercase tracking-wide">Quantity</p>

          <CartQuantityControl
            quantity={item.quantity}
            disabled={isLoading || isUpdating}
            onDecrease={() =>
              onQuantityChange(
                item.id,
                item.product_variant_id,
                item.quantity,
                item.quantity - 1
              )
            }
            onIncrease={() =>
              onQuantityChange(
                item.id,
                item.product_variant_id,
                item.quantity,
                item.quantity + 1
              )
            }
          />
        </div>
      </div>
    </article>
  );
}