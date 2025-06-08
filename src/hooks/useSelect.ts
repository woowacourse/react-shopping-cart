import { useEffect, useState, useRef } from 'react';
import { CartItemProps } from '../types/cartItem';
import { getStorage, setStorage } from '../utils/storage';

const SELECTED_ITEMS_KEY = 'selectedItems';

function useSelect(cartList: CartItemProps[]) {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(() => {
    const storedItems = getStorage<number[] | null>(SELECTED_ITEMS_KEY, null);
    return new Set(storedItems ?? []);
  });

  const isInitialMount = useRef(true);

  const isAllSelected =
    selectedItems.size === cartList.length && cartList.length > 0;

  useEffect(() => {
    if (!isInitialMount.current) {
      setStorage(SELECTED_ITEMS_KEY, Array.from(selectedItems));
    }
  }, [selectedItems]);

  useEffect(() => {
    if (cartList.length === 0 && isInitialMount.current) {
      return;
    }

    if (isInitialMount.current) {
      const storedItems = getStorage<number[] | null>(SELECTED_ITEMS_KEY, null);

      if (storedItems === null) {
        setSelectedItems(new Set(cartList.map((item) => item.id)));
      } else {
        const currentCartItemIds = new Set(cartList.map((item) => item.id));
        const syncedItems = storedItems.filter((id) =>
          currentCartItemIds.has(id)
        );
        setSelectedItems(new Set(syncedItems));
      }
      isInitialMount.current = false;
    } else {
      const currentCartItemIds = new Set(cartList.map((item) => item.id));
      setSelectedItems((prev) => {
        const newItems = new Set(prev);
        let isChanged = false;
        for (const id of newItems) {
          if (!currentCartItemIds.has(id)) {
            newItems.delete(id);
            isChanged = true;
          }
        }
        return isChanged ? newItems : prev;
      });
    }
  }, [cartList]);

  const handleSelectItem = (cartItemId: number) => {
    setSelectedItems((prev) => {
      const newSelectedItems = new Set(prev);
      if (newSelectedItems.has(cartItemId)) {
        newSelectedItems.delete(cartItemId);
      } else {
        newSelectedItems.add(cartItemId);
      }
      return newSelectedItems;
    });
  };

  const handleSelectAllItems = () => {
    if (isAllSelected) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartList.map((cartItem) => cartItem.id)));
    }
  };

  return {
    selectedItems,
    isAllSelected,
    handleSelectItem,
    handleSelectAllItems,
  };
}

export default useSelect;
