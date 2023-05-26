import { useEffect, useRef, useState } from 'react';
import { useRecoilCallback } from 'recoil';

import { deleteCartItem, getCartList, patchCartItem, postCartItem } from '../api/cartAPI';
import { TOAST_SHOW_DURATION } from '../constants';
import { cartItemQuantityState, cartListState } from '../store/cart';
import { useMutationFetch } from './common/useMutationFetch';

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

  const { mutate: addItemQuantity } = useMutationFetch<
    void,
    { productId: number; quantity: number }
  >(
    useRecoilCallback(
      ({ snapshot, set }) =>
        async ({ productId, quantity }) => {
          setIsAdded(true);
          const prevQuantity = await snapshot.getPromise(cartItemQuantityState(productId));
          set(cartItemQuantityState(productId), prevQuantity + quantity);
          await postCartItem(productId, quantity);
        },
      []
    )
  );

  const { mutate: updateItemQuantity } = useMutationFetch<
    void,
    { productId: number; quantity: number }
  >(
    useRecoilCallback(
      ({ set }) =>
        async ({ productId, quantity }) => {
          set(cartItemQuantityState(productId), quantity);
          await patchCartItem(productId, quantity);
        },
      []
    )
  );

  const { mutate: removeItem } = useMutationFetch<void, number>(
    useRecoilCallback(
      ({ set }) =>
        async (productId) => {
          await deleteCartItem(productId);
          const newCartList = await getCartList();
          set(cartListState, newCartList);
        },
      []
    )
  );

  const { mutate: removeCheckedItems } = useMutationFetch<void, number[]>(
    useRecoilCallback(
      ({ set }) =>
        async (productIds) => {
          await Promise.all(productIds.map((productId) => deleteCartItem(productId)));
          const newCartList = await getCartList();
          set(cartListState, newCartList);
        },
      []
    )
  );

  return { isAdded, addItemQuantity, updateItemQuantity, removeItem, removeCheckedItems };
};

export { useCart };
