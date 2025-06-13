import { useCallback, useState } from 'react';

export function useSelection<T>(initial: Set<T>, maxCount?: number) {
  const [selected, setSelected] = useState<Set<T>>(initial);

  const toggle = useCallback(
    (item: T) => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(item)) {
          next.delete(item);
        } else if (!maxCount || next.size < maxCount) {
          next.add(item);
        }
        return next;
      });
    },
    [maxCount]
  );

  const isSelected = useCallback((item: T) => selected.has(item), [selected]);

  const reset = useCallback(() => {
    setSelected(new Set());
  }, []);

  return {
    selected,
    toggle,
    isSelected,
    reset,
    set: setSelected,
  };
}
