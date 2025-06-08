import { useState } from "react";
import { CartItemContent, HandleCartItemChangeType } from "../../../types/cartItem";
import { useCartApi } from "./useCartApi";

type HandleCheckChangeType = ({ action, id }: { action: "all" | "each"; id?: number }) => void;

export const useCartSelection = (cartItems: CartItemContent[]) => {
  const [checkedIds, setCheckedIds] = useState<number[]>(cartItems.map((item) => item.id));

  const handleCheckChange: HandleCheckChangeType = ({ action, id }) => {
    if (action === "all") {
      const isAllChecked = cartItems.every((item) => checkedIds.includes(item.id));
      if (isAllChecked) {
        setCheckedIds([]);
      } else {
        setCheckedIds(cartItems.map((item) => item.id));
      }
    }

    if (action === "each" && id) {
      setCheckedIds((prev) => {
        const newChecked = [...prev];
        if (newChecked.includes(id)) {
          return newChecked.filter((checkedId) => checkedId !== id);
        }

        return [...newChecked, id];
      });
    }
  };

  const { patchCartItem, deleteCartItem } = useCartApi();

  const handleCartItemChange: HandleCartItemChangeType = ({ action, id, quantity }) => {
    if (action === "patch") patchCartItem({ id, quantity: quantity! });
    if (action === "delete") deleteCartItem({ id });
  };

  return { checkedIds, handleCartItemChange, handleCheckChange };
};
