import { api } from "@/lib/api";
import type {
  CategoryItem,
  CategoryResponse,
  CategoryDetail,
  CategoryDetailNormalized,
  CategoryDetailResponse,
  CategoryProduct,
  CategoryVariant,
} from "@/features/category/types";

export async function getCategories(): Promise<CategoryItem[]> {
  const response = await api.get<CategoryResponse>("/api/category");
  return response.data.data ?? [];
}

function getProductVariants(product: CategoryProduct): CategoryVariant[] {
  return product.product_variants ?? product.ProductVariants ?? [];
}

export function isCategoryProductSoldOut(product: CategoryProduct): boolean {
  const variants = getProductVariants(product);
  if (!variants.length) {
    return false;
  }

  return variants.every((variant) => Number(variant.quantity) <= 0);
}

function normalizeCategoryDetail(data: CategoryDetail | null): CategoryDetailNormalized | null {
  if (!data) {
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    products: data.products ?? data.Products ?? [],
  };
}

export async function getCategoryDetail(
  slug: string
): Promise<CategoryDetailNormalized | null> {
  const response = await api.get<CategoryDetailResponse>(`/api/category/${slug}`);
  return normalizeCategoryDetail(response.data.data);
}
