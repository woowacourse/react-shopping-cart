export const getStorage = <T>(key: string, defaultValue: T): T => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    try {
      return JSON.parse(storedValue) as T;
    } catch (error) {
      console.error("Failed to get localStorage! ", error);
      return defaultValue;
    }
  }
  return defaultValue;
};

export const setStorage = <T>(key: string, data: T) => {
  try {
    const item = JSON.stringify(data);
    localStorage.setItem(key, item);
  } catch (error) {
    console.error("Failed to set localStorage! ", error);
  }
};
