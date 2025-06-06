/* hooks/Cart/useCartSelection.ts */
import { useMemo, useCallback, useEffect, useRef } from "react";
import { CartItem } from "@/type/CartItem";
import usePersistentSet from "./usePersistentSet";
import useCleanupInvalidIds from "./useCleanupInvalidIds";

const STORAGE_KEY = "selectedCartIds";

export const useCartSelection = (cartItems: CartItem[]) => {
  // ① 초기 세팅만 읽고, persist 는 수동 호출
  const [selectedIds, setSelectedIds, persist] = usePersistentSet(STORAGE_KEY);

  // ② 장바구니 변동 시 없는 ID 정리 (저장 X)
  useCleanupInvalidIds(cartItems, setSelectedIds);

  // ③ “이번 변경이 사용자의 선택에 의한 것인가?” 플래그
  const shouldPersistRef = useRef(false);

  // ④ 선택 계산
  const isAllSelected = useMemo(
    () => cartItems.length > 0 && cartItems.every((i) => selectedIds.has(i.id)),
    [cartItems, selectedIds]
  );

  // ⑤ 사용자 액션: 토글할 때만 플래그 켜기
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

  // ⑥ 플래그가 켜져 있을 때만 localStorage 동기화
  useEffect(() => {
    if (!shouldPersistRef.current) return;
    shouldPersistRef.current = false;
    persist(selectedIds); // 실제 저장
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
