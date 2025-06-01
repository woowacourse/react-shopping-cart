import { useEffect, useState, useRef } from 'react';
import { CartItemProps } from '../types/cartItem';

function useSelect(cartList: CartItemProps[]) {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const isAllSelected =
    selectedItems.size === cartList.length && cartList.length > 0;
  const initialLoadRef = useRef(true);

  useEffect(() => {
    if (cartList.length > 0 && initialLoadRef.current) {
      setSelectedItems(new Set(cartList.map((cartItem) => cartItem.id)));
      initialLoadRef.current = false;
    } else if (cartList.length > 0) {
      const currentCartItemIds = new Set(cartList.map((item) => item.id));

      setSelectedItems((prevSelectedItems) => {
        const filteredItems = Array.from(prevSelectedItems).filter(
          (selectedId) => currentCartItemIds.has(selectedId)
        );

        if (filteredItems.length === prevSelectedItems.size) {
          return prevSelectedItems;
        }

        return new Set(filteredItems);
      });
    } else {
      setSelectedItems(new Set());
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
