const getFromLocalStorage = <T>(key: string): T => {
  return JSON.parse(localStorage.getItem(key) as string);
};

const saveToLocalStorage = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage };
