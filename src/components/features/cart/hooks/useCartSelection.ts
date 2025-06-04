import { useCallback, useState } from 'react';
import { CartItemType } from '../types';

function useCartSelection(cartItems: CartItemType[]) {
  const [selectedCartItemIds, setSelectedCartItemIds] = useState<Set<number>>(
    () => {
      const localSelectedCartItemIds = localStorage.getItem(
        'selectedCartItemIds'
      );
      if (localSelectedCartItemIds) {
        return new Set(JSON.parse(localSelectedCartItemIds));
      }

      return new Set(cartItems.map((item) => item.id));
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
    setSelectedCartItemIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(targetId)) {
        newSelected.delete(targetId);
      } else {
        newSelected.add(targetId);
      }

      localStorage.setItem(
        'selectedCartItemIds',
        JSON.stringify([...newSelected])
      );
      return newSelected;
    });
  }, []);

  const toggleAllSelect = useCallback(() => {
    setSelectedCartItemIds(() => {
      if (isAllItemSelected) {
        localStorage.setItem('selectedCartItemIds', JSON.stringify([]));
        return new Set([]);
      } else {
        localStorage.setItem(
          'selectedCartItemIds',
          JSON.stringify(cartItems.map((item) => item.id))
        );
        return new Set(cartItems.map((item) => item.id));
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
