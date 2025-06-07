import { CartItemType } from "@/apis/cartItems/cartItem.type";
import useSelectedIds from "@/shared/hooks/useSelectedItem";
import { useCallback, useMemo } from "react";
import { useOrderListStorage } from "./useOrderListStorage";

export const useSelectedOrderList = (cartItems: CartItemType[]) => {
  const allIds = useMemo(() => cartItems.map(({ id }) => id), [cartItems]);

  const {
    setOrderListStorage,
    clearOrderListStorage,
    addOrderListStorage,
    removeOrderListStorage,
  } = useOrderListStorage(allIds);
  const {
    addSelectedId,
    removeSelectedId,
    clearSelectedIds,
    getIsSelectedId,
    addSelectedIds,
  } = useSelectedIds(new Set(allIds));

  const isAllSelected = useMemo(
    () => allIds.every((id) => getIsSelectedId(id)),
    [allIds, getIsSelectedId]
  );
  const toggleAllSelection = () => {
    if (isAllSelected) {
      clearSelectedIds();
      clearOrderListStorage();
      return;
    }

    addSelectedIds(allIds);
    setOrderListStorage(allIds);
  };

  const addSelectedItem = useCallback(
    (id: number) => {
      addSelectedId(id);
      addOrderListStorage(id);
    },
    [addSelectedId, addOrderListStorage]
  );

  const removeSelectedItem = useCallback(
    (id: number) => {
      removeSelectedId(id);
      removeOrderListStorage(id);
    },
    [removeSelectedId, removeOrderListStorage]
  );

  return {
    isAllSelected,
    toggleAllSelection,
    addSelectedItem,
    removeSelectedItem,
    getIsSelected: getIsSelectedId,
  };
};
