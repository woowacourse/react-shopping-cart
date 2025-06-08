import { useMemo } from "react";
import { CartItemTypes } from "../../shopping-cart/types/cartItem";

interface UseTwoPlusOneApplicableItemsProps {
  cartItems: CartItemTypes[];
  selectedCartIds: string[];
}
export function useTwoPlusOneApplicableItems({
  cartItems,
  selectedCartIds,
}: UseTwoPlusOneApplicableItemsProps): CartItemTypes[] {
  const twoPlusOneApplicableItems = useMemo(() => {
    return cartItems.filter(
      (item) =>
        selectedCartIds.includes(item.id.toString()) && item.quantity >= 3
    );
  }, [cartItems, selectedCartIds]);

  return twoPlusOneApplicableItems;
}
