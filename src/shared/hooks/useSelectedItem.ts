import { useCallback, useState } from "react";

const useSelectedIds = (initialSelectedIds: Set<number>) => {
  const [selectedIds, setSelectedIds] =
    useState<Set<number>>(initialSelectedIds);

  const addSelectedId = useCallback((id: number) => {
    setSelectedIds((prev) => new Set([...prev, id]));
  }, []);

  const removeSelectedId = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  const clearSelectedIds = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const getIsSelectedId = useCallback(
    (id: number) => selectedIds.has(id),
    [selectedIds]
  );

  const toggleSelectedId = useCallback(
    (id: number) => {
      if (getIsSelectedId(id)) {
        removeSelectedId(id);
        return;
      }

      addSelectedId(id);
    },
    [getIsSelectedId, addSelectedId, removeSelectedId]
  );

  const addSelectedIds = useCallback((ids: number[]) => {
    setSelectedIds((prev) => new Set([...prev, ...ids]));
  }, []);

  const getSelectedIdsCount = useCallback(() => {
    return selectedIds.size;
  }, [selectedIds]);

  return {
    addSelectedId,
    removeSelectedId,
    clearSelectedIds,
    getIsSelectedId,
    toggleSelectedId,
    addSelectedIds,
    getSelectedIdsCount,
  };
};

export default useSelectedIds;
