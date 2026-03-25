import {publicApi} from "@/lib/publicApi";
import { getProductParams } from "./types";

export const getProducts = async (params?: getProductParams) => {
    const response = await publicApi.get('/api/products', { params: { ...params } });
    return response.data;
}

export const getNewDropProducts = async () => {
    const response = await publicApi.get('/api/products/new-drop');
    return response.data;
}

export const getProductById = async (id: number | string) => {
    const response = await publicApi.get(`/api/products/${id}`);
    return response.data;
}