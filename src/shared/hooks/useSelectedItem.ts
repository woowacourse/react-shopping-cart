import { useCallback, useState } from "react";

const useSelectedItemIds = (initialSelectedIds: Set<number>) => {
  const [selectedItemIds, setSelectedItemIds] =
    useState<Set<number>>(initialSelectedIds);

  const addSelectedItem = useCallback((id: number) => {
    setSelectedItemIds((prev) => new Set([...prev, id]));
  }, []);

  const removeSelectedItem = useCallback((id: number) => {
    setSelectedItemIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  const clearSelectedItems = useCallback(() => {
    setSelectedItemIds(new Set());
  }, []);

  const getIsSelected = useCallback(
    (id: number) => selectedItemIds.has(id),
    [selectedItemIds]
  );

  const toggleSelectedItem = useCallback(
    (id: number) => {
      if (getIsSelected(id)) {
        removeSelectedItem(id);
        return;
      }

      addSelectedItem(id);
    },
    [getIsSelected, addSelectedItem, removeSelectedItem]
  );

  const addSelectedItemIds = useCallback((ids: number[]) => {
    setSelectedItemIds((prev) => new Set([...prev, ...ids]));
  }, []);

  return {
    addSelectedItem,
    removeSelectedItem,
    clearSelectedItems,
    getIsSelected,
    toggleSelectedItem,
    addSelectedItemIds,
  };
};

export default useSelectedItemIds;
