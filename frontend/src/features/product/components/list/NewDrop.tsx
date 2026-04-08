"use client";

import CardProduct from "@/components/ui/CardProduct";
import { useNewDrop } from "../../hooks/useNewDrop";

export default function NewDrop() {
  const { products, loading } = useNewDrop();
  const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="py-8 text-[clamp(2rem,8vw,5rem)] font-black uppercase leading-none tracking-tight text-primary-800">
        New Drop
      </h1>

      <div className="grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        {products.map((product: any) => {
          const isSoldOut = product.product_variants.every(
            (v: any) => v.quantity === 0
          );

          return (
            <CardProduct
              key={product.id}
              productSlug={product.slug}
              productName={product.name}
              size="full"
              price={Number(product.price)}
              isSoldOut={isSoldOut}
              imageUrl={`${STORAGE_URL}/${product.image_url}`}
            />
          );
        })}
      </div>
    </div>
  );
}