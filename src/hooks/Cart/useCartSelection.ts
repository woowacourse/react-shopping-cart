/* hooks/Cart/useCartSelection.ts */
import { useMemo, useCallback, useEffect, useRef } from "react";
import { CartItem } from "@/type/CartItem";
import usePersistentSet from "./usePersistentSet";
import useCleanupInvalidIds from "./useCleanupInvalidIds";

const STORAGE_KEY = "selectedCartIds";

export const useCartSelection = (cartItems: CartItem[]) => {
  const [selectedIds, setSelectedIds, persist, hadStoredValue] =
    usePersistentSet(STORAGE_KEY);

  useCleanupInvalidIds(cartItems, setSelectedIds);

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

  /* ★ ① 처음 로드 + storage 비어 있을 때만 자동 전체선택 */
  useEffect(() => {
    if (
      !hadStoredValue &&
      !didAutoSelectRef.current &&
      cartItems.length &&
      selectedIds.size === 0
    ) {
      const all = new Set(cartItems.map((i) => i.id));
      setSelectedIds(all);
      persist(all);
      didAutoSelectRef.current = true; // 다시 안 실행되도록
    }
  }, [hadStoredValue, cartItems, selectedIds, setSelectedIds, persist]);

  useEffect(() => {
    if (!shouldPersistRef.current) return;
    shouldPersistRef.current = false;
    persist(selectedIds);
  }, [selectedIds, persist]);

  const selectedItems = cartItems.filter((i) => selectedIds.has(i.id));

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
