"use client";

import { useEffect, useState, useCallback } from "react";
import { searchProducts } from "../services/services";
import type { SearchProduct } from "../types/search.types";

export default function useSearchProducts(query: string) {
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    if (typeof window === "undefined") return;

    if (!query.trim()) {
      setProducts([]);
      setError(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const res = await searchProducts(query);
      setProducts(res?.data || []);
    } catch (err: any) {
      console.error("[useSearchProducts] Error:", err);
      setProducts([]);
      setError(err?.response?.data?.message || "Failed to search products");
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
  };
}