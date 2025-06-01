import { DELIVERY } from '../../constants/delivery';
import { CartItemType } from '../../types/cartItem';

export const calculateOrderAmount = (items: CartItemType[]): number => {
  return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
};

export const calculateDeliveryFee = (orderAmount: number): number => {
  return orderAmount > DELIVERY.THRESHOLD ? DELIVERY.FREE : DELIVERY.FEE;
};

export const calculateTotalQuantity = (items: CartItemType[]): number => {
  return items.reduce((acc, item) => acc + item.quantity, 0);
};
