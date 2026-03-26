export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  commission_percentage: number;
  image_url: string;
  is_active: boolean;
  affiliate_code?: string;
  cities?: CityAvailability[];
  created_at: string;
  updated_at: string;
}

export interface CityAvailability {
  city_id: string;
  city_name: string;
  state: string;
  is_available: boolean;
  delivery_fee: number;
  estimated_days: number;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  isActive?: boolean;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  commission_percentage: number;
  image_url: string;
  is_active: boolean;
  cities: string[];
}