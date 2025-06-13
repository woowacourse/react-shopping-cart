import { useEffect, useState } from 'react';

function useStorageState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}

export default useStorageState;
