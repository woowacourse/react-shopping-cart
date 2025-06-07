import { useCallback, useEffect } from "react";

interface CheckboxItemType {
  id: number;
}

interface UseAllSelectProps<T> {
  items: T[];
  toggleSelect: (itemId: number) => void;
  selectedIds: number[];
  autoSelectAll: boolean;
}

const useAllSelect = <T extends CheckboxItemType>({
  items,
  toggleSelect,
  selectedIds,
  autoSelectAll,
}: UseAllSelectProps<T>) => {
  useEffect(() => {
    if (autoSelectAll) {
      items.forEach((item) => toggleSelect(item.id));
    }
  }, [autoSelectAll, items, toggleSelect]);

  const isAllSelected = useCallback(() => {
    return selectedIds.length === items.length;
  }, [items, selectedIds]);

  const toggleAllSelect = useCallback(() => {
    const allIds = items.map((item) => item.id);
    const isAll = isAllSelected();
    allIds.forEach((id) => {
      if (isAll) {
        toggleSelect(id);
      } else {
        if (!selectedIds.includes(id)) {
          toggleSelect(id);
        }
      }
    });
  }, [isAllSelected, items, selectedIds, toggleSelect]);

  return { toggleAllSelect, isAllSelected };
};

export default useAllSelect;
