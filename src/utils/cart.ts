import { CartItem, Product } from '../types';

export const createCartItem = (product: Product): CartItem => ({
  ...product,
  checked: true,
  quantity: 1,
});
