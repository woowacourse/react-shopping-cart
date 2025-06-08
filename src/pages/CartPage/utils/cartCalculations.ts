import { CartItemContent } from "../../../types/cartItem";

export const calculatePrices = (cartItems: CartItemContent[], checkedIds: number[]) => {
  const orderCartItems = cartItems.filter((item) => checkedIds.includes(item.id));
  const orderPrice = orderCartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryPrice = orderPrice < 100000 && orderPrice > 0 ? 3000 : 0;
  const totalPrice = orderPrice + deliveryPrice;
  return { orderPrice, deliveryPrice, totalPrice };
};
