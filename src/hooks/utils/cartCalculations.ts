import { CartItemWithCheck } from "../../types/cartItem";

export const calculatePrices = (cartItems: CartItemWithCheck[]) => {
  const orderPrice = cartItems.reduce(
    (acc, item) => (item.isChecked ? acc + item.quantity * item.product.price : acc),
    0,
  );
  const deliveryPrice = orderPrice < 100000 && orderPrice > 0 ? 3000 : 0;
  const totalPrice = orderPrice + deliveryPrice;

  return { orderPrice, deliveryPrice, totalPrice };
};

export const getCartStats = (cartItems: CartItemWithCheck[]) => ({
  cartItemsCount: cartItems.length,
  cartItemsCheckedCount: cartItems.filter((item) => item.isChecked).length,
  cartItemsTotalQuantity: cartItems.reduce((acc, item) => (item.isChecked ? acc + item.quantity : acc), 0),
  isAllChecked: cartItems.every((item) => item.isChecked),
});
