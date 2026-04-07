export interface PaymentOrder {
  id: number;
  user_id: number;
  external_id: string;
  total_price: string;
}

export interface Payment {
  id: number;
  order_id: number;
  xendit_id: string;
  payment_method: string | null;
  checkout_url: string;
  status: string;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
  order: PaymentOrder;
}

export interface PaymentResponse {
  status: string;
  data: Payment[];
}