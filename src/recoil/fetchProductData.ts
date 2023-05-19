import { selector } from 'recoil';
import { fetchProducts } from '../apis/products';
import { fetchCartProducts } from '../apis/cartProducts';
import type { CartProduct, Product } from '../types/product';

export const fetchProductsSelector = selector<Product[]>({
  key: 'fetchProducts',
  get: async () => {
    const response = await fetchProducts();
    return response;
  },
});

export const fetchCartProductsSelector = selector<CartProduct[]>({
  key: 'fetchCartProducts',
  get: async () => {
    const response = await fetchCartProducts();
    return response;
  },
});
