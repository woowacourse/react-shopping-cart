import { CartItem } from "../../types/cartItems";

type CartItemsCount = number;
export const calculateSelectedCartItemsCount = (cartItems: CartItem[]): CartItemsCount => {
  return cartItems.reduce(
    (count, cartItem) => (cartItem.isSelected ? count + cartItem.quantity : count),
    0
  );
};
