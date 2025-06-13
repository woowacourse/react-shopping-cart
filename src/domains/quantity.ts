import { CartItemType } from "../types/response";

export function getAllQuantity(cartItems: CartItemType[]) {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}
