import { Cart } from '@/api/cart';
export const getMostExpensiveItem = (items: Cart[]) =>
  items.reduce((prev, curr) =>
    prev.product.price > curr.product.price ? prev : curr
  );
