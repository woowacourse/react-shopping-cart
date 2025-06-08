import { useCallback, useState } from 'react';
import {
  CartItemType,
  deleteSelectedCartItem,
  loadSelectedCartItemIds,
  saveSelectedCartItemIds,
} from '..';

export function useCartSelection(cartItems: CartItemType[]) {
  const [selectedCartItemIds, setSelectedCartItemIds] = useState<Set<number>>(
    () => {
      const localSelected = loadSelectedCartItemIds();
      const initialSelected =
        localSelected.size > 0
          ? localSelected
          : new Set(cartItems.map((item) => item.id));
      saveSelectedCartItemIds(initialSelected);

      return initialSelected;
    }
  );

  const isAllItemSelected = cartItems.every((item) =>
    selectedCartItemIds.has(item.id)
  );
  const isSomeItemSelected = cartItems.some((item) =>
    selectedCartItemIds.has(item.id)
  );

  const getSelectedCartItems = useCallback(
    (items: CartItemType[]) =>
      items.filter((item) => selectedCartItemIds.has(item.id)),
    [selectedCartItemIds]
  );

  const toggleSelect = useCallback((targetId: number) => {
    setSelectedCartItemIds((prev) => {
      const newSelected = new Set(prev);
      newSelected.has(targetId)
        ? newSelected.delete(targetId)
        : newSelected.add(targetId);

      saveSelectedCartItemIds(newSelected);
      return newSelected;
    });
  }, []);

  const toggleAllSelect = useCallback(() => {
    setSelectedCartItemIds(() => {
      if (isAllItemSelected) {
        const empty = new Set<number>();
        saveSelectedCartItemIds(empty);
        return empty;
      } else {
        const full = new Set(cartItems.map((item) => item.id));
        saveSelectedCartItemIds(full);
        return full;
      }
    });
  }, [cartItems, isAllItemSelected]);

  const deleteSelect = useCallback((targetId: number) => {
    setSelectedCartItemIds((prev) => {
      const newSelected = new Set(prev);
      newSelected.delete(targetId);

      deleteSelectedCartItem(targetId);
      return newSelected;
    });
  }, []);

  return {
    states: {
      selectedItemIds: [...selectedCartItemIds],
      isAllItemSelected,
      isSomeItemSelected,
    },
    actions: {
      toggle: toggleSelect,
      toggleAll: toggleAllSelect,
      delete: deleteSelect,
    },
    utils: {
      getSelectedItems: getSelectedCartItems,
    },
  };
}
