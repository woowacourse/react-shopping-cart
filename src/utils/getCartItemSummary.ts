import { CartItemTypes } from '../types/cartItem';

export const getCartItemSummary = (
  cartItems: CartItemTypes[],
  selectedCartIds: string[]
) => {
  const filteredCartItems = cartItems.filter((e) =>
    selectedCartIds.includes(e.id.toString())
  );

  const totalPrice = filteredCartItems.reduce(
    (a, b) => a + b.product.price * b.quantity,
    0
  );

  const totalQuantity = filteredCartItems.reduce((a, b) => a + b.quantity, 0);

  return { totalPrice, totalQuantity };
};
