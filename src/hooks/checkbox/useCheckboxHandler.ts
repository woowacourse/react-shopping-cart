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

// useCheckboxHandler.ts
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

  // 1) toggleSelect: maxSelectiveCount이 걸려 있으면 제한된 토글, 아니면 일반 토글
  const finalToggleSelect = maxSelectableCount
    ? limitSelect.limitedToggleSelect
    : toggleSelect;

  // 2) 전체 선택 기능: 옵션에 따라 실제 handler 또는 noop
  const finalToggleAllSelect = enableAllSelectBox
    ? allSelect.toggleAllSelect
    : () => {
        /* noop */
      };

  const finalIsAllSelected = enableAllSelectBox
    ? allSelect.isAllSelected
    : () => false;

  return {
    selectedIds,
    isSelected,
    toggleSelect: finalToggleSelect,
    toggleAllSelect: finalToggleAllSelect,
    isAllSelected: finalIsAllSelected,
    // 필요하다면 limitSelect의 나머지 handler도 함께 반환
    ...limitSelect,
  };
};

export default useCheckboxHandler;
