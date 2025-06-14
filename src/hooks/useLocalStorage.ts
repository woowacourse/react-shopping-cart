import { useCallback } from "react";

const useLocalStorage = () => {
  const localStorage = window.localStorage;

  const setItemToLocalStorage = useCallback(
    <T>(key: string, value: T) => {
      const data = JSON.stringify(value);
      localStorage.setItem(key, data);
    },
    [localStorage]
  );

  const getItemFromLocalStorage = useCallback(
    <T>(key: string): T | null => {
      const data = localStorage.getItem(key);
      if (data === null) {
        return null;
      }

      try {
        return JSON.parse(data);
      } catch (error) {
        return null;
      }
    },
    [localStorage]
  );

  return {
    setItemToLocalStorage,
    getItemFromLocalStorage,
  };
};

export default useLocalStorage;
