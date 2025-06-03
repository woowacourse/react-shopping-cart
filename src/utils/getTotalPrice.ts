import { CartItemTypes } from '../types/cartItem';

interface getTotalPriceProps {
  cartItems: CartItemTypes[];
  selectedCartIds: string[];
}

export function getTotalPrice({
  cartItems,
  selectedCartIds,
}: getTotalPriceProps) {
  return cartItems
    .filter((e) => selectedCartIds.includes(e.id.toString()))
    .reduce((a, b) => a + b.product.price * b.quantity, 0);
}
