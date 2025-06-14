import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { storageHandler } from "../utils/storageHandler";

export function usePersistedState<T>(storageKey: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const saved = storageHandler.getItem(storageKey);
    return saved.length > 0 ? saved : initialValue;
  });

  useEffect(() => {
    storageHandler.setItem(storageKey, state);
  }, [storageKey, state]);

  return [state, setState];
}
