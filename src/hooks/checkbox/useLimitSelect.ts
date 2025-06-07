import { useCallback } from "react";

interface LimitSelectProps {
  selectedIds: number[];
  toggleSelect: (itemId: number) => void;
  maxSelectableCount: number | null;
}

const useLimitSelect = ({
  selectedIds,
  toggleSelect,
  maxSelectableCount,
}: LimitSelectProps) => {
  const isMaxSelected = useCallback(() => {
    return selectedIds.length === maxSelectableCount;
  }, [maxSelectableCount, selectedIds]);

  const limitedToggleSelect = useCallback(
    (itemId: number) => {
      if (isMaxSelected() && !selectedIds.includes(itemId)) {
        return;
      }

      toggleSelect(itemId);
    },
    [isMaxSelected, selectedIds, toggleSelect]
  );

  return {
    isMaxSelected,
    limitedToggleSelect,
  };
};

export default useLimitSelect;
