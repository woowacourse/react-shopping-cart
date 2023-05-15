const getFromLocalStorage = <T>(key: string) => {
  return JSON.parse(localStorage.getItem(key) as string) as T;
};

const saveToLocalStorage = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage };
