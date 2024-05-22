export const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string, defaultValue: any) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

export const localStorageEffect =
  (key: string, defaultValue: any) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = getFromLocalStorage(key, defaultValue);
    setSelf(savedValue);

    onSet((newValue: any, _: any, isReset: boolean) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        saveToLocalStorage(key, newValue);
      }
    });
  };
