import { StorageKeyType } from "../../types/storage";
import useAllSelect from "./useAllSelect";
import useLimitSelect from "./useLimitSelect";
import useSelect from "./useSelect";
import { validateOptions } from "./validate";

interface CheckboxItemType {
  id: number;
}

interface CheckboxOptions {
  maxSelectableCount?: number | null;
  enableAllSelectBox?: boolean;
  autoSelectAll?: boolean;
}

const useCheckboxHandler = <T extends CheckboxItemType>(
  items: T[],
  storageKey: StorageKeyType,
  options: CheckboxOptions = {}
) => {
  validateOptions({ options, items });

  const {
    maxSelectableCount = null,
    enableAllSelectBox = true,
    autoSelectAll = true,
  } = options;

  const { selectedIds, toggleSelect, isSelected } = useSelect(storageKey);
  const allSelect = useAllSelect({
    items,
    toggleSelect,
    selectedIds,
    autoSelectAll,
    storageKey,
  });
  const limitSelect = useLimitSelect({
    selectedIds,
    toggleSelect,
    maxSelectableCount,
  });

  const finalToggleSelect = maxSelectableCount
    ? limitSelect.limitedToggleSelect
    : toggleSelect;

  const finalToggleAllSelect = enableAllSelectBox
    ? allSelect.toggleAllSelect
    : () => {};

  const finalIsAllSelected = enableAllSelectBox
    ? allSelect.isAllSelected
    : () => false;

  return {
    selectedIds,
    isSelected,
    toggleSelect: finalToggleSelect,
    toggleAllSelect: finalToggleAllSelect,
    isAllSelected: finalIsAllSelected,
    ...limitSelect,
  };
};

export default useCheckboxHandler;
