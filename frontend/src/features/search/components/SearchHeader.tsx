"use client";

interface SearchHeaderProps {
  query: string;
  count: number;
}

export default function SearchHeader({ query, count }: SearchHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8 md:mb-10">
      <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
        Search Results
      </p>

      <h1 className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-primary-900">
        {query ? `Results for "${query}"` : "Search Products"}
      </h1>

      <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-primary-500">
        {query
          ? `${count} product${count !== 1 ? "s" : ""} found`
          : "Find products by name."}
      </p>
    </div>
  );
}