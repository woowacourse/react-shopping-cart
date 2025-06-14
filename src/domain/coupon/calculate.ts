import { getOrderItemsFromStorage } from '../../utils/storage/storage';
import { CartItemType } from '../mapper/cartItemMapper';

export const calculateOrderAmount = (items: CartItemType[]): number => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const calculateDeliveryFee = (orderAmount: number): number => {
  return orderAmount >= 100_000 ? 0 : 3_000;
};

export const calculateTotalQuantity = (items: CartItemType[]): number => {
  return items.reduce((acc, item) => acc + item.quantity, 0);
};

export const calculateBogoDiscount = () => {
  const items = getOrderItemsFromStorage();
  const eligibleItems = items.filter((item) => item.quantity >= 2);
  if (eligibleItems.length === 0) return 0;
  const mostExpensiveItem = eligibleItems.reduce((prev, curr) => (curr.price > prev.price ? curr : prev));
  return mostExpensiveItem.price;
};
