import api from './api';
import { Product, ProductFilters } from '../types/product.types';

export const productService = {
  async getProducts(filters?: ProductFilters) {
    const { data } = await api.get('/products', { params: filters });
    return data;
  },

  async getProductById(id: string) {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  async createProduct(productData: Partial<Product>) {
    const { data } = await api.post('/products', productData);
    return data;
  },

  async updateProduct(id: string, productData: Partial<Product>) {
    const { data } = await api.put(`/products/${id}`, productData);
    return data;
  },

  async deleteProduct(id: string) {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },

  async checkCityAvailability(productId: string, cityId: string) {
    const { data } = await api.get(`/products/${productId}/cities/${cityId}`);
    return data;
  },

  async updateStock(id: string, quantity: number, operation: 'add' | 'remove') {
    const { data } = await api.patch(`/products/${id}/stock`, { quantity, operation });
    return data;
  },
};