import { getOrderTotalPrice } from "@/domains/utils/getOrderTotalPrice";
import useSelectedItemIds from "../../../shared/hooks/useSelectedItem";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { useCallback, useMemo } from "react";

export const useOrderList = (cartItems: CartItemType[]) => {
  const allIds = useMemo(
    () => new Set(cartItems.map(({ id }) => id)),
    [cartItems]
  );
  const {
    addSelectedItem,
    removeSelectedItem,
    clearSelectedItems,
    getIsSelected,
    addSelectedItemIds,
  } = useSelectedItemIds(allIds);
  const isAllSelected = useMemo(
    () => [...allIds].every((id) => getIsSelected(id)),
    [allIds, getIsSelected]
  );
  const toggleAllSelection = useCallback(() => {
    if (isAllSelected) {
      clearSelectedItems();
      return;
    }

    addSelectedItemIds([...allIds]);
  }, [isAllSelected, clearSelectedItems, allIds, addSelectedItemIds]);

  const orderList = cartItems.filter(({ id }) => getIsSelected(id)) ?? [];
  const orderTotalPrice = getOrderTotalPrice(orderList);

  return {
    isAllSelected,
    toggleAllSelection,
    addSelectedItem,
    removeSelectedItem,
    getIsSelected,
    orderList,
    orderTotalPrice,
  };
};
