"use client";

import { useParams } from "next/navigation";
import { useProductDetail } from "@/features/product/hooks/useProductDetail";
import ProductDetail from "@/features/product/components/ProductDetail";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { product, loading, error } = useProductDetail(slug);

  if (loading) return <p className="p-4">Loading product...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!product) return <p className="p-4">Product not found</p>;

  return <ProductDetail product={product} />;
}