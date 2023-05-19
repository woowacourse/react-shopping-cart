import { useEffect, useRef, useState } from 'react';
import { useRecoilCallback } from 'recoil';

import { deleteCartItem, getCartList, patchCartItem } from '../api/cartAPI';
import { TOAST_SHOW_DURATION } from '../constants';
import { cartItemQuantityState, cartListState } from '../store/cart';

const useCart = () => {
  const [isAdded, setIsAdded] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isAdded) {
      timeout.current && clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        setIsAdded(false);
      }, TOAST_SHOW_DURATION);
    }
  }, [isAdded]);

  const addItemQuantity = useRecoilCallback(
    ({ snapshot, set }) =>
      async (productId: number, quantity: number) => {
        setIsAdded(true);
        const prevQuantity = await snapshot.getPromise(cartItemQuantityState(productId));
        set(cartItemQuantityState(productId), prevQuantity + quantity);
        await patchCartItem(productId, quantity);
      },
    []
  );

  const removeCheckedItems = useRecoilCallback(
    ({ set }) =>
      async (productIds: number[]) => {
        await Promise.all(productIds.map((productId) => deleteCartItem(productId)));
        const newCartList = await getCartList();
        set(cartListState, newCartList);
      },
    []
  );

  return { addItemQuantity, removeCheckedItems };
};

export { useCart };
