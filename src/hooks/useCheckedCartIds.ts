import { useCallback, useEffect, useState } from 'react';
import getIdsFromCartItems from '../utils/getIdsFromCartItems';
import { CartItem } from '../types';
import LocalStorage from '../utils/LocalStorage';

const useCheckedCartIds = () => {
  const CHECKED_CART_ID_STORAGE_KEY = 'checkedCartIds';
  const [checkedCartIds, setCheckedCartIds] = useState<number[]>(() => {
    return LocalStorage.getJSON<number[]>(CHECKED_CART_ID_STORAGE_KEY) ?? [];
  });

  useEffect(() => {
    LocalStorage.setJSON(CHECKED_CART_ID_STORAGE_KEY, checkedCartIds);
  }, [checkedCartIds]);

  const addCheckedCartItem = (id: number) => {
    setCheckedCartIds((prev) => [...prev, id]);
  };

  const removeCheckedCartItem = (id: number) => {
    setCheckedCartIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const initCheckedCartIds = useCallback((cartItems: CartItem[]) => {
    setCheckedCartIds(getIdsFromCartItems(cartItems));
  }, []);

  const loadCheckedCartIdsFromStorage = useCallback(
    (cartItems: CartItem[]) => {
      const storedCartIds = LocalStorage.getJSON<number[]>(CHECKED_CART_ID_STORAGE_KEY);
      if (storedCartIds) {
        setCheckedCartIds(storedCartIds);
      } else {
        initCheckedCartIds(cartItems);
      }
    },
    [initCheckedCartIds]
  );

  return {
    checkedCartIds,
    addCheckedCartItem,
    removeCheckedCartItem,
    initCheckedCartIds,
    loadCheckedCartIdsFromStorage,
  };
};

export default useCheckedCartIds;
