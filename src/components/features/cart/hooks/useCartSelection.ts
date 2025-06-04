import { useCallback, useState } from 'react';
import { CartItemType } from '../types';
import {
  loadSelectedCartItemIds,
  saveSelectedCartItemIds,
} from '../utils/localSelectedCartItemIds';

function useCartSelection(cartItems: CartItemType[]) {
  const [selectedCartItemIds, setSelectedCartItemIds] = useState<Set<number>>(
    () => {
      const localSelected = loadSelectedCartItemIds();

      return localSelected.size > 0
        ? localSelected
        : new Set(cartItems.map((item) => item.id));
    }
  );

  const isAllItemSelected = selectedCartItemIds.size === cartItems.length;
  const isSomeItemSelected = selectedCartItemIds.size > 0;

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

  return {
    states: {
      selectedItemIds: [...selectedCartItemIds],
      isAllItemSelected,
      isSomeItemSelected,
    },
    actions: {
      toggle: toggleSelect,
      toggleAll: toggleAllSelect,
    },
    utils: {
      getSelectedItems: getSelectedCartItems,
    },
  };
}
export default useCartSelection;
