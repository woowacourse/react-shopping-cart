import { useCallback, useState } from 'react';

function useSelection<T>(initial: Set<T> = new Set(), maxCount?: number) {
  const [selected, setSelected] = useState<Set<T>>(new Set(initial));

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

export default useSelection;
