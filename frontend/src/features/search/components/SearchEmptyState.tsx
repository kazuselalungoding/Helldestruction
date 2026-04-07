"use client";

interface SearchEmptyStateProps {
  query: string;
}

export default function SearchEmptyState({ query }: SearchEmptyStateProps) {
  return (
    <div className="rounded-lg sm:rounded-2xl md:rounded-3xl bg-primary-50/40 px-4 py-10 sm:px-6 sm:py-14 md:px-8 md:py-16 text-center">
      <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
        No Results
      </p>

      <h2 className="mt-2 sm:mt-3 text-lg sm:text-2xl md:text-3xl font-semibold text-primary-900">
        No products found for "{query}"
      </h2>

      <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-primary-500">
        Try a different keyword or search for another product.
      </p>
    </div>
  );
}