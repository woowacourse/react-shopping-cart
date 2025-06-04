import { useEffect, useState, useRef } from 'react';
import { CartItemProps } from '../types/cartItem';

function useSelect(cartList: CartItemProps[]) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const isAllSelected = selectedItems.length === cartList.length;
  const initialLoadRef = useRef(true);

  const cartItemIds = cartList.map((cartItem) => cartItem.id);

  useEffect(() => {
    if (cartList.length > 0 && initialLoadRef.current) {
      setSelectedItems(cartItemIds);
      initialLoadRef.current = false;
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
      setSelectedItems(cartItemIds);
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
