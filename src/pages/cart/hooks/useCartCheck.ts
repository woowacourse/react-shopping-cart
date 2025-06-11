import { useEffect } from "react";
import { useLocalStorage } from "../../../shared/hooks/common/useLocalStorage";
import { CART_ITEM_IDS_STORAGE_KEY, INITIALIZED_KEY } from "../constants";

type HandleCheckChangeType = ({ action, id }: { action: "all" | "each"; id?: number }) => void;

const useCartCheck = (cartItemIds: number[]) => {
  const [checkedIds, setCheckedIds] = useLocalStorage<number[]>(CART_ITEM_IDS_STORAGE_KEY, []);
  const [isInitialized, setIsInitialized] = useLocalStorage<boolean>(INITIALIZED_KEY, true);

  const isAllChecked = checkedIds.length === cartItemIds.length;

  const handleCheckChange: HandleCheckChangeType = ({ action, id }) => {
    if (action === "all") {
      setCheckedIds((prev) => (prev.length === cartItemIds.length ? [] : [...cartItemIds]));
      return;
    }
    if (action === "each" && id) {
      setCheckedIds((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
      return;
    }
  };

  useEffect(() => {
    if (isInitialized && cartItemIds.length !== 0) {
      setCheckedIds([...cartItemIds]);
      setIsInitialized(false);
      return;
    }

    setCheckedIds((prev) => prev.filter((id) => cartItemIds.includes(id)));
  }, [cartItemIds]);

  return {
    checkedIds,
    isAllChecked,
    handleCheckChange,
  };
};

export default useCartCheck;
