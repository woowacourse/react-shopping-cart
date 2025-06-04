import { useState } from "react";

import { CartItemTypes } from "../types/cartItem";

export function useSelectedCartIds(cartItem: CartItemTypes[]) {
  const [selectedCartIds, setSelectedCartIds] = useState<string[]>([]);

  const selectAll = () => {
    if (cartItem && selectedCartIds.length === 0) {
      setSelectedCartIds(cartItem.map((item) => item.id.toString()));
    } else if (selectedCartIds.length === 0) setSelectedCartIds([]);
  };

  const selectById = (id: string) => {
    if (selectedCartIds.includes(id))
      setSelectedCartIds(selectedCartIds.filter((itemId) => itemId !== id));
    else setSelectedCartIds([...selectedCartIds, id]);
  };

  return {
    selectedCartIds,
    selectById,
    selectAll,
  };
}
