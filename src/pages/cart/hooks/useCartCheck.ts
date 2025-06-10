import { useRef, useEffect } from "react";
import { useLocalStorage } from "../../../shared/hooks/common/useLocalStorage";
import { CART_ITEM_IDS_STORAGE_KEY, INITIALIZED_KEY } from "../constants";

type HandleCheckChangeType = ({ action, id }: { action: "all" | "each"; id?: number }) => void;

const useCartCheck = (cartItemIds: number[]) => {
  const [checkedIds, setCheckedIds] = useLocalStorage<number[]>(CART_ITEM_IDS_STORAGE_KEY, []);
  const [isInitialized, setIsInitialized] = useLocalStorage<boolean>(INITIALIZED_KEY, true);
  const prevCartItemIds = useRef<number[]>(cartItemIds);

  const isAllChecked = checkedIds.length === cartItemIds.length;

  const handleCheckChange: HandleCheckChangeType = ({ action, id }) => {
    if (action === "all") {
      setCheckedIds((prev) => (prev.length === cartItemIds.length ? [] : [...cartItemIds]));
    }
    if (action === "each" && id) {
      setCheckedIds((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
    }
  };

  useEffect(() => {
    if (isInitialized && cartItemIds.length !== 0) {
      setCheckedIds([...cartItemIds]);
      prevCartItemIds.current = cartItemIds;
      setIsInitialized(false);
      return;
    }

    const deletedItems = prevCartItemIds.current.filter((id) => !cartItemIds.includes(id));
    if (deletedItems.length > 0) {
      setCheckedIds((prev) => prev.filter((id) => !deletedItems.includes(id)));
    }
    prevCartItemIds.current = cartItemIds;
  }, [cartItemIds]);

  return {
    checkedIds,
    isAllChecked,
    handleCheckChange,
  };
};

export default useCartCheck;
