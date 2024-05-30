import { CartItem } from "../../types/cartItems";

type CartItemCount = number;
export const calculateSelectedCartItemCount = (cartItems: CartItem[]): CartItemCount => {
  return cartItems.reduce(
    (count, cartItem) => (cartItem.isSelected ? count + cartItem.quantity : count),
    0
  );
};
