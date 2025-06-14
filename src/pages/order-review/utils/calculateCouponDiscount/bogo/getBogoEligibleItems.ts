import { Cart } from '@/api/cart';
export const getBogoEligibleItems = (orderList: Cart[]) =>
  orderList.filter((item) => item.quantity >= 3);
