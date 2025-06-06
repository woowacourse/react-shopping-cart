import { useState } from "react";

import { CartItemTypes } from "../types/cartItem";

export function useSelectedCartIds(cartItem: CartItemTypes[]) {
  const [selectedCartIds, setSelectedCartIds] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (cartItem && selectedCartIds.length === 0) {
      setSelectedCartIds(cartItem.map((item) => item.id.toString()));
    } else if (selectedCartIds.length !== 0) setSelectedCartIds([]);
  };

  const toggleCartItem = (id: string) => {
    if (selectedCartIds.includes(id)) removeFromSelection(id);
    else setSelectedCartIds([...selectedCartIds, id]);
  };

  const removeFromSelection = (id: string) => {
    setSelectedCartIds(selectedCartIds.filter((itemId) => itemId !== id));
  };

  return {
    selectedCartIds,
    toggleSelectAll,
    toggleCartItem,
    removeFromSelection,
  };
}
