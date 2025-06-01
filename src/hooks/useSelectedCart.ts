import { useState, useEffect, useRef } from "react";
import { CartProduct } from "../type/cart";

export const useSelectedCart = (cartItems: CartProduct[] | undefined) => {
  const [selectedCartId, setSelectedCartId] = useState<number[]>([]);
  const isSetting = useRef(false);

  useEffect(() => {
    if (cartItems && !isSetting.current) {
      const cartIdList = cartItems?.map((item) => item.id);
      setSelectedCartId(cartIdList);
      isSetting.current = true;
    }
  }, [cartItems]);

  return {
    selectedCartId,
    setSelectedCartId,
  };
};
