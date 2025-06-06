import { useEffect } from "react";
import { CartItem } from "@/type/CartItem";

export default function useCleanupInvalidIds(
  cartItems: CartItem[],
  setIds: React.Dispatch<React.SetStateAction<Set<string>>>
) {
  useEffect(() => {
    if (!cartItems.length) return;

    const valid = new Set(cartItems.map((i) => i.id));
    setIds((prev) => {
      const next = new Set<string>();
      prev.forEach((id) => valid.has(id) && next.add(id));
      return next;
    });
  }, [cartItems, setIds]);
}
