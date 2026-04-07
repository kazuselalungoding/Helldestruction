export interface OrderUser {
  id: number;
  name: string;
}

export interface OrderAddress {
  id: number;
  user_id: number;
  recipient_name: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
}

export interface OrderProduct {
  id: number;
  name: string;
  image_url: string;
  price: string;
}

export interface OrderProductVariant {
  id: number;
  product_id: number;
  size: string;
  quantity: number;
  products: OrderProduct;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_variant_id: number;
  quantity: number;
  price: string;
  product_variant: OrderProductVariant;
}

export interface OrderPayment {
  id: number;
  order_id: number;
  payment_method: string | null;
  checkout_url: string;
  status: string;
  paid_at: string | null;
  created_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  address_id: number;
  external_id: string;
  total_price: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: OrderUser;
  address: OrderAddress;
  order_items: OrderItem[];
  payment: OrderPayment | null;
}

export interface OrdersResponse {
  status: string;
  data: Order[];
}

export interface OrderResponse {
  status: string;
  data: Order;
}