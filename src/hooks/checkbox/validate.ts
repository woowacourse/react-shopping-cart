interface CheckboxOptions {
  maxSelectableCount?: number | null;
  enableAllSelectBox?: boolean;
  autoSelectAll?: boolean;
}

interface ValidateProps<T> {
  options: CheckboxOptions;
  items: T[];
}

const checkConflicts = <T>({ options, items }: ValidateProps<T>) => {
  const { maxSelectableCount, enableAllSelectBox, autoSelectAll } = options;
  if (maxSelectableCount && maxSelectableCount < items.length) {
    return Boolean(enableAllSelectBox || autoSelectAll);
  }

  return false;
};

const handleConflictError = <T>({ options, items }: ValidateProps<T>) => {
  if (checkConflicts<T>({ options, items })) {
    throw new Error(
      "최대 선택 개수가 전체 아이템 수보다 적으면, 전체 선택을 활성화할 수 없습니다."
    );
  }
};

export const validateOptions = <T>({ options, items }: ValidateProps<T>) => {
  if (import.meta.env.DEV) {
    handleConflictError<T>({ options, items });
  }
};
