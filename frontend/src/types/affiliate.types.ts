export interface Affiliate {
  id: string;
  user_id: string;
  affiliate_code: string;
  total_earnings: number;
  available_balance: number;
  total_clicks: number;
  total_sales: number;
  created_at: string;
}

export interface Commission {
  id: string;
  affiliate_id: string;
  order_id: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  platform_fee: number;
  net_amount: number;
  created_at: string;
  paid_at: string | null;
}

export interface Withdrawal {
  id: string;
  amount: number;
  fee: number;
  net_amount: number;
  status: 'pending' | 'approved' | 'cancelled';
  payment_method: string;
  created_at: string;
  approved_at: string | null;
}

export interface WithdrawalRequest {
  amount: number;
  payment_method: string;
  payment_details: {
    bank?: string;
    agency?: string;
    account?: string;
    pix_key?: string;
  };
}