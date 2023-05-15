import { atom, useRecoilState } from "recoil";

export const cartListState = atom<number[]>({
  key: "cartListState",
  default: [],
});

export const useCartList = (id?: number) => {
  const [cartList, setCartList] = useRecoilState(cartListState);

  const addProductToCartList = () => {
    if (!id) return;

    if (!cartList.includes(id)) setCartList((current) => [...current, id]);
  };

  const removeProductFromCartList = () => {
    if (!id === undefined) return;

    setCartList((current) => current.filter((productId) => productId !== id));
  };

  return {
    addProductToCartList,
    removeProductFromCartList,
    cartList,
  };
};
