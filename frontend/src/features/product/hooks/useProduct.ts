"use client";

import { useEffect, useState } from "react";
import { getProducts } from "../services";
import { getProductParams, Product, ProductResponse } from "../types";

export function useProducts(params?: getProductParams) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res: ProductResponse = await getProducts(params);

      setProducts(res.data || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(params)]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}