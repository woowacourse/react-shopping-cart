import { CartItemType } from '../types';

export const calculateOrderPrice = (cartItems: CartItemType[]) =>
  cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

export const calculateTotalProductQuantity = (cartItems: CartItemType[]) =>
  cartItems.reduce((acc, item) => acc + item.quantity, 0);
