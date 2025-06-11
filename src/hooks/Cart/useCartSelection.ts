import { useMemo } from "react";
import { CartItem } from "@/type/CartItem";
import { usePersistedSet } from "./usePersistedSet";
import { useAutoSelectAll } from "./useAutoSelectAll";

const STORAGE_KEY = "selectedCartIds";

export function useCartSelection(cartItems: CartItem[]) {
  const [selectedIds, setSelectedIds, hadStoredValue] =
    usePersistedSet(STORAGE_KEY);

  useAutoSelectAll(cartItems, setSelectedIds, hadStoredValue);

  const cartItemIds = useMemo(() => cartItems.map((i) => i.id), [cartItems]);

  const toggleOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    const isCurrentlyAllSelected =
      cartItems.length > 0 && cartItems.every((i) => selectedIds.has(i.id));
    setSelectedIds(() =>
      isCurrentlyAllSelected ? new Set() : new Set(cartItemIds)
    );
  };

  const isAllSelected = useMemo(
    () => cartItems.length > 0 && cartItems.every((i) => selectedIds.has(i.id)),
    [cartItems, selectedIds]
  );

  return {
    selectedIds,
    toggleOne,
    toggleAll,
    isAllSelected,
    selectedItemsLength: selectedIds.size,
    setSelectedIds,
  };
}
