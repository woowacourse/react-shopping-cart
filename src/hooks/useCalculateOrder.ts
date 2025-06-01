import { useMemo } from "react";
import { summarizeOrder } from "../util/summarizeOrder";
import { CartItem } from "../type/CartItem";

export function useCalculateOrder(
  cartItems: CartItem[],
  selectedIds: Set<string>
) {
  const summary = useMemo(
    () => summarizeOrder(cartItems, selectedIds),
    [cartItems, selectedIds]
  );

  return {
    selectedCartItemsCount: summary.count,
    selectedCartItemsLength: summary.length,
    isAllSelected: summary.isAll,
    subtotalPrice: summary.subtotal,
    shippingFee: summary.shipping,
    finalPrice: summary.final,
  };
}
