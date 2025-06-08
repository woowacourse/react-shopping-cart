import { useMemo } from "react";
import { CartItemTypes } from "../../shopping-cart/types/cartItem";
import { useCartContext } from "../../common/context/cartProvider";
import { useSelectedCartContext } from "../../common/context/selectedCartProvider";

export function useTwoPlusOneApplicableItems(): CartItemTypes[] {
  const { cartItems } = useCartContext();
  const { selectedCartIds } = useSelectedCartContext();
  const twoPlusOneApplicableItems = useMemo(() => {
    return cartItems.filter(
      (item) =>
        selectedCartIds.includes(item.id.toString()) && item.quantity >= 3
    );
  }, [cartItems, selectedCartIds]);

  return twoPlusOneApplicableItems;
}
