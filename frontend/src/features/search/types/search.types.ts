export interface SearchVariant {
  id: number;
  product_id: number;
  size: string;
  quantity: number;
}

export interface SearchProduct {
  id: number;
  collection_id: number;
  category_id: number;
  name: string;
  slug: string;
  image_url: string;
  description: string;
  price: string | number;
  created_at: string;
  updated_at: string;
  collection?: {
    id: number;
    name: string;
    image_url: string;
  };
  categories?: {
    id: number;
    name: string;
  };
  product_variants?: SearchVariant[];
}

export interface SearchResponse {
  status: string;
  data: SearchProduct[];
}