import { CURRENT_USER } from "constants/index";
import { CartItem, Carts } from "type";

export const isInCart = (productId: number, carts: Carts) =>
  carts.some((cart: CartItem) => cart.id === `${CURRENT_USER}${productId}`);
