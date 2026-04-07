"use client";

import Button from "@/components/ui/Button";
import CartQuantityControl from "@/components/ui/CartQuantityControl";
import { Variant } from "../../types/types";

interface ProductPurchasePanelProps {
  selectedSize: Variant | null;
  selectedStock: number;
  quantity: number;
  isLoading: boolean;
  isAuthenticated: boolean;
  isOutOfStock: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
  onAddToCart: () => void;
}

export default function ProductPurchasePanel({
  selectedSize,
  selectedStock,
  quantity,
  isLoading,
  isAuthenticated,
  isOutOfStock,
  onDecrease,
  onIncrease,
  onAddToCart,
}: ProductPurchasePanelProps) {
  return (
    <div className="mt-8">
      {selectedSize && (
        <div className="mb-6">
          <p className="mb-3 text-sm text-primary-500">
            Stock: {selectedStock}
          </p>

          <CartQuantityControl
            quantity={quantity}
            disabled={selectedStock <= 0 || isLoading}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
          />
        </div>
      )}

      <Button
        label={
          !isAuthenticated
            ? "LOGIN TO ADD"
            : isLoading
            ? "LOADING..."
            : isOutOfStock
            ? "OUT OF STOCK"
            : "ADD TO CART"
        }
        onClick={onAddToCart}
        disabled={isOutOfStock || isLoading}
        size="large"
        className="w-full"
      />
    </div>
  );
}