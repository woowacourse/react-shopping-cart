export const setDataInLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getDataFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};
