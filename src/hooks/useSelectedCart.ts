import { useState, useEffect } from "react";
import { CartProduct } from "../type/cart";

export const useSelectedCart = (cartItems: CartProduct[]) => {
  const [selectedCartIds, setSelectedCartIds] = useState<number[]>([]);

  useEffect(() => {
    const cartIdList = cartItems.map((item) => item.id);
    setSelectedCartIds(cartIdList);
  }, []);

  return {
    selectedCartIds,
    setSelectedCartIds,
  };
};
