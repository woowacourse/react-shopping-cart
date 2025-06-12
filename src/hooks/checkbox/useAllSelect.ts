import { useCallback, useEffect } from "react";
import storageService from "../../storage/storageService";
import { StorageKeyType } from "../../types/storage";

interface CheckboxItemType {
  id: number;
}

interface UseAllSelectProps<T> {
  items: T[];
  toggleSelect: (itemId: number) => void;
  addSelectedId: (itemId: number) => void;
  selectedIds: number[];
  autoSelectAll: boolean;
  storageKey: StorageKeyType;
}

const useAllSelect = <T extends CheckboxItemType>({
  items,
  toggleSelect,
  addSelectedId,
  selectedIds,
  autoSelectAll,
  storageKey,
}: UseAllSelectProps<T>) => {
  const storeNewSelectedData = useCallback(
    (itemList: T[]) => {
      itemList.forEach((item) => {
        const { id: itemId } = item;
        if (!storageService.isDataInStorage(storageKey, itemId)) {
          storageService.addData(storageKey, { id: itemId, isSelected: true });
          addSelectedId(itemId);
        }
      });
    },
    [storageKey, addSelectedId]
  );

  useEffect(() => {
    if (autoSelectAll) {
      storeNewSelectedData(items);
    }
  }, [autoSelectAll, items, toggleSelect, storageKey, storeNewSelectedData]);

  const isAllSelected = useCallback(() => {
    return items.every((item) => selectedIds.includes(item.id));
  }, [items, selectedIds]);

  const toggleAllSelect = useCallback(() => {
    const allIds = items.map((item) => item.id);
    if (isAllSelected()) {
      allIds.forEach((id) => toggleSelect(id));
    } else {
      const deselected = allIds.filter((id) => !selectedIds.includes(id));
      deselected.forEach((id) => toggleSelect(id));
    }
  }, [isAllSelected, items, selectedIds, toggleSelect]);

  return { toggleAllSelect, isAllSelected };
};

export default useAllSelect;
