"use client";

import CardProduct from "@/components/ui/CardProduct";
import type { SearchProduct } from "../types/search.types";

interface SearchResultsProps {
  products: SearchProduct[];
}

export default function SearchResults({ products }: SearchResultsProps) {
  const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;

  return (
    <div className="grid w-full grid-cols-2 gap-3 px-0 py-0 sm:grid-cols-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-6">
      {products.map((product) => {
        const isSoldOut =
          product.product_variants?.every((variant) => variant.quantity === 0) ||
          false;

        return (
          <CardProduct
            key={product.id}
            productSlug={product.slug}
            size="medium"
            productName={product.name}
            price={Number(product.price)}
            imageUrl={`${STORAGE_URL}/${product.image_url}`}
            isSoldOut={isSoldOut}
          />
        );
      })}
    </div>
  );
}