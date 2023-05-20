import { createContext, PropsWithChildren, useState } from "react";

export const SelectBoxContext = createContext({
  selected: new Set(),
  toggleSelectBox: (id: number) => {},
});

interface SelectContextProviderProps {}

export function SelectBoxProvider(props: PropsWithChildren) {
  const { children } = props;
  const [selected, setSelected] = useState(new Set());

  function toggleSelectBox(id: number) {
    if (selected.has(id)) {
      const tempSet = new Set(selected);
      tempSet.delete(id);
      setSelected(tempSet);
      return;
    }

    if (!selected.has(id)) {
      setSelected((prev) => prev.add(1));
      return;
    }
  }

  return (
    <SelectBoxContext.Provider value={{ selected, toggleSelectBox }}>
      {children}
    </SelectBoxContext.Provider>
  );
}
