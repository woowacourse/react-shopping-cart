export const useLocalStorage = () => {
  const getLocalStorageData = <T>(key: string): T =>
    JSON.parse(localStorage.getItem(key) || '[]');

  const setLocalStorageData = <T>(key: string, data: T) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  return { getLocalStorageData, setLocalStorageData };
};
