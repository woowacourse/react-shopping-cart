import { CartItem } from "../../types/type";

export const getOrderPrice = (
  cartItems: CartItem[],
  selectedItemIds: Set<number>
) =>
  cartItems.reduce((acc, cartItem) => {
    if (selectedItemIds.has(cartItem.id)) {
      return acc + cartItem.product.price * cartItem.quantity;
    }
    return acc;
  }, 0);
