import { CartItemContent } from "../../../types/cartItem";
import { usePersistedState } from "../../../hooks/usePersistedState";
import { STORAGE_KEYS } from "../../../constants";
import { useEffect } from "react";

type HandleCheckChangeType = ({ action, id }: { action: "all" | "each"; id?: number }) => void;

export const useCartSelection = (cartItems: CartItemContent[]) => {
  const initialCheckedIds = cartItems.map((item) => item.id);
  const [checkedIds, setCheckedIds] = usePersistedState<number[]>(STORAGE_KEYS.CART_CHECKED_IDS, initialCheckedIds);

  useEffect(() => {
    const validIds = cartItems.map((item) => item.id);
    const filteredIds = checkedIds.filter((id) => validIds.includes(id));

    if (filteredIds.length !== checkedIds.length) {
      setCheckedIds(filteredIds);
    }
  }, [cartItems, checkedIds, setCheckedIds]);

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

  return { checkedIds, handleCheckChange };
};
