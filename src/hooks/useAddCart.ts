import { useState } from "react";
import { useSetRecoilState } from "recoil";

import { cartState } from "../atoms/cartState";
import { CartType } from "../type/cart";

export function useAddCart() {
  const [isSelected, setIsSelected] = useState(false);

  const selectProductItem = () => {
    isSelected ? setIsSelected(false) : setIsSelected(true);
  };

  return { isSelected, selectProductItem };
}
