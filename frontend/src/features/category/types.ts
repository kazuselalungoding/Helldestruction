export type CategoryItem = {
  id: number;
  name: string;
  slug?: string;
};

export type CategoryResponse = {
  status: string;
  data: CategoryItem[];
};

export type CategoryVariant = {
  id: number;
  product_id: number;
  size: string;
  quantity: number;
};

export type CategoryProduct = {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  price: number | string;
  category_id: number;
  product_variants?: CategoryVariant[];
  ProductVariants?: CategoryVariant[];
};

export type CategoryDetail = {
  id: number;
  name: string;
  slug: string;
  products?: CategoryProduct[];
  Products?: CategoryProduct[];
};

export type CategoryDetailResponse = {
  status: string;
  data: CategoryDetail | null;
};

export type CategoryDetailNormalized = {
  id: number;
  name: string;
  slug: string;
  products: CategoryProduct[];
};
