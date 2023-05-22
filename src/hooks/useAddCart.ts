import { useState } from "react";
import { useRecoilValue } from "recoil";
import { cartState } from "../atoms/cartState";
import { useRefreshableRecoilValue } from "./useRefreshableAtom";

export function useAddCart() {
  const [isSelected, setIsSelected] = useState(false);
  const carts = useRefreshableRecoilValue(cartState);

  function selectProductItem() {
    isSelected ? setIsSelected(false) : setIsSelected(true);
  }

  function checkInitAddProduct(productId: number) {
    const isInit = carts?.every((item: any) => item.product.id !== productId);
    return isInit;
  }

  return { isSelected, selectProductItem, checkInitAddProduct };
}
