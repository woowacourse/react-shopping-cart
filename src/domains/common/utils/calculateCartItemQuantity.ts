interface CalculateCartItemQuantityParams {
  cartItems: { id: number; quantity: number }[];
  selectedCartIds: string[];
}

export function calculateCartItemQuantity({
  cartItems,
  selectedCartIds,
}: CalculateCartItemQuantityParams) {
  return cartItems.reduce((totalQuantity, item) => {
    if (selectedCartIds.includes(item.id.toString()))
      return totalQuantity + item.quantity;
    return totalQuantity;
  }, 0);
}
