import { useState } from "react";
import { CartItem } from "@/type/CartItem";

export const useCartSelection = (cartItems: CartItem[]) => {
  const [selectedCartIds, setSelectedCartIds] = useState<Set<string>>(
    new Set()
  );

  const handleSelectCartItem = (id: string) => {
    setSelectedCartIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAllCartItems = () => {
    setSelectedCartIds((prev) => {
      if (prev.size === cartItems.length) {
        return new Set();
      }
      return new Set(cartItems.map((item) => item.id));
    });
  };

  const selectedCartItemsLength = selectedCartIds.size;
  const isAllSelected =
    selectedCartIds.size === cartItems.length && cartItems.length > 0;
  const selectedCartItems = cartItems.filter((item) =>
    selectedCartIds.has(item.id)
  );

  return {
    selectedCartIds,
    handleSelectCartItem,
    handleSelectAllCartItems,
    selectedCartItemsLength,
    isAllSelected,
    selectedCartItems,
    setSelectedCartIds,
  };
};
