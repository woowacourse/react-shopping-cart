import { CartItemType } from '../../types/cartItem';
import { DELIVERY } from '../../constants/delivery';

const calculateOrderAmount = (items: CartItemType[]): number => {
  return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
};

const calculateDeliveryFee = (orderAmount: number): number => {
  return orderAmount > DELIVERY.THRESHOLD ? DELIVERY.FREE : DELIVERY.FEE;
};

const calculateTotalQuantity = (items: CartItemType[]): number => {
  return items.reduce((acc, item) => acc + item.quantity, 0);
};

export { calculateOrderAmount, calculateDeliveryFee, calculateTotalQuantity };
