import { CartItem } from "../types/cartItems";

export const sumCartOrderAmount = (cartItems: CartItem[]) =>
  cartItems.reduce(
    (amount, { isSelected, quantity, product }) =>
      isSelected ? amount + quantity * product.price : amount,
    0
  );
