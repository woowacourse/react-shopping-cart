import { useEffect, useState } from "react";

interface CheckboxItemType {
  id: number;
}

interface CheckboxOptions {
  maxSelectableCount: number | null;
  enableAllSelectBox: boolean;
  autoSelectAll: boolean;
}

const useCheckboxHandler = <T extends CheckboxItemType>(
  items: T[],
  options: CheckboxOptions
) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { maxSelectableCount, enableAllSelectBox, autoSelectAll } = options;

  useEffect(() => {
    if (autoSelectAll) {
      const allIds = items.map((item) => item.id);
      setSelectedIds(allIds);
    }
  }, [autoSelectAll, items]);

  const toggleAllSelect = () => {
    setSelectedIds((prevIds) => {
      const allIds = items.map((item) => item.id);
      return prevIds.length === allIds.length ? [] : allIds;
    });
  };

  const toggleSelect = (itemId: number) => {
    setSelectedIds((prevSelected) => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter((id) => id !== itemId);
      }

      if (maxSelectableCount && prevSelected.length === maxSelectableCount) {
        return prevSelected;
      }

      return [...prevSelected, itemId];
    });
  };

  const isAllSelected = () => {
    return selectedIds.length === items.length;
  };

  const isSelected = (itemId: number) => {
    return selectedIds.includes(itemId);
  };

  if (enableAllSelectBox) {
    return {
      toggleAllSelect,
      toggleSelect,
      isAllSelected,
      isSelected,
      selectedIds,
    };
  }

  return {
    toggleSelect,
    isSelected,
    selectedIds,
  };
};

export default useCheckboxHandler;
