"use client"
import CardProduct from "@/components/ui/CardProduct";
import { useNewDrop } from "../hooks/useNewDrop";

export default function NewDrop() {
  const { products, loading } = useNewDrop();
  const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product: any) => {
        const isSoldOut = product.product_variants.every(
          (v: any) => v.quantity === 0
        );

        return (
          <CardProduct
            key={product.id}
            productSlug={product.slug}
            productName={product.name}
            price={Number(product.price)}
            isSoldOut={isSoldOut}
            imageUrl={`${STORAGE_URL}/${product.image_url}`}
          />
        );
      })}
    </div>
  );
}