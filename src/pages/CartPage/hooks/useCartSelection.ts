import { useState, useEffect } from "react";
import { CartItemContent, HandleCartItemChangeType } from "../../../types/cartItem";
import { useCartApi } from "./useCartApi";
import { storageHandler } from "../../../utils/storageHandler";
import { STORAGE_KEYS } from "../../../constants";

type HandleCheckChangeType = ({ action, id }: { action: "all" | "each"; id?: number }) => void;

const storageKey = STORAGE_KEYS.CART_CHECKED_IDS;

export const useCartSelection = (cartItems: CartItemContent[]) => {
  const [checkedIds, setCheckedIds] = useState<number[]>(() => {
    const savedIds = storageHandler.getItem(storageKey);
    const validIds = cartItems.map((item) => item.id);

    return savedIds.filter((id: number) => validIds.includes(id));
  });

  useEffect(() => {
    storageHandler.setItem<number[]>(storageKey, checkedIds);
  }, [checkedIds]);

  const handleCheckChange: HandleCheckChangeType = ({ action, id }) => {
    if (action === "all") {
      const isAllChecked = cartItems.every((item) => checkedIds.includes(item.id));
      const newCheckedIds = isAllChecked ? [] : cartItems.map((item) => item.id);
      setCheckedIds(newCheckedIds);
    }

    if (action === "each" && id) {
      setCheckedIds((prev) => {
        if (prev.includes(id)) {
          return prev.filter((checkedId) => checkedId !== id);
        }
        return [...prev, id];
      });
    }
  };

  const { patchCartItem, deleteCartItem } = useCartApi();

  const handleCartItemChange: HandleCartItemChangeType = ({ action, id, quantity }) => {
    if (action === "patch") patchCartItem({ id, quantity: quantity! });
    if (action === "delete") {
      deleteCartItem({ id });
      setCheckedIds((prev) => prev.filter((checkedId) => checkedId !== id));
    }
  };

  return { checkedIds, handleCartItemChange, handleCheckChange };
};
