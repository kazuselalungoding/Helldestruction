"use client";

import { useEffect, useState } from "react";
import { searchProducts } from "../services/services";
import type { SearchProduct } from "../types/search.types";

export default function useSearchProducts(query: string) {
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const res = await searchProducts(query);
      setProducts(res.data || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to search products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [query]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
  };
}