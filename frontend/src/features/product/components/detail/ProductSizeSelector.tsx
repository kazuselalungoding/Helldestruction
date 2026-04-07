"use client";

import { Variant } from "../../types/types";

interface ProductSizeSelectorProps {
  variants?: Variant[];
  selectedSize: Variant | null;
  onSelectSize: (variant: Variant | null) => void;
  onResetQuantity: () => void;
}

export default function ProductSizeSelector({
  variants,
  selectedSize,
  onSelectSize,
  onResetQuantity,
}: ProductSizeSelectorProps) {
  return (
    <div className="mt-10">
      <p className="mb-3 text-sm font-semibold uppercase text-primary-500">
        Size
      </p>

      <div className="flex flex-wrap gap-3">
        {variants?.map((variant) => {
          const isSelected = selectedSize?.id === variant.id;
          const stock = Number(variant.quantity);
          const isDisabled = stock <= 0;

          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => {
                if (isDisabled) return;

                onSelectSize(
                  selectedSize?.id === variant.id ? null : variant
                );
                onResetQuantity();
              }}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                isSelected
                  ? "border-notification-100 bg-notification-100 text-white"
                  : "border-primary-200 text-primary-800"
              } ${isDisabled ? "cursor-not-allowed opacity-40 line-through" : ""}`}
            >
              {variant.size}
            </button>
          );
        })}
      </div>
    </div>
  );
}