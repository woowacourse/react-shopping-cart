export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const data = localStorage.getItem(key);
    if (!data) return defaultValue;
    return JSON.parse(data) as T;
  } catch {
    return defaultValue;
  }
};

export const setLocalStorage = <T>(key: string, value: T) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
