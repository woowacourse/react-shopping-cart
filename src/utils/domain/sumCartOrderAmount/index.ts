import { CartItem } from "../../../types/cartItems";

type OrderAmount = number;
export const sumCartOrderAmount = (cartItems: CartItem[]): OrderAmount =>
  cartItems.reduce(
    (amount, { isSelected, quantity, product }) =>
      isSelected ? amount + quantity * product.price : amount,
    0
  );
