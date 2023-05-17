import { useRecoilState } from "recoil";
import { cartListState } from "../atoms";
import { Id } from "../types/Product";

export const useCartList = (id: Id) => {
  const [cartList, setCartList] = useRecoilState(cartListState);

  const addItemToCartList = () => {
    if (!id) return;

    if (!cartList.includes(id)) setCartList((current) => [...current, id]);
  };

  const removeItemFromCartList = () => {
    if (!id === undefined) return;

    setCartList((current) => current.filter((productId) => productId !== id));
  };

  const isInCart = () => {
    return cartList.includes(id);
  };

  return {
    addItemToCartList,
    removeItemFromCartList,
    isInCart,
  };
};
