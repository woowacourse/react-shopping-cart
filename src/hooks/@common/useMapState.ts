import { useCallback, useState } from "react";

interface UseMapStateProps<K, V> {
  initialValue?: Map<K, V>;
}

export const useMapState = <K, V>({
  initialValue = new Map(),
}: UseMapStateProps<K, V>) => {
  const [map, setMap] = useState<Map<K, V>>(initialValue);

  const add = useCallback((key: K, value: V) => {
    setMap((prev) => {
      const next = new Map(prev);
      next.set(key, value);
      return next;
    });
  }, []);

  const remove = useCallback((key: K) => {
    setMap((prev) => {
      const next = new Map(prev);
      next.delete(key);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setMap(new Map());
  }, []);

  const has = useCallback((key: K) => map.has(key), [map]);

  return {
    map,
    add,
    remove,
    clear,
    has,
  };
};
