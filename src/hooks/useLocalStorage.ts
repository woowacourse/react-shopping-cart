import { useEffect, useRef } from "react";
import { CartItem } from "../type/CartItem";

interface useLocalStorageProps {
  cartItemsData: CartItem[];
  selectedCartIds: Set<string>;
  setSelectedCartIds: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export default function useLocalStorage({
  cartItemsData,
  selectedCartIds,
  setSelectedCartIds,
}: useLocalStorageProps) {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    if (cartItemsData.length === 0) return;

    const stored = localStorage.getItem("selectedCartIds");
    if (stored) {
      try {
        const parsed: string[] = JSON.parse(stored);
        setSelectedCartIds(new Set(parsed));
      } catch {
        setSelectedCartIds(new Set(cartItemsData.map((item) => item.id)));
      }
    } else {
      setSelectedCartIds(new Set(cartItemsData.map((item) => item.id)));
    }
    initializedRef.current = true;
  }, [cartItemsData]);

  useEffect(() => {
    if (!initializedRef.current) return;
    const arr = Array.from(selectedCartIds);
    localStorage.setItem("selectedCartIds", JSON.stringify(arr));
  }, [selectedCartIds]);
}
