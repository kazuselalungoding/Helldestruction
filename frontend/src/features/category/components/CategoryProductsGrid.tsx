import CardProduct from "@/components/ui/CardProduct";
import { isCategoryProductSoldOut } from "@/features/category/services";
import type { CategoryProduct } from "@/features/category/types";

type CategoryProductsGridProps = {
  products: CategoryProduct[];
};

export default function CategoryProductsGrid({ products }: CategoryProductsGridProps) {
    const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;
  if (!products.length) {
    return (
      <div className="rounded-3xl border border-black/10 bg-white px-6 py-12 text-center text-black/60">
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="grid gap-4 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <CardProduct
          key={product.id}
          size="medium"
          productName={product.name}
          price={Number(product.price)}
          imageUrl={`${STORAGE_URL}/${product.image_url}`}
          productSlug={product.slug}
          isSoldOut={isCategoryProductSoldOut(product)}
        />
      ))}
    </div>
  );
}
