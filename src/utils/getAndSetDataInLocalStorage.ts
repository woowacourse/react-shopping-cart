export const setDataInLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getDataFromLocalStorage = (key: string): string => {
  const data = localStorage.getItem(key);

  if (!data) return '[]';
  return data;
};
