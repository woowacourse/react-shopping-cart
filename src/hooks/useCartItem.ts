import { useRecoilState } from "recoil";
import { cartListState } from "../atoms";
import { Id } from "../types/Product";
import { addCartItem, deleteCartItem, patchCartItem } from "../utils/apis";
import { useMemo } from "react";

export const useCartItem = (id: Id) => {
  const [cartList, setCartList] = useRecoilState(cartListState);
  const index = useMemo(() => {
    return cartList.findIndex((item) => item.id === id);
  }, [cartList]);

  const isInCart = () => {
    return index !== -1;
  };

  const quantity = isInCart() ? cartList[index].quantity : 0;

  const addItemToCartList = () => {
    if (!isInCart()) setCartList((current) => [...current, { id, quantity: 1 }]);
    addCartItem(id);
  };

  const removeItemFromCartList = () => {
    setCartList((current) => current.filter((item) => item.id !== id));
    deleteCartItem(id);
  };

  const changeCartItemQuantity = (quantity: number) => {
    patchCartItem(id, quantity);
  };

  return {
    addItemToCartList,
    removeItemFromCartList,
    changeCartItemQuantity,
    isInCart,
    quantity,
  };
};
