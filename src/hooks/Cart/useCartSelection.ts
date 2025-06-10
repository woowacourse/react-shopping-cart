import { useMemo } from "react";
import { CartItem } from "@/type/CartItem";
import { usePersistedSet } from "./usePersistedSet";
import { useAutoSelectAll } from "./useAutoSelectAll";

const STORAGE_KEY = "selectedCartIds";

export const useCartSelection = (cartItems: CartItem[]) => {
  const [selected, setSelected, hadStoredValue] = usePersistedSet(STORAGE_KEY);

  // 자동 전체 선택
  useAutoSelectAll(cartItems, setSelected, hadStoredValue);

  const cartItemIds = useMemo(() => cartItems.map((i) => i.id), [cartItems]);

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    const isCurrentlyAllSelected =
      cartItems.length > 0 && cartItems.every((i) => selected.has(i.id));
    setSelected(() =>
      isCurrentlyAllSelected ? new Set() : new Set(cartItemIds)
    );
  };

  const isAllSelected = useMemo(
    () => cartItems.length > 0 && cartItems.every((i) => selected.has(i.id)),
    [cartItems, selected]
  );

  const selectedItems = useMemo(
    () => cartItems.filter((i) => selected.has(i.id)),
    [cartItems, selected]
  );

  return {
    selectedIds: selected,
    toggleOne,
    toggleAll,
    isAllSelected,
    selectedItemsLength: selected.size,
    selectedItems,
    setSelectedIds: setSelected,
  };
};
