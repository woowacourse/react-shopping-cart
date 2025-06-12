import { StorageKeyType } from "../../types/storage";
import useAllSelect from "./useAllSelect";

interface CheckboxItemType {
  id: number;
}

interface UseAllCheckboxHandlerProps<T> {
  items: T[];
  storageKey: StorageKeyType;
  toggleSelect: (itemId: number) => void;
  addSelectedId: (itemId: number) => void;
  selectedIds: number[];
  autoSelectAll?: boolean;
}

const useAllCheckboxHandler = <T extends CheckboxItemType>({
  items,
  storageKey,
  toggleSelect,
  addSelectedId,
  selectedIds,
  autoSelectAll = true,
}: UseAllCheckboxHandlerProps<T>) => {
  const { toggleAllSelect, isAllSelected } = useAllSelect({
    items,
    addSelectedId,
    toggleSelect,
    selectedIds,
    autoSelectAll,
    storageKey,
  });

  return { toggleAllSelect, isAllSelected };
};

export default useAllCheckboxHandler;
