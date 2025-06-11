import { useEffect, useRef, useState } from 'react';
import { CartItemProps } from '../types/cartItem';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

function useSelect(cartList: CartItemProps[]) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const checkCartItemIds = cartList
    .filter((cartItem) => selectedItems.includes(cartItem.id))
    .map((cartItem) => cartItem.id);
  const isAllSelected = checkCartItemIds.length === cartList.length;
  const AllCartItems = cartList.map((cartItem) => cartItem.id);

  const initialLoadRef = useRef(true);

  useEffect(() => {
    const localSelectedItems = getLocalStorage('selectedItems');
    if (cartList.length > 0 && initialLoadRef.current) {
      if (localSelectedItems.length > 0) {
        setSelectedItems(localSelectedItems);
      } else {
        setSelectedItems(AllCartItems);
        setLocalStorage('selectedItems', AllCartItems);
      }
      initialLoadRef.current = false;
    } else {
      if (checkCartItemIds.length > 0) {
        setSelectedItems(checkCartItemIds);
        setLocalStorage('selectedItems', checkCartItemIds);
      } else {
        setSelectedItems(localSelectedItems);
        setLocalStorage('selectedItems', localSelectedItems);
      }
    }
  }, [cartList.length]);

  const selectItem = (cartItemId: number) => {
    if (selectedItems.includes(cartItemId)) {
      const filtered = selectedItems.filter((item) => item !== cartItemId);
      setSelectedItems(filtered);
      setLocalStorage('selectedItems', filtered);
    } else {
      const newSelectedItems = [...selectedItems, cartItemId];
      setSelectedItems(newSelectedItems);
      setLocalStorage('selectedItems', newSelectedItems);
    }
  };

  const selectAllItems = () => {
    if (isAllSelected) {
      setSelectedItems([]);
      setLocalStorage('selectedItems', []);
    } else {
      setSelectedItems(AllCartItems);
      setLocalStorage('selectedItems', AllCartItems);
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
