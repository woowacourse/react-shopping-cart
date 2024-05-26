import { useState } from "react";

type ToggleItem<T> = (item: T) => void;

type UseToggleSetReturn<T> = [Set<T>, ToggleItem<T>];

export const useToggleSet = <T>(initialList: Array<T> = []): UseToggleSetReturn<T> => {
  const [set, setSet] = useState<Set<T>>(new Set(initialList));

  const toggleItem = (item: T) => {
    const newSet = new Set(set);

    if (newSet.has(item)) {
      newSet.delete(item);
    } else {
      newSet.add(item);
    }

    setSet(newSet);
  };

  return [set, toggleItem];
};
