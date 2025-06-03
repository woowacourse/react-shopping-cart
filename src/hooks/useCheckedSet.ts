import { useState } from "react";

interface Identifiable {
  id: number;
}

const useCheckedSet = <T extends Identifiable>() => {
  const [isCheckedSet, setIsCheckedSet] = useState<Set<T["id"]>>(new Set());

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
      return newSet;
    });
  };

  const controlAllCheckBox = (data: T[]) => {
    setIsCheckedSet((prev) => {
      if (prev.size === data.length) {
        return new Set();
      }
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
      return newSet;
    });
  };

  const updateIsCheckedSet = (updateData: T["id"][]) => {
    setIsCheckedSet(new Set(updateData));
  };

  return {
    isCheckedSet,
    justifyIsChecked,
    controlCheckBox,
    controlAllCheckBox,
    syncIsCheckedSet,
    updateIsCheckedSet,
  };
};

export default useCheckedSet;
