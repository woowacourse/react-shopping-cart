import { useState } from "react";

import { CartItemTypes } from "../types/cartItem";

export function useSelectedCartIds(cartItem: CartItemTypes[]) {
  const [selectedCartIds, setSelectedCartIds] = useState<string[]>([]);

  const calculateCartItemQuantity = () => {
    return cartItem.reduce((totalQuantity, item) => {
      if (selectedCartIds.includes(item.id.toString()))
        return totalQuantity + item.quantity;
      return totalQuantity;
    }, 0);
  };

  const selectAllCartItems = () => {
    if (cartItem)
      setSelectedCartIds(cartItem.map((item) => item.id.toString()));
  };

  return {
    selectedCartIds,
    setSelectedCartIds,
    selectAllCartItems,
    calculateCartItemQuantity,
  };
}
