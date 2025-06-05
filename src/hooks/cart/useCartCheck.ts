import { useState } from "react";

type HandleCheckChangeType = ({ action, id }: { action: "all" | "each"; id?: number }) => void;

const useCartCheck = (cartItemIds: number[]) => {
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());

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

  return {
    checkedIds,
    isAllChecked,
    handleCheckChange,
  };
};

export default useCartCheck;
