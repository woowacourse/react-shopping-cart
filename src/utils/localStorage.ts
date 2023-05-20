export const getLocalStorage = <T>(key: string, initialValue: T): T => {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : initialValue;
};

export const setDataInLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};
