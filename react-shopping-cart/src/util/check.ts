import { CURRENT_USER } from "constants/index";
import { CartItem } from "type";

export const isInCart = (productId: number, carts: CartItem[]) =>
  carts.some((cart: CartItem) => cart.id === `${CURRENT_USER}${productId}`);
