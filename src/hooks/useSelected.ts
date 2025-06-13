import { useEffect, useState } from "react";

interface useSelectedProps {
  enableLocalStorage?: boolean;
  localStorageKey?: string;
}
export const useSelected = ({
  enableLocalStorage = false,
  localStorageKey = "default",
}: useSelectedProps) => {
  const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(() => {
    if (!enableLocalStorage) return new Set();
    const stored = localStorage.getItem(localStorageKey);
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
    localStorage.setItem(localStorageKey, JSON.stringify([...selectedItemIds]));
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
