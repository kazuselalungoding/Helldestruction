"use client";

import { useEffect, useState } from "react";
import { getProductBySlug } from "../services";

export function useProductDetail(slug: string) {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProductDetail = async () => {
        try{
            setLoading(true);
            setError(null);

            const data = await getProductBySlug(slug);
            setProduct(data.data);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to fetch product details");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (slug) {
            fetchProductDetail();
        }
    }, [slug]);

    return { product, loading, error, refetch: fetchProductDetail };
}