import { useState } from "react";

export default function useSelect() {
  const [selected, setSelected] = useState<Set<number>>(new Set());

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

  function deleteId(id: number) {
    const newSet = new Set(selected);
    newSet.delete(id);
    setSelected(newSet);
  }

  function checkIsAllSelected<T>(options: T[]) {
    return selected.size === options.length;
  }

  return { selected, toggleSelectBox, toggleAll, deleteId, checkIsAllSelected };
}
