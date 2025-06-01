import { useState } from "react";
import { CartItemContent, CartItemWithCheck } from "../types/cartItem";

type HandleCheckChangeType = ({ action, id }: { action: "all" | "each"; id?: number }) => void;

export const useCartSelection = (cartItems: CartItemContent[]) => {
  const [checkedIds, setCheckedIds] = useState<Set<number>>(
    () => new Set(cartItems.map((item) => item.id)), // 초기값: 모두 체크
  );

  const cartItemsWithCheck: CartItemWithCheck[] = cartItems.map((item) => ({
    ...item,
    isChecked: checkedIds.has(item.id),
  }));

  const handleCheckChange: HandleCheckChangeType = ({ action, id }) => {
    if (action === "all") {
      const isAllChecked = cartItems.every((item) => checkedIds.has(item.id));
      if (isAllChecked) {
        setCheckedIds(new Set());
      } else {
        setCheckedIds(new Set(cartItems.map((item) => item.id)));
      }
    }

    if (action === "each" && id) {
      setCheckedIds((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    }
  };

  const isAllChecked = cartItems.length > 0 && cartItems.every((item) => checkedIds.has(item.id));

  return { cartItemsWithCheck, handleCheckChange, isAllChecked };
};
