import { useRecoilCallback } from 'recoil';

import { deleteCartItem, getCartList, patchCartItem } from '../api/cartAPI';
import { cartItemQuantityState, cartListState } from '../store/cart';

const useCartItem = (productId: number) => {
  const updateQuantity = useRecoilCallback(
    ({ set }) =>
      async (quantity: number) => {
        set(cartItemQuantityState(productId), quantity);
        await patchCartItem(productId, quantity);
      },
    [productId]
  );

  const removeItem = useRecoilCallback(
    ({ set }) =>
      async () => {
        await deleteCartItem(productId);
        const newCartList = await getCartList();
        set(cartListState, newCartList);
      },
    [productId]
  );

  return { updateQuantity, removeItem };
};

export { useCartItem };
