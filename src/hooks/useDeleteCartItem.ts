import { startTransition } from 'react';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { deleteCartItem } from '../api';
import { cartListSelector } from '../recoil';
import CartItemLocalStorage, {
  CART_ITEM_SELECTED_KEY,
} from '../services/CartItemLocalStorage';

export default function useDeleteCartItem(id: number) {
  const refreshCartList = useRecoilRefresher_UNSTABLE(cartListSelector);

  const handleDelete = async () => {
    const confirm = window.confirm('선택한 제품을 삭제하겠습니까?');

    if (confirm) {
      await deleteCartItem(id);
      CartItemLocalStorage.delete(CART_ITEM_SELECTED_KEY, id);

      startTransition(() => {
        refreshCartList();
      });
    }
  };

  return { handleDelete };
}
