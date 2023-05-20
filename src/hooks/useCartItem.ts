import { useEffect } from 'react';
import { useRecoilCallback, useSetRecoilState } from 'recoil';

import { deleteCartItem, getCartList, patchCartItem } from '../api/cartAPI';
import { cartItemQuantityState, cartListState } from '../store/cart';
import { errorModalMessageState } from '../store/error';
import { useMutationFetch } from './common/useMutationFetch';

const useCartItem = (productId: number) => {
  const setErrorModalMessage = useSetRecoilState(errorModalMessageState);

  const { mutate: updateQuantity, state: updateQuantityState } = useMutationFetch<void, number>(
    useRecoilCallback(
      ({ set }) =>
        async (newQuantity) => {
          set(cartItemQuantityState(productId), newQuantity);
          await patchCartItem(productId, newQuantity);
        },
      [productId]
    )
  );

  const { mutate: removeItem, state: removeItemState } = useMutationFetch<void, void>(
    useRecoilCallback(
      ({ set }) =>
        async () => {
          await deleteCartItem(productId);
          const newCartList = await getCartList();
          set(cartListState, newCartList);
        },
      [productId]
    )
  );

  useEffect(() => {
    if (updateQuantityState.error) {
      setErrorModalMessage(updateQuantityState.error.message);
    }
  }, [updateQuantityState.error, setErrorModalMessage]);

  useEffect(() => {
    if (removeItemState.error) {
      setErrorModalMessage(removeItemState.error.message);
    }
  }, [removeItemState.error, setErrorModalMessage]);

  return { updateQuantity, removeItem };
};

export { useCartItem };
