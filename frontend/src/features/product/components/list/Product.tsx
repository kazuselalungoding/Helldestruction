import CardProduct from "@/components/ui/CardProduct";
import { Product as ProductType } from "../../types/types";

interface ProductProps {
  products: ProductType[];
}

export default function Product({ products }: ProductProps) {
  const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;

  return (
    <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
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