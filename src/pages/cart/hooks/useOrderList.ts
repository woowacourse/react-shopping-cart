import { getOrderTotalPrice } from "@/domains/utils/getOrderTotalPrice";
import useSelectedIds from "../../../shared/hooks/useSelectedItem";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { useCallback, useMemo } from "react";

export const useOrderList = (cartItems: CartItemType[]) => {
  const allIds = useMemo(
    () => new Set(cartItems.map(({ id }) => id)),
    [cartItems]
  );
  const {
    addSelectedId,
    removeSelectedId,
    clearSelectedIds,
    getIsSelectedId,
    addSelectedIds,
  } = useSelectedIds(allIds);
  const isAllSelected = useMemo(
    () => [...allIds].every((id) => getIsSelectedId(id)),
    [allIds, getIsSelectedId]
  );
  const toggleAllSelection = useCallback(() => {
    if (isAllSelected) {
      clearSelectedIds();
      return;
    }

    addSelectedIds([...allIds]);
  }, [isAllSelected, clearSelectedIds, allIds, addSelectedIds]);

  const orderList = cartItems.filter(({ id }) => getIsSelectedId(id)) ?? [];
  const orderTotalPrice = getOrderTotalPrice(orderList);

  return {
    isAllSelected,
    toggleAllSelection,
    addSelectedItem: addSelectedId,
    removeSelectedItem: removeSelectedId,
    getIsSelected: getIsSelectedId,
    orderList,
    orderTotalPrice,
  };
};
