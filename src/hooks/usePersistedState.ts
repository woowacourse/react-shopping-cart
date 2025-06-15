import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

export function usePersistedState<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => {
    const storedValue = getLocalStorage(key, JSON.stringify(defaultValue));
    try {
      return JSON.parse(storedValue);
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    setLocalStorage(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
