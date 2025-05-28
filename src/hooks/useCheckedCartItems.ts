import { useState } from 'react';
import { CartItem } from '../types';
import getIdsFromCartItems from '../utils/getIdsFromCartItems';

const useCheckedCartItems = (cartItems: CartItem[]) => {
  const [checkedCartIds, setCheckedCartIds] = useState<number[]>(
    getIdsFromCartItems(cartItems)
  );

  const addCheckedCartItem = (id: number) => {
    setCheckedCartIds((prev) => [...prev, id]);
  };

  const removeCheckedCartItem = (id: number) => {
    setCheckedCartIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  return {
    checkedCartIds,
    addCheckedCartItem,
    removeCheckedCartItem,
  };
};

export default useCheckedCartItems;
