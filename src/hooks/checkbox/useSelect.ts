import { useCallback, useState } from "react";

const useSelect = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const isSelected = (itemId: number) => {
    return selectedIds.includes(itemId);
  };

  const toggleSelect = useCallback((itemId: number) => {
    setSelectedIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  return { selectedIds, toggleSelect, isSelected };
};

export default useSelect;
