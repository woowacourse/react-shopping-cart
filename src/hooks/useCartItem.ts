import { useRecoilState, useRecoilValue } from "recoil";
import { cartListState, productsState } from "../atoms";
import { Id } from "../types/Product";
import { addCartItem, deleteCartItem, patchCartItem } from "../utils/apis";
import { useMemo } from "react";

export const useCartItem = (id: Id) => {
  const [cartList, setCartList] = useRecoilState(cartListState);
  const products = useRecoilValue(productsState);

  const index = useMemo(() => {
    return cartList.findIndex((item) => item.id === id);
  }, [cartList]);

  const product = useMemo(() => {
    const productIndex = products.findIndex((product) => product.id === id);

    return products[productIndex];
  }, [cartList]);

  const isInCart = () => {
    return index !== -1;
  };

  const quantity = isInCart() ? cartList[index].quantity : 0;

  const addItemToCartList = () => {
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) return;

    if (!isInCart()) setCartList((current) => [...current, { id, quantity: 1, product }]);
    addCartItem(id);
  };

  const removeItemFromCartList = () => {
    setCartList((current) => current.filter((item) => item.id !== id));
    deleteCartItem(id);
  };

  const changeCartItemQuantity = (quantity: number) => {
    const index = cartList.findIndex((item) => item.id === id);
    if (index === -1) return;

    const newCartList = [...cartList];
    newCartList.splice(index, 1, { id, quantity, product });

    setCartList(newCartList);
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
