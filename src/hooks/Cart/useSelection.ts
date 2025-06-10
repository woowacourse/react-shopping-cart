import { useState, useCallback } from "react";

export function useSelection(initialSelected: Set<string> = new Set()) {
  const [selected, setSelected] = useState<Set<string>>(initialSelected);

  const toggleOne = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback((allIds: string[]) => {
    setSelected((prev) => {
      const allSelected = allIds.every((id) => prev.has(id));
      return allSelected ? new Set() : new Set(allIds);
    });
  }, []);

  const isAllSelected = useCallback(
    (allIds: string[]) => {
      return allIds.length > 0 && allIds.every((id) => selected.has(id));
    },
    [selected]
  );

  return {
    selected,
    setSelected,
    toggleOne,
    toggleAll,
    isAllSelected,
  };
}
