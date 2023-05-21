import { useState } from "react";

export default function useSelect() {
  const [selected, setSelected] = useState(new Set());

  function toggleSelectBox(id: number) {
    const newSet = new Set(selected);
    if (selected.has(id)) {
      newSet.delete(id);
      setSelected(newSet);

      return;
    }

    newSet.add(id);
    setSelected(newSet);
  }

  function toggleAll(options: any) {
    if (selected.size == options.length) {
      setSelected(new Set());
      return;
    }

    setSelected(new Set(options));
  }

  return { selected, toggleSelectBox, toggleAll };
}
