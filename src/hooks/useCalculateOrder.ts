import { useMemo } from "react";
import { FREE_SHIPPING_OVER, SHIPPING_FEE } from "../constants/priceSetting";
import { CartItem } from "../type/CartItem";

export function useCalculateOrder(
  cartItemsData: CartItem[],
  selectedCartIds: Set<string>
) {
  const {
    selectedCartItemsCount,
    selectedCartItemsLength,
    isAllSelected,
    finalPrice,
    subtotalPrice,
  } = useMemo(() => {
    const selected = cartItemsData.filter((item) =>
      selectedCartIds.has(item.id)
    );

    const totals = selected.reduce(
      (acc, item) => ({
        price: acc.price + item.product.price * item.quantity,
        count: acc.count + item.quantity,
      }),
      { price: 0, count: 0 }
    );

    const allSelected =
      cartItemsData.length > 0 &&
      cartItemsData.every((item) => selectedCartIds.has(item.id));

    const subtotal = totals.price;
    const finalAmount =
      subtotal >= FREE_SHIPPING_OVER ? subtotal : subtotal + SHIPPING_FEE;

    return {
      subtotalPrice: subtotal,
      selectedCartItemsCount: totals.count,
      selectedCartItemsLength: selected.length,
      isAllSelected: allSelected,
      finalPrice: finalAmount,
    };
  }, [cartItemsData, selectedCartIds]);

  return {
    selectedCartItemsCount,
    selectedCartItemsLength,
    isAllSelected,
    finalPrice,
    subtotalPrice,
    shippingFee: SHIPPING_FEE,
  };
}
