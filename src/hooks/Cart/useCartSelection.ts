import { useState, useEffect, useMemo, useCallback } from "react";
import { CartItem } from "@/type/CartItem";

export const useCartSelection = (cartItems: CartItem[]) => {
  const [selectedCartIds, setSelectedCartIds] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    if (cartItems.length === 0) return;

    const currentIds = new Set(cartItems.map((i) => i.id));
    setSelectedCartIds((prev) => {
      const valid = Array.from(prev).filter((id) => currentIds.has(id));

      const wasAllSelected =
        valid.length === currentIds.size && currentIds.size > 0;

      return wasAllSelected ? new Set(currentIds) : new Set(valid);
    });
  }, [cartItems]);

  const isAllSelected = useMemo(
    () =>
      cartItems.length > 0 &&
      cartItems.every((item) => selectedCartIds.has(item.id)),
    [cartItems, selectedCartIds]
  );

  const handleSelectAllCartItems = useCallback(() => {
    setSelectedCartIds(
      isAllSelected ? new Set() : new Set(cartItems.map((i) => i.id))
    );
  }, [isAllSelected, cartItems]);

  const handleSelectCartItem = (id: string) => {
    setSelectedCartIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectedCartItems = cartItems.filter((i) => selectedCartIds.has(i.id));

  return {
    selectedCartIds,
    handleSelectCartItem,
    handleSelectAllCartItems,
    isAllSelected,
    selectedCartItemsLength: selectedCartIds.size,
    selectedCartItems,
    setSelectedCartIds,
  };
};
