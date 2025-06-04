import { useState } from "react";

export const useSelected = () => {
  const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(
    new Set()
  );

  const toggleSelectedItemId = (id: number) => {
    const newSet = new Set(selectedItemIds);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelectedItemIds(newSet);
  };

  const replaceSelectedItemIds = (ids: number[]) => {
    setSelectedItemIds(new Set(ids));
  };

  return {
    selectedItemIds,
    toggleSelectedItemId,
    replaceSelectedItemIds,
  };
};
