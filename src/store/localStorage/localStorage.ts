export const getStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) ?? "{}");
};

export const setStorage = <T>(key: string, data: T) => {
  try {
    const item = JSON.stringify(data);
    localStorage.setItem(key, item);
  } catch (error) {
    console.error("Failed to set localStorage! ", error);
  }
};
