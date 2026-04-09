"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps {
  initialValue?: string;
  placeholder?: string;
  className?: string;
}

function SearchBarInner({
  initialValue = "",
  placeholder = "Search Our Products",
  className = "",
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(initialValue);

  useEffect(() => {
    if (!searchParams) return;
    const currentQuery = searchParams.get("q") || "";
    setKeyword(currentQuery);
  }, [searchParams]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmed = keyword.trim();

    if (!trimmed) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`group flex h-12 w-full items-center gap-2 rounded-full border border-primary-200 bg-white px-2 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 focus-within:border-neutral-500 focus-within:shadow-[0_12px_32px_rgba(0,0,0,0.08)] sm:h-13 ${className}`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-primary-400 transition group-focus-within:text-primary-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-[17px] w-[17px]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>

      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={placeholder}
        className="h-full min-w-0 flex-1 bg-transparent pr-1 text-sm text-primary-900 outline-none placeholder:text-primary-300 sm:text-[15px]"
      />

      <button
        type="submit"
        className="shrink-0 rounded-full bg-primary-900 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-primary-700 sm:px-4 sm:text-[11px]"
      >
        Search
      </button>
    </form>
  );
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <Suspense
      fallback={
        <div className="group flex h-12 w-full items-center gap-2 rounded-full border border-primary-200 bg-white px-2 shadow-[0_8px_24px_rgba(0,0,0,0.04)] sm:h-13">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-primary-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[17px] w-[17px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <div className="h-full min-w-0 flex-1 bg-transparent pr-1 text-sm text-primary-300 sm:text-[15px] flex items-center">
            Search Our Products
          </div>
          <div className="shrink-0 rounded-full bg-primary-900 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:px-4 sm:text-[11px]">
            Search
          </div>
        </div>
      }
    >
      <SearchBarInner {...props} />
    </Suspense>
  );
}