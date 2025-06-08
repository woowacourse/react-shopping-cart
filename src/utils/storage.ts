export const getStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
      return defaultValue;
    }
    return JSON.parse(storedValue);
  } catch (error) {
    console.error(
      `localStorage에서 "${key}" 키를 읽는 중 오류가 발생했습니다:`,
      error
    );

    return defaultValue;
  }
};

export const setStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(
      `localStorage에 "${key}" 키를 쓰는 중 오류가 발생했습니다:`,
      error
    );
  }
};
