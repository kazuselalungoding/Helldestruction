"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/features/category/services";
import type { CategoryItem } from "@/features/category/types";

export function useCategories() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getCategories();
        if (isMounted) {
          setCategories(data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.response?.data?.message || "Gagal memuat category");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    categories,
    isLoading,
    error,
  };
}
