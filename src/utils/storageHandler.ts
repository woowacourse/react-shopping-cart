export const storageHandler = {
  getItem: (storageKey: string) => JSON.parse(localStorage.getItem(storageKey) ?? "[]") || [],
  setItem: <T>(storageKey: string, value: T) => localStorage.setItem(storageKey, JSON.stringify(value)),
};
