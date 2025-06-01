import { CartItem } from "@/type/CartItem";
import { useEffect } from "react";

interface useLocalStorageProps {
  cartItemsData: CartItem[];
  selectedCartIds: Set<string> | undefined;
  setSelectedCartIds: React.Dispatch<
    React.SetStateAction<Set<string> | undefined>
  >;
}

export default function useLocalStorage({
  cartItemsData,
  selectedCartIds,
  setSelectedCartIds,
}: useLocalStorageProps) {
  useEffect(() => {
    if (!setSelectedCartIds) return;
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
  }, [cartItemsData]);

  useEffect(() => {
    if (!selectedCartIds) return;
    const arr = Array.from(selectedCartIds);
    localStorage.setItem("selectedCartIds", JSON.stringify(arr));
  }, [selectedCartIds]);
}
