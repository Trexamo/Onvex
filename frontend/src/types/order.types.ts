export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  commission_amount: number;
}

export interface Order {
  id: string;
  order_number: string;
  status: 'pending' | 'paid' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  subtotal: number;
  delivery_fee: number;
  platform_fee: number;
  total_amount: number;
  payment_method: string;
  payment_status: 'pending' | 'approved' | 'failed' | 'refunded';
  delivery_address: string;
  estimated_delivery_date: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface CreateOrderData {
  items: Array<{
    product_id: string;
    quantity: number;
  }>;
  city_id: string;
  delivery_address: string;
  payment_method: string;
  affiliate_code?: string;
}