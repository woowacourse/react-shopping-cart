import { useEffect, useRef, useState } from "react";

type HandleCheckChangeType = ({ action, id }: { action: "all" | "each"; id?: number }) => void;

const useCartCheck = (cartItemIds: number[]) => {
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());
  const hasInitialized = useRef(false);
  const prevCartItemIds = useRef<number[]>([]);

  const isAllChecked = checkedIds.size === cartItemIds.length;

  const allCheck = () => {
    setCheckedIds((prev) => (prev.size === cartItemIds.length ? new Set() : new Set(cartItemIds)));
  };

  const eachCheck = (id: number) => {
    setCheckedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const handleCheckChange: HandleCheckChangeType = ({ action, id }) => {
    if (action === "all") allCheck();
    if (action === "each" && id) eachCheck(id);
  };

  useEffect(() => {
    if (cartItemIds.length === 0) return;

    if (!hasInitialized.current) {
      setCheckedIds(new Set(cartItemIds));
      hasInitialized.current = true;
      prevCartItemIds.current = cartItemIds;
      return;
    }

    const deletedItems = prevCartItemIds.current.filter((id) => !cartItemIds.includes(id));
    if (deletedItems.length > 0) {
      setCheckedIds((prev) => {
        const newSet = new Set(prev);
        deletedItems.forEach((id) => newSet.delete(id));
        return newSet;
      });
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
