"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

import NotificationCard from "@/components/ui/NotificationCard";

import ProductHeroImage from "./ProductHeroImage";
import ProductInfo from "./ProductInfo";
import ProductSizeSelector from "./ProductSizeSelector";
import ProductPurchasePanel from "./ProductPurchasePanel";

import {
  NotificationState,
  ProductDetailProps,
  Variant,
} from "../../types/types";

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    title: "",
    message: "",
    variant: "info",
  });

  const { isAuthenticated } = useAuth();
  const { addToCart, isLoading } = useCart();
  const router = useRouter();

  const isOutOfStock =
    !product.product_variants ||
    product.product_variants.every((v) => Number(v.quantity) <= 0);

  const selectedStock = useMemo(() => {
    if (!selectedSize) return 0;
    return Math.max(0, Number(selectedSize.quantity) || 0);
  }, [selectedSize]);

  const showNotification = (
    title: string,
    message?: string,
    variant: "info" | "success" | "error" = "info",
  ) => {
    setNotification({
      show: true,
      title,
      message,
      variant,
    });

    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 2500);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!selectedSize) {
      showNotification("Select Size", "Please choose a size first.", "error");
      return;
    }

    if (selectedStock <= 0) {
      showNotification(
        "Out of Stock",
        "Selected size is unavailable.",
        "error",
      );
      return;
    }

    if (quantity > selectedStock) {
      showNotification(
        "Stock Limit",
        `Only ${selectedStock} item(s) available.`,
        "error",
      );
      return;
    }

    try {
      await addToCart(selectedSize.id, quantity);

      showNotification(
        "Added to Cart",
        `${product.name} (${selectedSize.size}) x${quantity}`,
        "success",
      );

      setSelectedSize(null);
      setQuantity(1);
    } catch (err: any) {
      console.error(err);

      const message = err?.message || "Failed to add product.";

      showNotification("Error", message, "error");
    }
  };

  return (
    <>
      <NotificationCard
        title={notification.title}
        message={notification.message}
        variant={notification.variant}
        show={notification.show}
        onClose={() => setNotification((prev) => ({ ...prev, show: false }))}
      />

      <section className="w-full bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-12">
          <ProductHeroImage
            imageUrl={product.image_url}
            productName={product.name}
          />

          <div className="flex flex-col">
            <ProductInfo
              name={product.name}
              price={product.price}
              description={product.description}
            />

            <ProductSizeSelector
              variants={product.product_variants}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              onResetQuantity={() => setQuantity(1)}
            />

            <ProductPurchasePanel
              selectedSize={selectedSize}
              selectedStock={selectedStock}
              quantity={quantity}
              isLoading={isLoading}
              isAuthenticated={isAuthenticated}
              isOutOfStock={isOutOfStock}
              onDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
              onIncrease={() =>
                setQuantity((prev) => Math.min(selectedStock, prev + 1))
              }
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </section>
    </>
  );
}
