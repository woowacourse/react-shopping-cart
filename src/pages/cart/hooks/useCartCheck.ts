import { useEffect, useRef } from "react";
import { useLocalStorage } from "../../../shared/hooks/common/useLocalStorage";

type HandleCheckChangeType = ({ action, id }: { action: "all" | "each"; id?: number }) => void;

const STORAGE_KEY = "cartItemIds";

const useCartCheck = (cartItemIds: number[]) => {
  const [checkedIds, setCheckedIds] = useLocalStorage<number[]>(STORAGE_KEY, []);
  const [isInitialized, setIsInitialized] = useLocalStorage<boolean>("isInitialized", true);
  const prevCartItemIds = useRef<number[]>([]);

  const isAllChecked = checkedIds.length === cartItemIds.length;

  const allCheck = () => {
    setCheckedIds((prev) => (prev.length === cartItemIds.length ? [] : [...cartItemIds]));
  };

  const eachCheck = (id: number) => {
    setCheckedIds((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  const handleCheckChange: HandleCheckChangeType = ({ action, id }) => {
    if (action === "all") allCheck();
    if (action === "each" && id) eachCheck(id);
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
