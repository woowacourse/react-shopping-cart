import { useState, useCallback } from "react";

export const useLocalStorageSet = <T>(
  key: string,
  initialValue: Set<T> = new Set<T>()
) => {
  const getValueFromStorage = useCallback((): Set<T> => {
    try {
      const savedValue = localStorage.getItem(key);
      if (savedValue) {
        const parsedValue: T[] = JSON.parse(savedValue);
        return new Set(parsedValue);
      }
    } catch (error) {
      console.error(`Failed to load ${key} from localStorage:`, error);
    }
    return initialValue;
  }, [key, initialValue]);

  const saveValueToStorage = useCallback(
    (value: Set<T>) => {
      try {
        const valueArray = Array.from(value);
        localStorage.setItem(key, JSON.stringify(valueArray));
      } catch (error) {
        console.error(`Failed to save ${key} to localStorage:`, error);
      }
    },
    [key]
  );

  const clearValueFromStorage = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to clear ${key} from localStorage:`, error);
    }
  }, [key]);

  const [value, setValue] = useState<Set<T>>(() => getValueFromStorage());

  const updateValue = useCallback(
    (newValue: Set<T>) => {
      setValue(newValue);
      saveValueToStorage(newValue);
    },
    [saveValueToStorage]
  );

  const clearValue = useCallback(() => {
    setValue(initialValue);
    clearValueFromStorage();
  }, [initialValue, clearValueFromStorage]);

  return {
    value,
    updateValue,
    clearValue,
  };
};
