import { useEffect, useState } from "react";

const getInitialState = <T>(key: string, initialState: T): T => {
  try {
    const persistedState = localStorage.getItem(key);
    if (!persistedState) return initialState;

    return JSON.parse(persistedState);
  } catch (error) {
    console.warn(`로컬 스토리지 "${key}" 손상된 데이터 제거:`, error);
    localStorage.removeItem(key);
    return initialState;
  }
};

export default function usePersistState<T>(key: string, initialState: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => getInitialState(key, initialState));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}
