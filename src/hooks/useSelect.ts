import { useEffect, useRef } from 'react';
import { CartItemProps } from '../types/cartItem';
import useStorageState from './useStorageState';

function useSelect(cartList: CartItemProps[]) {
  const [selectedItems, setSelectedItems] = useStorageState<number[]>(
    'selectedItems',
    []
  );

  const checkCartItemIds = cartList
    .filter((cartItem) => selectedItems.includes(cartItem.id))
    .map((cartItem) => cartItem.id);
  const isAllSelected = checkCartItemIds.length === cartList.length;
  const AllCartItems = cartList.map((cartItem) => cartItem.id);

  const initialLoadRef = useRef(true);

  useEffect(() => {
    if (cartList.length === 0) return;
    if (initialLoadRef.current) {
      if (selectedItems.length === 0) {
        setSelectedItems(AllCartItems);
      }
      initialLoadRef.current = false;
    } else {
      if (checkCartItemIds.length > 0) {
        setSelectedItems(checkCartItemIds);
      }
    }
  }, [cartList.length]);

  const selectItem = (cartItemId: number) => {
    if (selectedItems.includes(cartItemId)) {
      const filtered = selectedItems.filter((item) => item !== cartItemId);
      setSelectedItems(filtered);
    } else {
      const newSelectedItems = [...selectedItems, cartItemId];
      setSelectedItems(newSelectedItems);
    }
  };

  const selectAllItems = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(AllCartItems);
    }
  };

  return {
    selectedItems,
    setSelectedItems,
    isAllSelected,
    selectItem,
    selectAllItems,
  };
}

export default useSelect;
