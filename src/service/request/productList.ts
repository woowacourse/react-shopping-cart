import APIClient from '../../API';
import { Product, ProductId } from '../../types';

export const requestProductList = (): Promise<Product[]> => APIClient.get('/products');

export const requestProduct = (product_id: ProductId): Promise<Product> =>
  APIClient.get(`/products/${product_id}`);
