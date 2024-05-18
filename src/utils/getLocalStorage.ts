export const getLocalStorage = (
  key: string,
  defaultValue: object | boolean,
) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};
