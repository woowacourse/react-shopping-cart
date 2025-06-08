import { DELIVERY_FEES, PRICE_THRESHOLDS } from '@/features/Order/Checkout/constants/coupons';

import { CartItemList } from '../types/Cart.types';

export const cartPrice = ({ cartItems }: CartItemList) => {
  const orderPrice = cartItems
    .filter((item) => item.quantity > 0 && item.isChecked)
    .reduce((acc, cart) => {
      return acc + Number(cart.product.price) * Number(cart.quantity);
    }, 0);

  const deliveryFee = orderPrice >= PRICE_THRESHOLDS.FREE_SHIPPING_MAX ? 0 : DELIVERY_FEES.STANDARD;
  const totalPrice = orderPrice + deliveryFee;

  return { orderPrice, deliveryFee, totalPrice };
};
