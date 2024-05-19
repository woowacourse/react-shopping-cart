import { startTransition } from 'react';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { deleteCartItem } from '../api';
import { cartListState } from '../recoil/selectors';
import CartItemLocalStorage, {
  CART_ITEM_SELECTED_KEY,
} from '../services/CartItemLocalStorage';

export default function useDeleteCartItem(id: number) {
  const refreshCartList = useRecoilRefresher_UNSTABLE(cartListState);

  const handleDelete = async () => {
    await deleteCartItem(id);
    CartItemLocalStorage.delete(CART_ITEM_SELECTED_KEY, id);

    startTransition(() => {
      refreshCartList();
    });
  };

  return { handleDelete };
}
