import { useState, useEffect, useRef } from "react";
import { CartProduct } from "../type/cart";

export const useSelectedCart = (cartItems: CartProduct[] | undefined) => {
  const [selectedCartIds, setSelectedCartIds] = useState<number[]>([]);
  const isSetting = useRef(false);

  useEffect(() => {
    if (cartItems && !isSetting.current) {
      const cartIdList = cartItems?.map((item) => item.id);
      setSelectedCartIds(cartIdList);
      isSetting.current = true;
    }
  }, [cartItems]);

  return {
    selectedCartIds,
    setSelectedCartIds,
  };
};
