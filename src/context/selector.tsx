import { createContext, PropsWithChildren, useState } from "react";
import useSelect from "../hooks/useSelect";

export const SelectBoxContext = createContext({
  selected: new Set(),
  toggleSelectBox: (id: number) => {},
});

export function SelectBoxProvider(props: PropsWithChildren) {
  const { children } = props;
  const { selected, toggleSelectBox } = useSelect();

  return (
    <SelectBoxContext.Provider value={{ selected, toggleSelectBox }}>
      {children}
    </SelectBoxContext.Provider>
  );
}
