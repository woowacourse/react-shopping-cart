import { DELIVERY_FEE } from '../../../../global/constants';
import { CartItemType } from '../types';

export const calculateOrderPrice = (cartItems: CartItemType[]) =>
  cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

export const calculateTotalProductQuantity = (cartItems: CartItemType[]) =>
  cartItems.reduce((acc, item) => acc + item.quantity, 0);

export const calculateTotalPrice = (value: number) => {
  const deliveryFee =
    value >= DELIVERY_FEE.MINIMUM ? DELIVERY_FEE.FREE : DELIVERY_FEE.STANDARD;
  const totalPrice = value + deliveryFee;
  return { deliveryFee, totalPrice };
};
