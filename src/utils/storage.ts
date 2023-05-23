export const getLocalStorageData = <T>(key: string): T =>
  JSON.parse(localStorage.getItem(key) ?? '[]');

export const setLocalStorageData = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};
