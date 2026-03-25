"use client";

import Product from "@/features/product/components/Product";
import { useProducts } from "@/features/product/hooks/useProduct"

export default function Products(){
    const {products, loading, error} = useProducts()

        if (loading) {
            return <div>Loading...</div>;
        } else if (error) {
            return <div>Error: {error}</div>;
        }
    return (
        <div className=" font-bagos font-bold">
            <h1 className="text-[clamp(2rem,12vw,9rem)] font-bagos font-bold text-primary-800 text-center leading-none">ALL PRODUCTS</h1>
            <Product products={products} />
        </div>
    )
}