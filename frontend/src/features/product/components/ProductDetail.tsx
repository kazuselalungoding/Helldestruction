"use client";

import { useState } from "react";

type Variant = {
  id: number;
  size: string;
  quantity: number;
};

type ProductDetailProps = {
  product: {
    name: string;
    price: number | string;
    description: string;
    image_url: string;
    product_variants?: Variant[];
  };
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<Variant | null>(null);

  const isOutOfStock =
    !product.product_variants ||
    product.product_variants.every((v) => v.quantity === 0);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Pilih size dulu");
      return;
    }

    if (selectedSize.quantity === 0) {
      alert("Stock habis");
      return;
    }

    console.log("Add to cart:", {
      product: product.name,
      size: selectedSize.size,
    });

    alert(`Ditambahkan: ${product.name} (${selectedSize.size})`);
  };

  return (
    <div className="w-full grid md:grid-cols-2 gap-8 p-6">
      <img
        src={`http://localhost:8000/storage/${product.image_url}`}
        alt={product.name}
        className="w-full rounded-xl object-cover"
      />
      <div>
        <h1 className="text-4xl font-bagos font-bold text-primary-800">{product.name}</h1>

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
                      prev?.id === variant.id ? null : variant,
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
          <p className="mt-2 text-sm text-gray-500">
            Stock: {selectedSize.quantity}
          </p>
        )}

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="mt-6 w-full bg-black text-white py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {isOutOfStock ? "OUT OF STOCK" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}
