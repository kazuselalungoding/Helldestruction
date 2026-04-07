import { publicApi } from "@/lib/publicApi";

export const searchProducts = async (query: string) => {
  const response = await publicApi.get(`/api/products?search=${encodeURIComponent(query)}`);
  return response.data;
};