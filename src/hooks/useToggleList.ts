import { useState } from "react";

type ToggleItem<T> = (item: T) => void;
type UseToggleListReturn<T> = [Array<T>, ToggleItem<T>];

export const useToggleList = <T>(initialList: Array<T> = []): UseToggleListReturn<T> => {
  const [list, setList] = useState(initialList);

  const toggleItem = (item: T) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return [list, toggleItem];
};
