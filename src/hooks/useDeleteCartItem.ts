import { startTransition } from "react";
import { useSetRecoilState } from "recoil";
import { deleteCartItem } from "../api";
import { cartListState } from "../recoil/atoms";
import CartItemLocalStorage, { KEY } from "../services/CartItemLocalStorage";

export default function useDeleteCartItem(id: number) {
  const setCartList = useSetRecoilState(cartListState);

  const handleDelete = async () => {
    await deleteCartItem(id);
    CartItemLocalStorage.delete(KEY, id);

    startTransition(() => {
      setCartList((prevCartList) =>
        prevCartList.filter((item) => item.id !== id)
      );
    });
  };

  return { handleDelete };
}
