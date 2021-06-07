import { CartItem, Product } from '../types';

export const createItemInCart = (cartId: string, product: Product): CartItem => ({
  ...product,
  id: cartId,
  checked: true,
  quantity: 1,
});
