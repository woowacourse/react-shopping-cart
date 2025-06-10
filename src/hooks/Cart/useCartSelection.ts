import { useMemo, useCallback, useEffect, useRef } from "react";
import { CartItem } from "@/type/CartItem";
import usePersistentSet from "./usePersistentSet";

const STORAGE_KEY = "selectedCartIds";

export const useCartSelection = (cartItems: CartItem[]) => {
  const [selectedIds, setSelectedIds, persist, hadStoredValue] =
    usePersistentSet(STORAGE_KEY);

  const shouldPersistRef = useRef(false);
  const didAutoSelectRef = useRef(false);

  const isAllSelected = useMemo(
    () => cartItems.length > 0 && cartItems.every((i) => selectedIds.has(i.id)),
    [cartItems, selectedIds]
  );

  const toggleAll = useCallback(() => {
    shouldPersistRef.current = true;
    setSelectedIds(
      isAllSelected ? new Set() : new Set(cartItems.map((i) => i.id))
    );
  }, [isAllSelected, cartItems]);

  const toggleOne = (id: string) => {
    shouldPersistRef.current = true;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  useEffect(() => {
    if (!hadStoredValue && !didAutoSelectRef.current && cartItems.length > 0) {
      const all = new Set(cartItems.map((i) => i.id));
      setSelectedIds(all);
      persist(all);
      didAutoSelectRef.current = true;
    }
  }, [hadStoredValue, cartItems, setSelectedIds, persist]);

  useEffect(() => {
    if (!shouldPersistRef.current) return;
    shouldPersistRef.current = false;
    persist(selectedIds);
  }, [selectedIds, persist]);

  const selectedItems = useMemo(
    () => cartItems.filter((i) => selectedIds.has(i.id)),
    [cartItems, selectedIds]
  );

  return {
    selectedIds,
    toggleOne,
    toggleAll,
    isAllSelected,
    selectedItemsLength: selectedIds.size,
    selectedItems,
    setSelectedIds,
  };
};
