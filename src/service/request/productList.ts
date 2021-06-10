import APIClient from '../../API';
import { Product, ProductId } from '../../types';

export const requestProductList = async () => {
  return APIClient.get('/products') as Promise<Product[]>;
};

export const requestProduct = (productId: ProductId) => {
  return APIClient.get(`/products/${productId}`) as Promise<Product>;
};
