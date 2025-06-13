import { useEffect, useState } from "react";

import { getLocalStorage, setLocalStorage } from "../../../utils/localStorage";
import { CartItemTypes } from "../types/cartItem";

export function useSelectedCartIds() {
  const [selectedCartIds, setSelectedCartIds] = useState<string[]>(
    getLocalStorage("selectedCartIds", [])
  );

  useEffect(() => {
    setLocalStorage("selectedCartIds", selectedCartIds);
  }, [selectedCartIds]);

  const toggleSelectAll = (cartItems: CartItemTypes[], init?: boolean) => {
    if (cartItems && selectedCartIds.length === 0) {
      setSelectedCartIds(cartItems.map((item) => item.id.toString()));
    } else if (selectedCartIds.length !== 0 && !init) {
      setSelectedCartIds([]);
    }
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
