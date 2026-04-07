"use client";

import { useEffect, useState } from "react";
import { getCategoryDetail } from "@/features/category/services";
import type { CategoryDetailNormalized } from "@/features/category/types";

export function useCategoryDetail(slug?: string) {
  const [category, setCategory] = useState<CategoryDetailNormalized | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setCategory(null);
      setError("Category slug is required");
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getCategoryDetail(slug);
        if (isMounted) {
          setCategory(data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.response?.data?.message || "Gagal memuat detail category");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCategory();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return {
    category,
    isLoading,
    error,
  };
}
