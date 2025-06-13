import { CartItemType } from "@/apis/cartItems/cartItem.type";
import useSelectedIds from "@/shared/hooks/useSelectedItem";
import { useCallback, useEffect, useMemo } from "react";
import { useOrderIdsStorage } from "./useOrderIdsStorage";

export const useSelectedOrderList = (cartItems: CartItemType[]) => {
  const { getOrderIdsStorage, setOrderIdsStorage } = useOrderIdsStorage();
  const {
    addSelectedId,
    removeSelectedId,
    clearSelectedIds,
    getIsSelectedId,
    addSelectedIds,
    getSelectedIds,
  } = useSelectedIds(new Set(getOrderIdsStorage()));

  const selectedIds = useMemo(() => getSelectedIds(), [getSelectedIds]);
  useEffect(() => {
    setOrderIdsStorage(selectedIds);
  }, [setOrderIdsStorage, selectedIds]);

  const allIds = useMemo(() => cartItems.map(({ id }) => id), [cartItems]);
  const isAllSelected = useMemo(
    () => allIds.every((id) => getIsSelectedId(id)),
    [allIds, getIsSelectedId]
  );
  const toggleAllSelection = () => {
    if (isAllSelected) {
      clearSelectedIds();
      return;
    }

    addSelectedIds(allIds);
  };

  const addSelectedItem = useCallback(
    (id: number) => {
      addSelectedId(id);
    },
    [addSelectedId]
  );

  const removeSelectedItem = useCallback(
    (id: number) => {
      removeSelectedId(id);
    },
    [removeSelectedId]
  );

  return {
    isAllSelected,
    toggleAllSelection,
    addSelectedItem,
    removeSelectedItem,
    getIsSelected: getIsSelectedId,
  };
};
