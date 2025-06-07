import { useCallback, useState } from 'react';
import getIdsFromCartItems from '../utils/getIdsFromCartItems';
import { CartItem } from '../types';

const useCheckedCartIds = () => {
  const [checkedCartIds, setCheckedCartIds] = useState<number[]>([]);

  const addCheckedCartItem = (id: number) => {
    setCheckedCartIds((prev) => [...prev, id]);
  };

  const removeCheckedCartItem = (id: number) => {
    setCheckedCartIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const initCheckedCartIds = useCallback((cartItems: CartItem[]) => {
    setCheckedCartIds(getIdsFromCartItems(cartItems));
  }, []);

  return {
    checkedCartIds,
    addCheckedCartItem,
    removeCheckedCartItem,
    initCheckedCartIds,
  };
};

export default useCheckedCartIds;
