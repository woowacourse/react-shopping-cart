import { deleteCartItem } from "../api";

import { useRecoilRefresher_UNSTABLE } from "recoil";
import { cartListState } from "../recoil/selectors";

import CartItemLocalStorage, { KEY } from "../services/CartItemLocalStorage";

export default function useDeleteCartItem(id: number) {
  const refreshCartList = useRecoilRefresher_UNSTABLE(cartListState);

  const handleDelete = async () => {
    await deleteCartItem(id);
    CartItemLocalStorage.delete(KEY, id);
    refreshCartList();
  };

  return { handleDelete };
}
