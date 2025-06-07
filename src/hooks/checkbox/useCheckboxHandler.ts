import useAllSelect from "./useAllSelect";
import useSelect from "./useSelect";

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
  const {
    maxSelectableCount = null,
    enableAllSelectBox = true,
    autoSelectAll = true,
  } = options;
  const { selectedIds, toggleSelect, isSelected } = useSelect();
  const allCheckboxHandler = useAllSelect({
    items,
    toggleSelect,
    selectedIds,
    autoSelectAll,
  });

  return {
    selectedIds,
    toggleSelect,
    isSelected,
    ...(enableAllSelectBox ? allCheckboxHandler : {}),
  };
};

export default useCheckboxHandler;
