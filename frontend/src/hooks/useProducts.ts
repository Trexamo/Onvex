import { useQuery, useMutation, useQueryClient } from 'react-query';
import { productService } from '../services/product.service';
import { Product } from '../types/product.types';
import toast from 'react-hot-toast';

export const useProducts = (page = 1, limit = 10) => {
  return useQuery(
    ['products', page, limit],
    () => productService.getProducts({ page, limit }),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
};

export const useProduct = (id: string) => {
  return useQuery(
    ['product', id],
    () => productService.getProductById(id),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
    }
  );
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (productData: Partial<Product>) => productService.createProduct(productData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
        toast.success('Produto criado com sucesso!');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Erro ao criar produto');
      },
    }
  );
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data }: { id: string; data: Partial<Product> }) =>
      productService.updateProduct(id, data),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries('products');
        queryClient.invalidateQueries(['product', variables.id]);
        toast.success('Produto atualizado com sucesso!');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Erro ao atualizar produto');
      },
    }
  );
};app