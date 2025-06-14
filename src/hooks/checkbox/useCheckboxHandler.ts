import { StorageKeyType } from "../../types/storage";
import useLimitSelect from "./useLimitSelect";
import useSelect from "./useSelect";
import { validateOptions } from "./validate";

interface CheckboxItemType {
  id: number;
}

interface CheckboxOptions {
  maxSelectableCount?: number | null;
  autoSelectAll?: boolean;
}

const useCheckboxHandler = <T extends CheckboxItemType>(
  items: T[],
  storageKey: StorageKeyType,
  options: CheckboxOptions = {}
) => {
  validateOptions({ options, items });

  const { maxSelectableCount = null } = options;

  const { selectedIds, toggleSelect, isSelected, addSelectedId } = useSelect(
    storageKey,
    items
  );

  const limitSelect = useLimitSelect({
    selectedIds,
    toggleSelect,
    maxSelectableCount,
  });

  const finalToggleSelect = maxSelectableCount
    ? limitSelect.limitedToggleSelect
    : toggleSelect;

  return {
    selectedIds,
    isSelected,
    toggleSelect: finalToggleSelect,
    addSelectedId,
    ...limitSelect,
  };
};

export default useCheckboxHandler;
