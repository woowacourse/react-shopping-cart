import { CartItemTypes } from "../../shopping-cart/types/cartItem";

interface GetTotalPriceProps {
  cartItems: CartItemTypes[];
  selectedCartIds: string[];
}

export function getOrderPrice({
  cartItems,
  selectedCartIds,
}: GetTotalPriceProps) {
  return cartItems
    .filter((e) => selectedCartIds.includes(e.id.toString()))
    .reduce(
      (totalPrice, item) => totalPrice + item.product.price * item.quantity,
      0
    );
}
