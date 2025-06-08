import { CartItem } from '../types/cart';

export const calculatePrices = (selectedCartItems: CartItem[]) => {
  const cartTypeQuantity = selectedCartItems.length;
  const totalQuantity = selectedCartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = selectedCartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = totalPrice >= 100000 ? 0 : 3000;
  const totalPurchasePrice = totalPrice + deliveryFee;
  const couponDiscountPrice = 0;

  return { cartTypeQuantity, totalQuantity, totalPrice, deliveryFee, totalPurchasePrice, couponDiscountPrice };
};
