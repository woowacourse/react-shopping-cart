export const getLocalStorageItem = <T>(key: string): T | undefined => {
  const jsonData = localStorage.getItem(key);

  if (!jsonData) {
    return undefined;
  }

  return JSON.parse(jsonData) as T;
};

export const setLocalStorageItem = <T>(key: string, item: T) => {
  const jsonData = JSON.stringify(item);

  localStorage.setItem(key, jsonData);
};
