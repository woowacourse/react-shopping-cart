import { CartItemType } from "@/apis/cartItems/cartItem.type";
import useSelectedIds from "@/shared/hooks/useSelectedItem";
import { useCallback, useMemo } from "react";
import { useOrderIdsStorage } from "./useOrderIdsStorage";

export const useSelectedOrderList = (cartItems: CartItemType[]) => {
  const allIds = useMemo(() => cartItems.map(({ id }) => id), [cartItems]);

  const {
    setOrderIdsStorage,
    clearOrderIdsStorage,
    addOrderIdStorage,
    removeOrderIdStorage,
  } = useOrderIdsStorage(allIds);
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
      clearOrderIdsStorage();
      return;
    }

    addSelectedIds(allIds);
    setOrderIdsStorage(allIds);
  };

  const addSelectedItem = useCallback(
    (id: number) => {
      addSelectedId(id);
      addOrderIdStorage(id);
    },
    [addSelectedId, addOrderIdStorage]
  );

  const removeSelectedItem = useCallback(
    (id: number) => {
      removeSelectedId(id);
      removeOrderIdStorage(id);
    },
    [removeSelectedId, removeOrderIdStorage]
  );

  return {
    isAllSelected,
    toggleAllSelection,
    addSelectedItem,
    removeSelectedItem,
    getIsSelected: getIsSelectedId,
  };
};
