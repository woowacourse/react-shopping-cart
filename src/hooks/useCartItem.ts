import { useRecoilCallback } from 'recoil';

import { deleteCartItem, getCartList, patchCartItem } from '../api/cartAPI';
import { cartItemQuantityState, cartListState } from '../store/cart';
import { useMutationFetch } from './common/useMutationFetch';

const useCartItem = (productId: number) => {
  const { mutate: updateQuantity } = useMutationFetch<void, number>(
    useRecoilCallback(
      ({ set }) =>
        async (newQuantity) => {
          set(cartItemQuantityState(productId), newQuantity);
          await patchCartItem(productId, newQuantity);
        },
      [productId]
    )
  );

  const { mutate: removeItem } = useMutationFetch<void, void>(
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

  return { updateQuantity, removeItem };
};

export { useCartItem };
