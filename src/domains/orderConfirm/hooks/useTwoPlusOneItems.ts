import { useMemo } from "react";
import { useSelectedCartContext } from "../../common/context/selectedCartProvider";
import { CartItemTypes } from "../../shopping-cart/types/cartItem";

export function useTwoPlusOneItems({
  cartItems,
}: {
  cartItems: CartItemTypes[];
}): CartItemTypes[] {
  const { selectedCartIds } = useSelectedCartContext();
  const twoPlusOneApplicableItems = useMemo(() => {
    return cartItems.filter(
      (item) =>
        selectedCartIds.includes(item.id.toString()) && item.quantity >= 3
    );
  }, [cartItems, selectedCartIds]);

  return twoPlusOneApplicableItems;
}
