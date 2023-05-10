export const getLocalStorage = <T>(key: string): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const setLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};
