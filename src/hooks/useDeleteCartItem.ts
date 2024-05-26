import { startTransition } from 'react';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { deleteCartItem } from '../api';
import { cartListSelector } from '../recoil/cartItem';
import CartItemLocalStorage, {
  CART_ITEM_SELECTED_KEY,
} from '../services/CartItemLocalStorage';

export default function useDeleteCartItem(id: number) {
  const refreshCartList = useRecoilRefresher_UNSTABLE(cartListSelector);

  const handleDelete = async () => {
    await deleteCartItem(id);
    CartItemLocalStorage.delete(CART_ITEM_SELECTED_KEY, id);

    startTransition(() => {
      refreshCartList();
    });
  };

  return { handleDelete };
}
