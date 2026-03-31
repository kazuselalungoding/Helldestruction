"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

type Variant = {
  id: number;
  size: string;
  quantity: number;
};

type ProductDetailProps = {
  product: {
    id: number;
    name: string;
    price: number | string;
    description: string;
    image_url: string;
    product_variants?: Variant[];
  };
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { user, isAuthenticated } = useAuth();
  const { addToCart, isLoading, error } = useCart();

  const isOutOfStock =
    !product.product_variants ||
    product.product_variants.every((v) => v.quantity === 0);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert("Silahkan login dulu");
      return;
    }

    if (!selectedSize) {
      alert("Pilih size dulu");
      return;
    }

    if (selectedSize.quantity === 0) {
      alert("Stock habis");
      return;
    }

    if (quantity > selectedSize.quantity) {
      alert(`Stok hanya tersedia ${selectedSize.quantity}`);
      return;
    }

    try {
      await addToCart(selectedSize.id, quantity);
      alert(`Berhasil ditambahkan: ${product.name} (${selectedSize.size}) x${quantity}`);
      setSelectedSize(null);
      setQuantity(1);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <div className="w-full grid md:grid-cols-2 gap-8 p-6">
      <img
        src={`http://localhost:8000/storage/${product.image_url}`}
        alt={product.name}
        className="w-full rounded-xl object-cover"
      />
      <div>
        <h1 className="text-4xl font-bagos font-bold text-primary-800">
          {product.name}
        </h1>

        <p className="text-xl mt-2 text-primary-800">
          Rp {Number(product.price).toLocaleString("id-ID")}
        </p>

        <p className="mt-4 text-neutral-600">{product.description}</p>

        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-primary-500">Size</h3>

          <div className="flex gap-2 flex-wrap">
            {product.product_variants?.map((variant) => {
              const isSelected = selectedSize?.id === variant.id;
              const isDisabled = variant.quantity === 0;

              return (
                <button
                  key={variant.id}
                  onClick={() => {
                    if (isDisabled) return;
                    setSelectedSize((prev) =>
                      prev?.id === variant.id ? null : variant
                    );
                  }}
                  className={`
                    px-4 py-2 border rounded-lg text-sm transition-all border-neutral-500 text-black
                    ${isSelected ? "bg-black text-white" : ""}
                    ${isDisabled ? "opacity-50 cursor-not-allowed line-through" : "hover:border-black"}
                  `}
                >
                  {variant.size}
                </button>
              );
            })}
          </div>
        </div>

        {selectedSize && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">
              Stock: {selectedSize.quantity}
            </p>

            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold">Quantity:</label>
              <div className="flex items-center border border-neutral-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(selectedSize.quantity, quantity + 1))
                  }
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isLoading || !isAuthenticated}
          className="mt-6 w-full bg-black text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!isAuthenticated
            ? "LOGIN DULU"
            : isLoading
              ? "LOADING..."
              : isOutOfStock
                ? "OUT OF STOCK"
                : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}