import { CartItemTypes } from "../../types/cartItem";

interface getTotalPriceProps {
  cartItems: CartItemTypes[];
  selectedCartId: string[];
}

export function getTotalPrice({
  cartItems,
  selectedCartId,
}: getTotalPriceProps) {
  return cartItems
    .filter((e) => selectedCartId.includes(e.id.toString()))
    .reduce((a, b) => a + b.product.price * b.quantity, 0);
}
