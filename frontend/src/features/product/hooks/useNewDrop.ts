import { useEffect, useState } from "react";
import { getNewDropProducts } from "../services";

export const useNewDrop = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNewDropProducts = async () => {
            setLoading(true);
            try {
                const data = await getNewDropProducts();
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching new drop products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNewDropProducts();
    }, []);

    return { products, loading };
};