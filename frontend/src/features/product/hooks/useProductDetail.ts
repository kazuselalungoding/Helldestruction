"use client";

import { use, useEffect, useState } from "react";
import { getProductById } from "../services";

export function useProductDetail(id: number | string) {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProductDetail = async () => {
        try{
            setLoading(true);
            setError(null);

            const data = await getProductById(id);
            setProduct(data.data);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to fetch product details");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (id) {
            fetchProductDetail();
        }
    }, [id]);

    return { product, loading, error, refetch: fetchProductDetail };
}