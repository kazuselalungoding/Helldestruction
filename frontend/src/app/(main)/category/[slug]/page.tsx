"use client";

import { useParams } from "next/navigation";
import CategoryProductsGrid from "@/features/category/components/CategoryProductsGrid";
import { useCategoryDetail } from "@/features/category/hooks/useCategoryDetail";

export default function CategoryDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const { category, isLoading, error } = useCategoryDetail(slug);

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <a href="/category" className="text-sm font-semibold uppercase tracking-[0.25em] text-notification-100">
              Back to categories
            </a>
            <h1 className="mt-3 font-bagos text-4xl font-bold text-black sm:text-5xl">
              {isLoading ? "Loading..." : category?.name || "Category not found"}
            </h1>
          </div>
        </div>

        {error && (
          <div className="rounded-[1.25rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-3xl border border-black/10 bg-white"
              />
            ))}
          </div>
        ) : (
          <CategoryProductsGrid products={category?.products ?? []} />
        )}
      </div>
    </main>
  );
}
