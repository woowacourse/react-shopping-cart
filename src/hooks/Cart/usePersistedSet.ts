import { useState, useCallback } from "react";

export function usePersistedSet(key: string) {
  const [hadStoredValue] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null;
    } catch {
      return false;
    }
  });

  const [selected, setSelectedInternal] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(key);
      const fromStorage: string[] = raw ? JSON.parse(raw) : [];
      return new Set(fromStorage);
    } catch {
      return new Set();
    }
  });

  const setSelected = useCallback(
    (updater: (prev: Set<string>) => Set<string>) => {
      setSelectedInternal((prev) => {
        const next = updater(prev);
        const rawNext = JSON.stringify([...next]);

        if (localStorage.getItem(key) !== rawNext) {
          localStorage.setItem(key, rawNext);
        }
        return next;
      });
    },
    [key]
  );

  return [selected, setSelected, hadStoredValue] as const;
}
