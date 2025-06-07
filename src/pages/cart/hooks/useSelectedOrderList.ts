import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { orderListStorageController } from "@/domains/controller/orderListStorageController";
import useSelectedIds from "@/shared/hooks/useSelectedItem";
import { useCallback, useMemo } from "react";

export const useSelectedOrderList = (cartItems: CartItemType[]) => {
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
      orderListStorageController.clear();
      return;
    }

    addSelectedIds([...allIds]);
    orderListStorageController.set([...allIds]);
  }, [isAllSelected, clearSelectedIds, allIds, addSelectedIds]);

  const addSelectedItem = useCallback(
    (id: number) => {
      addSelectedId(id);
      orderListStorageController.set((prev) => [...prev, id]);
    },
    [addSelectedId]
  );

  const removeSelectedItem = useCallback(
    (id: number) => {
      removeSelectedId(id);
      orderListStorageController.set((prev) =>
        prev.filter((itemId) => itemId !== id)
      );
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
