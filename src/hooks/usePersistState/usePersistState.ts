import { useEffect, useState } from "react";

const getInitialState = <T>(key: string, initialState: T): T => {
  const persistedState = localStorage.getItem(key);
  return persistedState ? JSON.parse(persistedState) : initialState;
};

export default function usePersistState<T>(key: string, initialState: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => getInitialState(key, initialState));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}
