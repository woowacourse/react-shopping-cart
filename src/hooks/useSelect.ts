import { useEffect, useState, useRef } from 'react';
import { CartItemProps } from '../types/cartItem';

function useSelect(cartList: CartItemProps[]) {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const isAllSelected = selectedItems.size === cartList.length;
  const initialLoadRef = useRef(true);

  useEffect(() => {
    if (cartList.length > 0 && initialLoadRef.current) {
      setSelectedItems(new Set(cartList.map((cartItem) => cartItem.id)));
      initialLoadRef.current = false;
    } else {
      const currentCartItemIds = cartList.map((item) => item.id);
      setSelectedItems(
        new Set(
          Array.from(selectedItems).filter((selectedId) =>
            currentCartItemIds.includes(selectedId)
          )
        )
      );
    }
  }, [cartList, selectedItems]);

  const handleSelectItem = (cartItemId: number) => {
    if (selectedItems.has(cartItemId)) {
      selectedItems.delete(cartItemId);
      setSelectedItems(new Set(selectedItems));
    } else {
      selectedItems.add(cartItemId);
      setSelectedItems(new Set(selectedItems));
    }
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
