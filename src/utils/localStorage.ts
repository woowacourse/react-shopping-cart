const getLocalStorage = <T>(key: string, defaultValue?: T) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`localStorage get error: ${key}`, error);
    return defaultValue;
  }
};

const setLocalStorage = <T>(key: string, data: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`localStorage set error: ${key}`, error);
  }
};

export { getLocalStorage, setLocalStorage };
