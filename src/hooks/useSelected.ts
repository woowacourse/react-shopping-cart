import { useEffect, useState } from "react";

interface useSelectedProps {
  enableStorage?: boolean;
  storageKey?: string;
}
export const useSelected = ({
  enableStorage = false,
  storageKey = "default",
}: useSelectedProps) => {
  const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(() => {
    if (!enableStorage) return new Set();
    const stored = localStorage.getItem(storageKey);
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

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify([...selectedItemIds]));
  }, [selectedItemIds]);

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
