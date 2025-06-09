import { useState } from "react";
import { CartProduct } from "../type/cart";

const useSelectedCartIds = (cartItems: CartProduct[]) => {
  const LOCAL_STORAGE_KEY = "selectedCartIds";

  const getInitialSelectedIds = (): number[] => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }

    return cartItems.map((item) => item.id);
  };

  const [selectedCartIds, setSelectedCartIds] = useState<number[]>(
    getInitialSelectedIds
  );

  const handleSelectedCartIds = (newSelectedCartIds: number[]) => {
    setSelectedCartIds(newSelectedCartIds);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSelectedCartIds));
  };

  return { selectedCartIds, handleSelectedCartIds };
};

export default useSelectedCartIds;
