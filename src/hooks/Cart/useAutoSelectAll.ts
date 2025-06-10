import { useEffect, useRef } from "react";
import { CartItem } from "@/type/CartItem";

export function useAutoSelectAll(
  cartItems: CartItem[],
  setSelected: (updater: (prev: Set<string>) => Set<string>) => void,
  hadStoredValue: boolean
) {
  const didAutoSelectRef = useRef(false);

  useEffect(() => {
    if (!hadStoredValue && !didAutoSelectRef.current && cartItems.length > 0) {
      setSelected(() => new Set(cartItems.map((i) => i.id)));
      didAutoSelectRef.current = true;
    }
  }, [hadStoredValue, cartItems, setSelected]);
}
