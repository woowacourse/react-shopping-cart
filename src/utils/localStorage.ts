export type LocalStorageKey = "selectedItems";

export const getLocalStorage = (key: LocalStorageKey) => {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const setLocalStorage = <T>(key: LocalStorageKey, newValue: T) => {
  return localStorage.setItem(key, JSON.stringify(newValue));
};
