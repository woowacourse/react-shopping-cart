import { useCallback, useState } from "react";
import { StorageKeyType, StorageSelectDataType } from "../../types/storage";
import storageService from "../../storage/storageService";

const useSelect = (storageKey: StorageKeyType) => {
  const initialSelected = storageService
    .getStoredData<StorageSelectDataType>(storageKey)
    .filter((item) => item.isSelected)
    .map((item) => item.id);

  const [selectedIds, setSelectedIds] = useState<number[]>(initialSelected);

  const isSelected = (itemId: number) => {
    return selectedIds.includes(itemId);
  };

  const addSelectedId = useCallback((itemId: number) => {
    setSelectedIds((prev) => [...prev, itemId]);
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

  return { selectedIds, toggleSelect, isSelected, addSelectedId };
};

export default useSelect;
