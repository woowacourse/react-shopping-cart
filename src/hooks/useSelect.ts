import { useEffect, useRef, useState } from 'react';
import { CartItemProps } from '../types/cartItem';
import { selectedItemsStorage } from '../utils/localStorage';

function useSelect(cartList: CartItemProps[]) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const checkCartItemIds = cartList
    .filter((cartItem) => selectedItems.includes(cartItem.id))
    .map((cartItem) => cartItem.id);
  const isAllSelected = checkCartItemIds.length === cartList.length;
  const AllCartItems = cartList.map((cartItem) => cartItem.id);

  const initialLoadRef = useRef(true);

  useEffect(() => {
    const localSelectedItems = selectedItemsStorage.get();
    if (cartList.length > 0 && initialLoadRef.current) {
      if (localSelectedItems.length > 0) {
        setSelectedItems(localSelectedItems);
      } else {
        setSelectedItems(AllCartItems);
        selectedItemsStorage.set(AllCartItems);
      }
      initialLoadRef.current = false;
    } else {
      if (checkCartItemIds.length > 0) {
        setSelectedItems(checkCartItemIds);
        selectedItemsStorage.set(checkCartItemIds);
      } else {
        setSelectedItems(localSelectedItems);
        selectedItemsStorage.set(localSelectedItems);
      }
    }
  }, [cartList.length]);

  const selectItem = (cartItemId: number) => {
    if (selectedItems.includes(cartItemId)) {
      const filtered = selectedItems.filter((item) => item !== cartItemId);
      setSelectedItems(filtered);
      selectedItemsStorage.set(filtered);
    } else {
      const newSelectedItems = [...selectedItems, cartItemId];
      setSelectedItems(newSelectedItems);
      selectedItemsStorage.set(newSelectedItems);
    }
  };

  const selectAllItems = () => {
    if (isAllSelected) {
      setSelectedItems([]);
      selectedItemsStorage.set([]);
    } else {
      setSelectedItems(AllCartItems);
      selectedItemsStorage.set(AllCartItems);
    }
  };

  return {
    selectedItems,
    isAllSelected,
    selectItem,
    selectAllItems,
  };
}

export default useSelect;
