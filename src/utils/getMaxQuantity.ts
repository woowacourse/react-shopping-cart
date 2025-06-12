import { CartItem } from '../types';

export const getMaxQuantity = (items: CartItem[]) =>
  items.reduce((max, item) => Math.max(max, item.quantity), 0);

export default getMaxQuantity;
