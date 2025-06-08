import { CartItemTypes } from "../../../shopping-cart/types/cartItem";

interface getTotalPriceProps {
  cartItems: CartItemTypes[];
  selectedCartIds: string[];
}

export function getOrderPrice({
  cartItems,
  selectedCartIds,
}: getTotalPriceProps) {
  return cartItems
    .filter((e) => selectedCartIds.includes(e.id.toString()))
    .reduce(
      (totalPrice, item) => totalPrice + item.product.price * item.quantity,
      0
    );
}
