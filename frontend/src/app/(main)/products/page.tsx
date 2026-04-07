"use client";

import Product from "@/features/product/components/list/Product";
import { useProducts } from "@/features/product/hooks/useProduct";

export default function Products() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="font-bagos font-bold">
      <h1 className="text-center font-bagos text-[clamp(2rem,12vw,9rem)] font-bold leading-none text-primary-800">
        ALL PRODUCTS
      </h1>
      <Product products={products} />
    </div>
  );
}