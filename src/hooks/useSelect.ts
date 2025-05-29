import { useEffect, useState, useRef } from 'react';
import { CartItemProps } from '../types/cartItem';

function useSelect(cartList: CartItemProps[]) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const isAllSelected = selectedItems.length === cartList.length;
  const initialLoadRef = useRef(true);

  useEffect(() => {
    if (cartList.length > 0 && initialLoadRef.current) {
      setSelectedItems(cartList.map((cartItem) => cartItem.id));
      initialLoadRef.current = false;
    } else {
      const currentCartItemIds = cartList.map((item) => item.id);
      setSelectedItems((prev) =>
        prev.filter((selectedId) => currentCartItemIds.includes(selectedId))
      );
    }
  }, [cartList]);

  const handleSelectItem = (cartItemId: number) => {
    if (selectedItems.includes(cartItemId)) {
      const filtered = selectedItems.filter((item) => item !== cartItemId);
      setSelectedItems(filtered);
    } else {
      setSelectedItems((prev) => [...prev, cartItemId]);
    }
  };

  const handleSelectAllItems = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartList.map((cartItem) => cartItem.id));
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
