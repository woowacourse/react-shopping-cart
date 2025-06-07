import { useEffect, useState } from "react";

const STORAGE_KEY = "selectedItemIds";

export const useSelected = () => {
  const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return new Set(parsed);
      } catch (error) {
        console.error("Failed to parse data from localStorage", error);
      }
    }
    return new Set();
  });

  const toggleSelectedItemId = (id: number) => {
    const newSet = new Set(selectedItemIds);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelectedItemIds(newSet);
  };

  const replaceSelectedItemIds = (ids: number[]) => {
    setSelectedItemIds(new Set(ids));
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...selectedItemIds]));
  }, [selectedItemIds]);

  return {
    selectedItemIds,
    toggleSelectedItemId,
    replaceSelectedItemIds,
  };
};
