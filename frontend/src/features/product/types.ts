export interface getProductParams {
    categories?: string;
    collections?: string;
    search?: string;
}

export interface Product {
  id: number;
  collection_id: number;
  category_id: number;
  name: string;
  image_url: string;
  description: string;
  price: number;
  collection?: {
    id: number;
    name: string;
    image_url: string;
  };
  categories?: {
    id: number;
    name: string;
  };
  product_variants?: {
    id: number;
    product_id: number;
    size: string;
    quantity: number;
  }[];

}

export interface ProductResponse  {
  status: string;
  data: Product[];
};