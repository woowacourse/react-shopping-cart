export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  if (!data) return defaultValue;

  try {
    return JSON.parse(data);
  } catch (e) {
    console.error(
      `[ERROR] ${key}값의 LocalStorage data 파싱 과정에서 오류가 발생했습니다.`
    );
    return defaultValue;
  }
};

export const setLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};
