"use client";

import { useEffect, useState } from "react";
import CategoryStripList from "./CategoryStripList";
import type { CategoryItem } from "@/features/category/types";
import { getCategories } from "@/features/category/services";

interface CategoryShowcaseProps {
  className?: string;
}

export default function CategoryShowcase({
  className = "",
}: CategoryShowcaseProps) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load categories");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className={`border-y border-black/10 py-10 text-center text-black/60 ${className}`}>
        <div className="inline-block h-8 w-48 animate-pulse rounded bg-black/10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`border-y border-black/10 py-10 text-center text-red-500 ${className}`}>
        {error}
      </div>
    );
  }

  return <CategoryStripList items={categories} className={className} />;
}
