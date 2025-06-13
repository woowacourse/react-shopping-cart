import { CartItemTypes } from "../../shopping-cart/types/cartItem";

interface GetTotalPriceParams {
  cartItems: CartItemTypes[];
  selectedCartIds: string[];
}

export function getOrderPrice({
  cartItems,
  selectedCartIds,
}: GetTotalPriceParams) {
  return cartItems
    .filter((e) => selectedCartIds.includes(e.id.toString()))
    .reduce(
      (totalPrice, item) => totalPrice + item.product.price * item.quantity,
      0
    );
}
