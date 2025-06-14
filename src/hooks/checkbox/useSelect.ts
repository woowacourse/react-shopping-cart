import { useCallback, useEffect, useState } from "react";
import { StorageKeyType, StorageSelectDataType } from "../../types/storage";
import storageService from "../../storage/storageService";

interface CheckboxItemType {
  id: number;
}

const useSelect = <T extends CheckboxItemType>(
  storageKey: StorageKeyType,
  items: T[]
) => {
  const initialSelected = storageService
    .getStoredData<StorageSelectDataType>(storageKey)
    .filter((item) => item.isSelected)
    .map((item) => item.id);

  const [selectedIds, setSelectedIds] = useState<number[]>(initialSelected);

  const isSelected = (itemId: number) => {
    return selectedIds.includes(itemId);
  };

  const addSelectedId = useCallback((itemId: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(itemId)) {
        return prev;
      }

      return [...prev, itemId];
    });
  }, []);

  const toggleSelect = useCallback(
    (itemId: number) => {
      setSelectedIds((prev) => {
        const isAlreadySelected = prev.includes(itemId);
        if (isAlreadySelected) {
          storageService.updateData(storageKey, {
            id: itemId,
            isSelected: false,
          });
          return prev.filter((id) => id !== itemId);
        }
        storageService.updateData(storageKey, { id: itemId, isSelected: true });
        return [...prev, itemId];
      });
    },
    [storageKey]
  );

  useEffect(() => {
    const currentSet = new Set(items.map((item) => item.id));
    setSelectedIds((prev) => prev.filter((id) => currentSet.has(id)));

    const stored =
      storageService.getStoredData<StorageSelectDataType>(storageKey);
    stored.forEach((item) => {
      if (!currentSet.has(item.id)) {
        storageService.deleteData<StorageSelectDataType>(storageKey, item.id);
      }
    });
  }, [items, storageKey]);

  return { selectedIds, toggleSelect, isSelected, addSelectedId };
};

export default useSelect;
