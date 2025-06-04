import { CartItem } from "../../type/CartItem";

export function calculateTotalPrice(selectedCartItems: CartItem[]) {
  return selectedCartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
}
