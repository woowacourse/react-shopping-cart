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
  options: CheckboxOptions = {}
) => {
  validateOptions({
    options,
    items,
  });

  const {
    maxSelectableCount = null,
    enableAllSelectBox = true,
    autoSelectAll = true,
  } = options;
  const { selectedIds, toggleSelect, isSelected } = useSelect();
  const allSelectHandler = useAllSelect({
    items,
    toggleSelect,
    selectedIds,
    autoSelectAll,
  });
  const { limitedToggleSelect, ...limitSelectHandler } = useLimitSelect({
    selectedIds,
    toggleSelect,
    maxSelectableCount,
  });

  return {
    selectedIds,
    isSelected,
    ...(enableAllSelectBox ? allSelectHandler : {}),
    ...(maxSelectableCount
      ? { ...limitSelectHandler, toggleSelect: limitedToggleSelect }
      : { toggleSelect }),
  };
};

export default useCheckboxHandler;
