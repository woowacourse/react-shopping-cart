import { ItemInCart, Product } from '../types';

export const createItemInCart = (product: Product): ItemInCart => ({
  ...product,
  checked: true,
  quantity: 1,
});
