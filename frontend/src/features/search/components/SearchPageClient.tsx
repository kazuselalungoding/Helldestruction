"use client";

import { useSearchParams } from "next/navigation";
import SearchBar from "@/features/search/components/SearchBar";
import SearchHeader from "@/features/search/components/SearchHeader";
import SearchResults from "@/features/search/components/SearchResults";
import SearchEmptyState from "@/features/search/components/SearchEmptyState";
import useSearchProducts from "@/features/search/hooks/useSearchProducts";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { products, isLoading, error } = useSearchProducts(query);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-12">
        <div className="mb-6">
        </div>

        <SearchHeader query={query} count={products.length} />

        {isLoading && (
          <div className="rounded-lg sm:rounded-2xl md:rounded-3xl bg-primary-50/40 px-4 py-10 sm:px-6 sm:py-14 md:px-8 md:py-16 text-center text-primary-500 text-sm sm:text-base">
            Searching products...
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-lg sm:rounded-2xl md:rounded-3xl bg-neutral-50/50 px-4 py-10 sm:px-6 sm:py-14 md:px-8 md:py-16 text-center text-neutral-700 text-sm sm:text-base">
            {error}
          </div>
        )}

        {!isLoading && !error && query && products.length === 0 && (
          <SearchEmptyState query={query} />
        )}

        {!isLoading && !error && products.length > 0 && (
          <SearchResults products={products} />
        )}

        {!isLoading && !query && (
          <div className="rounded-lg sm:rounded-2xl md:rounded-3xl bg-primary-50/40 px-4 py-10 sm:px-6 sm:py-14 md:px-8 md:py-16 text-center">
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
              Start Searching
            </p>
            <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-semibold text-primary-900">
              Search for your favorite product
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-primary-500">
              Use the search bar above to find products by name.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}