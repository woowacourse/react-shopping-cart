import { useState } from "react";
import { STORAGE_KEY } from "../constants/systemConstants";

interface Identifiable {
  id: number;
}

const useCheckedSet = <T extends Identifiable>() => {
  const initialCheckedSet = JSON.parse(
    sessionStorage.getItem(STORAGE_KEY.CHECKED_CART_ITEMS) || "[]"
  );
  const [isCheckedSet, setIsCheckedSet] = useState<Set<T["id"]>>(
    new Set(initialCheckedSet)
  );

  const justifyIsChecked = (id: T["id"]) => {
    const isChecked = isCheckedSet.has(id);
    return isChecked;
  };

  const controlCheckBox = (id: T["id"]) => {
    setIsCheckedSet((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      sessionStorage.setItem(
        STORAGE_KEY.CHECKED_CART_ITEMS,
        JSON.stringify([...newSet])
      );
      return newSet;
    });
  };

  const controlAllCheckBox = (data: T[]) => {
    setIsCheckedSet((prev) => {
      if (prev.size === data.length) {
        sessionStorage.setItem(
          STORAGE_KEY.CHECKED_CART_ITEMS,
          JSON.stringify([])
        );
        return new Set();
      }
      sessionStorage.setItem(
        STORAGE_KEY.CHECKED_CART_ITEMS,
        JSON.stringify(data.map((item) => item.id))
      );
      return new Set(data.map((item) => item.id));
    });
  };

  const syncIsCheckedSet = (updateData: T["id"][]) => {
    setIsCheckedSet((prev) => {
      const updateSet = new Set(updateData);
      const newSet = new Set<T["id"]>();
      for (const id of prev) {
        if (updateSet.has(id)) {
          newSet.add(id);
        }
      }
      sessionStorage.setItem(
        STORAGE_KEY.CHECKED_CART_ITEMS,
        JSON.stringify([...newSet])
      );
      return newSet;
    });
  };

  const initIsCheckedSet = (updateData: T["id"][]) => {
    const initialCheckedArray = JSON.parse(
      sessionStorage.getItem(STORAGE_KEY.CHECKED_CART_ITEMS) || "[]"
    );
    if (
      initialCheckedArray &&
      initialCheckedArray.length !== 0 &&
      initialCheckedArray.length !== updateData.length
    ) {
      setIsCheckedSet(new Set(initialCheckedArray));
    } else {
      setIsCheckedSet(new Set(updateData));
    }
  };

  return {
    isCheckedSet,
    justifyIsChecked,
    controlCheckBox,
    controlAllCheckBox,
    syncIsCheckedSet,
    initIsCheckedSet,
  };
};

export default useCheckedSet;
