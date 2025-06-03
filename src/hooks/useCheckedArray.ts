import { useEffect, useState } from "react";

interface Identifiable {
  id: number | string;
}

const useCheckedArray = <T extends Identifiable>(initialData: T[]) => {
  const [isCheckedArray, setIsCheckedArray] = useState<T["id"][]>([]);

  useEffect(() => {
    initIsCheckedArray(initialData);
  }, [initialData]);

  const justifyIsChecked = (id: T["id"]) => {
    const isChecked = isCheckedArray.includes(id);
    return isChecked;
  };

  const controlCheckBox = (id: T["id"]) => {
    if (justifyIsChecked(id)) {
      setIsCheckedArray(isCheckedArray.filter((checkedId) => checkedId !== id));
      return;
    }

    setIsCheckedArray([...isCheckedArray, id]);
  };

  const controlAllCheckBox = (data: T[]) => {
    if (isCheckedArray.length === data.length) {
      setIsCheckedArray([]);
      return;
    }
    setIsCheckedArray(data.map((item) => item.id));
  };

  const initIsCheckedArray = (cartData: T[]) => {
    setIsCheckedArray(cartData.map((item) => item.id));
  };

  return {
    isAllChecked: isCheckedArray.length === initialData.length,
    isCheckedArray,
    justifyIsChecked,
    controlCheckBox,
    controlAllCheckBox,
    initIsCheckedArray,
  };
};

export default useCheckedArray;
